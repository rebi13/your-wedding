'use client';

import { Divider, Flex, Text } from '@mantine/core';
import { FramerMotionWrapper } from '@/components/FramerMotionWrapper';
// import data from '@/data.json';
import useTotalController from '@/hooks/useTotalController';

export const Family = () => {
  const { totalData: data } = useTotalController();

  // const groomParents = data?.greeting?.host?.groom.parents.map((d) => d.name).join(' ・ ');
  // const brideParents = data?.greeting?.host?.bride.parents.map((d) => d.name).join(' ・ ');

  const [groomDad, groomMom] = data?.greeting?.host?.groom.parents ?? [];
  const [brideDad, brideMom] = data?.greeting?.host?.bride.parents ?? [];

  return (
    <FramerMotionWrapper>
      <Flex direction="column" w="100%" p="lg" px="3rem" bg="#EDE0DA" gap="md">
        <Flex direction="column" gap="xs">
          <Flex justify="space-between" align="center">
            <Text fz="1.2rem">{data?.greeting?.host.groom.host}</Text>

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
            <Flex w="6rem" align="center" gap="xs" justify="flex-end">
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
            <Text fz="1.2rem">{data?.greeting?.host.bride.host}</Text>
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
            <Flex w="6rem" align="center" gap="xs" justify="flex-end">
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
