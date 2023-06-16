import type { FC } from 'react';
import { useLayoutEffect } from 'react';

import Link from 'next/link';

import { useRecoilState } from 'recoil';

import { config, productTitle } from '@constants';

import useHasMounted from '@hooks/useHasMounted';
import { useShowComponent } from '@hooks/useScrollPosition';
import DarkIcon from 'public/images/icons/dark_icon.svg';
import FeedIcon from 'public/images/icons/feed_icon.svg';
import GithubIcon from 'public/images/icons/github_icon.svg';
import LightIcon from 'public/images/icons/light_icon.svg';
import TwitterIcon from 'public/images/icons/twitter_icon.svg';
import { colorTheme } from 'src/recoil/atoms/colorTheme';

import styles from './PageHeader.module.scss';

const PageHeader: FC = () => {
  const shouldShowHeader = useShowComponent(160);
  const hasMounted = useHasMounted();
  const [isDarkMode, setIsDarkMode] = useRecoilState(colorTheme);

  useLayoutEffect(() => {
    //初回起動時に、端末の設定がdarkだった場合に暗くする
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const shouldDarkModeOn = darkModeMediaQuery.matches;

    if (typeof window !== 'undefined' && isDarkMode === '' && shouldDarkModeOn) {
      setIsDarkMode('dark');
    }
  }, []);

  useLayoutEffect(() => {
    const body = document.body;

    if (isDarkMode === 'dark') {
      body.classList.remove('light_theme');
      body.classList.add('dark_theme');
    } else {
      body.classList.remove('dark_theme');
      body.classList.add('light_theme');
    }
  }, [isDarkMode]);

  return (
    <div className={`${styles.header} ${!shouldShowHeader && styles.hidden}`}>
      <div className={styles.header_inner}>
        <Link href={`/`} passHref>
          <a>
            <h1 className={styles.logo}>{productTitle}</h1>
          </a>
        </Link>

        {/* TODO tooltip追加 */}
        <div className={styles.icon_wrapper}>
          {hasMounted && (
            <>
              {isDarkMode === 'dark' ? (
                <LightIcon
                  width={26}
                  height={25}
                  className={styles.light_icon}
                  fill="white"
                  onClick={() => {
                    setIsDarkMode('light');
                  }}
                />
              ) : (
                <DarkIcon
                  width={26}
                  height={23}
                  className={styles.dark_icon}
                  onClick={() => {
                    setIsDarkMode('dark');
                  }}
                />
              )}
            </>
          )}

          <Link href={`https://twitter.com/${config.twitter}`} passHref>
            <a target="_blank">
              <TwitterIcon width={22} height={24} className={styles.icon} />
            </a>
          </Link>

          <Link href={config.repository} passHref>
            <a target="_blank">
              <GithubIcon width={22} height={24} className={styles.icon} />
            </a>
          </Link>

          <Link href={`/rss/feed.xml`} passHref>
            <a target="_blank">
              <FeedIcon width={22} height={24} className={styles.icon} />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
