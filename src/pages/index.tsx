import { useState } from 'react';

import fs from 'fs';

import type { NextPage } from 'next';

import matter from 'gray-matter';

import ArticleLayoutSelect from '@components/article_layout_select/ArticleLayoutSelect';
import ArticleLink from '@components/article_link/ArticleLink';
import { PostType } from 'src/type-def/postsType';

import styles from '@styles/index.module.scss';

export const getStaticProps = () => {
  const files = fs.readdirSync('src/posts');
  const posts = files.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fileContent = fs.readFileSync(`src/posts/${fileName}`, 'utf-8');
    const { data } = matter(fileContent);
    return {
      frontMatter: data,
      slug,
    };
  });

  const sortedPosts = posts.sort((postA, postB) => (new Date(postA.frontMatter.date as Date) > new Date(postB.frontMatter.date as Date) ? -1 : 1));

  return {
    props: {
      posts: sortedPosts,
    },
  };
};

type Props = {
  posts: PostType[];
};

const Home: NextPage<Props> = ({ posts }) => {
  const [layout, setLayout] = useState<'card' | 'list'>('card');

  return (
    <>
      <ArticleLayoutSelect layout={layout} setLayout={setLayout} />
      <div className={`${layout === 'card' && styles.grid_container}`}>
        {posts.map((post: PostType) => (
          <ArticleLink key={post.slug} post={post} layout={layout} />
        ))}
      </div>
    </>
  );
};

export default Home;
