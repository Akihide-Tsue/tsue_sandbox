import { FC } from 'react';

import Link from 'next/link';

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
      </div>
    </div>
  );
};

export default PageHeader;
