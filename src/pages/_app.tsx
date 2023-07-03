import 'src/styles/destyle.scss';
import 'src/styles/globals.scss';

import CommonHead from '@components/common/common_head/CommonHead';
import Layout from '@components/layouts/Layout';
import { GoogleAnalytics, usePageView } from '@libs/gtag';
import { Analytics } from '@vercel/analytics/react';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';

const MyApp = ({ Component, pageProps }: AppProps) => {
  usePageView();

  return (
    <>
      <CommonHead />
      <GoogleAnalytics />
      <RecoilRoot>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Analytics />
      </RecoilRoot>
    </>
  );
};

export default MyApp;
