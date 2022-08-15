import { atom } from 'recoil';

type Props = {
  url: string;
  title: string;
  description: string;
  image: string;
}[];

export const currentArticleLinks = atom<Props>({
  key: 'currentArticleLinks',
  default: [],
});
