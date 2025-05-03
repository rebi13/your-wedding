'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { Divider, Flex, Loader } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { AudioPlayer } from '@/components/AudioPlayer';
// import { Header } from '@/components/Header';
import { Invitation } from '@/components/Invitation';
import {
  Contact,
  CountDown,
  Family,
  Footer,
  Gallery,
  GiftAccount,
  GuestBooks,
} from '@/components/LazySections';
import { Profile } from '@/components/Profile';
// import { Timer } from '@/components/Timer';
// import { WeddingDate } from '@/components/WeddingDate';
import useTotalController from '@/hooks/useTotalController';
import { getImageUrl } from '@/utils/storage';

export default function HomePage() {
  const { isTotalDataLoading } = useTotalController();
  // const [isImageLoaded, setIsImageLoaded] = useState(false);

  const isLoading = isTotalDataLoading; // || !isImageLoaded;
  // const imageUrl = getImageUrl('thumb.webp');
  const imageUrl = getImageUrl('thumb.webp');
  // ✅ 브라우저 캐시된 이미지 로드 상태 확인
  // useEffect(() => {
  //   const img = new window.Image(); // ✅ 'Image' 대신 'window.Image' 사용
  //   img.src = imageUrl;

  //   if (img.complete) {
  //     setIsImageLoaded(true); // 캐시에 존재하는 경우 즉시 로드 완료
  //   } else {
  //     img.onload = () => setIsImageLoaded(true); // 정상적으로 로드된 경우
  //     img.onerror = () => setIsImageLoaded(true); // 로딩 실패 시에도 처리
  //   }
  // }, [imageUrl]);

  useEffect(() => {
    if (!isLoading) {
      notifications.show({
        title: '배경 음악',
        message: '배경 음악이 준비되어 있습니다.',
        color: 'yellow',
        autoClose: 1500,
      });
    }
  }, [isLoading]);

  return (
    <>
      <Flex w="100%" direction="column">
        <AudioPlayer src="/assets/CocktailHour-AaronKenny.mp3" />
        <Image
          src={imageUrl}
          alt="신랑 신부 웨딩 사진"
          width={480}
          height={720}
          priority
          sizes="(max-width: 768px) 100vw, 480px"
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </Flex>
      {isLoading ? (
        <Flex w="100%" h="100vh" align="center" justify="center">
          <Loader color="yellow" size="xl" type="bars" />
        </Flex>
      ) : (
        <Flex w="100%" direction="column" h="100%">
          {/* <Header /> */}

          <Profile />
          <Divider my="1rem" style={{ visibility: 'hidden' }} />
          <Invitation />
          {/* <Divider my="3rem" style={{ visibility: 'hidden' }} /> */}
          <Family />
          {/* <Divider my="3rem" style={{ visibility: 'hidden' }} /> */}
          {/* <WeddingDate /> */}
          <Divider my="3rem" style={{ visibility: 'hidden' }} />
          <Gallery />
          <Divider my="3rem" style={{ visibility: 'hidden' }} />
          <Contact />
          <Divider my="3rem" style={{ visibility: 'hidden' }} />
          <GiftAccount />
          <GuestBooks />
          <Divider my="3rem" style={{ visibility: 'hidden' }} />
          <CountDown />
          <Divider my="3rem" style={{ visibility: 'hidden' }} />
          {/* <Timer /> */}
          <Footer thumbImageUrl={imageUrl} />
        </Flex>
      )}
    </>
  );
}
