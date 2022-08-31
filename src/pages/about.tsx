import fs from 'fs';

import type { NextPage } from 'next';

import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import { useRecoilState } from 'recoil';
import remarkGfm from 'remark-gfm';

import ArticleLayoutSelect from '@components/article_layout_select/ArticleLayoutSelect';
import BlogCard from '@components/blog_card/BlogCard';
import CodeBlock from '@components/codeblock/CodeBlock';
import { articleLayout } from 'src/recoil/atoms/articleLayout';
import { FrontMatterType } from 'src/type-def/postsType';

import stylesMarkdown from '@styles/markdown.module.scss';

export const getStaticProps = () => {
  const fileContent = fs.readFileSync(`src/posts/about.md`, 'utf-8');
  const { data, content } = matter(fileContent);

  return {
    props: {
      content,
      frontMatter: data,
    },
  };
};

type Props = {
  content: string;
  frontMatter: FrontMatterType;
};

const Home: NextPage<Props> = ({ content, frontMatter }) => {
  const [layout, setLayout] = useRecoilState(articleLayout);
  console.log('frontMatter', content, frontMatter);

  return (
    <>
      <ArticleLayoutSelect layout={layout} setLayout={setLayout} />
      <ReactMarkdown components={{ code: CodeBlock, a: BlogCard }} remarkPlugins={[remarkGfm]} className={stylesMarkdown.content}>
        {content}
      </ReactMarkdown>
    </>
  );
};

export default Home;