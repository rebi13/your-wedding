'use client';

import { Divider, Flex, Image, Text } from '@mantine/core';
import { FramerMotionWrapper } from '@/components/FramerMotionWrapper';
// import data from '@/data.json';
import useTotalController from '@/hooks/useTotalController';
import { getImageUrl } from '@/utils/storage';

export const Family = () => {
  const { getTotalDatas } = useTotalController();
  const { data } = getTotalDatas();

  const groomParents = data?.greeting?.host?.groom.parents.map((d) => d.name).join(' ・ ');
  const brideParents = data?.greeting?.host?.bride.parents.map((d) => d.name).join(' ・ ');

  return (
    <FramerMotionWrapper>
      <Image src={getImageUrl('middle.png')} />

      <Flex direction="column" w="100%" p="lg" px="4rem" bg="#D7C8C2" gap="md">
        <Flex direction="column" gap="xs">
          <Flex justify="space-between">
            <Text size="lg">{groomParents}</Text>
            <Text size="lg">의 {data?.greeting.host.groom.relation}</Text>
          </Flex>
          <Flex justify="space-between">
            <Text size="lg">{data?.greeting.host.groom.host}</Text>
            <Text size="lg" fw={700}>
              {data?.greeting.host.groom.name}
            </Text>
          </Flex>
        </Flex>
        <Divider />
        <Flex direction="column">
          <Flex justify="space-between">
            <Text size="lg">{brideParents}</Text>
            <Text size="lg">의 {data?.greeting.host.bride.relation}</Text>
          </Flex>
          <Flex justify="space-between">
            <Text size="lg">{data?.greeting.host.bride.host}</Text>
            <Text size="lg" fw={700}>
              {data?.greeting.host.bride.name}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </FramerMotionWrapper>
  );
};
