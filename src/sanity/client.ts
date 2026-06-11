import { createClient } from "@sanity/client";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID as string | undefined;
const dataset = (import.meta.env.VITE_SANITY_DATASET as string | undefined) ?? "production";
const apiVersion = "2024-01-01";

export const isSanityConfigured = Boolean(projectId);

export const readClient = createClient({
  projectId: projectId ?? "placeholder",
  dataset,
  apiVersion,
  useCdn: true,
});

// Write client — token is intentionally in the bundle for this personal portfolio.
// Scope the token to "Editor" role in Sanity so it can only modify content.
export const writeClient = createClient({
  projectId: projectId ?? "placeholder",
  dataset,
  apiVersion,
  useCdn: false,
  token: import.meta.env.VITE_SANITY_WRITE_TOKEN as string | undefined,
});
