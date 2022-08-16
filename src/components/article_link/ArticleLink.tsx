import { FC } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { PostType } from 'src/type-def/postsType';

import styles from './ArticleLink.module.scss';

type Props = { post: PostType; layout: 'card' | 'list' };

const ArticleLink: FC<Props> = ({ post, layout }) => {
  const tags = post.frontMatter.tag.map((tag, i) => {
    return (
      <span key={i} className={styles.tag}>
        #{tag}
      </span>
    );
  });

  return (
    <>
      {layout === 'card' ? (
        <Link href={`/posts/${post.slug}`}>
          <a className={styles.cards}>
            <div className={styles.image_container}>
              <Image
                src={`/${post.frontMatter.image}`}
                className={styles.image}
                priority={true}
                layout="fill"
                objectFit="contain"
                alt={post.frontMatter.title}
              />
            </div>

            <div className={styles.text_wrapper}>
              <h2 className={styles.title}>{post.frontMatter.title}</h2>
              <div>
                <span className={styles.date}>{post.frontMatter.date}</span>
                <span className={styles.tags_wrapper}>{tags}</span>
              </div>
            </div>
          </a>
        </Link>
      ) : (
        <Link href={`/posts/${post.slug}`}>
          <a className={styles.lists}>
            <div className={styles.text_wrapper}>
              <h2 className={styles.lists_title}>{post.frontMatter.title}</h2>
              <div className={styles.lists_flex}>
                <span className={styles.date}>{post.frontMatter.date}</span>
                <span className={styles.tags_wrapper}>{tags}</span>
              </div>
            </div>
          </a>
        </Link>
      )}
    </>
  );
};

export default ArticleLink;
