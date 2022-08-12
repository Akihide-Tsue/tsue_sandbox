import { FC } from 'react';

import Link from 'next/link';

import styles from './PageHeader.module.scss';

const PageContainer: FC = ({}) => {
  return (
    <div className={styles.header}>
      <Link href={`/`} passHref>
        <a>
          <h1 className={styles.logo}>津江のブログ（仮）</h1>
        </a>
      </Link>
    </div>
  );
};

export default PageContainer;
