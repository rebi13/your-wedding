import localFont from 'next/font/local';

export const GyeonggiCheonnyeon = localFont({
  src: './GyeonggiCheonnyeon.woff',
  display: 'swap', // or 'block', 'fallback' 등
  weight: '400',
  variable: '--font-gyeonggi', // optional (CSS 변수로도 활용 가능)
});
