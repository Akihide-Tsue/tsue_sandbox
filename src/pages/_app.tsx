import '../styles/destyle.scss';
import '../styles/globals.scss';
import type { AppProps } from 'next/app';

import CommonHead from '@components/common_head/CommonHead';
import { usePageView, GoogleAnalytics } from '@components/gtag/gtag';
import PageContainer from '@components/page_container/PageConatainer';

function MyApp({ Component, pageProps }: AppProps) {
  usePageView();
  return (
    <>
      <CommonHead />
      <GoogleAnalytics />
      <PageContainer>
        <Component {...pageProps} />
      </PageContainer>
    </>
  );
}

export default MyApp;
