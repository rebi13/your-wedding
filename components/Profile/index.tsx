'use client';

import { Flex, Text } from '@mantine/core';
import { FramerMotionWrapper } from '@/components/FramerMotionWrapper';
import useTotalController from '@/hooks/useTotalController';

export const Profile = () => {
  const { totalData: data } = useTotalController();
  return (
    <FramerMotionWrapper>
      <Flex direction="column" p="md" align="center" gap="sm">
        <Text fz="1.5rem">{data?.greeting.title}</Text>
        <Text fz="1rem" ta="center" style={{ whiteSpace: 'pre-line' }}>
          {data?.greeting.eventDetail}
        </Text>
      </Flex>
    </FramerMotionWrapper>
  );
};
