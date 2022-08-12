import type { NextPage } from 'next';

import ArticleLink from '@components/article_link/ArticleLink';

import styles from '@styles/index.module.scss';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <ArticleLink articleId={1} title="てすと" date="2022-08-12" />
    </div>
  );
};

export default Home;
