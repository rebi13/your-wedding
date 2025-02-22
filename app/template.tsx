'use client';

import { Flex, MantineProvider } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
import { Notifications } from '@mantine/notifications';
import { ModalStackManager } from '@/components/Modal';
import { theme } from '@/theme';

import 'dayjs/locale/ko';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
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
            >
              {children}
            </Flex>
          </ModalStackManager>
        </DatesProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
}
