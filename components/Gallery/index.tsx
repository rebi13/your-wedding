'use client';

import { IconArrowDown } from '@tabler/icons-react';
import { Button, Flex, Image, SimpleGrid, Text } from '@mantine/core';
import { useModal } from '@/hooks/useModal';
import { FramerMotionWrapper } from '../FramerMotionWrapper';

const temp = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export const Gallery = () => {
  const { openModal } = useModal();

  return (
    <FramerMotionWrapper>
      <Flex direction="column" p="md" gap="md">
        <Text size="2rem" ta="center">
          갤러리
        </Text>
        <SimpleGrid cols={3}>
          {temp.map((t) => {
            return (
              <Flex
                key={t}
                onClick={() => openModal(<Image src="/assets/wedding_bouquet.png" />, null, '')}
              >
                <Image src="/assets/wedding_bouquet.png" />
              </Flex>
            );
          })}
        </SimpleGrid>
        <Button variant="subtle" rightSection={<IconArrowDown />} c="dark">
          더보기
        </Button>
      </Flex>
    </FramerMotionWrapper>
  );
};
