import { notifications } from '@mantine/notifications';

export const shareLink = async (options: { title: string; text: string; url: string }) => {
  const { title, text, url } = options;

  if (navigator.share) {
    try {
      await navigator.share({ title, text, url });
      notifications.show({
        title: '청첩장 공유 성공',
        message: '청첩장을 공유했습니다! 🌟',
        color: 'blue',
      });
    } catch (error) {
      notifications.show({
        title: '청첩장 공유 실패',
        message: '청첩장 공유에 실패했습니다.',
        color: 'red',
      });
      throw new Error('청첩장 공유에 실패했습니다.');
    }
  } else {
    try {
      await navigator.clipboard.writeText(url);
      notifications.show({
        title: '청첩장 복사 성공',
        message: '청첩장를 복사했습니다! 🌟',
        color: 'blue',
      });
    } catch (error) {
      notifications.show({
        title: '청첩장 복사 실패',
        message: '청첩장 복사에 실패했습니다.',
        color: 'red',
      });
      throw new Error('청첩장 복사에 실패했습니다.');
    }
  }
};
