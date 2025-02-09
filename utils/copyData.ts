import { notifications } from '@mantine/notifications';

export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    notifications.show({
      title: '따듯한 마음 전달',
      message: '계좌 번호를 복사했습니다.',
      color: 'blue',
    });
  } catch (error) {
    notifications.show({
      title: '따듯한 마음 전달 중',
      message: '다시 시도해 주세요.',
      color: 'red',
    });
  }
};
