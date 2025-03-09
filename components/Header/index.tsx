'use client';

import { Flex, Text } from '@mantine/core';
import { AudioPlayer } from '@/components/AudioPlayer';
import useTotalController from '@/hooks/useTotalController';

export const Header = () => {
  const { totalData: data } = useTotalController();

  return (
    <Flex direction="column" pt="md" px="md" align="center">
      <Text fz="2rem">{data?.header.title}</Text>
      <Text fz="1rem">{data?.header.subTitle}</Text>
      <AudioPlayer src="/assets/velos.mp3" />
    </Flex>
  );
};
