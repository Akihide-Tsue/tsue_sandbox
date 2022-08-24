import { atom } from 'recoil';

export const articleLayout = atom<'card' | 'list'>({
  key: 'articleLayout',
  default: 'card',
});
