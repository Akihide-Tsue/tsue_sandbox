import '../styles/destyle.scss';
import '../styles/globals.scss';
import type { AppProps } from 'next/app';

import { RecoilRoot } from 'recoil';

import CommonHead from '@components/common_head/CommonHead';
import { usePageView, GoogleAnalytics } from '@components/gtag/gtag';
import Layout from '@components/layout/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  usePageView();
  return (
    <>
      <CommonHead />
      <GoogleAnalytics />
      <RecoilRoot>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RecoilRoot>
    </>
  );
}

export default MyApp;
