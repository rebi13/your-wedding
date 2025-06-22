'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
// import { useInView } from 'react-intersection-observer';
import { useIntersection } from '@mantine/hooks';
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
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 0.15,
  });

  // const { ref, inView } = useInView({
  //   triggerOnce: true,
  //   threshold: 0.15,
  //   rootMargin: '600px 0px', // 🔥 미리 감지
  // });

  return (
    <section ref={containerRef}>
      <section ref={ref}>{entry?.isIntersecting && <CountDownSection />}</section>
    </section>
  );
};

export const Family = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 0.15,
  });
  // const { ref, inView } = useInView({
  //   triggerOnce: true,
  //   threshold: 0.15,
  //   rootMargin: '600px 0px', // 🔥 미리 감지
  // });

  return (
    <section ref={containerRef}>
      <section ref={ref}>{entry?.isIntersecting && <FamilySection />}</section>
    </section>
  );
};

export const Gallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 0.15,
  });
  // const { ref, inView } = useInView({
  //   triggerOnce: true,
  //   threshold: 0.15,
  //   rootMargin: '600px 0px', // 🔥 미리 감지
  // });

  return (
    <section ref={containerRef}>
      <section ref={ref}>
        <FramerMotionWrapper preload inView={entry?.isIntersecting}>
          <GallerySection />
        </FramerMotionWrapper>
      </section>
    </section>
  );
};

export const GiftAccount = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 0.15,
  });
  // const { ref, inView } = useInView({
  //   triggerOnce: true,
  //   threshold: 0.15,
  //   rootMargin: '600px 0px', // 🔥 미리 감지
  // });

  return (
    <section ref={containerRef}>
      <section ref={ref}>{entry?.isIntersecting && <GiftAccountSection />}</section>
    </section>
  );
};

export const GuestBooks = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 0.15,
  });
  // const { ref, inView } = useInView({
  //   triggerOnce: true,
  //   threshold: 0.15,
  //   rootMargin: '600px 0px', // 🔥 미리 감지
  // });

  return (
    <section ref={containerRef}>
      <section ref={ref}>
        <FramerMotionWrapper preload inView={entry?.isIntersecting}>
          <GuestBooksSection />
        </FramerMotionWrapper>
      </section>
    </section>
  );
};

export const Contact = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 0.15,
  });
  // const { ref, inView } = useInView({
  //   triggerOnce: true,
  //   threshold: 0.15,
  //   rootMargin: '600px 0px', // 🔥 미리 감지
  // });

  return (
    <section ref={containerRef}>
      <section ref={ref}>{entry?.isIntersecting && <ContactSection />}</section>
    </section>
  );
};

export const Footer = ({ thumbImageUrl }: FooterProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 0.15,
  });
  // const { ref, inView } = useInView({
  //   triggerOnce: true,
  //   threshold: 0.15,
  //   rootMargin: '600px 0px', // 🔥 미리 감지
  // });

  return (
    <section ref={containerRef}>
      <section ref={ref}>
        {entry?.isIntersecting && <FooterSection thumbImageUrl={thumbImageUrl} />}
      </section>
    </section>
  );
};
