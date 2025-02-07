'use client';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { useEffect, useState } from 'react';
import { IconArrowDown } from '@tabler/icons-react';
import { Button, Flex, Image, SimpleGrid, Text } from '@mantine/core';
import { Contents } from '@/components/Contents';
import { GiftAccount } from '@/components/GiftAccount';
import { useModal } from '@/hooks/useModal';

dayjs.extend(duration);

const baseDate = dayjs('2023-12-24T00:00:00'); // 기준 시간 (2023년 4월 3일)

const title1 = '언제나 변함없이 ⭐️';
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

const contents2 = ['강명성, 이수정의 아들 정호', '하주석, 김소영의 딸 효림'];

const contents3 = [
  '멀리서도 축하의 마음을',
  '전하고 싶으신 분들을 위해',
  '계좌번호를 안내드립니다.',
  '소중한 축하를 보내주셔서 감사드리며,',
  '따뜻한 마음에 깊이 감사드립니다.',
];

const temp = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

// chill guy image link: https://upload.wikimedia.org/wikipedia/en/c/c7/Chill_guy_original_artwork.jpg

export default function HomePage() {
  const { openModal } = useModal();

  const [timeElapsed, setTimeElapsed] = useState('');

  useEffect(() => {
    const updateElapsedTime = () => {
      const now = dayjs();
      const diff = dayjs.duration(now.diff(baseDate));

      const years = diff.years();
      const months = diff.months();
      const days = diff.days();
      const hours = diff.hours();
      const minutes = diff.minutes();
      const seconds = diff.seconds();

      setTimeElapsed(`${years}년 ${months}개월 ${days}일 ${hours}시간 ${minutes}분 ${seconds}초`);
    };

    updateElapsedTime(); // 최초 실행
    const interval = setInterval(updateElapsedTime, 1000); // 1초마다 업데이트

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 해제
  }, []);

  return (
    <Flex direction="column" gap="md" h="100%">
      <Flex direction="column">
        <Image src="/assets/wedding_bouquet.png" />
      </Flex>
      <Contents title={title1} contents={contents1} />
      <Contents contents={contents2} />
      <Flex direction="column" p="md" gap="sm">
        <Text>갤러리</Text>
        <SimpleGrid cols={3}>
          {temp.map((t) => {
            return (
              <Flex key={t}>
                <Image src="/assets/wedding_bouquet.png" />
              </Flex>
            );
          })}
        </SimpleGrid>
        <Button variant="subtle" rightSection={<IconArrowDown />} c="dark">
          더보기
        </Button>
      </Flex>
      <Flex direction="column" p="md">
        <Contents contents={contents3} />
        <GiftAccount />
      </Flex>
      <Button
        onClick={() => {
          openModal(<Flex>뀽뀽</Flex>, null, '제목제목');
        }}
      >
        버튼
      </Button>
      <Flex direction="column">
        <Text>함께한 시간</Text>
        <Text>{timeElapsed}</Text>
      </Flex>
    </Flex>
  );
}
