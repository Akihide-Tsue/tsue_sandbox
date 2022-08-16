---
title: 'スクロールに合わせて表示を切替えるhooks'
date: '2022-08-16'
description: 'スクロールでヘッダーの表示・非表示を切り替えるhooksを実装しました。'
image: images/articles/browser.webp
categories: Tech
draft: false
tag: [FrontEnd]
---

## ヘッダーを隠そう

ヘッダーを隠す方法を探していた所、下記のライブラリを見つけました。
https://github.com/neo/react-use-scroll-position
こちらを参考にヘッダーを隠すhooksを作成しましたので共有します。  
180px（引数で渡す値）以上スクロールすると非表示になり、上にスクロールすると表示されます。

## 実装
```js:hooks/useScrollPosition.ts
import { useState, useEffect } from 'react';

interface ScrollPosition {
  x: number;
  y: number;
}

const isBrowser = typeof window !== `undefined`;

function getScrollPosition(): ScrollPosition {
  return isBrowser ? { x: window.pageXOffset, y: window.pageYOffset } : { x: 0, y: 0 };
}

export function useScrollPosition(): ScrollPosition {
  const [position, setScrollPosition] = useState<ScrollPosition>(getScrollPosition());

  useEffect(() => {
    let requestRunning: number | null = null;
    function handleScroll() {
      if (isBrowser && requestRunning === null) {
        requestRunning = window.requestAnimationFrame(() => {
          setScrollPosition(getScrollPosition());
          requestRunning = null;
        });
      }
    }

    if (isBrowser) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return position;
}

export const useShowHeader = (visibleHeight: number): boolean => {
  const [showHeader, setShowHeader] = useState(true);
  const [position, setPosition] = useState<number | void>(0);
  const current = useScrollPosition();

  useEffect(() => {
    setPosition(() => {
      setShowHeader(current.y < visibleHeight || position > current.y);
    });

    setPosition(current.y);
  }, [current.y]);

  return showHeader;
};

```

このように使えます。  
`const isVisible = useShowHeader(180);`  

　
　

ちなみに、headerのcssはこのようになっています。
```css:Header.module.scss
.header {
  position: fixed;
  top: 0;
  z-index: 2;
  width: 100%;
  background: hsl(0deg 0% 100% / 0.5);
  box-shadow: 0 32px 30px -15px rgb(53 47 47 / 0.25);
  transition: all 0.15s ease-out;
  backdrop-filter: saturate(180%) blur(10px);

  &.hidden {
    top: -40px;
  }
}
```
