'use client';

import { IconArrowDown } from '@tabler/icons-react';
import { Button, Flex, Text } from '@mantine/core';
import { FramerMotionWrapper } from '@/components/FramerMotionWrapper';
import { GuestBookCard } from '@/components/GuestBookCard';
import { GuestBookForm } from '@/components/GuestBookForm';
import useGuestBookController from '@/hooks/useGuestBookController';
import { useModal } from '@/hooks/useModal';

export const GuestBooks = () => {
  const { guestBookList } = useGuestBookController();
  const { openModal } = useModal();
  console.log(guestBookList, 'gueestBookList');
  return (
    <FramerMotionWrapper>
      <Flex direction="column" p="md" gap="md" w="100%" align="center">
        <Text fz="2rem">방명록</Text>
        {guestBookList.map((guestBook) => {
          return <GuestBookCard key={guestBook.id} guestBook={guestBook} />;
        })}
        <Button w="100%" variant="subtle" rightSection={<IconArrowDown />} c="dark">
          더보기
        </Button>
        <Flex w="100%" justify="flex-end">
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
