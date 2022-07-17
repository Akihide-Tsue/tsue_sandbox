import '../styles/destyle.scss';
import '../styles/globals.scss';
import type { AppProps } from 'next/app';

import NextNprogress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNprogress color="#29D" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
