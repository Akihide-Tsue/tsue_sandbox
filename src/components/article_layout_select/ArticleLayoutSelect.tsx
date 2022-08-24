import { Dispatch, FC, SetStateAction } from 'react';

import { useRouter } from 'next/router';

import CardIcon from 'public/images/icons/card_icon.svg';
import ListIcon from 'public/images/icons/list_icon.svg';

import styles from './ArticleLayoutSelect.module.scss';

type Props = {
  layout: 'card' | 'list';
  setLayout: Dispatch<SetStateAction<'card' | 'list'>>;
};

const ArticleLayoutSelect: FC<Props> = ({ layout, setLayout }) => {
  const { pathname } = useRouter();
  const activeColor = '#2e282a'; //$black
  const inActiveColor = '#ccc'; //$border_color

  return (
    <div className={styles.layout_selector}>
      <div className={styles.index_section}>
        {/* <Link href={`/`} passHref>
          <a className={`${styles.index_label} ${pathname === `/` ? styles.current_page : ''}`}>Blog</a>
        </Link> */}
        {/* <Link href={`/tags`} passHref>
          <a className={styles.index_label}>Tags</a>
        </Link> */}
        {/* <Link href={`/sandbox`} passHref>
          <a className={`${styles.index_label} ${pathname === `/sandbox` ? styles.current_page : ''}`}>Sandbox</a>
        </Link> */}
        {/* <Link href={`/about`} passHref>
          <a className={`${styles.index_label} ${pathname === `/about` ? styles.current_page : ''}`}>About</a>
        </Link> */}
      </div>

      <div className={`${styles.layout_section} ${pathname !== `/` && styles.invisible}`}>
        <span className={styles.layout_selector_text}>表示</span>
        <button className={styles.layout_selector_button} onClick={() => setLayout('card')}>
          <CardIcon width={20} height={20} fill={layout === 'card' ? activeColor : inActiveColor} />
        </button>
        <button className={styles.layout_selector_button} onClick={() => setLayout('list')}>
          <ListIcon width={20} height={20} fill={layout === 'list' ? activeColor : inActiveColor} />
        </button>
      </div>
    </div>
  );
};

export default ArticleLayoutSelect;
