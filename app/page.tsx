'use client';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { useEffect, useState } from 'react';
import { Accordion, Button, Flex, Image, SimpleGrid, Text } from '@mantine/core';
import { useModal } from '@/hooks/useModal';

dayjs.extend(duration);

const baseDate = dayjs('2023-12-24T00:00:00'); // 기준 시간 (2023년 4월 3일)

// import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
// import { Welcome } from '../components/Welcome/Welcome';

const groceries1 = [
  {
    emoji: '🤵‍♂️',
    value: '신랑측',
    description:
      'Crisp and refreshing fruit. Apples are known for their versatility and nutritional benefits. They come in a variety of flavors and are great for snacking, baking, or adding to salads.',
  },
];

const groceries2 = [
  {
    emoji: '🤵‍♀️',
    value: '신부측',
    description:
      'Naturally sweet and potassium-rich fruit. Bananas are a popular choice for their energy-boosting properties and can be enjoyed as a quick snack, added to smoothies, or used in baking.',
  },
];

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

  // See groceries1 data above

  return (
    <Flex direction="column">
      <Flex direction="column">
        <Image src="https://upload.wikimedia.org/wikipedia/en/c/c7/Chill_guy_original_artwork.jpg" />
      </Flex>
      <Flex direction="column" p="md">
        <Text>피아노 소리가 딴딴따단</Text>
        <Text>너를 보면 듣고 싶은 멜로디</Text>
        <Text>수줍게 손잡고 눈누난나</Text>
        <Text>하루 종일 생각할래 내 옆에 있어줘</Text>
        <Text>우리 처음 만난 날 기억하나요</Text>
        <Text>떨리는 마음에 아무 말 대잔치</Text>
        <Text>입이 자꾸 말라 물만 마시다가</Text>
        <Text>밥도 잘 못 먹고 얼굴 빨개졌지</Text>
        <Text>근데 난 알았어 우리가 될 거란 걸</Text>
        <Text>눈이 마주친 순간</Text>
      </Flex>
      <Flex direction="column" p="md">
        <Text>갤러리</Text>
        <SimpleGrid cols={3}>
          <Flex>
            <Image src="https://upload.wikimedia.org/wikipedia/en/c/c7/Chill_guy_original_artwork.jpg" />
          </Flex>
          <Flex>
            <Image src="https://upload.wikimedia.org/wikipedia/en/c/c7/Chill_guy_original_artwork.jpg" />
          </Flex>
          <Flex>
            <Image src="https://upload.wikimedia.org/wikipedia/en/c/c7/Chill_guy_original_artwork.jpg" />
          </Flex>
          <Flex>
            <Image src="https://upload.wikimedia.org/wikipedia/en/c/c7/Chill_guy_original_artwork.jpg" />
          </Flex>
          <Flex>
            <Image src="https://upload.wikimedia.org/wikipedia/en/c/c7/Chill_guy_original_artwork.jpg" />
          </Flex>
          <Flex>
            <Image src="https://upload.wikimedia.org/wikipedia/en/c/c7/Chill_guy_original_artwork.jpg" />
          </Flex>
          <Flex>
            <Image src="https://upload.wikimedia.org/wikipedia/en/c/c7/Chill_guy_original_artwork.jpg" />
          </Flex>
          <Flex>
            <Image src="https://upload.wikimedia.org/wikipedia/en/c/c7/Chill_guy_original_artwork.jpg" />
          </Flex>
          <Flex>
            <Image src="https://upload.wikimedia.org/wikipedia/en/c/c7/Chill_guy_original_artwork.jpg" />
          </Flex>
          <Flex>
            <Image src="https://upload.wikimedia.org/wikipedia/en/c/c7/Chill_guy_original_artwork.jpg" />
          </Flex>
          <Flex>
            <Image src="https://upload.wikimedia.org/wikipedia/en/c/c7/Chill_guy_original_artwork.jpg" />
          </Flex>
        </SimpleGrid>
      </Flex>
      <Flex direction="column" p="md">
        <Text>너의 결혼식</Text>
        <Text>멀리서도 축하의 마음을</Text>
        <Text>전하고 싶으신 분들을 위해</Text>
        <Text>계좌번호를 안내드린다.</Text>
        <Text>소중한 축하를 보내주셔서 감사드리며,</Text>
        <Text>따뜻한 마음(돈)에 깊이 감사드립니다.</Text>
        <Accordion>
          {groceries1.map((item) => (
            <Accordion.Item key={item.value} value={item.value}>
              <Accordion.Control icon={item.emoji}>{item.value}</Accordion.Control>
              <Accordion.Panel>
                <Flex direction="column" gap="md">
                  <Flex justify="space-between" align="center">
                    <Flex direction="column">
                      <Text>신랑</Text>
                      <Text>01012345678</Text>
                      <Text>기업은행 송재인</Text>
                    </Flex>
                    <Button>복사</Button>
                  </Flex>
                  <Flex justify="space-between" align="center">
                    <Flex direction="column">
                      <Text>신랑</Text>
                      <Text>01012345678</Text>
                      <Text>기업은행 송재인</Text>
                    </Flex>
                    <Button>복사</Button>
                  </Flex>
                </Flex>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
        <Accordion>
          {groceries2.map((item) => (
            <Accordion.Item key={item.value} value={item.value}>
              <Accordion.Control icon={item.emoji}>{item.value}</Accordion.Control>
              <Accordion.Panel>
                <Flex direction="column" gap="md">
                  <Flex justify="space-between" align="center">
                    <Flex direction="column">
                      <Text>신부</Text>
                      <Text>01087654321</Text>
                      <Text>기업은행 최하슬</Text>
                    </Flex>
                    <Button>복사</Button>
                  </Flex>
                  <Flex justify="space-between" align="center">
                    <Flex direction="column">
                      <Text>신부</Text>
                      <Text>01087654321</Text>
                      <Text>기업은행 최하슬</Text>
                    </Flex>
                    <Button>복사</Button>
                  </Flex>
                </Flex>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
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
