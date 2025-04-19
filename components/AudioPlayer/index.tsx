/* eslint-disable jsx-a11y/media-has-caption */
'use client';

import { useRef, useState } from 'react';
import { IconHeadphonesFilled, IconHeadsetOff } from '@tabler/icons-react';
import { ActionIcon, Flex } from '@mantine/core';

export const AudioPlayer = ({ src }: { src: string }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // 재생/정지 핸들러
  const togglePlay = () => {
    if (!audioRef.current) {
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((error) => {
        console.error('재생이 차단됨:', error);
      });
    }
    setIsPlaying((prev) => !prev);
  };

  return (
    <Flex w="100%" pos="absolute" justify="flex-end" p="md">
      {/* 오디오 요소 (반복 재생 활성화) */}
      <audio ref={audioRef} src={src} loop />

      {/* 재생/정지 아이콘 */}
      <ActionIcon size="xl" variant="outline" onClick={togglePlay} color="dark">
        {isPlaying ? <IconHeadphonesFilled size={32} /> : <IconHeadsetOff size={32} />}
      </ActionIcon>
    </Flex>
  );
};
