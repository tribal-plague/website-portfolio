const BEHANCE_BASE = 'https://www.behance.net/shreeshvikramsingh';
const FETCH_TIMEOUT_MS = 15000;
const MAX_PAGES = 5;

type BehanceProject = {
  id: string;
  title: string;
  thumb: string;
  url: string;
  publishedOn?: string;
};

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function formatUnixDate(ts: number): string {
  const d = new Date(ts * 1000);
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

function buildDateMap(html: string): Map<string, string> {
  const map = new Map<string, string>();
  const re = /"id"\s*:\s*(\d{8,})\s*,[\s\S]{0,500}?"publishedOn"\s*:\s*(\d{10})/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    if (!map.has(m[1])) map.set(m[1], formatUnixDate(Number(m[2])));
  }
  return map;
}

function parsePage(html: string): { projects: BehanceProject[]; nextCursor: string | null } {
  const projects: BehanceProject[] = [];
  const seenIds = new Set<string>();
  const dateMap = buildDateMap(html);

  const galleryRe = /href="(\/gallery\/(\d+)\/([^"?#]+))"/g;
  let m: RegExpExecArray | null;

  while ((m = galleryRe.exec(html)) !== null) {
    const [, path, id] = m;
    if (seenIds.has(id)) continue;
    seenIds.add(id);

    const s = Math.max(0, m.index - 1500);
    const e = Math.min(html.length, m.index + 1500);
    const slice = html.slice(s, e);

    const thumbMatch = slice.match(
      /https:\/\/(?:mir-s3-cdn-cf|mir-cdn|[a-z0-9-]+\.behance\.net|mir\.cdn\.behance\.net)\/projects\/\d+\/[A-Za-z0-9]+[^"'\s>]*\.(?:jpg|jpeg|png|webp)/i
    );
    if (!thumbMatch) continue;

    const altMatch = slice.match(/alt="([^"]{3,120})"/);
    const title =
      altMatch?.[1] ??
      decodeURIComponent(path.split('/').pop() ?? '').replace(/-/g, ' ');

    const thumb = thumbMatch[0].replace(/\/projects\/\d+\//, '/projects/808/');

    projects.push({
      id,
      title,
      thumb,
      url: `https://www.behance.net${path}`,
      publishedOn: dateMap.get(id),
    });
  }

  // Find the next page cursor: href="/shreeshvikramsingh?after=CURSOR"
  const cursorMatch = html.match(/href="\/shreeshvikramsingh\?after=([A-Za-z0-9+/%=]+)"/);
  const nextCursor = cursorMatch ? decodeURIComponent(cursorMatch[1]) : null;

  return { projects, nextCursor };
}

const FETCH_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  Accept:
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
};

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
  res.setHeader('Content-Type', 'application/json');

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const allProjects: BehanceProject[] = [];
    const seenIds = new Set<string>();
    let url = BEHANCE_BASE;
    let pages = 0;

    while (pages < MAX_PAGES) {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: FETCH_HEADERS,
      });

      if (!response.ok) {
        if (pages === 0) {
          clearTimeout(timer);
          return res.status(500).json({
            error: `Behance returned HTTP ${response.status}`,
            projects: [],
          });
        }
        break;
      }

      const html = await response.text();
      const { projects, nextCursor } = parsePage(html);

      for (const p of projects) {
        if (!seenIds.has(p.id)) {
          seenIds.add(p.id);
          allProjects.push(p);
        }
      }

      pages++;

      if (!nextCursor) break;
      url = `${BEHANCE_BASE}?after=${encodeURIComponent(nextCursor)}`;
    }

    clearTimeout(timer);
    return res.status(200).json({ projects: allProjects });
  } catch (err: any) {
    clearTimeout(timer);
    const message = err?.name === 'AbortError' ? 'Behance fetch timed out' : String(err);
    console.error('[behance]', message);
    return res.status(500).json({ error: message, projects: [] });
  }
}
