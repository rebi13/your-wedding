'use client';

import { useEffect, useState } from 'react';
import { IconBrandKakoTalk, IconLink } from '@tabler/icons-react';
import { Button, Flex, Text } from '@mantine/core';
import useTotalController from '@/hooks/useTotalController';
import { shareLink } from '@/utils/shareLink';

interface FooterProps {
  thumbImageUrl: string;
}

export const Footer = ({ thumbImageUrl }: FooterProps) => {
  const { totalData: data } = useTotalController();
  const [isKakaoReady, setIsKakaoReady] = useState(false);

  const handleShare = async () => {
    try {
      await shareLink({
        title: document.title,
        text: '청첩장을 공유합니다.',
        url: window.location.href,
      });
    } catch (error) {
      // 타입 단언을 통해 에러 메시지 처리
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        // `error`가 객체 또는 문자열일 수 있음
        throw new Error(String(error));
      }
    }
  };

  useEffect(() => {
    // SDK가 존재하고 초기화되지 않았다면 초기화
    if (typeof window !== 'undefined' && window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_JAVASCRIPT_KEY);
      setIsKakaoReady(true);
    } else if (window.Kakao?.isInitialized()) {
      setIsKakaoReady(true);
    }
  }, []);

  const handleKakaoShare = () => {
    if (!window.Kakao || !isKakaoReady) {
      return;
    }

    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: process.env.NEXT_PUBLIC_OG_TITLE,
        description: process.env.NEXT_PUBLIC_OG_DESC,
        imageUrl: `${thumbImageUrl}?v=${Date.now()}`,
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
      buttons: [
        {
          title: '청첩장 보기',
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
      ],
    });
  };

  return (
    <Flex direction="column" p="md" gap="xs" w="100%" align="center" mb="md">
      <Text>For Your Wedding</Text>
      <Text fw="bold">{data?.madeBy}</Text>
      <Flex w="100%" gap="xs">
        <Button
          w="100%"
          color="yellow"
          leftSection={<IconBrandKakoTalk />}
          onClick={() => handleKakaoShare()}
        >
          카카오톡 공유하기
        </Button>
        <Button w="100%" leftSection={<IconLink />} onClick={() => handleShare()}>
          링크 공유하기
        </Button>
      </Flex>
      {/* <Button onClick={() => handleShare()}>링크 공유하기</Button>
      <Button color="orange" variant="subtle" onClick={handleKakaoShare}>
        카카오톡으로 공유하기
      </Button> */}
    </Flex>
  );
};
