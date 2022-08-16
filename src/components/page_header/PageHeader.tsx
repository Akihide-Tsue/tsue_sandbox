import { FC } from 'react';

import Link from 'next/link';

import FeesIcon from 'public/images/icons/feed_icon.svg';

import styles from './PageHeader.module.scss';

const PageHeader: FC = ({}) => {
  return (
    <div className={styles.header}>
      <div className={styles.header_inner}>
        <Link href={`/`} passHref>
          <a>
            <h1 className={styles.logo}>{"津江's sandbox"}</h1>
          </a>
        </Link>

        <div className={styles.icon_wrapper}>
          <Link href={`/rss/feed.xml`} passHref>
            <a target="_blank">
              <FeesIcon width={24} height={24} className={styles.icon} />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
