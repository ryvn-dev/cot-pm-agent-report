'use client';

/* Block entrances, slide-transition style: each block names its axis.
   y — rises from below · x — slides in from the left · xr — from the
   right · z — arrives from depth (scale + blur). Once only; scrolling
   back must not replay the show. */

import { motion, useReducedMotion } from 'motion/react';

type Axis = 'y' | 'x' | 'xr' | 'z';

const FROM: Record<Axis, Record<string, number | string>> = {
  y: { opacity: 0, y: 30 },
  x: { opacity: 0, x: -48 },
  xr: { opacity: 0, x: 48 },
  z: { opacity: 0, scale: 0.9, y: 14, filter: 'blur(8px)' },
};
const AT: Record<string, number | string> = { opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px)' };

export default function Reveal({
  children,
  delay = 0,
  axis = 'y',
  as = 'div',
}: {
  children: React.ReactNode;
  delay?: number;
  axis?: Axis;
  as?: 'div' | 'section' | 'figure';
}) {
  const reduced = useReducedMotion();
  const M = motion[as];
  if (reduced) {
    const Tag = as;
    return <Tag>{children}</Tag>;
  }
  return (
    <M
      initial={FROM[axis]}
      whileInView={AT}
      viewport={{ once: true, margin: '0px 0px -14% 0px' }}
      transition={{ duration: axis === 'z' ? 0.7 : 0.55, delay, ease: [0.22, 0.8, 0.36, 1] }}
    >
      {children}
    </M>
  );
}
