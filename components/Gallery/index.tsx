'use client';

import { IconArrowDown } from '@tabler/icons-react';
import { Button, Flex, Image, SimpleGrid, Text } from '@mantine/core';
import { useModal } from '@/hooks/useModal';
import useTotalController from '@/hooks/useTotalController';
import { getImageUrl } from '@/utils/storage';
import { FramerMotionWrapper } from '../FramerMotionWrapper';

export const Gallery = () => {
  const { getWeddingImages } = useTotalController();
  const { openModal } = useModal();

  const { data: imageDatas } = getWeddingImages();

  return (
    <FramerMotionWrapper>
      <Flex direction="column" p="md" gap="md" align="center">
        <Text size="2rem" ta="center">
          갤러리
        </Text>
        <Text>사진을 클릭하시면 전체 화면 보기가 가능합니다.</Text>
        <SimpleGrid cols={3}>
          {imageDatas?.map((image) => {
            return (
              <Flex
                key={image.id}
                onClick={() => openModal(<Image src={getImageUrl(image.name)} />, null, '')}
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
