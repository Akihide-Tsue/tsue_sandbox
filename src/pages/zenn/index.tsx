import ArticleLayoutSelect from '@components/features/article_layout_select/ArticleLayoutSelect';
import { ZennPostList } from '@components/features/zennRss/components/ZennPostList';
import type { ZennPostItem } from '@components/features/zennRss/types';
import posts from '@rss/zenn-posts.json';
import styles from '@styles/pages/index.module.scss';
import type { NextPage } from 'next';
import { useRecoilState } from 'recoil';
import { articleLayout } from 'src/recoil/atoms/articleLayout';

const Zenn: NextPage = () => {
  const [layout, setLayout] = useRecoilState(articleLayout);

  return (
    <>
      <ArticleLayoutSelect layout={layout} setLayout={setLayout} />
      <div className={styles.list_container}>
        <ZennPostList items={posts as ZennPostItem[]} />
      </div>
    </>
  );
};

export default Zenn;
