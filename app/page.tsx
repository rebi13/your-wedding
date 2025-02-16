'use client';

import { Flex, Image } from '@mantine/core';
// import { Contact } from '@/components/Contact';
import { Contents } from '@/components/Contents';
import { Footer } from '@/components/Footer';
import { Gallery } from '@/components/Gallery';
import { GiftAccount } from '@/components/GiftAccount';
import { GuestBooks } from '@/components/GuestBooks';
import { Timer } from '@/components/Timer';
import { WeddingDate } from '@/components/WeddingDate';

const title1 = '저희, 결혼합니다.';
const contents1 = [
  '봄의 따스한 바람이 우리의 시작을 알렸고',
  '여름의 뜨거운 햇살이 우리의 마음을 더욱 깊게 물들였습니다.',
  '가을의 낙엽이 우리의 추억을 곱게 채색하고,',
  '겨울의 하얀 눈이 우리의 사랑을 포근히 감싸주었습니다.',
  '',
  '이제, 네 계절을 지나',
  '우리는 영원이라는 이름으로 함께하려 합니다.',
  '',
  '저희 두 사람 첫 걸음을 내딛는',
  '뜻 깊은 자리에 귀한 걸음으로',
  '축하하여 주시면',
  '더없는 격려와 기쁨으로 간직하겠습니다.',
  '',
  '',
  '',
];

const contents2 = ['결혼합니다.', '', '강명성, 이수정의 아들 건우', '하주석, 김소영의 딸 유리'];

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
      <Flex direction="column">
        <Image src="/assets/wedding_bouquet.png" />
      </Flex>
      <Contents title={title1} contents={contents1} />
      <Contents contents={contents2} />
      <Gallery />
      <WeddingDate />
      {/* <Contact /> */}
      <Contents contents={contents3} />
      <GiftAccount />
      <GuestBooks />
      <Timer />
      <Footer />
    </Flex>
  );
}
