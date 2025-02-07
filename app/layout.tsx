import '@/app/global.css';
import '@mantine/core/styles.css';

import React from 'react';
import { Metadata } from 'next';
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
        {/* 클라이언트 컴포넌트로 props 전달 없음 */}
        <Template>{children}</Template>
      </body>
    </html>
  );
}
