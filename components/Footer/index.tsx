import { Flex, Text } from '@mantine/core';
import useTotalController from '@/hooks/useTotalController';

export const Footer = () => {
  const { totalData: data } = useTotalController();
  // TODO: DB에 json 데이터 넣기
  return (
    <Flex direction="column" p="md" gap="xs" w="100%" align="center" mb="md">
      <Text>For Your Wedding</Text>
      <Text>{data?.madeBy}</Text>
    </Flex>
  );
};
