import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

export const colorTheme = atom<'' | 'light' | 'dark'>({
  key: 'colorTheme',
  default: '',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  effects_UNSTABLE: [persistAtom],
});
