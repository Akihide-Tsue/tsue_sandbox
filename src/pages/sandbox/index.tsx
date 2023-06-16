import Link from 'next/link';

import type { NextPage } from 'next';

import ArticleLayoutSelect from '@components/features/article_layout_select/ArticleLayoutSelect';
import styles from '@styles/pages/sandbox.module.scss';

export const getStaticProps = () => {
  return {
    props: {},
  };
};

type Props = {
  any: any;
};

const Sandbox: NextPage<Props> = () => {
  return (
    <>
      <ArticleLayoutSelect />
      <div className={styles.sandbox_container}>
        <Link href={`/sandbox/compound_interest`} passHref>
          <a className={styles.menu_item}>福利計算チャート</a>
        </Link>
      </div>
    </>
  );
};

export default Sandbox;
