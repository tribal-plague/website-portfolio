import { useEffect, useState } from "react";
import { type Project } from "../data";
import { getAllProjects, getProjectById } from "../lib/cms";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getAllProjects().then((data) => {
      if (!cancelled) {
        setProjects(data);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, []);

  return { projects, loading };
}

export function useProject(id: number) {
  const [project, setProject] = useState<Project | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getProjectById(id).then((data) => {
      if (!cancelled) {
        setProject(data);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, [id]);

  return { project, loading };
}
