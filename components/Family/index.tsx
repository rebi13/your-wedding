'use client';

import { Divider, Flex, Image, Text } from '@mantine/core';
import { FramerMotionWrapper } from '@/components/FramerMotionWrapper';
// import data from '@/data.json';
import useTotalController from '@/hooks/useTotalController';
import { getImageUrl } from '@/utils/storage';

export const Family = () => {
  const { totalData: data } = useTotalController();

  // const groomParents = data?.greeting?.host?.groom.parents.map((d) => d.name).join(' ・ ');
  // const brideParents = data?.greeting?.host?.bride.parents.map((d) => d.name).join(' ・ ');

  const [groomDad, groomMom] = data?.greeting?.host?.groom.parents ?? [];
  const [brideDad, brideMom] = data?.greeting?.host?.bride.parents ?? [];

  return (
    <FramerMotionWrapper>
      <Image src={getImageUrl('middle.png')} />

      <Flex direction="column" w="100%" p="lg" px="4rem" bg="#D7C8C2" gap="md">
        <Flex direction="column" gap="xs">
          <Flex justify="space-between" align="center">
            <Flex align="center" gap="xs">
              <Flex direction="column">
                <Text fw="bold" size="lg">
                  {groomDad.name}
                </Text>
                <Text fw="bold" size="lg">
                  {groomMom.name}
                </Text>
              </Flex>
              <Text>의</Text>
            </Flex>
            <Flex align="center" gap="xs">
              <Text>{data?.greeting.host.groom.relation}</Text>
              <Text fw="bold" size="lg">
                {data?.greeting.host.groom.name}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Divider />
        <Flex direction="column" gap="xs">
          <Flex justify="space-between" align="center">
            <Flex align="center" gap="xs">
              <Flex direction="column">
                <Text fw="bold" size="lg">
                  {brideDad.name}
                </Text>
                <Text fw="bold" size="lg">
                  {brideMom.name}
                </Text>
              </Flex>
              <Text>의</Text>
            </Flex>
            <Flex align="center" gap="xs">
              <Text>{data?.greeting.host.bride.relation}</Text>
              <Text fw="bold" size="lg">
                {data?.greeting.host.bride.name}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </FramerMotionWrapper>
  );
};
