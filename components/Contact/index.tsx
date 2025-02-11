'use client';

import { useEffect, useRef, useState } from 'react';
import { Button, Flex } from '@mantine/core';

// 네이버 객체를 TypeScript에서 인식할 수 있도록 선언
declare global {
  interface Window {
    naver: any;
  }
}

export const Contact = () => {
  const mapElement = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [centerMarker, setCenterMarker] = useState<any>(null);

  useEffect(() => {
    const initMap = () => {
      if (!window.naver || !window.naver.maps || !mapElement.current) return;

      // "x": "126.6907208",
      //       "y": "37.4352191",

      const initialCenter = new window.naver.maps.LatLng(37.4352191, 126.6907208);
      const mapOptions = {
        center: initialCenter,
        zoom: 14,
      };

      const mapInstance = new window.naver.maps.Map(mapElement.current, mapOptions);
      setMap(mapInstance);

      // 중심 마커 생성
      const marker = new window.naver.maps.Marker({
        position: initialCenter,
        map: mapInstance,
        title: '중심 위치',
      });

      setCenterMarker(marker);

      // 지도 이동 이벤트 리스너 추가 (지도 이동 시 마커 위치 업데이트)
      window.naver.maps.Event.addListener(mapInstance, 'center_changed', () => {
        const newCenter = mapInstance.getCenter();
        marker.setPosition(newCenter);
      });
    };

    if (window.naver && window.naver.maps) {
      initMap();
    } else {
      const mapScript = document.createElement('script');
      mapScript.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`;
      mapScript.async = true;
      mapScript.onload = initMap;
      document.head.appendChild(mapScript);
    }
  }, []);

  // 현재 중심 좌표 가져오기 버튼
  const getCurrentCenter = () => {
    if (map) {
      const center = map.getCenter();
      alert(`현재 중심 좌표: ${center.lat()}, ${center.lng()}`);
    }
  };

  return (
    <Flex w="100%" justify="center" direction="column" align="center">
      <h2>오시는 길 - 네이버 지도</h2>
      <Button onClick={getCurrentCenter} mt="10px">
        현재 중심 좌표 확인
      </Button>
      <div ref={mapElement} style={{ width: '100%', height: '400px', marginTop: '10px' }} />
    </Flex>
  );
};
