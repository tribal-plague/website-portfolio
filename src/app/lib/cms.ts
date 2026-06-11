import { PROJECTS, type Project } from "../data";
import { readClient, writeClient, isSanityConfigured } from "../../sanity/client";

// ── localStorage fallback (used when Sanity is not configured) ────────────────

const LOCAL_KEY = "portfolio_cms_projects";

function localGet(): Project[] {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    return raw ? (JSON.parse(raw) as Project[]) : [];
  } catch {
    return [];
  }
}

function localUpsert(project: Project): void {
  const all = localGet();
  const idx = all.findIndex((p) => p.id === project.id);
  if (idx >= 0) all[idx] = project;
  else all.push(project);
  localStorage.setItem(LOCAL_KEY, JSON.stringify(all));
}

function localDelete(id: number): void {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(localGet().filter((p) => p.id !== id)));
}

function localNextId(): number {
  const ids = localGet().map((p) => p.id);
  return ids.length ? Math.max(...ids) + 1 : 1000;
}

// ── Sanity GROQ projection ────────────────────────────────────────────────────

const FIELDS = `
  "id": numericId,
  title, category, company, year, role, description,
  longDescription, outcomes, skills, tools,
  "thumb": thumbUrl, "images": imageUrls,
  featured, uploadDate, "_sanityId": _id
`;

// ── Public API (async, Sanity or localStorage) ────────────────────────────────

export async function getCMSProjects(): Promise<Project[]> {
  if (!isSanityConfigured) return localGet();
  try {
    const query = `*[_type == "project"] | order(_createdAt desc) { ${FIELDS} }`;
    return await readClient.fetch<Project[]>(query);
  } catch {
    return localGet(); // degrade gracefully if Sanity is unreachable
  }
}

// Sanity/localStorage projects first, then bundled data.ts projects as fallback
export async function getAllProjects(): Promise<Project[]> {
  const cms = await getCMSProjects();
  const cmsIds = new Set(cms.map((p) => p.id));
  const bundled = PROJECTS.filter((p) => !cmsIds.has(p.id));
  return [...cms, ...bundled];
}

export async function getProjectById(id: number): Promise<Project | undefined> {
  if (isSanityConfigured) {
    try {
      const query = `*[_type == "project" && numericId == $id][0] { ${FIELDS} }`;
      const result = await readClient.fetch<Project | null>(query, { id });
      if (result) return result;
    } catch {
      // fall through
    }
  } else {
    const local = localGet().find((p) => p.id === id);
    if (local) return local;
  }
  return PROJECTS.find((p) => p.id === id);
}

export async function upsertCMSProject(project: Project): Promise<void> {
  if (!isSanityConfigured) {
    localUpsert(project);
    return;
  }
  const doc = {
    _type: "project" as const,
    numericId: project.id,
    title: project.title,
    category: project.category,
    company: project.company,
    year: project.year,
    role: project.role,
    description: project.description,
    longDescription: project.longDescription,
    outcomes: project.outcomes,
    skills: project.skills,
    tools: project.tools,
    thumbUrl: project.thumb,
    imageUrls: project.images,
    featured: project.featured,
    uploadDate: project.uploadDate ?? null,
  };

  const sanityId: string | null =
    (project as Project & { _sanityId?: string })._sanityId ??
    (await writeClient
      .fetch<string | null>(`*[_type == "project" && numericId == $id][0]._id`, { id: project.id })
      .catch(() => null));

  if (sanityId) {
    await writeClient.patch(sanityId).set(doc).commit();
  } else {
    await writeClient.create(doc);
  }
}

export async function deleteCMSProject(id: number): Promise<void> {
  if (!isSanityConfigured) {
    localDelete(id);
    return;
  }
  const sanityId = await writeClient
    .fetch<string | null>(`*[_type == "project" && numericId == $id][0]._id`, { id })
    .catch(() => null);
  if (sanityId) {
    await writeClient.delete(sanityId);
  }
}

export function nextCMSId(): number {
  if (!isSanityConfigured) return localNextId();
  return Math.floor(Date.now() / 1000);
}

// Upload an image file and return a hosted URL.
// With Sanity: uploads to Sanity's CDN → returns a permanent cdn.sanity.io URL.
// Without Sanity: converts to a base64 data URI stored locally.
export async function uploadImage(file: File): Promise<string> {
  if (!isSanityConfigured) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
  try {
    const asset = await writeClient.assets.upload("image", file, {
      filename: file.name,
    });
    return asset.url;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.toLowerCase().includes("insufficient permissions") || msg.toLowerCase().includes("permission")) {
      throw new Error(
        'Sanity token is missing "create" permission. Go to sanity.io/manage → API → Tokens and regenerate with the Editor role.'
      );
    }
    throw err;
  }
}
