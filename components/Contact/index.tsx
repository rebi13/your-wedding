'use client';

import { useEffect, useRef, useState } from 'react';
import { Flex } from '@mantine/core';

// 네이버 객체를 TypeScript에서 인식할 수 있도록 선언
declare global {
  interface Window {
    naver: any;
  }
}

// marker에 표시할 contet 내용
// const contentString = [
//   '<div style="padding: 1rem;">',
//   '   <h3>그랜드오스티엄</h3>',
//   '   <p>인천 미추홀구 매소홀로 618</p><br /> ',
//   '</div>',
// ].join('');

export const Contact = () => {
  const mapElement = useRef<HTMLDivElement>(null);
  const [_map, setMap] = useState<any>(null);
  const [_centerMarker, setCenterMarker] = useState<any>(null);
  // const [infoWindow, setInfoWindow] = useState<any>(null);

  useEffect(() => {
    const initMap = () => {
      if (!window.naver || !window.naver.maps || !mapElement.current) {
        return;
      }

      const initialCenter = new window.naver.maps.LatLng(37.4353079, 126.6918286);
      const mapOptions = {
        center: initialCenter,
        zoom: 15,
        zoomControl: true,
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

      // const infowindow = new window.naver.maps.InfoWindow({
      //   content: contentString,
      //   maxWidth: 200,
      //   backgroundColor: '#eee',
      //   anchorColor: '#eee',
      // });

      // setInfoWindow(infowindow);

      // // 마커 클릭 시 인포윈도우 열기/닫기
      // window.naver.maps.Event.addListener(marker, 'click', () => {
      //   if (infowindow.getMap()) {
      //     infowindow.close();
      //   } else {
      //     infowindow.open(mapInstance, marker);
      //   }
      // });
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

  // useEffect(() => {
  //   // map과 marker가 존재할 때만 InfoWindow를 열도록 수정
  //   if (map && centerMarker && infoWindow) {
  //     infoWindow.open(map, centerMarker);
  //   }
  // }, [map, centerMarker, infoWindow]);

  return (
    <Flex w="100%" justify="center" direction="column" align="center">
      <h2>오시는 길 - 네이버 지도</h2>
      <Flex w="90%" h="25rem" ref={mapElement} />
    </Flex>
  );
};
