import '@/app/global.css';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/carousel/styles.css';

import React from 'react';
import { Metadata } from 'next';
import Script from 'next/script';
import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';
import Template from '@/app/template'; // Import 방식 변경

export const metadata: Metadata = {
  title: process.env.NEXT_TITLE,
  description: process.env.NEXT_OG_DESC,
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: process.env.NEXT_OG_TITLE,
    description: process.env.NEXT_OG_DESC,
    siteName: 'For Your Wedding',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/${process.env.NEXT_PUBLIC_STORAGE_BUCKET!}/thumb.jpeg`,
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
