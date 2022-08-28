import { FC, useEffect, useLayoutEffect, useState } from 'react';

import Link from 'next/link';

import { useRecoilState } from 'recoil';

import { config } from '@constants';

import { useShowComponent } from '@hooks/useScrollPosition';
import DarkIcon from 'public/images/icons/dark_icon.svg';
import FeesIcon from 'public/images/icons/feed_icon.svg';
import GithubIcon from 'public/images/icons/github_icon.svg';
import LightIcon from 'public/images/icons/light_icon.svg';
import TwitterIcon from 'public/images/icons/twitter_icon.svg';
import { colorTheme } from 'src/recoil/atoms/colorTheme';

import styles from './PageHeader.module.scss';

const PageHeader: FC = ({}) => {
  const showHeader = useShowComponent(160);

  const [isDarkMode, setIsDarkMode] = useRecoilState(colorTheme);
  const [hasMounted, setHasMounted] = useState(false);

  useLayoutEffect(() => {
    setIsDarkMode('dark');
    //初回起動時に、端末の設定がdarkだった場合に暗くする
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const darkModeOn = darkModeMediaQuery.matches;
    if (typeof window !== 'undefined' && isDarkMode === '' && darkModeOn) {
      setIsDarkMode('dark');
    }
  }, []);

  useLayoutEffect(() => {
    const body = document.body;
    if (isDarkMode === 'dark') {
      body.classList.remove('light-theme');
      body.classList.add('dark-theme');
    } else {
      body.classList.remove('dark-theme');
      body.classList.add('light-theme');
    }
  }, [isDarkMode]);

  useEffect(() => {
    //これがないと初期表示のアイコンがdark固定になる
    setHasMounted(true);
  }, []);

  return (
    <div className={`${styles.header} ${!showHeader && styles.hidden}`}>
      <div className={styles.header_inner}>
        <Link href={`/`} passHref>
          <a>
            <h1 className={styles.logo}>{"津江's sandbox"}</h1>
          </a>
        </Link>

        <div className={styles.icon_wrapper}>
          {hasMounted && (
            <>
              {isDarkMode === 'dark' ? (
                <LightIcon
                  width={26}
                  height={26}
                  className={styles.theme_icon}
                  fill="white"
                  onClick={() => {
                    setIsDarkMode('light');
                  }}
                />
              ) : (
                <DarkIcon
                  width={26}
                  height={25}
                  className={styles.theme_icon}
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

          <Link href={config.github} passHref>
            <a target="_blank">
              <GithubIcon width={22} height={24} className={styles.icon} />
            </a>
          </Link>

          <Link href={`/rss/feed.xml`} passHref>
            <a target="_blank">
              <FeesIcon width={22} height={24} className={styles.icon} />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
