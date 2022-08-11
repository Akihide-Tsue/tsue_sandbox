import '../styles/destyle.scss';
import '../styles/globals.scss';
import type { AppProps } from 'next/app';

import NextNprogress from 'nextjs-progressbar';

import CommonHead from '@components/common_head/CommonHead';
import { usePageView, GoogleAnalytics } from '@components/gtag/gtag';

function MyApp({ Component, pageProps }: AppProps) {
  usePageView();
  return (
    <>
      <CommonHead />
      <GoogleAnalytics />
      <NextNprogress color="#29D" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
