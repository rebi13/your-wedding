'use client';

import { IconArrowDown } from '@tabler/icons-react';
import { Button, Flex, Text } from '@mantine/core';
import { FramerMotionWrapper } from '@/components/FramerMotionWrapper';
import { GuestBookCard } from '@/components/GuestBookCard';
import { GuestBookForm } from '@/components/GuestBookForm';
import { useGlobalLoading } from '@/context/GlobalLoadingContext';
import useGuestBookController from '@/hooks/useGuestBookController';
import { useModal } from '@/hooks/useModal';

export const GuestBooks = () => {
  const { guestBookList, hasNextPage, fetchNextPage } = useGuestBookController();
  const { openModal } = useModal();

  const { startLoading, stopLoading } = useGlobalLoading();

  const handleLoadMore = async () => {
    try {
      startLoading(); // 로딩 시작
      await fetchNextPage(); // tanstack query 무한스크롤
    } finally {
      stopLoading(); // 로딩 종료
    }
  };

  return (
    <FramerMotionWrapper>
      <Flex direction="column" p="md" gap="md" w="100%" align="center">
        <Text fz="2rem">방명록</Text>
        {guestBookList && guestBookList.length > 0 ? (
          guestBookList.map((guestBook) => (
            <GuestBookCard key={guestBook.id} guestBook={guestBook} />
          ))
        ) : (
          <Text>방명록이 없습니다.</Text>
        )}
        {hasNextPage && (
          <Button
            w="100%"
            variant="subtle"
            rightSection={<IconArrowDown />}
            c="dark"
            onClick={() => handleLoadMore()}
          >
            더보기
          </Button>
        )}
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
