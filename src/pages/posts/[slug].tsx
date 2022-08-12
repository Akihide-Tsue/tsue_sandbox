import { FC } from 'react';

import fs from 'fs';

import Image from 'next/image';
import { useRouter } from 'next/router';

import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';

import CodeBlock from '@components/codeblock/CodeBlock';

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
  console.log('paths:', paths);
  return {
    paths,
    fallback: false,
  };
};

type Props = { frontMatter: { title: string; date: string; image: string }; content: string };

const Article: FC<Props> = ({ frontMatter, content }) => {
  const router = useRouter();
  let { article_id } = router.query;
  if (article_id instanceof Array) {
    article_id = article_id.join(',');
  }

  return (
    <div className={styles.container}>
      <div className={styles.top_image}>
        <Image src={`/${frontMatter.image}`} layout="fill" objectFit="contain" alt={frontMatter.title} />
      </div>
      <h1 className={styles.post_title}>{frontMatter.title}</h1>
      <span className={styles.post_date}>{frontMatter.date}</span>
      <ReactMarkdown
        components={{
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          code: CodeBlock,
        }}
        className={stylesMarkdown.content}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default Article;