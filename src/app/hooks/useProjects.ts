import { type Project, PROJECTS } from "../data";

export function useProjects() {
  return { projects: PROJECTS, loading: false };
}

export function useProject(id: number) {
  return { project: PROJECTS.find((p: Project) => p.id === id), loading: false };
}
