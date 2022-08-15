import Link from 'next/link';
/* eslint-disable */

// @ts-ignore
import { CodeComponent } from 'react-markdown/src/ast-to-react';
import { useRecoilValue } from 'recoil';

import { currentArticleLinks } from 'src/recoil/atoms/currentArticleLinks';

import styles from './BlogCard.module.scss';
import { useState } from 'react';

interface Props {
  href: string;
  children: any;
}

const BlogCard: CodeComponent = ({ href, children }: Props) => {
  const [disabled, setDisabled] = useState(false);
  const currentArticleLink = useRecoilValue(currentArticleLinks);
  const state = currentArticleLink;

  // eslint-disable-next-line
  const target = state.find((meta: any) => meta.url == href);

  const convertNoImage = () => {
    if (href.startsWith('https://github.com')) {
      return '/images/posts/github_link.webp';
    } else {
      return '/images/posts/no_image.webp';
    }
  };

  if (target) {
    return (
      <Link href={href} passHref>
        <a target="_brank" className={styles.container}>
          <div className={styles.text_wrapper}>
            <div className={styles.title}>{target.title}</div>
            <div className={styles.description}>{target.description}</div>
            <div className={styles.href}>{href}</div>
          </div>
          {target.image || disabled ? (
            <img
              src={target.image}
              className={`${styles.image} ${disabled && styles.no_image}`}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                setDisabled(true);
                currentTarget.src = convertNoImage();
              }}
              alt=""
            />
          ) : (
            <img src={'/images/icons/no_image.webp'} className={styles.image} alt="" />
          )}
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
