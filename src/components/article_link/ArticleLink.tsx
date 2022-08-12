import { FC } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import styles from './ArticleLink.module.scss';

type Props = { post: { slug: string; frontMatter: { title: string; date: string; image: string } } };

const ArticleLink: FC<Props> = ({ post }) => {
  console.log('post', post);
  return (
    <Link href={`/posts/${post.slug}`}>
      <a>
        <div className={styles.image_container}>
          <Image src={`/${post.frontMatter.image}`} layout="fill" objectFit="contain" alt={post.frontMatter.title} />
        </div>
        <div>
          <h1>{post.frontMatter.title}</h1>
          <span>{post.frontMatter.date}</span>
        </div>
      </a>
    </Link>
  );
};

export default ArticleLink;