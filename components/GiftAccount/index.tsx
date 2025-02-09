import { Accordion, Button, Flex, Text } from '@mantine/core';
import { copyToClipboard } from '@/utils/copyData';
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
                    <Text>01011112222</Text>
                    <Text>기업은행 강건우</Text>
                  </Flex>
                  <Button
                    bg="orange"
                    onClick={() => copyToClipboard('01011112222 기업은행 강건우')}
                  >
                    복사
                  </Button>
                </Flex>
                <Flex justify="space-between" align="center">
                  <Flex direction="column">
                    <Text>신랑 아버지</Text>
                    <Text>01022223333</Text>
                    <Text>우리은행 강명성</Text>
                  </Flex>
                  <Button
                    bg="orange"
                    onClick={() => copyToClipboard('01022223333 우리은행 강명성')}
                  >
                    복사
                  </Button>
                </Flex>
                <Flex justify="space-between" align="center">
                  <Flex direction="column">
                    <Text>신랑 어머니</Text>
                    <Text>01033334444</Text>
                    <Text>국민은행 이수정</Text>
                  </Flex>
                  <Button
                    bg="orange"
                    onClick={() => copyToClipboard('01033334444 국민은행 이수정')}
                  >
                    복사
                  </Button>
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
                    <Text>01044445555</Text>
                    <Text>카카오뱅크 하유리</Text>
                  </Flex>
                  <Button
                    bg="orange"
                    onClick={() => copyToClipboard('01044445555 카카오뱅크 하유리')}
                  >
                    복사
                  </Button>
                </Flex>
                <Flex justify="space-between" align="center">
                  <Flex direction="column">
                    <Text>신부 아버지</Text>
                    <Text>01055556666</Text>
                    <Text>신한은행 하주석</Text>
                  </Flex>
                  <Button
                    bg="orange"
                    onClick={() => copyToClipboard('01055556666 신한은행 하주석')}
                  >
                    복사
                  </Button>
                </Flex>
                <Flex justify="space-between" align="center">
                  <Flex direction="column">
                    <Text>신부 어머니</Text>
                    <Text>01066667777</Text>
                    <Text>케이뱅크 김소영</Text>
                  </Flex>
                  <Button
                    bg="orange"
                    onClick={() => copyToClipboard('01066667777 케이뱅크 김소영')}
                  >
                    복사
                  </Button>
                </Flex>
              </Flex>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </FramerMotionWrapper>
  );
};
