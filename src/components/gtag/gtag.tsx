import { useEffect } from 'react';

import { useRouter } from 'next/router';
import Script from 'next/script';

import { hotjar } from 'react-hotjar';

export const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || '';
export const UA_ID = process.env.NEXT_PUBLIC_UNIVERSAL_ANALYTICS_ID || '';

// IDが取得できない場合を想定する
export const hasGaId = GA_ID !== '';
export const hasUaId = UA_ID !== '';

// PVを測定する
export const gaPageview = (path: string) => {
  window.gtag('config', GA_ID, {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    page_path: path,
  });
};

export const uaPageview = (path: string) => {
  window.gtag('config', UA_ID, {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    page_path: path,
  });
};

declare global {
  interface Window {
    gtag: any;
  }
}

// GAイベントを発火させる
export const gtagEvent = ({ event, component, page_label, event_label = '' }: Event) => {
  if (!hasGaId) {
    return;
  }

  window.gtag('event', event, {
    component: component,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    page_label: page_label,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    event_label: event_label,
  });
};

// _app.tsx で読み込む
export const usePageView = () => {
  const router = useRouter();

  useEffect(() => {
    if (!hasGaId) {
      return;
    }

    const handleRouteChange = (path: string) => {
      if (hasGaId) {
        gaPageview(path);
      }
      if (hasUaId) {
        uaPageview(path);
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_APP_ENV === 'production') {
      hotjar.initialize(Number(process.env.NEXT_PUBLIC_HOTJAR_ID), Number(process.env.NEXT_PUBLIC_HOTJAR_SV));
    }
  }, []);
};

// _app.tsx で読み込む
export const GoogleAnalytics = () => (
  <>
    {hasGaId && (
      <>
        <Script defer id="gtag-script1" src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script
          defer
          id="gtag-script2"
          dangerouslySetInnerHTML={{
            // eslint-disable-next-line @typescript-eslint/naming-convention
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
              gtag('config', '${UA_ID}');
            `,
          }}
          strategy="afterInteractive"
        />
      </>
    )}
  </>
);

export type Event = {
  event: string;
  component: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  page_label: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  event_label?: string;
};
