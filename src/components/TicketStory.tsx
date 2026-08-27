'use client';

/* The spine of the report: one real ticket walked through the pipeline.
   The scene pins; scrolling advances the beats. The ticket card on the
   left transforms as the agent works on it, the step list on the right
   lights up in sync. */

import { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useMotionValueEvent } from 'motion/react';

const BEATS = [
  {
    step: '收票',
    desc: '一句話，沒有代碼，沒有欄位名',
    card: {
      tag: 'Asana · 原始票卡',
      title: '「Park Hyatt Saigon 查不到房(高價值客人急單)」',
      body: <>就這一行。哪間酒店？系統裡叫什麼？哪個環節壞了？都還不知道。</>,
    },
  },
  {
    step: '分診',
    desc: '判類別、抽出實體',
    card: {
      tag: '分診',
      title: '這是「訂不到房」類的票',
      body: <>從語氣抽出兩件事：酒店名「Park Hyatt Saigon」，和「急」。這個分類步驟在你們給的 50 個真實案例上測出 50/50 全對。</>,
    },
  },
  {
    step: '解析酒店',
    desc: '名稱 → Amadeus 代碼，查不出就說查不出',
    card: {
      tag: '酒店對照表 · 1,762 間',
      title: <>Park Hyatt Saigon → <code>HYSGNSGN</code></>,
      body: <>同城同名、跨品牌、跨洲的相似名一律拒絕比對。解析不出來的票會標 <code>待確認</code>，它不猜。</>,
    },
  },
  {
    step: '蒐證',
    desc: '官網、訂位系統、你們後台，三邊各自問',
    card: {
      tag: '蒐證 · 三個來源',
      title: 'GDS 回了 13 間房、50 個方案',
      body: <>官網爬房型與政策，訂位系統查可售與報價，後台撈現有資料當基準。每個回應去除金鑰後留在案卷裡，之後任何數字都能回查。</>,
    },
  },
  {
    step: '仲裁',
    desc: '先問聽誰的 → 再問誰較新 → 最後才比後台',
    card: {
      tag: '仲裁',
      title: '10 組對上了，40 個疑似新方案',
      body: <>結論分三色：綠=一致、黃=有差異、紅=取不到。查不到的格子寫明為什麼，不會空著或猜一個。</>,
    },
  },
  {
    step: '提案 → 人審 → 存檔',
    desc: '專員核准後回寫票卡，學到的寫回 repo',
    card: {
      tag: '提案卡',
      title: '一張待核准的提案卡',
      body: <>每格帶證據與 run version。專員核准後回寫原票卡；這次學到的房型對照存進 repo，下次同一間酒店免費。</>,
    },
  },
];

export default function TicketStory() {
  const track = useRef<HTMLDivElement>(null);
  const [beat, setBeat] = useState(0);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: track, offset: ['start start', 'end end'] });
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const i = Math.min(BEATS.length - 1, Math.floor(v * BEATS.length));
    setBeat(i);
  });

  const b = BEATS[beat];

  return (
    <div className="story" ref={track}>
      <div className="frame-stick">
        <div className="kick">One ticket, start to finish</div>
        <h2>跟一張票走完全程</h2>
        <div className="scene">
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={beat}
                className="ticket"
                initial={reduced ? false : { opacity: 0, y: 18, rotate: -0.6 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -14 }}
                transition={{ duration: 0.34, ease: 'easeOut' }}
              >
                <div className="th">
                  <span>{b.card.tag}</span>
                  <span>{String(beat + 1).padStart(2, '0')} / {String(BEATS.length).padStart(2, '0')}</span>
                </div>
                <div className="tt">{b.card.title}</div>
                <div className="tb">{b.card.body}</div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="steps" role="list">
            {BEATS.map((s, i) => (
              <div key={s.step} role="listitem" className={i === beat ? 'step on' : 'step'} aria-current={i === beat}>
                <span className="sn">{String(i + 1).padStart(2, '0')}</span>
                <span>
                  <span className="st">{s.step}</span>
                  <span className="sd">{s.desc}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* scroll runway: one viewport per beat */}
      {BEATS.map((s) => (
        <div key={s.step} className="beat-space" aria-hidden="true" />
      ))}
    </div>
  );
}
