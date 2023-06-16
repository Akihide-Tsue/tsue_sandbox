---
title: 'ダークモードを導入しました'
date: '2022-08-31'
description: 'Next.jsでrecoilを使用し、ダークモードを実装しました。端末のダークモード設定の対応。recoil-persistでの永続化も行いました。'
image: images/articles/dark_mode.webp
categories: Tech
isDraft: false
tags: [Design,Recoil]
---

## ダークモードを導入しよう
人は何故ダークモードを搭載したくなるのか...  
そこにブログがあるからだ。  

　

ということで、ダークモードを導入しました。  
recoil-persistを使用しテーマの状態管理と、
初回表示時に端末で標準で搭載されている設定を取得し、ダークモードで設定されていればdarkテーマで表示する実装を行いました。  

## 実装
まずは、atomを下記の通り作成。  
`effects_UNSTABLE: [persistAtom],`  
この1行でlocalStorageに保存できます。便利すぎる。


```js:colorTheme.ts
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

export const colorTheme = atom<'' | 'light' | 'dark'>({
  key: 'colorTheme',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

```

　

そして、ヘッダーでトグルするので下記を記載。  
```js:Header.tsx
  const [isDarkMode, setIsDarkMode] = useRecoilState(colorTheme);

  useLayoutEffect(() => {
    //初回起動時に、端末の設定がdarkだった場合に暗くする
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const darkModeOn = darkModeMediaQuery.matches;
    if (typeof window !== 'undefined' && isDarkMode === '' && darkModeOn) {
      setIsDarkMode('dark');
    }
  }, []);

  useLayoutEffect(() => {
    const body = document.body;
    if (isDarkMode === 'dark') {
      body.classList.remove('light_theme');
      body.classList.add('dark_theme');
    } else {
      body.classList.remove('dark_theme');
      body.classList.add('light_theme');
    }
  }, [isDarkMode]);
```

　

body.classListを変更することで全体的なbodyのcssを切り替えることが出来ます。
```css:global.scss
//通常時
body {
  color: $black;
}

//ダークテーマ時
body.dark_theme {
  color: $white;
  background: $black;
}
```

　

細かい調整は各コンポーネントを上書きしなくてはいけませんが、仕方ないので下記を使っています。
```css:variables.scss
@mixin dark_mode {
  :global(.dark_theme) & {
    @content;
  }
}

//使用方法は下記のように
@include dark_mode {
  color: #fff;
}
```



### svgの表示バグ解決
renderされた後にダークモードの場合の条件分岐が行われており、
表示されるアイコンが毎回固定されていました。  
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

　
　

目に優しい配色が難しいので徐々に改善していきたい。