'use client';

/* The deliverable IS a folder — so show the folder. Click a path on the
   left; the right panel answers four things in plain words: what lives
   here, how much of it, what happens when something writes to it, and
   WHEN in a case's life this folder is touched (the moment strip).
   The write-rules shown are the same ones save-work.sh enforces, so
   this chapter and the harness chapter describe one system twice. */

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

type Rule = 'free' | 'suite' | 'readonly' | 'local';

const RULE_LABEL: Record<Rule, string> = {
  free: '存檔直接推，不設閘門',
  suite: '動它要先過 74 項自測',
  readonly: '你們的資料 — 只讀，拒絕改寫',
  local: '只在本機，永遠不離開這台機器',
};
const RULE_TONE: Record<Rule, string> = {
  free: 'ok',
  suite: 'info',
  readonly: 'warn',
  local: 'off',
};

/* moments: [開工， 執行中， 存檔] — which beats of a case touch this path */
type Dir = {
  path: string;
  hook: string;
  group: string;
  rule: Rule;
  count: string;
  countNote: string;
  sample?: string;
  moments: [boolean, boolean, boolean];
  momentNote: string;
  desc: React.ReactNode;
};

const DIRS: Dir[] = [
  {
    path: 'CLAUDE.md', hook: '行為守則', group: '它怎麼做事', rule: 'suite',
    count: '1', countNote: '份守則，開工讀一次',
    moments: [true, false, false], momentNote: '每個工作階段開始時讀一次，之後不再回頭看',
    desc: <>它的行為守則：只提案不落地、查不到就說查不到、對外動作先問人。
      只放「從第一個動作起就必須成立」的規則，細節放到別處按需要讀。</>,
  },
  {
    path: '.claude/skills/', hook: '作業程序', group: '它怎麼做事', rule: 'suite',
    count: '14', countNote: '個技能，一個資料夾一個',
    sample: '.claude/skills/room-level-report/SKILL.md',
    moments: [false, true, false], momentNote: '分診之後，對應類型的技能被載入照著做',
    desc: <>人看得懂的作業程序：分診、五類任務的處理法、訂位代碼怎麼對、官網怎麼爬（含改版自我修復）、
      找不到的欄位怎麼追、學到的東西怎麼存。改一個技能等同改它的行為，所以和改程式同樣要過自測。</>,
  },
  {
    path: 'instruments/', hook: '儀器', group: '它怎麼做事', rule: 'suite',
    count: '29', countNote: '個只算數與把關的工具',
    sample: 'instruments/compare/arbitration.py',
    moments: [false, true, false], momentNote: '執行中被技能呼叫：算好攤開，判斷仍歸 agent',
    desc: <>仲裁、零容差比價、人數探測、字典查詢、稽核紀錄、緊急停止開關、金鑰遮蔽。
      兩邊不同意時以 agent 為準，然後回頭修儀器。分數是證據，不是判決。</>,
  },
  {
    path: 'connectors/', hook: '對外連線', group: '它怎麼做事', rule: 'suite',
    count: '4', countNote: '條連線：官網爬取 · 訂位系統 · 你們後台 · Asana',
    moments: [false, true, false], momentNote: '蒐證時唯一碰得到外面的程式，每次呼叫都留稽核紀錄',
    desc: <>唯一能接觸外部系統的程式碼。金鑰不經過設定檔傳遞，由讀取器自己載入，
      所以無論從哪種介面啟動，行為一致。</>,
  },
  {
    path: 'commands/', hook: '驗收入口', group: '它怎麼做事', rule: 'suite',
    count: '4', countNote: '支可直接執行的評測',
    sample: 'python3 commands/room_level.py HYSGNSGN',
    moments: [false, true, false], momentNote: '驗收或抽查時由人執行，平常案件不經過',
    desc: <>房級三層報告、50 案分類評測、填值率統計。驗收時跑的就是這裡，
      每一支都寫明自己的分母怎麼算。</>,
  },
  {
    path: 'schema/', hook: '產出格式', group: '它怎麼做事', rule: 'suite',
    count: '2', countNote: '份格式定義：提案卡 · 稽核事件',
    moments: [false, true, false], momentNote: '產出提案卡時比對格式，不合格式的產出出不去',
    desc: <>提案卡與稽核事件長什麼樣、哪些欄位必填，都定義在這裡。
      20 個欄位各聽誰的也在這一層。</>,
  },
  {
    path: 'checkpoints/', hook: '自測', group: '它怎麼做事', rule: 'suite',
    count: '74', countNote: '項檢查，離線可跑、不需金鑰',
    sample: 'python3 checkpoints/run_checks.py',
    moments: [false, false, true], momentNote: '存檔時的守門員：動到骨架的變更，紅燈就推不出去',
    desc: <>「測試會不會弄壞系統」的答案。從行為規則到儀器算法，每一條踩過的坑都釘成一項檢查，
      同樣的錯不會犯第二次。</>,
  },
  {
    path: 'scripts/', hook: '一鍵存檔', group: '它怎麼做事', rule: 'suite',
    count: '1', countNote: '行指令，存下一天的工作',
    sample: 'bash scripts/save-work.sh 「你找到了什麼」',
    moments: [false, false, true], momentNote: '每件案子收尾時執行，自動分流、自動把關',
    desc: <>照路徑契約自動分流：當天收穫直接推，動到骨架的先過自測。
      使用者不需要學任何版本控制指令：沒有分支，沒有選擇，一行就是全部。</>,
  },
  {
    path: 'repo-contract.json', hook: '路徑契約', group: '它怎麼做事', rule: 'suite',
    count: '17', countNote: '條路徑規則，含本頁全部內容',
    moments: [true, false, true], momentNote: '放檔案之前讀它決定去處；存檔時它決定走哪條流程',
    desc: <>這份資料夾地圖的機器版：每個路徑放什麼、誰可以改、交付時怎麼處理。
      放在根目錄是刻意的：規則要放在「做決定之前」讀得到的地方。你眼前這一章就是它的人話版。</>,
  },
  {
    path: 'data/learned/', hook: '學到的資料', group: '它記得什麼', rule: 'free',
    count: '30+', countNote: '間酒店的已驗證網址與對照',
    sample: 'data/learned/property-site-map.json',
    moments: [true, false, true], momentNote: '開工先查這裡省功課；收工把新驗證的寫回來',
    desc: <>它自己查證後寫下的機器可讀知識：驗證過的官網網址、促銷尾碼對照、受控詞彙。
      學習迴路唯一可以寫的資料區，與你們給的資料嚴格分開。</>,
  },
  {
    path: 'knowledge/', hook: '人讀的知識', group: '它記得什麼', rule: 'free',
    count: '27', countNote: '頁酒店知識 ＋ 58 條經驗',
    sample: 'knowledge/properties/HYSGNSGN.md',
    moments: [true, false, true], momentNote: '開工先讀這間酒店的頁；收工寫回這次學到的',
    desc: <>同一份知識的人話版：一間酒店一頁：網址、房型地圖、這家的怪癖、還沒解決的問題。
      58 條經驗每一條都寫明推翻了先前哪個認知，所以知識是累積，不是堆積。</>,
  },
  {
    path: 'runs/', hook: '一案一卷', group: '它記得什麼', rule: 'free',
    count: '116', countNote: '卷案件，共 162 個執行版本',
    sample: 'runs/HYSGNSGN/…/report.md',
    moments: [false, true, true], momentNote: '執行中邊做邊寫紀錄；收尾連同證據一起歸卷',
    desc: <>每件案子一個資料夾：報告、當下寫的執行紀錄、去除金鑰後的原始證據。
      報告上任何一個數字都能回到這裡，查它當時看到什麼。</>,
  },
  {
    path: 'summaries/', hook: '跨案彙整', group: '它記得什麼', rule: 'free',
    count: '5', countNote: '份跨案彙整表',
    moments: [false, false, true], momentNote: '一批案子跑完後產出；單一案件永遠不放這裡',
    desc: <>只放「跨越多個案子才有意義」的東西：對帳總表、整批建議、審核清單。
      單一案子的產出一律在 runs/。這條界線由自測看守，放錯位置推不出去。</>,
  },
  {
    path: 'data/given/', hook: '你們給的資料', group: '你們的東西', rule: 'readonly',
    count: '8', countNote: '份 COT 提供的檔案',
    sample: 'data/given/booking-code-dictionary.json',
    moments: [true, true, false], momentNote: '開工與執行中讀取；它永遠不寫',
    desc: <>酒店代碼對照、促銷尾碼字典、受控詞彙 v0、真實案例。
      它只讀不寫。改了這裡，等於改了客戶的資料而不是自己的記憶，存檔機制會直接拒絕。</>,
  },
  {
    path: 'tickets/', hook: '真實票卡', group: '你們的東西', rule: 'readonly',
    count: '33', countNote: '張去識別化的真實票卡',
    moments: [false, true, false], momentNote: '當測試輸入讀取；禁止修飾',
    desc: <>你們的真實票卡當測試輸入。口語和模糊正是輸入的原貌，
      整理過反而讓分類數字失真，所以原樣保存。</>,
  },
  {
    path: 'state/', hook: '本機暫存', group: '只在本機', rule: 'local',
    count: '—', countNote: '大小不定，可隨時清',
    moments: [false, true, false], momentNote: '執行期的日誌與快取；刪掉不影響任何結論',
    desc: <>呼叫日誌、爬取快取。查問題時看這裡（每一筆帶著層級、網址、狀態碼）,
      但它不隨 repo 交付，也不是任何報告的依據。</>,
  },
  {
    path: '.env', hook: '金鑰', group: '只在本機', rule: 'local',
    count: '2', countNote: '把金鑰，只存在這個檔案',
    moments: [false, true, false], momentNote: '連線時由讀取器載入；證據落盤前再掃一次防外洩',
    desc: <>不進版本控制、不隨交付、只有讀取器碰得到。
      交付前還有獨立的金鑰掃描，防止金鑰藏在 API 回應裡被一起存下來。</>,
  },
];

const GROUPS = ['它怎麼做事', '它記得什麼', '你們的東西', '只在本機'];
const MOMENTS = ['開工', '執行中', '存檔'] as const;

export default function RepoMap() {
  const [sel, setSel] = useState(0);
  const reduced = useReducedMotion();
  const d = DIRS[sel];

  return (
    <div className="repomap">
      <div className="rm-tree" role="tablist" aria-label="交付物資料夾">
        {GROUPS.map((g) => (
          <div key={g} className="rm-group">
            <div className="rm-gh">{g}</div>
            {DIRS.map((x, i) =>
              x.group === g ? (
                <button
                  key={x.path}
                  role="tab"
                  aria-selected={i === sel}
                  className={i === sel ? 'rm-item on' : 'rm-item'}
                  onClick={() => setSel(i)}
                >
                  <code>{x.path}</code>
                  <span>{x.hook}</span>
                </button>
              ) : null,
            )}
          </div>
        ))}
      </div>

      <div className="rm-detail" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div
            key={sel}
            initial={reduced ? false : { opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduced ? undefined : { opacity: 0, x: -12 }}
            transition={{ duration: 0.26, ease: 'easeOut' }}
          >
            <div className="rm-path"><code>{d.path}</code></div>
            <span className={`fpill ${RULE_TONE[d.rule]}`}>{RULE_LABEL[d.rule]}</span>

            <div className="rm-stat">
              <span className="rm-n">{d.count}</span>
              <span className="rm-nl">{d.countNote}</span>
            </div>

            <p className="rm-desc">{d.desc}</p>

            <div className="rm-moments" aria-label="一件案子的哪個時刻用到它">
              {MOMENTS.map((m, i) => (
                <span key={m} className={d.moments[i] ? 'rm-m on' : 'rm-m'}>{m}</span>
              ))}
              <span className="rm-mn">{d.momentNote}</span>
            </div>

            {d.sample ? (
              <div className="rm-sample">
                <span>實例</span>
                <code>{d.sample}</code>
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
