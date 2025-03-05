'use client';

import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import weekday from 'dayjs/plugin/weekday';
import React from 'react';
import { Flex, Grid, Text } from '@mantine/core';
import { FramerMotionWrapper } from '@/components/FramerMotionWrapper';
import useTotalController from '@/hooks/useTotalController';

import 'dayjs/locale/ko';

dayjs.extend(weekday);
dayjs.extend(isoWeek);

export const WeddingDate = () => {
  const { getTotalDatas } = useTotalController();
  const { data } = getTotalDatas();
  const targetDate = dayjs(data?.greeting.eventDay);

  const year = targetDate.year();
  const month = targetDate.month(); // 0 (1월) ~ 11 (12월)
  const firstDayOfMonth = dayjs(`${year}-${month + 1}-01`);
  const lastDayOfMonth = firstDayOfMonth.endOf('month');

  const daysInMonth = lastDayOfMonth.date();
  const firstDayOfWeek = firstDayOfMonth.day(); // 0(일) ~ 6(토)

  // 빈 칸을 먼저 채우고, 날짜 추가
  const days = [
    ...Array(firstDayOfWeek).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  console.log('targetDate', targetDate);
  console.log('targetDate.date()', targetDate.date());
  return (
    <FramerMotionWrapper>
      <Flex direction="column" w="100%" justify="center" align="center" bg="#F8F8F8" p="md">
        <Text fz="2rem">WEDDING DAY</Text>
        <Text fz="1rem" mt="md">
          {data?.greeting.eventKor}
        </Text>
        <Text fz="1rem" mb="md">
          {data?.greeting.eventEng}
        </Text>
        {/* 요일 헤더 */}
        <Grid columns={7} gutter="0" w="100%">
          {['일', '월', '화', '수', '목', '금', '토'].map((day, i) => (
            <Grid.Col key={day} span={1}>
              <Flex
                w="2.5rem"
                h="2.5rem"
                align="center"
                justify="center"
                fw={600}
                style={{
                  color: i === 0 ? 'red' : i === 6 ? 'blue' : 'black',
                }}
              >
                {day}
              </Flex>
            </Grid.Col>
          ))}
        </Grid>

        {/* 날짜 칸 */}
        <Grid columns={7} gutter="0" w="100%">
          {days.map((day, i) =>
            day === null ? (
              <Grid.Col key={i} span={1}>
                <Flex w="2.5rem" h="2.5rem" align="center" justify="center">
                  &nbsp;
                </Flex>
              </Grid.Col>
            ) : (
              <Grid.Col key={i} span={1}>
                <Flex
                  w="2.5rem"
                  h="2.5rem"
                  align="center"
                  justify="center"
                  bg={day === targetDate.date() ? '#88884C' : 'transparent'}
                  c={
                    day === targetDate.date()
                      ? 'white'
                      : data?.greeting.holidayList.includes(
                            `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
                          )
                        ? 'red'
                        : i % 7 === 0
                          ? 'red'
                          : i % 7 === 6
                            ? 'blue'
                            : 'black'
                  }
                  fw={day === targetDate.date() ? 700 : 500}
                  style={{
                    borderRadius: day === targetDate.date() ? '50%' : '0',
                  }}
                >
                  {day}
                </Flex>
              </Grid.Col>
            )
          )}
        </Grid>
      </Flex>
    </FramerMotionWrapper>
  );
};
