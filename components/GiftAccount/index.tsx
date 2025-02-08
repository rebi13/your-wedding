import { Accordion, Button, Flex, Text } from '@mantine/core';
import { FramerMotionWrapper } from '../FramerMotionWrapper';

const groomSideInfo = [
  {
    emoji: '🤵‍♂️',
    value: '신랑측',
  },
];

const brideSideInfo = [
  {
    emoji: '🤵‍♀️',
    value: '신부측',
  },
];

export const GiftAccount = () => {
  return (
    <FramerMotionWrapper>
      <Accordion>
        {groomSideInfo.map((item) => (
          <Accordion.Item key={item.value} value={item.value}>
            <Accordion.Control icon={item.emoji}>{item.value}</Accordion.Control>
            <Accordion.Panel>
              <Flex direction="column" gap="md">
                <Flex justify="space-between" align="center">
                  <Flex direction="column">
                    <Text>신랑</Text>
                    <Text>01012345678</Text>
                    <Text>기업은행 송재인</Text>
                  </Flex>
                  <Button>복사</Button>
                </Flex>
                <Flex justify="space-between" align="center">
                  <Flex direction="column">
                    <Text>신랑</Text>
                    <Text>01012345678</Text>
                    <Text>기업은행 송재인</Text>
                  </Flex>
                  <Button>복사</Button>
                </Flex>
              </Flex>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
      <Accordion>
        {brideSideInfo.map((item) => (
          <Accordion.Item key={item.value} value={item.value}>
            <Accordion.Control icon={item.emoji}>{item.value}</Accordion.Control>
            <Accordion.Panel>
              <Flex direction="column" gap="md">
                <Flex justify="space-between" align="center">
                  <Flex direction="column">
                    <Text>신부</Text>
                    <Text>01087654321</Text>
                    <Text>기업은행 최하슬</Text>
                  </Flex>
                  <Button>복사</Button>
                </Flex>
                <Flex justify="space-between" align="center">
                  <Flex direction="column">
                    <Text>신부</Text>
                    <Text>01087654321</Text>
                    <Text>기업은행 최하슬</Text>
                  </Flex>
                  <Button>복사</Button>
                </Flex>
              </Flex>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </FramerMotionWrapper>
  );
};
