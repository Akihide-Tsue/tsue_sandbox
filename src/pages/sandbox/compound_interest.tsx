import { useEffect } from 'react';

import type { NextPage } from 'next';

import { useRecoilState } from 'recoil';

import { colorTheme } from 'src/recoil/atoms/colorTheme';

const CompaundInterest: NextPage = ({}) => {
  const [isDarkMode, setIsDarkMode] = useRecoilState(colorTheme);
  const originalDarkMode = isDarkMode;

  useEffect(() => {
    //TODO:ダークモードのCSS
    setIsDarkMode('light');
    return () => {
      setIsDarkMode(originalDarkMode);
    };
  }, []);

  return <>a</>;
};

export default CompaundInterest;
