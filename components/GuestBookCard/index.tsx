'use client';

import dayjs from 'dayjs';
import { IconDotsVertical, IconEdit, IconTrash } from '@tabler/icons-react';
import { ActionIcon, Card, Flex, Menu, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import useGuestBookController, { GuestBookDto } from '@/hooks/useGuestBookController';
import { useModal } from '@/hooks/useModal';
import { Confirm } from '../Confirm';
import { GuestBookForm } from '../GuestBookForm';
// import { GuestBookForm } from '../GuestBookForm';
import { PasswordForm } from '../PasswordForm';

interface GuestBookCardProps {
  guestBook: GuestBookDto;
}

export const GuestBookCard = ({ guestBook }: GuestBookCardProps) => {
  const { deleteGuestBook } = useGuestBookController();
  const { openModal, closeModal } = useModal();
  const { id, created_at, name, content } = guestBook;

  return (
    <Card
      shadow="md"
      padding="md"
      radius="md"
      bg="#FFFFFF"
      mih="10rem"
      w="100%"
      style={{ gap: '1rem' }}
    >
      <Flex justify="space-between">
        <Flex gap="sm" align="center">
          <Text fz="lg">{name}</Text>
          <Text fz="xs">{dayjs(created_at).format('YYYY-MM-DD HH:mm:ss')}</Text>
        </Flex>
        <Menu shadow="md" width={100}>
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
                openModal(
                  <PasswordForm id={id} />,
                  null,
                  '방명록 작성 시 입력했던 비밀번호 입력',
                  true
                ).then((result) => {
                  if (result) {
                    openModal(
                      <Confirm
                        message="정말로 방명록을 삭제하시겠어요?"
                        yesCallback={() => {
                          deleteGuestBook(id);
                          notifications.show({
                            title: '방명록 삭제 완료',
                            message: '방명록이 삭제되었습니다.',
                            color: 'red',
                          });
                        }}
                        noCallback={() => {}}
                        commonCallback={() => {
                          closeModal({});
                        }}
                      />,
                      null,
                      '방명록 수정',
                      true
                    );
                  }
                });
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
    </Card>
  );
};
