import { useLayoutEffect } from 'react';

import fs from 'fs';

import type { NextPage } from 'next';

import matter from 'gray-matter';
import { useRecoilState, useRecoilValue } from 'recoil';

import ArticleLayoutSelect from '@components/article_layout_select/ArticleLayoutSelect';
import ArticleLink from '@components/article_link/ArticleLink';
import generatedRssFeed from 'src/lib/feed';
import { articleLayout } from 'src/recoil/atoms/articleLayout';
import { colorTheme } from 'src/recoil/atoms/colorTheme';
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

  const filteredPosts = posts.filter((post) => {
    return post.frontMatter.categories === 'Tech';
  });

  const sortedPosts = filteredPosts.sort((postA, postB) => (new Date(postA.frontMatter.date as Date) > new Date(postB.frontMatter.date as Date) ? -1 : 1));

  generatedRssFeed();

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
  const isDarkMode = useRecoilValue(colorTheme);
  const [layout, setLayout] = useRecoilState(articleLayout);

  useLayoutEffect(() => {
    //dark_mode時の初期設定はリスト表示
    if (isDarkMode === 'dark') setLayout('list');
  }, []);

  return (
    <>
      <ArticleLayoutSelect layout={layout} setLayout={setLayout} displayLayoutSelector />
      <div className={`${layout === 'card' ? styles.grid_container : styles.list_container}`}>
        {posts.map((post: PostType) => {
          return !post.frontMatter.draft && <ArticleLink key={post.slug} post={post} layout={layout} />;
        })}
      </div>
    </>
  );
};

export default Home;
