import type { NextPage } from 'next';

import PageContainer from '@components/page_container/PageConatainer';

import styles from '@styles/index.module.scss';

const Home: NextPage = () => {
  return (
    <PageContainer>
      <div className={styles.container}>a</div>
    </PageContainer>
  );
};

export default Home;
