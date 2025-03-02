'use client';

import { Flex, Text } from '@mantine/core';
import useTotalController from '@/hooks/useTotalController';

export const Header = () => {
  const { getTotalDatas } = useTotalController();
  const { data } = getTotalDatas();
  return (
    <Flex direction="column" pt="md" px="md" align="center">
      <Text fz="2rem">{data?.header.title}</Text>
      <Text fz="1rem">{data?.header.subTitle}</Text>
    </Flex>
  );
};
