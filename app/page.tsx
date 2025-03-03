'use client';

import { Divider, Flex, Image } from '@mantine/core';
import { AudioPlayer } from '@/components/AudioPlayer';
import { Contact } from '@/components/Contact';
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
      <Divider my="3rem" />
      <GiftAccount />
      <GuestBooks />
      {/* <Timer /> */}
      <Footer />
    </Flex>
  );
}
