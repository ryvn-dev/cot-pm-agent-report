import type { Metadata } from 'next';
import { Jost, Noto_Sans_TC, Noto_Serif_TC } from 'next/font/google';
import './globals.css';

// next/font downloads these at build time and serves them from _next/static —
// no Google request at view time, which is what lets the export open offline.
const jost = Jost({ subsets: ['latin'], weight: ['400', '500'], variable: '--f-label' });
const sans = Noto_Sans_TC({ subsets: ['latin'], weight: ['400', '500', '700'], variable: '--f-body' });
const serif = Noto_Serif_TC({ subsets: ['latin'], weight: ['700', '900'], variable: '--f-display' });

export const metadata: Metadata = {
  title: 'AI 產品專員 Agent',
  description: 'COT AI 產品專員 Agent：架構、工程護欄、學習迴路與 PRD v3.2 對應',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant" className={`${jost.variable} ${sans.variable} ${serif.variable}`}>
      <head>
        {/* Relative favicon path — the site is served from a sub-path on
            GitHub Pages, so an absolute /icon.svg would 404 there. */}
        <link rel="icon" type="image/svg+xml" href="./icon.svg" />
        {/* The storyteller face. Not in next/font's list, so it loads at view
            time and degrades to Kaiti TC offline — accent text only. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=LXGW+WenKai+TC:wght@400;700&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
