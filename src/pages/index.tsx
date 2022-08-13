import fs from 'fs';

import type { NextPage } from 'next';

import matter from 'gray-matter';

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
  return (
    <div>
      <div className={styles.grid_container}>
        {posts.map((post: PostType) => (
          <ArticleLink key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
