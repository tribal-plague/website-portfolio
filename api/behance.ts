import { fetchBehanceProjects } from '../src/lib/behance';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
  res.setHeader('Content-Type', 'application/json');

  try {
    const projects = await fetchBehanceProjects();
    res.status(200).json({ projects });
  } catch (err) {
    console.error('[behance]', err);
    res.status(500).json({ error: String(err), projects: [] });
  }
}
