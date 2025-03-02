'use client';

import { useState } from 'react';
import { IconArrowDown, IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { Carousel } from '@mantine/carousel';
import { Button, Flex, Image, Modal, SimpleGrid, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import useTotalController from '@/hooks/useTotalController';
import { getImageUrl } from '@/utils/storage';
import { FramerMotionWrapper } from '../FramerMotionWrapper';

export const Gallery = () => {
  const { getWeddingImages } = useTotalController();
  const [limit, setLimit] = useState(9);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [opened, { open, close }] = useDisclosure(false);
  const { data: imageDatas } = getWeddingImages();

  const openModalCarousel = (index: number) => {
    setCurrentImageIndex(index);
    open();
  };

  const handleLoadMore = () => {
    setLimit((prevLimit) => prevLimit + 9);
  };

  return (
    <FramerMotionWrapper>
      <Flex direction="column" p="sm" gap="md" align="center">
        <Text size="2rem" ta="center">
          갤러리
        </Text>
        <Text>사진을 클릭하시면 전체 화면 보기가 가능합니다.</Text>
        <Modal
          opened={opened}
          onClose={close}
          fullScreen
          radius={0}
          transitionProps={{ transition: 'fade', duration: 200 }}
        >
          <Carousel
            height="100%"
            nextControlIcon={<IconArrowRight size={16} />}
            previousControlIcon={<IconArrowLeft size={16} />}
            initialSlide={currentImageIndex}
          >
            {imageDatas?.map((image) => {
              return (
                <Image
                  key={image.id}
                  alt="image"
                  flex={1}
                  src={getImageUrl(image.name)}
                  style={{ objectFit: 'cover' }}
                />
              );
            })}
          </Carousel>
        </Modal>
        <SimpleGrid cols={3}>
          {imageDatas?.slice(0, limit).map((image, index) => {
            return (
              <Flex
                key={image.id}
                pos="relative"
                w="6rem"
                h="6rem"
                onClick={() => openModalCarousel(index)}
              >
                <Image
                  alt="image"
                  flex={1}
                  src={getImageUrl(image.name)}
                  style={{ objectFit: 'cover' }}
                />
              </Flex>
            );
          })}
        </SimpleGrid>
        {imageDatas && imageDatas.length > limit && (
          <Button
            variant="subtle"
            rightSection={<IconArrowDown />}
            c="dark"
            onClick={handleLoadMore}
          >
            더보기
          </Button>
        )}
      </Flex>
    </FramerMotionWrapper>
  );
};
