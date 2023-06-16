import fs from 'fs';

import type { NextPage } from 'next';

import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import { useRecoilState } from 'recoil';
import remarkGfm from 'remark-gfm';

import ArticleLayoutSelect from '@components/features/article_layout_select/ArticleLayoutSelect';
import BlogCard from '@components/features/blog_card/BlogCard';
import CodeBlock from '@components/features/codeblock/CodeBlock';
import stylesMarkdown from '@styles/pages/markdown.module.scss';
import { articleLayout } from 'src/recoil/atoms/articleLayout';
import { FrontMatterType } from 'src/type-def/postsType';

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
      <ArticleLayoutSelect layout={layout} setLayout={setLayout} shouldDisplayLayoutSelector={false} />
      <ReactMarkdown components={{ code: CodeBlock, a: BlogCard }} remarkPlugins={[remarkGfm]} className={stylesMarkdown.content}>
        {content}
      </ReactMarkdown>
    </>
  );
};

export default Home;
