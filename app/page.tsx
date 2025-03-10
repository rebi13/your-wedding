'use client';

import { useEffect, useState } from 'react';
import { Divider, Flex, Loader, Image as MantineImage } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { Contact } from '@/components/Contact';
import { CountDown } from '@/components/CountDown';
import { Family } from '@/components/Family';
import { Footer } from '@/components/Footer';
import { Gallery } from '@/components/Gallery';
import { GiftAccount } from '@/components/GiftAccount';
import { GuestBooks } from '@/components/GuestBooks';
import { Header } from '@/components/Header';
import { Invitation } from '@/components/Invitation';
// import { Timer } from '@/components/Timer';
import { WeddingDate } from '@/components/WeddingDate';
import useTotalController from '@/hooks/useTotalController';
import { getImageUrl } from '@/utils/storage';

export default function HomePage() {
  const { isWeddingImagesLoading, isTotalDataLoading } = useTotalController();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const isLoading = isWeddingImagesLoading || isTotalDataLoading || !isImageLoaded;
  const imageUrl = getImageUrl('thumb.jpeg');

  // ✅ 브라우저 캐시된 이미지 로드 상태 확인
  useEffect(() => {
    const img = new window.Image(); // ✅ 'Image' 대신 'window.Image' 사용
    img.src = imageUrl;

    if (img.complete) {
      setIsImageLoaded(true); // 캐시에 존재하는 경우 즉시 로드 완료
    } else {
      img.onload = () => setIsImageLoaded(true); // 정상적으로 로드된 경우
      img.onerror = () => setIsImageLoaded(true); // 로딩 실패 시에도 처리
    }
  }, [imageUrl]);

  useEffect(() => {
    if (!isLoading) {
      notifications.show({
        title: '배경 음악',
        message: '배경 음악이 준비되어 있습니다.',
        color: 'pink',
        autoClose: 1500,
      });
    }
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <Flex w="100%" h="100vh" align="center" justify="center">
          <Loader color="pink" size="xl" type="bars" />
        </Flex>
      ) : (
        <Flex w="100%" direction="column" gap="md" h="100%">
          <Header />
          <Flex direction="column">
            <MantineImage
              src={imageUrl}
              style={{
                opacity: isImageLoaded ? 1 : 0,
                transition: 'opacity 0.5s ease-in-out',
              }}
            />
          </Flex>
          <Invitation />
          <Family />
          <Gallery />
          <WeddingDate />
          <CountDown />
          <Contact />
          <Divider my="3rem" />
          <GiftAccount />
          <GuestBooks />
          {/* <Timer /> */}
          <Footer />
        </Flex>
      )}
    </>
  );
}
