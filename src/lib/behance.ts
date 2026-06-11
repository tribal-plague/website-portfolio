export type BehanceProject = {
  id: string;
  title: string;
  thumb: string;
  url: string;
  publishedOn?: string;
};

const BEHANCE_PROFILE = 'https://www.behance.net/shreeshvikramsingh';

const FETCH_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  Accept:
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
};

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function formatUnixDate(ts: number): string {
  const d = new Date(ts * 1000);
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

export async function fetchBehanceProjects(): Promise<BehanceProject[]> {
  const res = await fetch(BEHANCE_PROFILE, { headers: FETCH_HEADERS });
  if (!res.ok) throw new Error(`Behance returned HTTP ${res.status}`);
  const html = await res.text();
  return parseBehanceProjects(html);
}

function buildDateMap(html: string): Map<string, string> {
  const map = new Map<string, string>();
  // Behance embeds "id":NUMERIC_ID ... "publishedOn":UNIX_TS in the page JSON
  const re = /"id"\s*:\s*(\d{8,})\s*,[\s\S]{0,500}?"publishedOn"\s*:\s*(\d{10})/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    if (!map.has(m[1])) map.set(m[1], formatUnixDate(Number(m[2])));
  }
  return map;
}

function parseBehanceProjects(html: string): BehanceProject[] {
  const projects: BehanceProject[] = [];
  const seenIds = new Set<string>();
  const dateMap = buildDateMap(html);

  const galleryRe = /href="(\/gallery\/(\d+)\/([^"?#]+))"/g;
  let m: RegExpExecArray | null;

  while ((m = galleryRe.exec(html)) !== null) {
    const [, path, id] = m;
    if (seenIds.has(id)) continue;
    seenIds.add(id);

    const s = Math.max(0, m.index - 800);
    const e = Math.min(html.length, m.index + 800);
    const slice = html.slice(s, e);

    const thumbMatch = slice.match(
      /https:\/\/mir-s3-cdn-cf\.behance\.net\/projects\/\d+\/[A-Za-z0-9]+\.[^"'\s>]+\.(?:jpg|jpeg|png|webp)/
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

  return projects;
}
