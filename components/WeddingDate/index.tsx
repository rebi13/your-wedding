import dayjs from 'dayjs';
import { Flex, Indicator } from '@mantine/core';
import { Calendar } from '@mantine/dates';

export const WeddingDate = () => {
  return (
    <Flex w="100%" justify="center">
      <Calendar
        maxLevel="month"
        date={dayjs('2025-08-30').toDate()}
        static
        hideOutsideDates
        monthLabelFormat="YYYY년 MM월"
        renderDay={(date) => {
          const isSaturday = date.getDay() === 6; // 6 = 토요일

          return (
            <Indicator size={6} color="red" offset={-2} disabled={date.getDate() !== 30}>
              <div style={{ color: isSaturday ? 'blue' : 'inherit' }}>{date.getDate()}</div>
            </Indicator>
          );
        }}
        styles={{
          calendarHeaderLevel: {
            cursor: 'auto',
            fontSize: '2rem',
          },
          calendarHeaderControl: {
            display: 'none',
          },
        }}
      />
    </Flex>
  );
};
