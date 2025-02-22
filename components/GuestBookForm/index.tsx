'use client';

import { Button, Flex, PasswordInput, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import useGuestBookController from '@/hooks/useGuestBookController';
import { useModal } from '@/hooks/useModal';

export const GuestBookForm = () => {
  const { closeModal } = useModal();
  const { createGuestBook } = useGuestBookController();
  const form = useForm({
    initialValues: {
      name: '',
      content: '',
      password: '',
    },
  });

  const validation = () => {
    const { name, content, password } = form.values;
    if (name.length < 2) {
      notifications.show({
        title: '성함 입력',
        message: '2글자 이상 성함을 입력해 주세요.',
        color: 'yellow',
      });
      return;
    }

    if (content.length < 1) {
      notifications.show({
        title: '내용 입력',
        message: '내용을 입력해 주세요.',
        color: 'yellow',
      });
      return;
    }

    if (password.length < 4) {
      notifications.show({
        title: '비밀번호 입력',
        message: '4글자 이상 비밀번호를 입력해 주세요.',
        color: 'yellow',
      });
      return;
    }

    return true;
  };

  const handleCreateGuestBook = async () => {
    if (!validation()) {
      return;
    }

    await createGuestBook(form.values);

    notifications.show({
      title: '방명록 작성 완료',
      message: '따뜻한 마음이 작성되었습니다.',
      color: 'blue',
    });

    closeModal(form.values);
  };

  return (
    <Flex w="80vw" h="100%" direction="column" gap="md">
      <TextInput
        withAsterisk
        label="성함"
        placeholder="성함을 입력해 주세요."
        {...form.getInputProps('name')}
      />
      <Textarea
        withAsterisk
        styles={{ input: { height: '10rem' } }} // input 요소의 높이 조정
        label="내용"
        placeholder="내용을 입력해 주세요."
        {...form.getInputProps('content')}
      />
      <PasswordInput
        withAsterisk
        label="비밀번호 (수정, 삭제 시 필요)"
        placeholder="비밀번호를 입력해 주세요."
        {...form.getInputProps('password')}
      />
      <Button
        onClick={() => {
          handleCreateGuestBook();
        }}
      >
        작성
      </Button>
    </Flex>
  );
};
