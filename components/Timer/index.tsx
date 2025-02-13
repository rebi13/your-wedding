import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { useEffect, useState } from 'react';
import { Flex, Text } from '@mantine/core';
import { FramerMotionWrapper } from '@/components/FramerMotionWrapper';

dayjs.extend(duration);

const baseDate = dayjs('2023-12-25T00:00:00'); // 기준 시간 (2023년 12월 25일)

export const Timer = () => {
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
    <FramerMotionWrapper>
      <Flex direction="column" p="md" gap="md" w="100%" align="center">
        <Text>함께한 시간</Text>
        <Text>"{timeElapsed}"</Text>
      </Flex>
    </FramerMotionWrapper>
  );
};
