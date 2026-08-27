'use client';

import { useEffect, useState } from 'react';

export type TocItem = { id: string; num: string; title: string };

export default function Nav({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? '');

  useEffect(() => {
    const seen = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) seen.set(e.target.id, e.intersectionRatio);
        // the highest visible section wins; ties go to the one nearest the top
        let best = '';
        let bestRatio = 0;
        for (const it of items) {
          const r = seen.get(it.id) ?? 0;
          if (r > bestRatio + 0.01) { best = it.id; bestRatio = r; }
        }
        if (best) setActive(best);
      },
      { rootMargin: '-10% 0px -55% 0px', threshold: [0, 0.1, 0.3, 0.6] },
    );
    for (const it of items) {
      const el = document.getElementById(it.id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, [items]);

  return (
    <nav className="toc" aria-label="章節">
      {items.map((it) => (
        <a key={it.id} href={`#${it.id}`} className={active === it.id ? 'on' : undefined}>
          <span className="n">{it.num}</span>
          <span>{it.title}</span>
        </a>
      ))}
    </nav>
  );
}
