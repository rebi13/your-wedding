import '@/app/global.css';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';

import React from 'react';
import { Metadata } from 'next';
import Script from 'next/script';
import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';
import Template from '@/app/template'; // Import 방식 변경

export const metadata: Metadata = {
  title: 'Your Wedding',
  description: '너의 결혼을 축하하고 축복해',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Your Wedding: 너의 결혼식',
    description: '너의 결혼을 축하하고 축복해',
    siteName: 'Your Wedding',
    images: [
      {
        url: '/assets/wedding_bouquet.png',
        width: 800,
        height: 400,
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <Script
          strategy="afterInteractive"
          src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_MAP_CLIENT_ID}`}
        />
        <Script
          strategy="afterInteractive"
          src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_MAP_CLIENT_ID}=geocoder`}
        />
        <Template>{children}</Template>
      </body>
    </html>
  );
}
