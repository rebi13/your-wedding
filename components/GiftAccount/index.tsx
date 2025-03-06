import { Accordion, Button, Flex, Text } from '@mantine/core';
import useTotalController from '@/hooks/useTotalController';
import { copyToClipboard } from '@/utils/copyData';
import { FramerMotionWrapper } from '../FramerMotionWrapper';

export const GiftAccount = () => {
  const { totalData: data } = useTotalController();

  return (
    <FramerMotionWrapper>
      <Flex direction="column" gap="md">
        <Text ta="center" style={{ whiteSpace: 'pre-line' }}>
          {data?.hostMessage}
        </Text>
        <Accordion>
          {data?.hostInfo.map((item) => (
            <Accordion.Item
              key={item.host}
              value={item.host}
              style={{ borderTop: '1px solid var(--item-border-color)' }}
            >
              <Accordion.Control icon={item.emoji}>{item.host}</Accordion.Control>
              <Accordion.Panel>
                <Flex direction="column" gap="md">
                  {item.accountInfo.map((account) => (
                    <Flex
                      key={account.name}
                      justify="space-between"
                      p="sm"
                      align="center"
                      style={{ border: '1px solid #D7C8C2' }}
                    >
                      <Flex direction="column">
                        <Text>{account.relation}</Text>
                        <Text>{account.account}</Text>
                        <Text>
                          {account.bank} {account.name}
                        </Text>
                      </Flex>
                      <Button
                        bg="orange"
                        onClick={() =>
                          copyToClipboard(`${account.account} ${account.bank} ${account.name}`)
                        }
                      >
                        복사
                      </Button>
                    </Flex>
                  ))}
                </Flex>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Flex>
    </FramerMotionWrapper>
  );
};
