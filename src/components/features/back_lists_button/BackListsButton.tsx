import Link from 'next/link';
import ArrowIcon from 'public/images/icons/right_arrow_circle.svg';
import type { FC } from 'react';

import styles from './BackListsButton.module.scss';

const BackListsButton: FC = () => {
  return (
    <div className={styles.container}>
      <Link href={`/`}>
        <a className={styles.back_button}>
          すべての記事一覧へ
          <ArrowIcon className={styles.icon} />
        </a>
      </Link>
    </div>
  );
};

export default BackListsButton;
