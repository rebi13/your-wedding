import { Button, Flex, Text } from '@mantine/core';
import useTotalController from '@/hooks/useTotalController';
import { shareLink } from '@/utils/shareLink';

export const Footer = () => {
  const { totalData: data } = useTotalController();

  const handleShare = async () => {
    try {
      await shareLink({
        title: document.title,
        text: '청첩장을 공유합니다.',
        url: window.location.href,
      });
    } catch (error) {
      // 타입 단언을 통해 에러 메시지 처리
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        // `error`가 객체 또는 문자열일 수 있음
        throw new Error(String(error));
      }
    }
  };
  return (
    <Flex direction="column" p="md" gap="xs" w="100%" align="center" mb="md">
      <Text>For Your Wedding</Text>
      <Text>{data?.madeBy}</Text>
      <Button color="orange" variant="subtle" onClick={() => handleShare()}>
        청첩장 공유하기
      </Button>
    </Flex>
  );
};
