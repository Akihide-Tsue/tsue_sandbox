import { renderToString } from 'react-dom/server';

export type URL = {
  loc: string;
  lastMod?: Date;
  freq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: 0.0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1.0;
};

function generateURLSet(list: URL[]): JSX.Element {
  return (
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      {list.map(({ loc, lastMod, freq, priority }: URL, i) => (
        <url key={i}>
          <loc>{loc}</loc>
          {lastMod && <lastmod>{lastMod.toISOString()}</lastmod>}
          {freq && <changefreq>{freq}</changefreq>}
          {priority && <priority>{priority}</priority>}
        </url>
      ))}
    </urlset>
  );
}

export function generateSiteMap(list: URL[]): string {
  return '<?xml version="1.0" encoding="UTF-8"?>' + renderToString(generateURLSet(list));
}
