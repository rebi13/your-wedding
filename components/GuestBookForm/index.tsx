'use client';

import { Button, Flex, PasswordInput, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

export const GuestBookForm = () => {
  const form = useForm({
    initialValues: {
      name: '',
      content: '',
      password: '',
    },
  });

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
      <Button>작성</Button>
    </Flex>
  );
};
