'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import {
  IconArrowDown,
  IconChevronLeft,
  IconChevronRight,
} from '@tabler/icons-react';
import { Carousel } from '@mantine/carousel';
import { Button, Flex, Modal, SimpleGrid, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import useTotalController from '@/hooks/useTotalController';
import { getImageUrl } from '@/utils/storage';
import classes from './Gallery.module.css';

export const Gallery = () => {
  const { weddingImages: weddingImageDatas } = useTotalController();
  const [limit, setLimit] = useState(9);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [opened, { open, close }] = useDisclosure(false);
  const [showCarousel, setShowCarousel] = useState(false);

  const totalImages = weddingImageDatas?.length || 0;
  const isFirstSlide = currentImageIndex === 0;
  const isLastSlide = currentImageIndex === totalImages - 1;

  const openModalCarousel = (index: number) => {
    setCurrentImageIndex(index);
    open();
  };

  const handleLoadMore = useCallback(() => {
    setLimit((prevLimit) => prevLimit + 9);
  }, []);

  // 캐러셀에서 현재 이미지 인덱스가 limit을 초과하면 더 로드
  useEffect(() => {
    if (currentImageIndex >= limit) {
      handleLoadMore();
    }
  }, [currentImageIndex, limit, handleLoadMore]);

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
    <Flex direction="column" p="sm" gap="md" align="center">
      <Text fz="1.2rem" fw="bold">
        GALLERY
      </Text>
      <Text fz="sm" c="dimmed">
        사진을 클릭하시면 전체 화면 보기가 가능합니다.
      </Text>

      <Modal.Root
        opened={opened}
        onClose={close}
        radius={0}
        transitionProps={{ transition: 'fade', duration: 200 }}
        styles={{
          body: {
            padding: 0,
            width: '100%',
          },
        }}
        fullScreen
      >
        <Modal.Overlay />
        <Modal.Content bg="black">
          <Flex direction="column" w="100%" h="100%" justify="center">
            <Modal.Header pos="absolute" bg="black" w="100%">
              {/* <Modal.Title c="white"></Modal.Title> */}
              <Modal.CloseButton size="xl" />
            </Modal.Header>
            <Modal.Body>
              {showCarousel && (
                <Carousel
                  w="100%"
                  classNames={classes}
                  initialSlide={currentImageIndex}
                  slidesToScroll={1}
                  slideSize="90%"
                  align="center"
                  slideGap="xl"
                  controlsOffset="0"
                  onSlideChange={(index) => {
                    setTimeout(() => setCurrentImageIndex(index), 300);
                  }}
                  nextControlIcon={<IconChevronRight size={36} />}
                  nextControlProps={{ disabled: isLastSlide }}
                  previousControlIcon={<IconChevronLeft size={36} />}
                  previousControlProps={{ disabled: isFirstSlide }}
                  style={{ flex: 1 }}
                  styles={{
                    root: {
                      width: '100%',
                    },
                    slide: {
                      width: '100% !important',
                    },
                  }}
                >
                  {weddingImageDatas?.map((image) => (
                    <Carousel.Slide key={image.id} w="100%">
                      <Flex w="100%" justify="center">
                        {/* ✅ 슬라이드마다 한 개씩 */}
                        <Image
                          src={getImageUrl(`gallery/${image.name}`)}
                          alt="신랑 신부 웨딩 사진"
                          width={360}
                          height={540}
                          sizes="(max-width: 768px) 100vw, 480px"
                        />
                      </Flex>
                    </Carousel.Slide>
                  ))}
                </Carousel>
              )}
            </Modal.Body>
          </Flex>
        </Modal.Content>
      </Modal.Root>

      <SimpleGrid cols={3}>
        {weddingImageDatas?.slice(0, limit).map((image, index) => (
          <Flex key={image.id} pos="relative" onClick={() => openModalCarousel(index)}>
            <Image
              src={getImageUrl(`gallery/${image.name}`)}
              // src={imageUrl} // Supabase 이미지 URL
              alt="신랑 신부 웨딩 사진"
              width={480}
              height={720}
              sizes="(max-width: 768px) 100vw, 480px"
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
            {/* <MantineImage
                component={NextImage}
                width={480}
                height={720}
                alt="image"
                src={getImageUrl(`gallery/${image.name}`)}
                style={{ objectFit: 'cover', height: 'auto', width: '100%' }}
              /> */}
          </Flex>
        ))}
      </SimpleGrid>

      {weddingImageDatas && weddingImageDatas.length > limit && (
        <Button
          w="100%"
          variant="subtle"
          rightSection={<IconArrowDown />}
          c="dark"
          onClick={handleLoadMore}
        >
          더보기
        </Button>
      )}
    </Flex>
  );
};
