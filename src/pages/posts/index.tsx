import fs from 'fs';

import type { NextPage } from 'next';

import matter from 'gray-matter';

import ArticleLink from '@components/article_link/ArticleLink';

import styles from '@styles/posts.module.scss';

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

  return {
    props: {
      posts,
    },
  };
};

type post = {
  slug: string;
  frontMatter: {
    title: string;
    date: string;
    image: string;
  };
};

type Props = {
  posts: post[];
};

const Posts: NextPage<Props> = ({ posts }) => {
  return (
    <div className={styles.index_container}>
      {posts.map((post: post) => (
        <ArticleLink key={post.slug} post={post} />
      ))}
    </div>
  );
};

export default Posts;
