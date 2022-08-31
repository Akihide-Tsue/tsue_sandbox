import { FC, useEffect } from 'react';

import fs from 'fs';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import { useRecoilState } from 'recoil';
import remarkGfm from 'remark-gfm';

import { config } from '@constants';

import BackListsButton from '@components/back_lists_button/BackListsButton';
import BlogCard from '@components/blog_card/BlogCard';
import CodeBlock from '@components/codeblock/CodeBlock';
import { TwitterIntentTweet } from '@components/share_twitter/ShareTwitter';
import GithubIcon from 'public/images/icons/github_icon.svg';
import TwitterIcon from 'public/images/icons/twitter_icon.svg';
import { currentArticleLinks } from 'src/recoil/atoms/currentArticleLinks';
import { FrontMatterType } from 'src/type-def/postsType';
import createOgp from 'src/utils/server/ogpUtils';

import stylesMarkdown from '@styles/markdown.module.scss';
import styles from '@styles/slug.module.scss';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

export const getStaticProps: ({
  params,
}: {
  params: { sandbox_id: string };
  // eslint-disable-next-line @typescript-eslint/require-await
}) => Promise<{ props: { frontMatter: { [key: string]: any }; content: string; cardData: any } }> = async ({ params }) => {
  const file = fs.readFileSync(`src/posts/${params.sandbox_id}.md`, 'utf-8');
  const { data, content } = matter(file);

  //OGPローカル確認:http://localhost:3000/api/posts/dynamic-ogp
  void createOgp(params.sandbox_id);

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
      sandbox_id: fileName.replace(/\.md$/, ''),
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
  const { sandbox_id } = router.query;
  const [links, setLinks] = useRecoilState(currentArticleLinks);

  const tags = frontMatter.tags.map((tag, i) => {
    return (
      <span key={i} className={styles.tag}>
        #{tag}
      </span>
    );
  });

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    setLinks(cardData);
  }, []);

  return (
    <>
      <Head>
        <title>{frontMatter.title}</title>
        <meta property="og:image" content={`${baseUrl}/ogp/${sandbox_id}.png`} />
        <meta property="twitter:image" content={`${baseUrl}/ogp/${sandbox_id}.png`} />
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
        <ReactMarkdown components={{ code: CodeBlock, a: BlogCard }} remarkPlugins={[remarkGfm]} className={stylesMarkdown.content}>
          {content}
        </ReactMarkdown>

        <BackListsButton />

        <div className={styles.slug_footer}>
          <TwitterIntentTweet text={frontMatter.title} url={`${process.env.NEXT_PUBLIC_BASE_URL}/posts/${sandbox_id}`} hashtags={frontMatter.tags}>
            <TwitterIcon className={styles.slug_footer_icon} />
            記事をシェア
          </TwitterIntentTweet>

          <Link href={`${config.repository}/tree/main/src/posts/${sandbox_id}.md`} prefetch={false}>
            <a target="_brank" className={styles.github_pr_button}>
              <GithubIcon className={styles.slug_footer_icon} />
              GitHubで修正をリクエストする
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Article;