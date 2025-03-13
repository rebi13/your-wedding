// components/GlobalLoading.tsx
'use client';

import { Center, Loader, Overlay } from '@mantine/core';
import { useGlobalLoading } from '@/context/GlobalLoadingContext';

export const GlobalLoading = () => {
  const { isLoading } = useGlobalLoading();

  if (!isLoading) {
    return null;
  }

  return (
    <Overlay fixed zIndex={2000} blur={2} center>
      <Center w="100vw" h="100vh">
        <Loader size="xl" color="yellow" />
      </Center>
    </Overlay>
  );
};
