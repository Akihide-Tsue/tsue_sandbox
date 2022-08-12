import type { NextPage } from 'next';

import ArticleLink from '@components/article_link/ArticleLink';
import PageContainer from '@components/page_container/PageConatainer';

import styles from '@styles/index.module.scss';

const Home: NextPage = () => {
  return (
    <PageContainer>
      <div className={styles.container}>
        <ArticleLink title="てすと" articleId={1} />
      </div>
    </PageContainer>
  );
};

export default Home;
