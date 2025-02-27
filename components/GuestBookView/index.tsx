'use client';

import dayjs from 'dayjs';
import { Flex, Text } from '@mantine/core';
import useGuestBookController from '@/hooks/useGuestBookController';

interface GuestBookViewProps {
  id: number;
}

export const GuestBookView = ({ id }: GuestBookViewProps) => {
  const { getGuestBook } = useGuestBookController();
  const { data: guestBook } = getGuestBook(id);

  return (
    <Flex w="80vw" direction="column">
      <Text>{guestBook?.content}</Text>
      <Text fz="xs" ta="end">
        {dayjs(guestBook?.created_at).format('YYYY-MM-DD HH:mm:ss')}
      </Text>
    </Flex>
  );
};
