import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const NOTIFY_TO = "shreeshvikramsingh@gmail.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

function buildEmailHtml(
  name: string,
  email: string,
  phone: string,
  role: string,
  message: string
): string {
  const cell =
    "padding: 12px 0; border-bottom: 1px solid #e5e3de; font-size: 14px; vertical-align: top;";
  const label =
    "padding: 12px 0; border-bottom: 1px solid #e5e3de; font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em; color: #8a877f; width: 130px; vertical-align: top;";

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f7f5f1;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:600px;margin:40px auto;padding:0 20px 40px;">
    <div style="background:#ffffff;padding:40px;border:1px solid #e5e3de;">
      <h2 style="font-size:18px;font-weight:700;margin:0 0 28px;text-transform:uppercase;letter-spacing:0.08em;color:#1a1917;">
        New Contact Form Submission
      </h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="${label}">Name</td>
          <td style="${cell}">${escapeHtml(name)}</td>
        </tr>
        <tr>
          <td style="${label}">Email</td>
          <td style="${cell}"><a href="mailto:${escapeHtml(email)}" style="color:#1a1917;">${escapeHtml(email)}</a></td>
        </tr>
        <tr>
          <td style="${label}">Phone</td>
          <td style="${cell}">${phone ? escapeHtml(phone) : "—"}</td>
        </tr>
        <tr>
          <td style="${label}">Role / Company</td>
          <td style="${cell}">${role ? escapeHtml(role) : "—"}</td>
        </tr>
      </table>
      <div style="margin-top:28px;">
        <p style="font-size:11px;text-transform:uppercase;letter-spacing:0.2em;color:#8a877f;margin:0 0 10px;">Message</p>
        <p style="font-size:14px;line-height:1.7;color:#1a1917;margin:0;white-space:pre-wrap;">${escapeHtml(message)}</p>
      </div>
      <p style="margin:40px 0 0;font-size:11px;color:#c8c4bc;letter-spacing:0.1em;border-top:1px solid #e5e3de;padding-top:20px;">
        Submitted via portfolio contact form
      </p>
    </div>
  </div>
</body>
</html>`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const { name, email, phone, role, message } = await req.json();

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return new Response(
        JSON.stringify({ error: "name, email, and message are required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Store in Supabase using service role key (bypasses RLS)
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { error: dbError } = await supabase
      .from("contact_submissions")
      .insert({ name, email, phone: phone || null, role: role || null, message });

    if (dbError) throw new Error(`DB insert failed: ${dbError.message}`);

    // Send email notification via Resend
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (resendApiKey) {
      const emailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: [NOTIFY_TO],
          subject: `New message from ${name}`,
          html: buildEmailHtml(name, email, phone, role, message),
        }),
      });

      if (!emailRes.ok) {
        // Log but don't fail the request — submission is already saved
        const errText = await emailRes.text();
        console.error("Resend error:", errText);
      }
    } else {
      console.warn("RESEND_API_KEY not set — skipping email notification");
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("contact-notification error:", err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : String(err) }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
