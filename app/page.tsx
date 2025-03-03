'use client';

import { Divider, Flex, Image } from '@mantine/core';
import { AudioPlayer } from '@/components/AudioPlayer';
import { Contact } from '@/components/Contact';
import { Contents } from '@/components/Contents';
import { Family } from '@/components/Family';
import { Footer } from '@/components/Footer';
import { Gallery } from '@/components/Gallery';
import { GiftAccount } from '@/components/GiftAccount';
import { GuestBooks } from '@/components/GuestBooks';
import { Header } from '@/components/Header';
import { Invitation } from '@/components/Invitation';
// import { Timer } from '@/components/Timer';
import { WeddingDate } from '@/components/WeddingDate';
import { getImageUrl } from '@/utils/storage';

const contents3 = [
  '멀리서도 축하의 마음을',
  '전하고 싶으신 분들을 위해',
  '계좌번호를 안내드립니다.',
  '소중한 축하를 보내주셔서 감사드리며,',
  '따뜻한 마음에 깊이 감사드립니다.',
];

// chill guy image link: https://upload.wikimedia.org/wikipedia/en/c/c7/Chill_guy_original_artwork.jpg

export default function HomePage() {
  return (
    <Flex w="100%" direction="column" gap="md" h="100%">
      <AudioPlayer src="/assets/velos.mp3" />
      <Header />
      <Flex direction="column">
        <Image src={getImageUrl('thumb.jpeg')} />
      </Flex>
      <Invitation />
      <Family />
      <Gallery />
      <WeddingDate />
      <Contact />
      <Divider />
      <Contents contents={contents3} />
      <GiftAccount />
      <GuestBooks />
      {/* <Timer /> */}
      <Footer />
    </Flex>
  );
}
