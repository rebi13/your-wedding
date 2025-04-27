'use client';

import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';
import { FooterProps } from '@/components/Footer';

// ⭐ dynamic imports
const CountDownSection = dynamic(() =>
  import('@/components/CountDown').then((mod) => mod.CountDown)
);
const FamilySection = dynamic(() => import('@/components/Family').then((mod) => mod.Family));
const GallerySection = dynamic(() => import('@/components/Gallery').then((mod) => mod.Gallery));
const GiftAccountSection = dynamic(() =>
  import('@/components/GiftAccount').then((mod) => mod.GiftAccount)
);
const GuestBooksSection = dynamic(() =>
  import('@/components/GuestBooks').then((mod) => mod.GuestBooks)
);
const ContactSection = dynamic(() => import('@/components/Contact').then((mod) => mod.Contact));
const FooterSection = dynamic(() => import('@/components/Footer').then((mod) => mod.Footer));

// ⭐ Wrapper 컴포넌트들
export const CountDown = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return <section ref={ref}>{inView && <CountDownSection />}</section>;
};

export const Family = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return <section ref={ref}>{inView && <FamilySection />}</section>;
};

export const Gallery = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return <section ref={ref}>{inView && <GallerySection />}</section>;
};

export const GiftAccount = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return <section ref={ref}>{inView && <GiftAccountSection />}</section>;
};

export const GuestBooks = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return <section ref={ref}>{inView && <GuestBooksSection />}</section>;
};

export const Contact = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return <section ref={ref}>{inView && <ContactSection />}</section>;
};

export const Footer = ({ thumbImageUrl }: FooterProps) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return <section ref={ref}>{inView && <FooterSection thumbImageUrl={thumbImageUrl} />}</section>;
};
