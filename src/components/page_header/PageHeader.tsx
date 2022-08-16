import { FC } from 'react';

import Link from 'next/link';

import { useShowHeader } from '@hooks/useScrollPosition';
import FeesIcon from 'public/images/icons/feed_icon.svg';
import GithubIcon from 'public/images/icons/github_icon.svg';
import TwitterIcon from 'public/images/icons/twitter_icon.svg';

import styles from './PageHeader.module.scss';

const PageHeader: FC = ({}) => {
  const showHeader = useShowHeader();

  return (
    <div className={`${styles.header} ${!showHeader && styles.hide}`}>
      <div className={styles.header_inner}>
        <Link href={`/`} passHref>
          <a>
            <h1 className={styles.logo}>{"津江's sandbox"}</h1>
          </a>
        </Link>

        <div className={styles.icon_wrapper}>
          <Link href={`https://twitter.com/tsue_dev`} passHref>
            <a target="_blank">
              <TwitterIcon width={22} height={24} className={styles.icon} />
            </a>
          </Link>

          <Link href={`https://github.com/Akihide-Tsue`} passHref>
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
