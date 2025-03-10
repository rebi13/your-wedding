'use client';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Box, Group, Stack, Text } from '@mantine/core';
import useTotalController from '@/hooks/useTotalController';

dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

export const CountDown = () => {
  const { totalData: data } = useTotalController();
  const eventTime = data?.greeting?.eventDayTime;

  if (!eventTime) {
    return null;
  }

  const TARGET_TIME = useMemo(() => dayjs.tz(eventTime, 'Asia/Seoul'), [eventTime]);
  const [now, setNow] = useState(dayjs.tz(new Date(), 'Asia/Seoul'));

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(dayjs.tz(new Date(), 'Asia/Seoul'));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const { label, time } = useMemo(() => {
    const diff = TARGET_TIME.diff(now);
    const isFuture = diff >= 0;
    const d = dayjs.duration(isFuture ? diff : -diff);

    return {
      label: isFuture
        ? `${TARGET_TIME.format('YYYY년 M월 D일')}까지 남은 시간`
        : `${TARGET_TIME.format('YYYY년 M월 D일')}부터 지난 시간`,
      time: {
        days: Math.floor(d.asDays()),
        hours: d.hours(),
        minutes: d.minutes(),
        seconds: d.seconds(),
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
  );
};
