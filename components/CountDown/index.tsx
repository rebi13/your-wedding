'use client';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Box, Group, Stack, Text } from '@mantine/core';
import useTotalController from '@/hooks/useTotalController';
import { FramerMotionWrapper } from '../FramerMotionWrapper';

dayjs.locale('ko');

export const CountDown = () => {
  const { totalData: data } = useTotalController();
  const eventTime = data?.greeting?.eventDayTime;

  if (!eventTime) {
    return null;
  }

  // eventTime을 dayjs 객체로 파싱 (로컬 시간 기준)
  const TARGET_TIME = useMemo(() => dayjs(eventTime), [eventTime]);
  const [now, setNow] = useState(() => dayjs());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(dayjs());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const { label, time } = useMemo(() => {
    // 밀리초 단위 차이 계산 (현재 - 결혼식)
    const diffMs = now.diff(TARGET_TIME);
    
    // 밀리초를 일/시간/분/초로 변환
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
    
    return {
      label: `${TARGET_TIME.format('YYYY년 M월 D일')} 결혼식으로부터 지난 시간`,
      time: {
        days,
        hours,
        minutes,
        seconds,
      },
    };
  }, [now, TARGET_TIME]);

  return (
    <Stack align="center">
      <Text fw={600} size="md">
        {label}
      </Text>
      <Group gap="xs" wrap="nowrap">
        <FlipUnit value={time.days} label="일" />
        <FlipUnit value={time.hours} label="시간" />
        <FlipUnit value={time.minutes} label="분" />
        <FlipUnit value={time.seconds} label="초" />
      </Group>
    </Stack>
  );
};

interface FlipUnitProps {
  value: number;
  label: string;
}

export const FlipUnit = ({ value, label }: FlipUnitProps) => {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (value !== display) {
      setDisplay(value);
    }
  }, [value, display]);

  return (
    <FramerMotionWrapper>
      <Box
        w="4rem"
        h="5rem"
        style={{
          borderRadius: 16,
          backgroundColor: '#1a1a1a',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 6,
          position: 'relative',
        }}
      >
        <AnimatePresence mode="popLayout">
          <motion.div
            key={value}
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Text c="white" size="2rem">
              {value.toString().padStart(2, '0')}
            </Text>
          </motion.div>
        </AnimatePresence>

        <Text
          size="xs"
          c="gray.4"
          mt={6}
          style={{
            position: 'absolute',
            bottom: 4,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          {label}
        </Text>
      </Box>
    </FramerMotionWrapper>
  );
};
