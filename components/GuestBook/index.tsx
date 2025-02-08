'use client';

import { IconDotsVertical } from '@tabler/icons-react';
import { ActionIcon, Card, Flex, Text, Title } from '@mantine/core';
import { FramerMotionWrapper } from '../FramerMotionWrapper';

export const GuestBook = () => {
  return (
    <FramerMotionWrapper>
      <Flex direction="column" p="md" gap="md" w="100%" align="center">
        <Title order={3}>방명록</Title>
        <Card
          shadow="sm"
          padding="md"
          radius="md"
          bg="#D7C8C2"
          h="8rem"
          w="100%"
          style={{ gap: '1rem' }}
        >
          <Flex justify="space-between">
            <Flex gap="sm" align="center">
              <Text fz="lg">은비</Text>
              <Text fz="xs">2025.02.06 03:22</Text>
            </Flex>
            <ActionIcon variant="subtle" color="dark" size="sm">
              <IconDotsVertical />
            </ActionIcon>
          </Flex>
          <Text>결혼 너무너무 축하해 행복하게 잘 살아!! 🥹🎉🎉🎉🎉</Text>
        </Card>
      </Flex>
    </FramerMotionWrapper>
  );
};
