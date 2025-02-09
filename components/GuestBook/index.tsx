'use client';

import { IconDotsVertical, IconEdit, IconTrash } from '@tabler/icons-react';
import { ActionIcon, Card, Flex, Menu, Text } from '@mantine/core';
import { FramerMotionWrapper } from '../FramerMotionWrapper';

export const GuestBook = () => {
  return (
    <FramerMotionWrapper>
      <Flex direction="column" p="md" gap="md" w="100%" align="center">
        <Text fz="2rem">방명록</Text>
        <Card
          shadow="sm"
          padding="md"
          radius="md"
          bg="#D7C8C2"
          mih="10rem"
          w="100%"
          style={{ gap: '1rem' }}
        >
          <Flex justify="space-between">
            <Flex gap="sm" align="center">
              <Text fz="lg">은비</Text>
              <Text fz="xs">2025.02.06 03:22</Text>
            </Flex>
            <Menu shadow="md" width={80}>
              <Menu.Target>
                <ActionIcon variant="subtle" color="dark" size="sm">
                  <IconDotsVertical />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item leftSection={<IconEdit size={14} />}>수정</Menu.Item>
                <Menu.Item leftSection={<IconTrash size={14} />}>삭제</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Flex>
          <Text lineClamp={3}>결혼 너무너무 축하해 행복하게 잘 살아!! 🥹🎉🎉🎉🎉</Text>
        </Card>
      </Flex>
    </FramerMotionWrapper>
  );
};
