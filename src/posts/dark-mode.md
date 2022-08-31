---
title: 'ダークモードを導入しました'
date: '2022-08-31'
description: 'Next.jsでrecoilを使用し、ダークモードを実装しました。端末のダークモード設定の対応。recoil-persistでの永続化も行いました。'
image: images/articles/dark_mode.webp
categories: Tech
draft: false
tags: [Design,Recoil]
---

## ダークモードを導入しよう
人は何故ダークモードを搭載したくなるのか...  
それはそこにブログがあるからだ。  

　

ということで、ダークモードを導入しました。



## svgの表示バグ解決
renderされた後にダークモードの場合の条件分岐が行われており、
初期表示のアイコンが毎回固定されていました。
解決方法としては、下記のissueの通り**hasMounted**のhooksを適用しました。
https://github.com/facebook/react/issues/17741

```js:useHasMounted.ts
import { useEffect, useState } from 'react';

const useHasMounted = () => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
};

export default useHasMounted;

```
これにより、setMount後に表示できるようになりました。