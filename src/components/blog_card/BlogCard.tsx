import Link from 'next/link';
/* eslint-disable */

// @ts-ignore
import { CodeComponent } from 'react-markdown/src/ast-to-react';
import { useRecoilValue } from 'recoil';

import { currentArticleLinks } from 'src/recoil/atoms/currentArticleLinks';

import styles from './BlogCard.module.scss';

interface Props {
  href: string;
  children: any;
}

const BlogCard: CodeComponent = ({ href, children }: Props) => {
  const currentArticleLink = useRecoilValue(currentArticleLinks);
  const state = currentArticleLink;

  // eslint-disable-next-line
  const target = state.find((meta: any) => meta.url == href);

  if (target?.title) {
    return (
      <Link href={href}>
        <a href={href} target="_brank" className={styles.container}>
          <div className={`${target.image ? styles.text_wrapper_small : styles.text_wrapper}`}>
            <div className={styles.title}>{target.title}</div>
            <div className={styles.description}>{target.description}</div>
            <div className={styles.href}>{href}</div>
          </div>
          <div className={styles.image_wrapper}>
            <img src={target.image ? target.image : '/noImage.svg'} className={styles.image} alt="" />
          </div>
        </a>
      </Link>
    );
  }

  return (
    <Link href={`/`}>
      <a href={href} target="_brank">
        {children}
      </a>
    </Link>
  );
};

export default BlogCard;
