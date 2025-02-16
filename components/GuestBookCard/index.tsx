'use client';

import { IconDotsVertical, IconEdit, IconTrash } from '@tabler/icons-react';
import { ActionIcon, Card, Flex, Menu, Text } from '@mantine/core';
import { GuestBookDto } from '@/hooks/useGuestBookController';

interface GuestBookCardProps {
  guestBook: GuestBookDto;
}

export const GuestBookCard = ({ guestBook }: GuestBookCardProps) => {
  const { id, created_at, name, content } = guestBook;
  return (
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
          <Text fz="lg">{name}</Text>
          <Text fz="xs">{created_at}</Text>
        </Flex>
        <Menu shadow="md" width={80}>
          <Menu.Target>
            <ActionIcon variant="subtle" color="dark" size="sm">
              <IconDotsVertical />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              leftSection={
                <IconEdit
                  onClick={() => {
                    console.log(id);
                  }}
                  size={14}
                />
              }
            >
              수정
            </Menu.Item>
            <Menu.Item
              leftSection={
                <IconTrash
                  onClick={() => {
                    console.log(id);
                  }}
                  size={14}
                />
              }
            >
              삭제
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Flex>
      <Text lineClamp={3}>{content}</Text>
      {/* <Text lineClamp={3}>결혼 너무너무 축하해 행복하게 잘 살아!! 🥹🎉🎉🎉🎉</Text> */}
    </Card>
  );
};
