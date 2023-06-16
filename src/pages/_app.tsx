import 'src/styles/destyle.scss';
import 'src/styles/globals.scss';
import type { AppProps } from 'next/app';

import { RecoilRoot } from 'recoil';

import CommonHead from '@components/common_head/CommonHead';
import Layout from '@components/layouts/Layout';
import { usePageView, GoogleAnalytics } from '@libs/gtag';

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
      </RecoilRoot>
    </>
  );
};

export default MyApp;
