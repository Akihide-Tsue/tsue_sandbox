import { FC } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { PostType } from 'src/type-def/postsType';

import styles from './ArticleLink.module.scss';

type Props = { post: PostType };

const ArticleLink: FC<Props> = ({ post }) => {
  const tags = post.frontMatter.tag.map((tag, i) => {
    return (
      <span key={i} className={styles.tag}>
        {tag}
      </span>
    );
  });

  return (
    <Link href={`/posts/${post.slug}`}>
      <a className={styles.link_container}>
        <div className={styles.image_container}>
          <Image src={`/${post.frontMatter.image}`} layout="fill" objectFit="contain" alt={post.frontMatter.title} />
        </div>

        <div className={styles.text_wrapper}>
          <h2 className={styles.title}>{post.frontMatter.title}</h2>
          <div className={styles.flex}>
            <span className={styles.date}>{post.frontMatter.date}</span>
            <span className={styles.tags_wrapper}>{tags}</span>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default ArticleLink;
