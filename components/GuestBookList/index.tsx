import { Flex } from '@mantine/core';
import { GuestBookCard } from '@/components/GuestBookCard';

export const GuestBookList = () => {
  return (
    <Flex direction="column" w="100%" h="100%" gap="sm">
      <GuestBookCard />
      <GuestBookCard />
      <GuestBookCard />
      <GuestBookCard />
      <GuestBookCard />
    </Flex>
  );
};
