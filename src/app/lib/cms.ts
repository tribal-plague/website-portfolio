import { PROJECTS, type Project } from "../data";

const CMS_KEY = "portfolio_cms_projects";

export function getCMSProjects(): Project[] {
  try {
    const raw = localStorage.getItem(CMS_KEY);
    return raw ? (JSON.parse(raw) as Project[]) : [];
  } catch {
    return [];
  }
}

export function upsertCMSProject(project: Project): void {
  const all = getCMSProjects();
  const idx = all.findIndex((p) => p.id === project.id);
  if (idx >= 0) all[idx] = project;
  else all.push(project);
  localStorage.setItem(CMS_KEY, JSON.stringify(all));
}

export function deleteCMSProject(id: number): void {
  localStorage.setItem(
    CMS_KEY,
    JSON.stringify(getCMSProjects().filter((p) => p.id !== id))
  );
}

// CMS projects appear first (newest work at top), then bundled
export function getAllProjects(): Project[] {
  return [...getCMSProjects(), ...PROJECTS];
}

export function getProjectById(id: number): Project | undefined {
  return getAllProjects().find((p) => p.id === id);
}

export function nextCMSId(): number {
  const ids = getCMSProjects().map((p) => p.id);
  return ids.length ? Math.max(...ids) + 1 : 1000;
}
