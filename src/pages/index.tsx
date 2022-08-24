import fs from 'fs';

import type { NextPage } from 'next';

import matter from 'gray-matter';
import { useRecoilState } from 'recoil';

import ArticleLayoutSelect from '@components/article_layout_select/ArticleLayoutSelect';
import ArticleLink from '@components/article_link/ArticleLink';
import generatedRssFeed from 'src/lib/feed';
import { articleLayout } from 'src/recoil/atoms/articleLayout';
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
  console.log('posts', posts);
  const [layout, setLayout] = useRecoilState(articleLayout);

  return (
    <>
      <ArticleLayoutSelect layout={layout} setLayout={setLayout} />
      <div className={`${layout === 'card' && styles.grid_container}`}>
        {posts.map((post: PostType) => {
          return !post.frontMatter.draft && <ArticleLink key={post.slug} post={post} layout={layout} />;
        })}
      </div>
    </>
  );
};

export default Home;
