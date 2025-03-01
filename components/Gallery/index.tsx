'use client';

import { IconArrowDown } from '@tabler/icons-react';
import { Button, Flex, Image, SimpleGrid, Text } from '@mantine/core';
import { useModal } from '@/hooks/useModal';
import useWeddingImageController from '@/hooks/useWeddingImageController';
import { getImageUrl } from '@/utils/storage';
import { FramerMotionWrapper } from '../FramerMotionWrapper';

export const Gallery = () => {
  const { getWeddingImages } = useWeddingImageController();
  const { openModal } = useModal();

  const { data: imageDatas } = getWeddingImages();

  return (
    <FramerMotionWrapper>
      <Flex direction="column" p="md" gap="md">
        <Text size="2rem" ta="center">
          갤러리
        </Text>
        <SimpleGrid cols={3}>
          {imageDatas?.map((image) => {
            return (
              <Flex
                key={image.id}
                onClick={() => openModal(<Image src="/assets/wedding_bouquet.png" />, null, '')}
              >
                <Image src={getImageUrl(image.name)} />
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
