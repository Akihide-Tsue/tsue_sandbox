/* eslint-disable */
import { FC, useEffect } from 'react';

import fs from 'fs';

import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import { useRecoilState } from 'recoil';
import remarkGfm from 'remark-gfm';

import BlogCard from '@components/blog_card/BlogCard';
import CodeBlock from '@components/codeblock/CodeBlock';
import { currentArticleLinks } from 'src/recoil/atoms/currentArticleLinks';
import { FrontMatterType } from 'src/type-def/postsType';
import createOgp from 'src/utils/server/ogpUtils';

import stylesMarkdown from '@styles/markdown.module.scss';
import styles from '@styles/posts.module.scss';

const jsdom = require('jsdom');
const { JSDOM } = jsdom;

export const getStaticProps: ({
  params,
}: {
  params: { slug: string };
  // eslint-disable-next-line @typescript-eslint/require-await
}) => Promise<{ props: { frontMatter: { [key: string]: any }; content: string; cardData: any } }> = async ({ params }) => {
  const file = fs.readFileSync(`src/posts/${params.slug}.md`, 'utf-8');
  const { data, content } = matter(file);

  //OGPローカル確認:http://localhost:3000/api/posts/dynamic-ogp
  void createOgp(params.slug);

  //ブログカード生成
  const lines = content.split('\n');
  const links: string[] | never = [];
  // URLの取得
  lines.map((line) => {
    if (line.indexOf('http://') === 0) links.push(line);
    if (line.indexOf('https://') === 0) links.push(line);
  });
  let cardData = [];

  const temps = await Promise.all(
    links.map(async (link) => {
      const metas = await fetch(link)
        .then((res) => res.text())
        .then((text) => {
          const metaData = {
            url: link,
            title: '',
            description: '',
            image: '',
          };
          const doms = new JSDOM(text);
          const metas: any = doms.window.document.getElementsByTagName('meta');

          // title, description, imageにあたる情報を取り出し配列として格納
          for (let i = 0; i < metas.length; i++) {
            let pro = metas[i].getAttribute('property');
            if (typeof pro == 'string') {
              if (pro.match('title')) metaData.title = metas[i].getAttribute('content');
              if (pro.match('description')) metaData.description = metas[i].getAttribute('content');
              if (pro.match('image')) metaData.image = metas[i].getAttribute('content');
            }
            pro = metas[i].getAttribute('name');
            if (typeof pro == 'string') {
              if (pro.match('title')) metaData.title = metas[i].getAttribute('content');
              if (pro.match('description')) metaData.description = metas[i].getAttribute('content');
              if (pro.match('image')) metaData.image = metas[i].getAttribute('content');
            }
          }
          return metaData;
        })
        .catch((e) => {
          console.error('error', e);
        });
      return metas;
    }),
  );
  cardData = temps.filter((temp) => temp !== undefined);

  return { props: { frontMatter: data, content, cardData } };
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

type Props = { frontMatter: FrontMatterType; content: string; cardData: any };

const Article: FC<Props> = ({ frontMatter, content, cardData }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? '';
  const router = useRouter();
  const { slug } = router.query;
  const [links, setLinks] = useRecoilState(currentArticleLinks);

  const tags = frontMatter.tag.map((tag, i) => {
    return (
      <span key={i} className={styles.tag}>
        #{tag}
      </span>
    );
  });

  useEffect(() => {
    // eslint-disable-next-line
    setLinks(cardData);
  }, []);

  return (
    <>
      <Head>
        <title>{frontMatter.title}</title>
        <meta property="og:image" content={`${baseUrl}/ogp/${slug}.png`} />
        <meta property="twitter:image" content={`${baseUrl}/ogp/${slug}.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={frontMatter.title} />
        <meta property="twitter:description" content={frontMatter.description} />
      </Head>

      <div className={styles.container}>
        <div className={styles.top_image}>
          <Image src={`/${frontMatter.image}`} priority={true} layout="fill" objectFit="contain" alt={frontMatter.title} />
        </div>
        <h1 className={styles.post_title}>{frontMatter.title}</h1>
        <div className={styles.flex}>
          <span className={styles.post_date}>{frontMatter.date}</span>
          <span className={styles.tags_wrapper}>{tags}</span>
        </div>
        <ReactMarkdown
          // eslint-disable-next-line
          components={{ code: CodeBlock, a: BlogCard }}
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
