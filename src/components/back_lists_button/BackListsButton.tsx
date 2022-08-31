import { FC } from 'react';

import Link from 'next/link';

import ArrowIcon from 'public/images/icons/right_arrow_circle.svg';

import styles from './BackListsButton.module.scss';

const BackListsButton: FC = ({}) => {
  return (
    <div className={styles.container}>
      <Link href={`/`}>
        <a className={styles.back_button}>
          すべての記事一覧へ <ArrowIcon width={22} height={24} className={styles.icon} />
        </a>
      </Link>
    </div>
  );
};

export default BackListsButton;
