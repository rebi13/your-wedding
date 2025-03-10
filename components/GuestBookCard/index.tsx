'use client';

import dayjs from 'dayjs';
import { IconDotsVertical, IconEdit, IconTrash } from '@tabler/icons-react';
import { ActionIcon, Card, Flex, Menu, Text } from '@mantine/core';
import { GuestBookDto } from '@/hooks/useGuestBookController';
import { useModal } from '@/hooks/useModal';
import { GuestBookForm } from '../GuestBookForm';
// import { GuestBookForm } from '../GuestBookForm';
import { PasswordForm } from '../PasswordForm';

interface GuestBookCardProps {
  guestBook: GuestBookDto;
}

export const GuestBookCard = ({ guestBook }: GuestBookCardProps) => {
  const { openModal } = useModal();
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
          <Text fz="xs">{dayjs(created_at).format('YYYY-MM-DD HH:mm:ss')}</Text>
        </Flex>
        <Menu shadow="md" width={80}>
          <Menu.Target>
            <ActionIcon variant="subtle" color="dark" size="sm">
              <IconDotsVertical />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              leftSection={<IconEdit size={14} />}
              onClick={() => {
                openModal(
                  <PasswordForm id={id} />,
                  null,
                  '방명록 작성 시 입력했던 비밀번호 입력',
                  true
                ).then((result) => {
                  if (result) {
                    openModal(<GuestBookForm id={id} />, null, '방명록 수정', true);
                  }
                });
              }}
            >
              수정
            </Menu.Item>
            <Menu.Item
              leftSection={<IconTrash size={14} />}
              onClick={() => {
                console.log(id);
              }}
            >
              삭제
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Flex>
      <Text lineClamp={3} h="100%">
        {content}
      </Text>
      {/* <Text lineClamp={3}>결혼 너무너무 축하해 행복하게 잘 살아!! 🥹🎉🎉🎉🎉</Text> */}
    </Card>
  );
};
