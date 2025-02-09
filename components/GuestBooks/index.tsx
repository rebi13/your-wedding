'use client';

import { Button, Flex, Text } from '@mantine/core';
import { FramerMotionWrapper } from '@/components/FramerMotionWrapper';
import { GuestBookCard } from '@/components/GuestBookCard';
import { GuestBookForm } from '@/components/GuestBookForm';
import { useModal } from '@/hooks/useModal';

export const GuestBooks = () => {
  const { openModal } = useModal();
  return (
    <FramerMotionWrapper>
      <Flex direction="column" p="md" gap="md" w="100%" align="center">
        <Text fz="2rem">방명록</Text>
        <GuestBookCard />
        <Flex w="100%" justify="space-between">
          <Button color="orange.9">전체보기</Button>
          <Button
            color="yellow"
            onClick={() => openModal(<GuestBookForm />, null, '방명록 작성', true)}
          >
            작성
          </Button>
        </Flex>
      </Flex>
    </FramerMotionWrapper>
  );
};
