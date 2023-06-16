# Project Structure (/components)

## `common/`

プロダクトを跨いで使用できる粒度の小さなコンポーネントの置き場。

## `features/`

特定のプロダクト固有のコンポーネントの置き場。
グローバルストアや API 呼び出しで特定の知識を引っ張ってきて注入する。

## `layouts/`

特定のプロダクト内で繰り返し使用するレイアウトパターンの置き場。
ユーザーのログイン状態に応じて UI を出し分ける場合は外部との通信が発生する。

### References

bulletproof-react [Project Structure](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md)
