import BackListsButton from '@components/features/back_lists_button/BackListsButton';
import BlogCard from '@components/features/blog_card/BlogCard';
import CodeBlock from '@components/features/codeblock/CodeBlock';
import { TwitterIntentTweet } from '@components/features/share_twitter/ShareTwitter';
import { config, productTitle } from '@constants';
import { usePostData } from '@hooks/usePostData';
import stylesMarkdown from '@styles/pages/markdown.module.scss';
import styles from '@styles/pages/slug.module.scss';
import fs from 'fs';
import matter from 'gray-matter';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import GithubIcon from 'public/images/icons/github_icon.svg';
import TwitterIcon from 'public/images/icons/twitter_icon.svg';
import type { FC } from 'react';
import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useRecoilState } from 'recoil';
import remarkGfm from 'remark-gfm';
import { currentArticleLinks } from 'src/recoil/atoms/currentArticleLinks';
import type { FrontMatterType } from 'src/type-def/postsType';
import createOgp from 'src/utils/server/ogpUtils';

// eslint-disable-next-line @typescript-eslint/no-var-requires
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
  const { getPost } = usePostData();
  const router = useRouter();
  const { slug } = router.query;
  // eslint-disable-next-line unused-imports/no-unused-vars
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

  useEffect(() => {
    // eslint-disable-next-line unused-imports/no-unused-vars
    const getPostAction = (async () => {
      const POST_ID = 1;
      const post = await getPost(POST_ID);

      console.log('post', post);
    })();
  }, []);

  return (
    <>
      <Head>
        <title>
          {frontMatter.title} | {productTitle}
        </title>
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
        <ReactMarkdown components={{ code: CodeBlock, a: BlogCard }} remarkPlugins={[remarkGfm]} className={stylesMarkdown.content}>
          {content}
        </ReactMarkdown>

        <BackListsButton />

        <div className={styles.slug_footer}>
          <TwitterIntentTweet text={frontMatter.title} url={`${process.env.NEXT_PUBLIC_BASE_URL}/posts/${slug}`} hashtags={frontMatter.tags}>
            <TwitterIcon className={styles.slug_footer_icon} />
            記事をシェア
          </TwitterIntentTweet>

          <Link href={`${config.repository}/tree/main/src/posts/${slug}.md`} prefetch={false}>
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
