import { GetServerSidePropsContext } from 'next';

import { generateSiteMap, URL } from 'src/sitemap/generator';

export default function Page(): null {
  return null;
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function getServerSideProps({ res }: GetServerSidePropsContext): Promise<{
  props?: Record<string, unknown>;
  notFound?: boolean;
}> {
  try {
    const list: URL[] = [
      {
        loc: 'https://google.com/',
        lastMod: new Date(1651530657000),
        freq: 'daily',
        priority: 0.5,
      },
    ];

    const xml = generateSiteMap(list);

    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400, stale-while-revalidate');
    res.setHeader('Content-Type', 'text/xml');
    res.end(xml);

    return {
      props: {},
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
