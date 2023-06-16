# Project Structure (/src)

## `pages/`

Next.js 固有のディレクトリ。`.tsx`拡張子を持つページの置き場
UI を記述できるが見た目部分は分けたいため、大部分は components で定義し、pages 配下では components で定義されたコンポーネントを呼び出して、jsx を組み立てるだけにする

## `components/`

`.tsx`拡張子を持つコンポーネントの置き場。
`common/`(横断的に使い回せるコンポーネントの置き場)と`feature/`(限定的にしか使えないコンポーネントの置き場)をサブディレクトリとして持つ。

## `hooks/`

横断的に使い回せるカスタムフックの置き場

## `type-def/`

横断的に使い回せる型定義の置き場

## `libs/`

npm パッケージをアプリケーション用に再設定(wrap)したライブラリの置き場

## `constants/`

横断的に使い回せる定数を定義したファイルの置き場

## `mocks/`

msw を用いたモックの設定ファイル, モックデータの置き場

## `utils/`

横断的に使い回せる便利関数(ex.文字列の加工, 配列操作)の置き場

### References

bulletproof-react [Project Structure](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md)

end
