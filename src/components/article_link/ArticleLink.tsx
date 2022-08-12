import { FC } from 'react';

import Link from 'next/link';

import styles from './ArticleLink.module.scss';

type Props = { title: string; articleId: number; date: string };

const ArticleLink: FC<Props> = ({ title, articleId, date }) => {
  return (
    <Link href={`/article/${articleId}`} passHref>
      <a>
        <div className={styles.container}>
          <div className={styles.title}>{title}</div>
          <div className={styles.date}>{date}</div>
        </div>
      </a>
    </Link>
  );
};

export default ArticleLink;
