'use client';

/* The four layers assemble as the reader scrolls: each layer arrives,
   the current one holds full presence, and the narration to the side
   speaks for it. */

import { useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useMotionValueEvent } from 'motion/react';

const LAYERS = [
  {
    n: '介面', hero: false,
    t: '你',
    d: 'Discord 頻道、終端機，任何一台裝了 Claude Code 的機器',
    say: '怎麼跟它說話，它不在乎。同一個 agent，同一套行為。',
  },
  {
    n: 'Agent', hero: true,
    t: 'CLAUDE.md 行為憲法 ＋ 14 個技能',
    d: '判斷都發生在這一層',
    say: '技能是人看得懂的作業程序。遇到沒見過的狀況，它讀的是原則，不是分支。',
  },
  {
    n: '儀器', hero: false,
    t: '29 個工具，只算數與把關',
    d: '仲裁 · 零容差比價 · 人數探測 · 字典 · 稽核 · Kill Switch · 憑證遮蔽',
    say: '算術與安全放在程式裡，因為安全標準不能隨模型版本漂移。',
  },
  {
    n: '連線', hero: false,
    t: '4 條對外連線（MCP）',
    d: '官網爬取 · 訂位系統房況報價 · 你們後台 · Asana 票卡',
    say: '唯一碰得到外面的程式碼。每一次呼叫都進稽核日誌。',
  },
  {
    n: '外部', hero: false,
    t: '酒店官網 · 訂位系統（Amadeus GDS） · COT 後台（ADM） · Asana',
    d: '三個會互相打架的來源，加一個控制面',
    say: '沒有單一真相，所以每個欄位都先指定聽誰的。這件事本身就是下一章。',
  },
];

export default function ArchScene() {
  const track = useRef<HTMLDivElement>(null);
  const [cur, setCur] = useState(0);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: track, offset: ['start start', 'end end'] });
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setCur(Math.min(LAYERS.length - 1, Math.floor(v * LAYERS.length)));
  });

  return (
    <div className="story" ref={track}>
      <div className="frame-stick">
        <div className="kick">Architecture</div>
        <h2>四層，加一份會長大的記憶</h2>
        <div className="scene">
          <div className="arch">
            {LAYERS.map((l, i) => {
              const arrived = i <= cur;
              const isCur = i === cur;
              return (
                <motion.div
                  key={l.n}
                  className={l.hero ? 'alayer hero dim-target' : 'alayer dim-target'}
                  initial={false}
                  animate={
                    reduced
                      ? { opacity: arrived ? (isCur ? 1 : 0.55) : 0.12 }
                      : {
                          opacity: arrived ? (isCur ? 1 : 0.55) : 0.12,
                          y: arrived ? 0 : 16,
                          scale: isCur ? 1.02 : 1,
                        }
                  }
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  <span className="an">{String(i + 1).padStart(2, '0')} · {l.n}</span>
                  <strong>{l.t}</strong>
                  <div className="ad">{l.d}</div>
                </motion.div>
              );
            })}
          </div>
          <div>
            <motion.p
              key={cur}
              className="voice"
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              {LAYERS[cur].say}
            </motion.p>
            <p className="tiny" style={{ marginTop: '1.2rem' }}>
              記憶分三處：<code>data/</code> 程式讀的字典與對照 · <code>knowledge/</code> 人讀的酒店頁與 58 條經驗 · <code>runs/</code> 一案一卷的證據。
            </p>
          </div>
        </div>
      </div>
      {LAYERS.map((l) => (
        <div key={l.n} className="beat-space" aria-hidden="true" />
      ))}
    </div>
  );
}
