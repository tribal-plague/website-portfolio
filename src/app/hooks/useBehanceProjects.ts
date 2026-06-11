import { useState, useEffect } from 'react';
import type { BehanceProject } from '../../lib/behance';

export function useBehanceProjects() {
  const [projects, setProjects] = useState<BehanceProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/behance')
      .then((r) => r.json())
      .then((data: { projects: BehanceProject[]; error?: string }) => {
        if (!cancelled) {
          setProjects(data.projects ?? []);
          if (data.error) setError(data.error);
          setLoading(false);
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });
    return () => { cancelled = true; };
  }, []);

  return { projects, loading, error };
}
