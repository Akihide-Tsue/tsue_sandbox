import { FC } from 'react';

import Head from 'next/head';

import { useWindowSize } from '@hooks/useWindowSize';

const metaTitle = '津江のサンドボックス｜大阪の不動産テックで働くフロントエンドエンジニアのブログ';

const metaDescription = '大阪の不動産テックで働くフロントエンドエンジニアのブログです。日頃の学びをアウトプットしています。';

const CommonHead: FC = ({}) => {
  const { width: windowWidth } = useWindowSize();

  return (
    <Head>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <title key="title">{metaTitle}</title>
      <meta name="description" content={metaDescription} key="description" />
      <link rel="icon" href="/favicon.ico" />
      <meta name="viewport" content={windowWidth < 375 && windowWidth > 0 ? 'width=374' : 'width=device-width,initial-scale=1'} />

      <meta property="og:title" content={metaTitle} key={'og_title'} />
      <meta property="og:description" content={metaDescription} key={'og_description'} />
      <meta property="og:url" content="https://tsue-sandbox.vercel.app/" key={'og_url'} />
      <meta property="og:image" content="https://docs.google.com/presentation/d/1jvvXMvDJZSagyoRiDB0vjyooViB_z1Kc95IbB2fqqJQ/edit?usp=sharing" />
      <meta property="og:type" content="article" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={metaTitle} key={'twitter_title'} />
      <meta name="twitter:description" content={metaDescription} key={'twitter_description'} />
      <meta name="twitter:image:src" content="https://docs.google.com/presentation/d/1jvvXMvDJZSagyoRiDB0vjyooViB_z1Kc95IbB2fqqJQ/edit?usp=sharing" />
      {process.env.NEXT_PUBLIC_APP_ENV !== 'production' && <meta name="robots" content="noindex" />}
      <link rel="icon" href="https://drive.google.com/file/d/1NZyy3KC0kLiLsd2nM9HElkanl_WfyH0D/view?usp=sharing" />
      <link rel="apple-touch-icon" sizes="180x180" href="https://drive.google.com/file/d/1bgZHiy2FtRqe4T-selrZZt1qiOY_Lgxn/view?usp=sharing" />
    </Head>
  );
};

export default CommonHead;
