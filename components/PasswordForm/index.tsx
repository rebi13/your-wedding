'use client';

import { useEffect } from 'react';
import { Button, Flex, PasswordInput, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { usePasswordMatch } from '@/hooks/useGuestBookController';
import { useModal } from '@/hooks/useModal';

interface PasswordFormProps {
  id: number;
}

export const PasswordForm = ({ id }: PasswordFormProps) => {
  const form = useForm({
    initialValues: {
      password: '',
    },
  });

  const { closeModal } = useModal();
  // ✅ 별도 훅으로 분리된 usePasswordMatch 사용 (Hook 규칙 준수)
  const { mutate, data, isSuccess } = usePasswordMatch();

  const onSubmit = () => {
    mutate({ id, password: form.values.password });
  };

  // ✅ 비동기 처리 결과에 따라 팝업 닫기
  useEffect(() => {
    if (isSuccess && !!data) {
      closeModal(id);
    }
  }, [isSuccess, data, closeModal, id]);

  return (
    <Flex w="80vw" direction="column" gap="sm">
      <PasswordInput
        placeholder="비밀번호를 입력하세요."
        size="lg"
        {...form.getInputProps('password')}
        error={data !== undefined && !data && <Text span>비밀번호가 일치하지 않습니다.</Text>}
      />
      <Button
        color="dark"
        onClick={() => {
          onSubmit();
        }}
      >
        입력
      </Button>
    </Flex>
  );
};
