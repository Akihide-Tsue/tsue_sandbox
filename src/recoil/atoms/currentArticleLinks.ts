import { atom } from 'recoil';

type Props = {
  url: string;
  title: string;
  description: string;
  image: string;
}[];

//ブログカード用
export const currentArticleLinks = atom<Props>({
  key: 'currentArticleLinks',
  default: [],
});
