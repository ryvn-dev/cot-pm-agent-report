'use client';

/* The camera move between chapters. As a section crosses into view it
   arrives from depth — scaled down, softened, slightly below — and
   settles into the page plane; leaving, it drifts forward past the
   camera. Sticky scenes must NOT be wrapped in this: a continuously
   transformed ancestor re-anchors position:sticky and the pin drifts. */

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

export default function SectionFx({
  id,
  children,
  className = 'sec',
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 96%', 'start 30%'],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.25, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [46, 0]);
  const blur = useTransform(scrollYProgress, (v) => `blur(${((1 - v) * 7).toFixed(1)}px)`);

  if (reduced) {
    return (
      <section id={id} className={className} ref={ref}>
        {children}
      </section>
    );
  }
  return (
    <motion.section
      id={id}
      className={className}
      ref={ref}
      style={{ scale, opacity, y, filter: blur, transformOrigin: '50% 20%' }}
    >
      {children}
    </motion.section>
  );
}
