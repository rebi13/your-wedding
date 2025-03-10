'use client';

import { useEffect } from 'react';
import { Button, Flex, Loader, PasswordInput, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import useGuestBookController from '@/hooks/useGuestBookController';
import { useModal } from '@/hooks/useModal';

interface GusetBookFormProps {
  id?: number;
}

export const GuestBookForm = ({ id }: GusetBookFormProps) => {
  const { closeModal } = useModal();
  const { createGuestBook, updateGuestBook, getGuestBook } = useGuestBookController();

  const { data, isLoading } = getGuestBook(id ?? 0); // id가 없으면 0으로 대체

  const form = useForm({
    initialValues: {
      name: '',
      content: '',
      password: '',
    },
  });

  // ✅ getGuestBook의 결과를 form에 반영
  useEffect(() => {
    if (data) {
      form.setValues({
        name: data.name,
        content: data.content,
        password: '', // 비밀번호는 보통 서버에 저장하지 않거나 보여주지 않으므로 비워둠
      });
    }
  }, [data]);

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

  const handleUpdateguestBook = async () => {
    if (!validation()) {
      return;
    }

    await updateGuestBook({ id: id!, ...form.values });

    notifications.show({
      title: '방명록 작성 완료',
      message: '따뜻한 마음이 수정되었습니다.',
      color: 'blue',
    });
  };

  return (
    <Flex w="80vw" h="100%" direction="column" gap="md">
      {isLoading ? (
        <Flex w="100%" h="100%" justify="center" align="center">
          <Loader />
        </Flex>
      ) : (
        <>
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
              id ? handleUpdateguestBook() : handleCreateGuestBook();
            }}
          >
            {id ? '수정' : '작성'}
          </Button>
        </>
      )}
    </Flex>
  );
};
