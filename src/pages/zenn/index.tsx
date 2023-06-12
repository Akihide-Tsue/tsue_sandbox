import type { NextPage } from 'next';

import { useRecoilState } from 'recoil';

import ArticleLayoutSelect from '@components/article_layout_select/ArticleLayoutSelect';
import { ZennPostItem } from '@components/features/zennRss/types';
import { ZennPostList } from '@components/zenn_posts/ZennPostList';
import posts from '@rss/zenn-posts.json';
import styles from '@styles/pages/index.module.scss';
import { articleLayout } from 'src/recoil/atoms/articleLayout';

const Zenn: NextPage = () => {
  const [layout, setLayout] = useRecoilState(articleLayout);
  // console.log('posts', posts);
  return (
    <>
      <ArticleLayoutSelect layout={layout} setLayout={setLayout} displayLayoutSelector />
      <div className={styles.list_container}>
        <ZennPostList items={posts as ZennPostItem[]} />
      </div>
    </>
  );
};

export default Zenn;
