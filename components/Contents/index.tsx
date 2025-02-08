'use client';

import { motion } from 'framer-motion';
import { Flex, Text, Title } from '@mantine/core';

interface ContentsProps {
  title?: string;
  contents: string[];
}

export const Contents = ({ title, contents }: ContentsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{
        ease: 'easeInOut',
        duration: 2,
        y: { duration: 1 },
      }}
    >
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
    </motion.div>
  );
};
