import styles from '@styles/pages/error_page.module.scss';
import type { NextPage } from 'next';

const error404page: NextPage = () => {
  return (
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
  );
};

export default error404page;
