'use client';

import { Flex, MantineProvider } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
import { Notifications } from '@mantine/notifications';
import { ModalStackManager } from '@/components/Modal';
import { theme } from '@/theme';

import 'dayjs/locale/ko';

import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GlobalLoading } from '@/components/GlobalLoading';
import { GlobalLoadingProvider } from '@/context/GlobalLoadingContext';
import { usePreventZoomGesture } from '@/hooks/usePreventZoomGesture';

const queryClient = new QueryClient();

export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_JAVASCRIPT_KEY);
    }
  }, []);

  usePreventZoomGesture();

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <GlobalLoadingProvider>
          <DatesProvider settings={{ locale: 'ko', firstDayOfWeek: 0, weekendDays: [0] }}>
            <ModalStackManager>
              <Notifications position="top-center" />
              <Flex
                flex={1}
                w="100%"
                h="100vh"
                miw="20rem"
                maw="40rem"
                mx="auto"
                direction="column"
                align="center"
                style={{
                  overflowY: 'auto', // ✅ 내부 스크롤 허용
                  WebkitOverflowScrolling: 'touch', // ✅ iOS 부드러운 스크롤
                }}
              >
                {children}
              </Flex>
            </ModalStackManager>
          </DatesProvider>
          <GlobalLoading />
        </GlobalLoadingProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
}
