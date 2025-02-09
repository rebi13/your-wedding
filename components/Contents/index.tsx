'use client';

import { Flex, Text } from '@mantine/core';
import { FramerMotionWrapper } from '../FramerMotionWrapper';

interface ContentsProps {
  title?: string;
  contents: string[];
}

export const Contents = ({ title, contents }: ContentsProps) => {
  return (
    <FramerMotionWrapper>
      <Flex direction="column" p="md" align="center" gap="md">
        {title && <Text fz="2rem">{title}</Text>}
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
    </FramerMotionWrapper>
  );
};
