import Link from 'next/link';

import type { NextPage } from 'next';

import ArticleLayoutSelect from '@components/article_layout_select/ArticleLayoutSelect';

import styles from '@styles/sandbox.module.scss';

export const getStaticProps = () => {
  return {
    props: {},
  };
};

type Props = {
  any: any;
};

const Sandbox: NextPage<Props> = ({}) => {
  return (
    <>
      <ArticleLayoutSelect displayLayoutSelector={false} />
      <div className={styles.sandbox_container}>
        <Link href={`/sandbox/compound_interest`} passHref>
          <a className={styles.menu_item}>福利計算チャート</a>
        </Link>
        <Link href={`/sandbox/chat_bot`} passHref>
          <a className={styles.menu_item}>AIチャットBotと会話する</a>
        </Link>
      </div>
    </>
  );
};

export default Sandbox;
