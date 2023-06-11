import type { NextPage } from 'next';

import { useRecoilState } from 'recoil';

import ArticleLayoutSelect from '@components/article_layout_select/ArticleLayoutSelect';
import { PostList } from '@components/zenn_posts/ZennPostList';
import { articleLayout } from 'src/recoil/atoms/articleLayout';
import { PostItem } from 'src/type-def/members';

import posts from '.contents/posts.json';

const Zenn: NextPage = () => {
  const [layout, setLayout] = useRecoilState(articleLayout);
  console.log('posts', posts);
  return (
    <>
      <ArticleLayoutSelect layout={layout} setLayout={setLayout} displayLayoutSelector />
      Zenn
      <div className="home-section-title-container">
        <h2 className="home-section-title">Articles</h2>
      </div>
      <div className="home-posts-container">
        <PostList items={posts as PostItem[]} />
      </div>
    </>
  );
};

export default Zenn;
