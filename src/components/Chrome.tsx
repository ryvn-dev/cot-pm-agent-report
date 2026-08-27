'use client';

/* The frosted top bar, the reading-progress hairline, and Lenis inertia
   scrolling. The bar stays hidden over the cover and slides in once the
   story starts, so the opening screen belongs entirely to the title. */

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import Lenis from 'lenis';

export type Chapter = { id: string; title: string };

export default function Chrome({ chapters }: { chapters: Chapter[] }) {
  const [show, setShow] = useState(false);
  const [active, setActive] = useState('');
  const lenisRef = useRef<Lenis | null>(null);

  const { scrollYProgress } = useScroll();
  const prog = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduced) {
      const lenis = new Lenis({ lerp: 0.12 });
      lenisRef.current = lenis;
      let raf = 0;
      const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
      raf = requestAnimationFrame(loop);
      return () => { cancelAnimationFrame(raf); lenis.destroy(); };
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.65);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ratio = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) ratio.set(e.target.id, e.intersectionRatio);
        let best = ''; let r = 0.02;
        for (const c of chapters) {
          const v = ratio.get(c.id) ?? 0;
          if (v > r) { best = c.id; r = v; }
        }
        if (best) setActive(best);
      },
      { rootMargin: '-15% 0px -40% 0px', threshold: [0, 0.05, 0.2, 0.5] },
    );
    for (const c of chapters) {
      const el = document.getElementById(c.id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, [chapters]);

  const jump = (id: string) => (ev: React.MouseEvent) => {
    ev.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    if (lenisRef.current) lenisRef.current.scrollTo(el, { offset: -64 });
    else el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={show ? 'bar show' : 'bar'}>
      <span className="t">AI 產品專員 Agent</span>
      <nav aria-label="章節">
        {chapters.map((c) => (
          <a key={c.id} href={`#${c.id}`} onClick={jump(c.id)} className={active === c.id ? 'on' : undefined}>
            {c.title}
          </a>
        ))}
      </nav>
      <motion.span className="prog" style={{ scaleX: prog }} aria-hidden="true" />
    </header>
  );
}
