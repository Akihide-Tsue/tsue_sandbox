---
title: 'このブログの採用技術一覧とTODO'
date: '2022-08-12'
description: 'このmarkdownブログでの採用技術と実装予定を書いています。'
image: images/articles/nextjs_logo.webp
categories: Tech
draft: false
tag: [Next.js, FrontEnd]
---

## DONE

- Next.js(SSG)
- TypeScript
- Google Analytics
- Hotjar
- Sentry
- マークダウン、コードブロック表示
- husky・ESLint・stylelint・prettier
- 動的OGP自動生成
- ブログカード生成(Recoil)
- RSSリーダー対応


```json:package.json（一部抜粋）
    "dependencies": {
    "@sentry/nextjs": "^7.10.0",
    "@types/gtag.js": "^0.0.10",
    "@types/react-syntax-highlighter": "^15.5.4",
    "autoprefixer": "^10.4.7",
    "babel-plugin-inline-react-svg": "^2.0.1",
    "canvas": "^2.9.3",
    "case-sensitive-paths-webpack-plugin": "^2.4.0",
    "eslint-plugin-unused-imports": "^2.0.0",
    "gray-matter": "^4.0.3",
    "husky": "^8.0.1",
    "lint-staged": "^13.0.3",
    "next": "12.2.2",
    "react": "18.2.0",
    "react-hotjar": "^5.0.0",
    "react-markdown": "^8.0.3",
    "react-syntax-highlighter": "^15.5.0",
    "sass": "^1.53.0",
    "sass-loader": "^13.0.2",
    "recoil": "^0.7.5",
    "terser-webpack-plugin": "^5.3.3"
  },
  "devDependencies": {
    "@types/node": "18.0.5",
    "@types/react": "18.0.15",
    "eslint": "8.20.0",
    "stylelint": "^14.9.1",
    "typescript": "4.7.4",
  }
```

コードは全てGitHubに公開しています。
https://github.com/Akihide-Tsue/tsue_sandbox#readme

## TODO

- markdownをMDXに変更
- ダークモード(recoil-persist)
- いいね・コメント機能（NestJs & MongoDB）
- 記事のタグ付け・分類・個数表示・絞り込み（フロント → バックエンドに管理移行）
- AMP 対応
- PWA 対応
- テスト
- storybook
- デザイン改善（記事のカードとリスト切り替えをrecoil-persist化）
- ヘッダーをスクロールで非表示
- twitter 共有アイコン
- コードの copy ボタン
- zenn-markdown-htmlで目次生成
- ページネーション
