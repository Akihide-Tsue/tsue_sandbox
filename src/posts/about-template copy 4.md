---
title: 'Next.jsでmarkdownブログを構築'
date: '2022-08-12'
description: 'Next.jsでmarkdownファイルを利用したブログの構築手順を解説しています。'
image: images/nextjs_logo.webp
---

Next.js を使って Markdown のブログサイトの構築を一から行なっていきます。

## Next.js の準備

### プロジェクトの作成

npx create-next-app コマンドを利用して Next.js プロジェクトの作成を行います。

```js:index.js
import { FC } from 'react';

import Link from 'next/link';

import styles from './PageHeader.module.scss';

const PageHeader: FC = ({}) => {
  return (
    <div className={styles.header}>
      <Link href={`/`} passHref>
        <a>
          <h1 className={styles.logo}>津江のブログ（仮）</h1>
        </a>
      </Link>
    </div>
  );
};

export default PageHeader;


```
