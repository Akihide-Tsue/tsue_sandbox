import { FC } from 'react';

import Head from 'next/head';

import { useWindowSize } from '@hooks/useWindowSize';

const metaTitle = '津江のサンドボックス｜大阪の不動産テックで働くフロントエンドエンジニアのブログ';

const metaDescription = '大阪の不動産テックで働くフロントエンドエンジニアのブログです。日頃の学びをアウトプットしています。';

const CommonHead: FC = ({}) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? '';
  const { width: windowWidth } = useWindowSize();

  return (
    <Head>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <title key="title">{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="icon" href="/favicon.ico" />
      <meta name="google-site-verification" content="ShekIcJOv2C2czZH_jQNHWjYM2QWdJUAC4SXJihXkjI" />
      <meta name="viewport" content={windowWidth < 375 && windowWidth > 0 ? 'width=374' : 'width=device-width,initial-scale=1'} />

      <meta property="og:title" content={metaTitle} key={'og_title'} />
      <meta property="og:description" content={metaDescription} key={'og_description'} />
      <meta property="og:url" content={process.env.NEXT_PUBLIC_SITE_HOME} key={'og_url'} />
      <meta property="og:image" content={`${baseUrl}/ogp/default-ogp.png`} />
      <meta property="og:type" content="article" />

      <meta property="twitter:image" content={`${baseUrl}/ogp/default-ogp.png`} />
      <meta name="twitter:domain" content="tsue-sandbox.vercel.app" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={metaTitle} />
      <meta property="twitter:description" content={metaDescription} />

      {process.env.NEXT_PUBLIC_APP_ENV !== 'production' && <meta name="robots" content="noindex" />}
      <link rel="icon" href="public/images/apple-touch-icon.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="public/images/apple-touch-icon.png" />
    </Head>
  );
};

export default CommonHead;
