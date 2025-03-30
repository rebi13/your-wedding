'use client';

import { Flex, Text } from '@mantine/core';
import { FramerMotionWrapper } from '@/components/FramerMotionWrapper';
import useTotalController from '@/hooks/useTotalController';

export const Invitation = () => {
  const { totalData: data } = useTotalController();

  return (
    <FramerMotionWrapper>
      <Flex direction="column" p="md" align="center" gap="sm">
        <Text fz="1.2rem" c="pink" fw={300}>
          Invitation
        </Text>
        <Text fz="1.5rem" c="pink" fw={400}>
          소중한 분들을 초대합니다
        </Text>
        <br />
        <Text ta="center" style={{ whiteSpace: 'pre-line', lineHeight: '200%' }}>
          {data?.greeting.message}
        </Text>
      </Flex>
    </FramerMotionWrapper>
  );
};
