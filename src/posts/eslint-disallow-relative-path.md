---
title: 'ESLintとhuskyで相対パスを使用したimportを禁止する'
date: '2023-02-08'
description: 'ESLintの"no-restricted-imports"を設定することで、相対パスのimportを禁止する方法を解説。また、commit時にhuskyがチェックを行います。'
image: images/articles/ESLint.webp
categories: Tech
draft: false
tags: [ESLint]
---

## まずはインストール

`yarn add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier husky lint-staged prettier`
このあたりを参考に：[Next12でESLint,Prettier,husky,lint-stagedの環境構築](https://www.gaji.jp/blog/2021/12/16/8810/)

## ESLintの設定を追加

[公式ドキュメント：no-restricted-imports](https://eslint.org/docs/latest/rules/no-restricted-imports)

```text:.eslintrc
{
  "extends": ["prettier"],
  "rules": {
    "no-restricted-imports": [
      "error",
      {
        "patterns": [
          {
            "group": ["./*", "../*", "!./*.scss"],
            "message": "scssファイル以外の相対パスを使用したimportは禁止です！"
          }
        ]
      }
    ],
    //以下略
  }
}
```

## huskyの設定を追加

```text:.husky/pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

yarn check-types
yarn lint-staged
yarn lint:style
```

## 説明
.eslintrcの今回追記した"no-restricted-imports"のgroupに禁止したいパスの正規表現を書きます。  
scssファイルのみ相対パスでimportを許可しています。  
ドメインが異なるものの同じ名前のコンポーネントがリポジトリ内に存在する場合にimportを制御するのに重宝します。

## 動作確認
![動作確認](/images/posts/disallow-relative-path.webp)
無事、エラーを検出できています。


---
参考記事
- [Next 12 で ESLint, Prettier, husky, lint-staged の環境構築](https://www.gaji.jp/blog/2021/12/16/8810/)