import type { NextPage } from 'next';

import PageContainer from 'src/components/page_container/PageConatainer';

import styles from '@styles/error_page.module.scss';

const error404page: NextPage = () => {
  return (
    <PageContainer>
      <div className={styles.container}>
        <p className={styles.title}>404</p>
        <p className={styles.title_sub}>Not Found</p>
        <div className={styles.text_wrapper}>
          <p className={styles.error_text}>
            お探しのページが見つかりません。
            <br />
            一時的にアクセスできない状況にあるか、
            <br />
            移動もしくは削除された可能性があります。
          </p>
        </div>
      </div>
    </PageContainer>
  );
};

export default error404page;
