import { Dispatch, FC, SetStateAction } from 'react';

import { useRouter } from 'next/router';

import { useRecoilValue } from 'recoil';

import useHasMounted from '@hooks/useHasMounted';
import CardIcon from 'public/images/icons/card_icon.svg';
import ListIcon from 'public/images/icons/list_icon.svg';
import { colorTheme } from 'src/recoil/atoms/colorTheme';

import styles from './ArticleLayoutSelect.module.scss';

type Props = {
  layout: 'card' | 'list';
  setLayout: Dispatch<SetStateAction<'card' | 'list'>>;
};

const ArticleLayoutSelect: FC<Props> = ({ layout, setLayout }) => {
  const { pathname } = useRouter();
  const isDarkMode = useRecoilValue(colorTheme);
  const hasMounted = useHasMounted();

  const activeColorCode = '#2e282a'; //$black
  const inactiveColorCode = '#ccc'; //$border_color
  const darkModeActiveColorCode = '#ffc914'; //$main_yellow

  const activeColor = () => {
    return isDarkMode === 'dark' ? darkModeActiveColorCode : activeColorCode;
  };

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

      {hasMounted && (
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
