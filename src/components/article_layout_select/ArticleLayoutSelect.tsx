import { Dispatch, FC, SetStateAction } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { useRecoilValue } from 'recoil';

import useHasMounted from '@hooks/useHasMounted';
import CardIcon from 'public/images/icons/card_icon.svg';
import ListIcon from 'public/images/icons/list_icon.svg';
import { colorTheme } from 'src/recoil/atoms/colorTheme';

import styles from './ArticleLayoutSelect.module.scss';

type Props = {
  layout?: 'card' | 'list';
  setLayout?: Dispatch<SetStateAction<'card' | 'list'>>;
  displayLayoutSelector: boolean;
};

const ArticleLayoutSelect: FC<Props> = ({ layout, setLayout, displayLayoutSelector = false }) => {
  const { pathname } = useRouter();
  const isDarkMode = useRecoilValue(colorTheme);
  const hasMounted = useHasMounted();

  const activeColorCode = '#2e282a'; //$black
  const inactiveColorCode = '#ccc'; //$border_color
  const darkModeActiveColorCode = '#7fefed'; //$main_blue系

  const activeColor = () => {
    return isDarkMode === 'dark' ? darkModeActiveColorCode : activeColorCode;
  };

  return (
    <div className={styles.layout_selector}>
      <div className={styles.index_section}>
        <li className={styles.item}>
          <Link href={`/`} passHref>
            <a className={`${styles.index_label} ${pathname === `/` ? styles.current_page : ''}`}>Blog</a>
          </Link>
        </li>
        {/* <li className={styles.item}>
          <Link href={`/tags`} passHref>
            <a className={styles.index_label}>Tags</a>
          </Link>
        </li> */}
        <li className={styles.item}>
          <Link href={`/sandbox`} passHref>
            <a className={`${styles.index_label} ${pathname === `/sandbox` ? styles.current_page : ''}`}>Sandbox</a>
          </Link>
        </li>
        {/* <li className={styles.item}>
          <Link href={`/about`} passHref>
            <a className={`${styles.index_label} ${pathname === `/about` ? styles.current_page : ''}`}>About</a>
          </Link>
        </li> */}
      </div>

      {hasMounted && displayLayoutSelector && setLayout && (
        <div className={`${styles.layout_section} ${pathname !== `/` && styles.invisible}`}>
          <span className={styles.layout_selector_text}>表示</span>
          <button className={`${styles.layout_selector_button} ${layout === 'card' && styles.disabled}`} onClick={() => setLayout('card')}>
            <CardIcon width={20} height={20} fill={layout === 'card' ? activeColor() : inactiveColorCode} />
          </button>
          <button className={`${styles.layout_selector_button} ${layout === 'list' && styles.disabled}`} onClick={() => setLayout('list')}>
            <ListIcon width={20} height={20} fill={layout === 'list' ? activeColor() : inactiveColorCode} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ArticleLayoutSelect;
