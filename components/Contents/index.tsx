'use client';

import { Flex, Text, Title } from '@mantine/core';

interface ContentsProps {
  title?: string;
  contents: string[];
}

export const Contents = ({ title, contents }: ContentsProps) => {
  return (
    <Flex direction="column" p="md" align="center" gap="md">
      {title && <Title order={2}>{title}</Title>}
      <Flex direction="column" gap="xs">
        {contents.map((content, index) => {
          return (
            <Text key={content + index} ta="center">
              {content || '\u00A0'}
            </Text>
          );
        })}
      </Flex>
    </Flex>
  );
};
