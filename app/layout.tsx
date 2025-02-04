'use client';

import '@mantine/core/styles.css';

import React from 'react';
import { ColorSchemeScript, Flex, mantineHtmlProps, MantineProvider } from '@mantine/core';
import { ModalStackManager } from '@/components/Modal';
import { theme } from '@/theme';

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
        <style>
          {`
            html, body {
              height: 100%;
              margin: 0;
              padding: 0;
            }
          `}
        </style>
      </head>
      <body>
        <MantineProvider theme={theme}>
          <ModalStackManager>
            <Flex
              w="100%"
              h="100vh"
              miw="20rem"
              maw="40rem"
              mx="auto"
              direction="column"
              align="center"
            >
              {children}
            </Flex>
          </ModalStackManager>
        </MantineProvider>
      </body>
    </html>
  );
}
