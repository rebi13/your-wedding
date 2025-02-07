'use client';

import { Flex, MantineProvider } from '@mantine/core';
import { ModalStackManager } from '@/components/Modal';
import { theme } from '@/theme';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
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
  );
}
