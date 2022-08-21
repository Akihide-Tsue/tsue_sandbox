import { useState } from 'react';

import Link from 'next/link';

// @ts-ignore
import { CodeComponent } from 'react-markdown/src/ast-to-react';
import { useRecoilValue } from 'recoil';

import { currentArticleLinks } from 'src/recoil/atoms/currentArticleLinks';
import { getFaviconUrl } from 'src/utils/getFaviconUrl';

import styles from './BlogCard.module.scss';

interface Props {
  href: string;
  children: any;
}

const BlogCard: CodeComponent = ({ href, children }: Props) => {
  const [disabled, setDisabled] = useState(false);
  const currentArticleLink = useRecoilValue(currentArticleLinks);
  const state = currentArticleLink;

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

            <div className={styles.href_flex}>
              <img src={getFaviconUrl(href)} alt="" className={styles.favicon} />
              <div className={styles.href}>{href}</div>
            </div>
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
    <Link href={href}>
      <a target="_brank">{children}</a>
    </Link>
  );
};

export default BlogCard;
