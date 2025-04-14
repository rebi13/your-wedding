'use client';

import { useEffect, useState } from 'react';
import NextImage from 'next/image';
import { IconArrowDown, IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { Carousel } from '@mantine/carousel';
import { Button, Flex, Image as MantineImage, Modal, SimpleGrid, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import useTotalController from '@/hooks/useTotalController';
import { getImageUrl } from '@/utils/storage';
import { FramerMotionWrapper } from '../FramerMotionWrapper';
import classes from './Gallery.module.css';

export const Gallery = () => {
  const { weddingImages: imageDatas } = useTotalController();
  const [limit, setLimit] = useState(9);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [opened, { open, close }] = useDisclosure(false);
  const [showCarousel, setShowCarousel] = useState(false); // 🔹 Carousel 렌더 여부 제어용

  const totalImages = imageDatas?.length || 0;
  const isFirstSlide = currentImageIndex === 0;
  const isLastSlide = currentImageIndex === totalImages - 1;

  const openModalCarousel = (index: number) => {
    setCurrentImageIndex(index);
    open();
  };

  const handleLoadMore = () => {
    setLimit((prevLimit) => prevLimit + 9);
  };

  useEffect(() => {
    if (currentImageIndex >= limit) {
      handleLoadMore();
    }
  }, [currentImageIndex]);

  // 🔹 Modal open 후 Carousel 렌더링 딜레이
  useEffect(() => {
    if (opened) {
      const timeout = setTimeout(() => {
        setShowCarousel(true);
      }, 100); // 100ms 정도 delay

      return () => clearTimeout(timeout);
    }
    setShowCarousel(false); // 닫을 때는 false 처리
  }, [opened]);

  return (
    <FramerMotionWrapper>
      <Flex direction="column" p="sm" gap="md" align="center">
        <Text fz="1.2rem" fw="bold">
          GALLERY
        </Text>
        <Text fz="sm" c="dimmed">
          사진을 클릭하시면 전체 화면 보기가 가능합니다.
        </Text>

        <Modal
          removeScrollProps={{ allowPinchZoom: true }}
          opened={opened}
          onClose={close}
          radius={0}
          transitionProps={{ transition: 'fade', duration: 200 }}
        >
          {showCarousel && (
            <Carousel
              classNames={classes}
              initialSlide={currentImageIndex}
              slidesToScroll={1}
              slideSize="100%"
              align="center"
              onSlideChange={(index) => {
                setTimeout(() => setCurrentImageIndex(index), 300);
              }}
              nextControlIcon={<IconArrowRight size={16} />}
              nextControlProps={{ disabled: isLastSlide }}
              previousControlIcon={<IconArrowLeft size={16} />}
              previousControlProps={{ disabled: isFirstSlide }}
              styles={{
                root: {
                  width: '100%',
                  maxWidth: '800px',
                },
              }}
            >
              {imageDatas?.map((image) => (
                <MantineImage
                  component={NextImage}
                  key={image.id}
                  width={800}
                  height={1200}
                  alt="image"
                  src={getImageUrl(image.name)}
                  style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
                />
              ))}
            </Carousel>
          )}
        </Modal>

        <SimpleGrid cols={3}>
          {imageDatas?.slice(0, limit).map((image, index) => (
            <Flex key={image.id} pos="relative" onClick={() => openModalCarousel(index)}>
              <MantineImage
                component={NextImage}
                width={800}
                height={1200}
                alt="image"
                src={getImageUrl(image.name)}
                style={{ objectFit: 'cover', height: 'auto', width: '100%' }}
              />
            </Flex>
          ))}
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
