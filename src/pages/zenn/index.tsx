import type { NextPage } from 'next';

import { useRecoilState } from 'recoil';

import ArticleLayoutSelect from '@components/features/article_layout_select/ArticleLayoutSelect';
import { ZennPostList } from '@components/features/zennRss/components/ZennPostList';
import posts from '@rss/zenn-posts.json';
import styles from '@styles/pages/index.module.scss';
import { articleLayout } from 'src/recoil/atoms/articleLayout';

import type { ZennPostItem } from '@components/features/zennRss/types';

const Zenn: NextPage = () => {
  const [layout, setLayout] = useRecoilState(articleLayout);

  return (
    <>
      <ArticleLayoutSelect layout={layout} setLayout={setLayout} shouldDisplayLayoutSelector />
      <div className={styles.list_container}>
        <ZennPostList items={posts as ZennPostItem[]} />
      </div>
    </>
  );
};

export default Zenn;
