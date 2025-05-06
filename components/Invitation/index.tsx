'use client';

import { Flex, Text } from '@mantine/core';
import { FramerMotionWrapper } from '@/components/FramerMotionWrapper';
import useTotalController from '@/hooks/useTotalController';

export const Invitation = () => {
  const { totalData: data } = useTotalController();

  return (
    <FramerMotionWrapper>
      <Flex direction="column" p="md" align="center" gap="sm" bg="#F4F4F4">
        <br />

        <Text fz="1.2rem" fw="bold">
          INVITATION
        </Text>
        <Text fz="1.5rem">소중한 분들을 초대합니다</Text>
        <br />
        <Text ta="center" style={{ whiteSpace: 'pre-line', lineHeight: '200%' }}>
          {data?.greeting.message}
        </Text>
        <br />
      </Flex>
    </FramerMotionWrapper>
  );
};
