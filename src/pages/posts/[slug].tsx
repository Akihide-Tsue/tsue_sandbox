import { FC } from 'react';

import fs from 'fs';

import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import CodeBlock from '@components/codeblock/CodeBlock';
import { FrontMatterType } from 'src/type-def/postsType';
import createOgp from 'src/utils/server/ogpUtils';

import stylesMarkdown from '@styles/markdown.module.scss';
import styles from '@styles/posts.module.scss';

export const getStaticProps: ({
  params,
}: {
  params: { slug: string };
  // eslint-disable-next-line @typescript-eslint/require-await
}) => Promise<{ props: { frontMatter: { [key: string]: any }; content: string } }> = async ({ params }) => {
  const file = fs.readFileSync(`src/posts/${params.slug}.md`, 'utf-8');
  const { data, content } = matter(file);

  //OGPローカル確認:http://localhost:3000/api/posts/dinamic-ogp
  void createOgp(params.slug);
  return { props: { frontMatter: data, content } };
};

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths = async () => {
  const files = fs.readdirSync('src/posts');
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(/\.md$/, ''),
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

type Props = { frontMatter: FrontMatterType; content: string };

const Article: FC<Props> = ({ frontMatter, content }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? '';
  const router = useRouter();
  const { slug } = router.query;

  const tags = frontMatter.tag.map((tag, i) => {
    return (
      <span key={i} className={styles.tag}>
        {tag}
      </span>
    );
  });

  return (
    <>
      <Head>
        <title>{frontMatter.title}</title>
        <meta property="og:image" key="ogImage" content={`${baseUrl}/ogp/${slug}.png`} />
        <meta name="twitter:image" key="twitterImage" content={`${baseUrl}/ogp/${slug}.png`} />
        <meta name="twitter:card" key="twitterCard" content="summary_large_image" />
        <meta name="twitter:title" content={frontMatter.title} />
        <meta name="twitter:description" content={frontMatter.description} />
      </Head>

      <div className={styles.container}>
        <div className={styles.top_image}>
          <Image src={`/${frontMatter.image}`} layout="fill" objectFit="contain" alt={frontMatter.title} />
        </div>
        <h1 className={styles.post_title}>{frontMatter.title}</h1>
        <div className={styles.flex}>
          <span className={styles.post_date}>{frontMatter.date}</span>
          <span className={styles.tags_wrapper}>{tags}</span>
        </div>
        <ReactMarkdown
          components={{
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            code: CodeBlock,
          }}
          remarkPlugins={[remarkGfm]}
          className={stylesMarkdown.content}
        >
          {content}
        </ReactMarkdown>
      </div>
    </>
  );
};

export default Article;
