import { FC } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import styles from './ArticleLink.module.scss';

type Props = { post: { slug: string; frontMatter: { title: string; date: string; image: string } } };

const ArticleLink: FC<Props> = ({ post }) => {
  return (
    <Link href={`/posts/${post.slug}`}>
      <a className={styles.link_container}>
        <div className={styles.image_container}>
          <Image src={`/${post.frontMatter.image}`} layout="fill" objectFit="contain" alt={post.frontMatter.title} />
        </div>

        <div className={styles.text_wrapper}>
          <h2 className={styles.title}>{post.frontMatter.title}</h2>
          <span className={styles.date}>{post.frontMatter.date}</span>
        </div>
      </a>
    </Link>
  );
};

export default ArticleLink;
