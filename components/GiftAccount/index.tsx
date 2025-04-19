import { Accordion, Button, Flex, Text } from '@mantine/core';
import useTotalController from '@/hooks/useTotalController';
import { copyToClipboard } from '@/utils/copyData';
import { FramerMotionWrapper } from '../FramerMotionWrapper';

export const GiftAccount = () => {
  const { totalData: data } = useTotalController();

  return (
    <FramerMotionWrapper>
      <Flex direction="column" gap="md" align="center" bg="#F9F9FB" p="lg">
        <Text fz="1rem" fw="bold">
          마음 전하실 곳
        </Text>
        <Text fz="sm" ta="center" style={{ whiteSpace: 'pre-line' }}>
          {data?.hostMessage}
        </Text>
        <Text fz="sm" ta="center" c="dimmed" style={{ whiteSpace: 'pre-line' }}>
          {data?.NoWreathMessage}
        </Text>
        {data?.hostInfo.map((item) => (
          <Accordion key={item.host} w="90%" variant="contained" bg="#FFFFFF">
            <Accordion.Item
              key={item.host}
              value={item.host}
              style={{ border: 'none', borderRadius: 0 }}
            >
              <Accordion.Control
                icon={item.emoji}
                bg="#FFFFFF"
                style={{ border: 'none', borderRadius: 0 }}
              >
                {item.host}
              </Accordion.Control>
              <Accordion.Panel bg="#FFFFFF">
                <Flex direction="column" gap="md">
                  {item.accountInfo.map((account) => (
                    <Flex
                      key={account.name}
                      justify="space-between"
                      p="sm"
                      align="center"
                      style={{ border: '1px solid gray', borderRadius: '1rem' }}
                    >
                      <Flex direction="column">
                        <Text>{account.relation}</Text>
                        <Text
                          fw={700}
                          onClick={() =>
                            copyToClipboard(`${account.account} ${account.bank} ${account.name}`)
                          }
                        >
                          {account.account}
                        </Text>
                        <Text>
                          {account.bank} {account.name}
                        </Text>
                      </Flex>
                      <Button
                        bg="gray"
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
          </Accordion>
        ))}
      </Flex>
    </FramerMotionWrapper>
  );
};
