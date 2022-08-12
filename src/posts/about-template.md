---
title: '採用技術一覧とTODO'
date: '2022-08-12'
description: 'このmarkdownブログでの採用技術と実装予定を書いています。'
image: images/nextjs_logo.webp
genre: Tech
---

## DONE

- Next.js(SSG)
- TypeScript
- husky
- google analytics
- Hotjar
- Sentry
- マークダウン、コードブロック表示 → MDX に変更予定
- Prettier
- ESLint
- 動的 OGP 生成
-

## Package.json

```json:package.json
  "dependencies": {
    "@babel/core": "^7.18.6",
    "@sentry/nextjs": "^7.10.0",
    "@types/gtag.js": "^0.0.10",
    "@types/react-syntax-highlighter": "^15.5.4",
    "autoprefixer": "^10.4.7",
    "babel-plugin-inline-react-svg": "^2.0.1",
    "babel-plugin-module-resolver": "^4.1.0",
    "case-sensitive-paths-webpack-plugin": "^2.4.0",
    "eslint-plugin-unused-imports": "^2.0.0",
    "gray-matter": "^4.0.3",
    "husky": "^8.0.1",
    "lint-staged": "^13.0.3",
    "next": "12.2.2",
    "postcss-loader": "^7.0.1",
    "postcss-scss": "^4.0.4",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "react-hotjar": "^5.0.0",
    "react-markdown": "^8.0.3",
    "react-syntax-highlighter": "^15.5.0",
    "remark-gfm": "^3.0.1",
    "sass": "^1.53.0",
    "sass-loader": "^13.0.2",
    "terser-webpack-plugin": "^5.3.3"
  },
  "devDependencies": {
    "@types/node": "18.0.5",
    "@types/react": "18.0.15",
    "@types/react-dom": "18.0.6",
    "@typescript-eslint/eslint-plugin": "^5.30.6",
    "eslint": "8.20.0",
    "eslint-config-next": "12.2.2",
    "eslint-config-prettier": "8.5.0",
    "postcss": "8",
    "prettier": "2.7.1",
    "stylelint": "^14.9.1",
    "stylelint-config-recess-order": "^3.0.0",
    "stylelint-config-standard-scss": "^5.0.0",
    "typescript": "4.7.4",
    "yarn-run-all": "^3.1.1"
  }
```

## TODO

- ダークモード
- 記事にタグ付け・分類
- いいね・コメント機能
- UI コンポーネントは使わない方針
- AMP 対応
- PWA 対応
- ブログカード
- テスト
- storybook
- デザイン改善
-