import type { FC } from 'react';

import Link from 'next/link';

import styles from './SandboxBreadCrumb.module.scss';

type Props = {
  currentTitle: string;
};

const SandboxBreadCrumb: FC<Props> = ({ currentTitle }) => {
  return (
    <h1 className={styles.bread_crumb}>
      <Link href={`/`} passHref>
        <a className={styles.bread_link}>top</a>
      </Link>
      <Link href={`/sandbox`} passHref>
        <a className={styles.bread_link}>sandbox</a>
      </Link>
      <span className={`${styles.bread_link} ${styles.is_active}`}>{currentTitle}</span>
    </h1>
  );
};

export default SandboxBreadCrumb;
