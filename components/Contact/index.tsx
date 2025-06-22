'use client';

import { useEffect, useRef, useState } from 'react';
import { IconMap } from '@tabler/icons-react';
import { Button, Flex, Mark, Text } from '@mantine/core';
import { FramerMotionWrapper } from '@/components/FramerMotionWrapper';
import useTotalController from '@/hooks/useTotalController';

// 네이버 객체를 TypeScript에서 인식할 수 있도록 선언
declare global {
  interface Window {
    naver: any;
  }
}

// marker에 표시할 contet 내용
// const contentString = [
//   '<div style="padding:0;">',
//   '   <h3>그랜드오스티엄</h3>',
//   '   <p>인천 미추홀구 매소홀로 618</p><br /> ',
//   '</div>',
// ].join('');

const openNaverMapApp = () => {
  const lat = 37.4353079;
  const lng = 126.6918286;
  const name = encodeURIComponent('그랜드오스티엄');
  const appLink = `nmap://place?lat=${lat}&lng=${lng}&name=${name}`;

  // 앱이 없을 경우 웹으로 fallback
  const webFallback = `https://map.naver.com/v5/search/${name}?c=${lng},${lat},15,0,0,0,dh`;

  // 모바일일 경우 딥링크 시도 후 fallback
  window.location.href = appLink;

  setTimeout(() => {
    window.location.href = webFallback;
  }, 1500); // 앱이 없을 경우 fallback 시간
};

export const Contact = () => {
  const { totalData: data } = useTotalController();

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
        // minZoom: 15, //지도의 최소 줌 레벨
        // maxZoom: 15,
        // zoomControl: false,
        // draggable: false,
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
      //   content: '그랜드오스티엄',
      //   backgroundColor: '#FFFFFF',
      //   anchorColor: '#FFFFFF',
      // });

      // setInfoWindow(infowindow);

      // 마커 클릭 시 인포윈도우 열기/닫기
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
      mapScript.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId==${process.env.NEXT_MAP_CLIENT_ID}`;
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
    <FramerMotionWrapper>
      <Flex w="100%" justify="center" direction="column" align="center" gap="xs">
        <Flex w="100%" justify="center" align="center" direction="column" gap="0.2rem">
          <Text fz="1.2rem" fw="bold">
            LOCATION
          </Text>
          <Text fz="1.2rem">{data?.mapInfo.address1}</Text>
          <Text>{data?.mapInfo.address2}</Text>
          <br />
          {/* <Anchor href={`tel:${data?.mapInfo.tel}`}>{data?.mapInfo.tel}</Anchor> */}
        </Flex>
        <Flex w="95%" h="12rem" ref={mapElement} />
        <Button variant="outline" leftSection={<IconMap />} color="green" onClick={openNaverMapApp}>
          네이버 지도
        </Button>
        <Text w="100%" px="sm" pt="sm" fw="bold">
          대중교통 안내
        </Text>
        <Text w="100%" px="sm" ta="start" fz="0.9rem" style={{ whiteSpace: 'pre-line' }}>
          <Mark>{data?.mapInfo.subway}</Mark>
        </Text>
        <Text w="100%" px="sm" pt="sm" fw="bold">
          주차 안내
        </Text>
        <Text w="100%" px="sm" ta="start" fz="0.9rem" style={{ whiteSpace: 'pre-line' }}>
          <Mark>{data?.mapInfo.parking}</Mark>
        </Text>
      </Flex>
    </FramerMotionWrapper>
  );
};
