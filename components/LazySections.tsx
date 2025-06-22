'use client';

import dynamic from 'next/dynamic';
import { useInViewport } from '@mantine/hooks';
import { FooterProps } from '@/components/Footer';
import { FramerMotionWrapper } from './FramerMotionWrapper';

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
  const { ref, inViewport } = useInViewport();

  return <section ref={ref}>{inViewport && <CountDownSection />}</section>;
};

export const Family = () => {
  const { ref, inViewport } = useInViewport();

  return <section ref={ref}>{inViewport && <FamilySection />}</section>;
};

export const Gallery = () => {
  const { ref, inViewport } = useInViewport();

  return (
    <section ref={ref} style={{ minHeight: '45rem' }}>
      <FramerMotionWrapper preload inView={inViewport}>
        <GallerySection />
      </FramerMotionWrapper>
    </section>
  );
};

export const GiftAccount = () => {
  const { ref, inViewport } = useInViewport();

  return (
    <section ref={ref} style={{ minHeight: '20rem' }}>
      {inViewport && <GiftAccountSection />}
    </section>
  );
};

export const GuestBooks = () => {
  const { ref, inViewport } = useInViewport();

  return (
    <section ref={ref} style={{ minHeight: '40rem' }}>
      <FramerMotionWrapper preload inView={inViewport}>
        <GuestBooksSection />
      </FramerMotionWrapper>
    </section>
  );
};

export const Contact = () => {
  const { ref, inViewport } = useInViewport();

  return (
    <section ref={ref} style={{ minHeight: '20rem' }}>
      {inViewport && <ContactSection />}
    </section>
  );
};

export const Footer = ({ thumbImageUrl }: FooterProps) => {
  const { ref } = useInViewport();

  return (
    <section ref={ref}>
      <FramerMotionWrapper>
        <FooterSection thumbImageUrl={thumbImageUrl} />
      </FramerMotionWrapper>
    </section>
  );
};
