import Chrome from '@/components/Chrome';
import Reveal from '@/components/Reveal';
import SectionFx from '@/components/SectionFx';
import RepoMap from '@/components/RepoMap';
import TicketStory from '@/components/TicketStory';
import ArchScene from '@/components/ArchScene';
import { DownTo, Pill, Pills, Seq, Stack, Step, To } from '@/components/Flow';
import { GoldenStack, LogicBars, SsotDonut, Waffle } from '@/components/Charts';

const CHAPTERS = [
  { id: 'story', title: '一張票' },
  { id: 'arch', title: '架構' },
  { id: 'repo', title: '資料夾' },
  { id: 'judge', title: '誰決定' },
  { id: 'fields', title: '20 欄位' },
  { id: 'mapping', title: 'Booking Code' },
  { id: 'harness', title: '護欄' },
  { id: 'loop', title: '學習迴路' },
  { id: 'prd', title: 'PRD 對應' },
  { id: 'accept', title: '驗收' },
];

export default function Page() {
  return (
    <>
      <div className="field" aria-hidden="true" />
      <Chrome chapters={CHAPTERS} />

      <main className="doc">
        {/* ── cover ─────────────────────────────────────── */}
        <section className="cover">
          <span className="eyebrow">Curators of Travel ／ Ryvn — MVP PRD v3.2</span>
          <h1>AI 產品專員<br /><em>Agent</em> 交付總結</h1>
          <p className="say">
            把一張「某酒店不能訂」的票丟給它。它判斷類型、查出是哪間酒店、
            去官網、訂位系統（Amadeus GDS）和你們的後台蒐證，交回一張待你核准的提案卡。
          </p>
          <div className="meta">
            <span>2026.08.19</span>
            <span>6 groups · 30 properties · 20 fields</span>
            <span>Self-test 74 / 74</span>
          </div>
          <div className="figs">
            <div><div className="v">74<span>/74</span></div><div className="l">自測檢查點全綠</div></div>
            <div><div className="v">14</div><div className="l">技能</div></div>
            <div><div className="v">29</div><div className="l">儀器</div></div>
            <div><div className="v">116</div><div className="l">已歸檔案件</div></div>
            <div><div className="v">58</div><div className="l">累積經驗</div></div>
            <div><div className="v">1,762</div><div className="l">酒店名稱對照</div></div>
          </div>
          <div className="cue">Scroll</div>
        </section>

        {/* ── 01 the ticket story (sticky) ──────────────── */}
        <section id="story" className="sec" style={{ paddingTop: '2rem' }}>
          <TicketStory />
          <Reveal>
            <div className="two" style={{ marginTop: '2.5rem' }}>
              <div>
                <h3>三條界線，走到哪都成立</h3>
                <ul className="lines">
                  <li>只提案。客戶看得到的資料它不寫，每張卡都等專員核准。</li>
                  <li>查不到就標 <code>待確認</code>，並寫清楚試過哪些方法。它不會填一個看起來合理的值。</li>
                  <li>寄信、回寫票卡、大量爬取，都先問過你。</li>
                </ul>
              </div>
              <details className="more">
                <summary>為什麼不直接寫成一套後端系統</summary>
                <div className="body">
                  <p>30 間酒店乘上三個會互相打架的來源，分支窮舉不完。今天寫死 30 個爬蟲，明天一間酒店改版就少一個。</p>
                  <p>所以「怎麼判斷」寫成人看得懂的作業程序(skills)，「怎麼算」才寫成程式(instruments)。遇到沒見過的狀況時它讀的是原則而不是分支，這也是產品專員每天在做的事。</p>
                </div>
              </details>
            </div>
          </Reveal>
        </section>

        {/* ── 02 architecture (sticky) ──────────────────── */}
        <section id="arch" className="sec" style={{ paddingTop: '2rem' }}>
          <ArchScene />
        </section>

        {/* ── repo atlas ────────────────────────────────── */}
        <SectionFx id="repo">
          <span className="ghost" aria-hidden="true">03</span>
          <Reveal>
            <div className="kick">Inside the folder</div>
            <h2>交付物就是一個資料夾，逐格打開看</h2>
            <p className="small" style={{ maxWidth: '38em' }}>
              整個交付物是一個 git 資料夾：程式、作業程序、學到的知識、每件案子的證據，全部在裡面。
              點左邊任何一格，右邊告訴你四件事：裝什麼、有多少、誰可以動它，以及一件案子的哪個時刻會用到它。
            </p>
          </Reveal>
          <Reveal axis="z">
            <RepoMap />
          </Reveal>
        </SectionFx>

        {/* ── 03 who decides ────────────────────────────── */}
        <SectionFx id="judge">
          <span className="ghost" aria-hidden="true">04</span>
          <Reveal>
            <div className="kick">Division of judgement</div>
            <h2>誰決定什麼</h2>
            <p>這條線不是照「好不好寫」畫的。要問的是：在這一步上，判斷力有沒有加分。</p>
          </Reveal>
          <Reveal axis="x">
            <div className="two even">
              <div>
                <h3>儀器說了算</h3>
                <p className="small">稅務與幣別換算。零容差比對，差 0.01 就標記。日期窗口。Kill Switch。憑證掃描。酒店代碼對照的拒絕閘。</p>
                <p className="tiny">這裡是算術與安全。人的意見只會引入誤差，而安全標準不能隨模型版本漂移。</p>
              </div>
              <div>
                <h3>Agent 說了算</h3>
                <p className="small">這個 booking code 賣的是哪一間房。兩段描述講的是不是同一種房型。這個差異算不算重大。查不到，是真的沒有，還是我沒找到。</p>
                <p className="tiny">儀器把候選、分數、看了什麼交出來，判斷留給 agent。</p>
              </div>
            </div>
          </Reveal>
          <Reveal axis="z">
            <blockquote>
              兩邊意見不同時以 agent 為準，然後回頭去修那個儀器。分數是證據，不是判決。
              <cite>CLAUDE.md · 行為憲法</cite>
            </blockquote>
          </Reveal>
          <Reveal>
            <details className="more">
              <summary>這條規則是什麼代價換來的</summary>
              <div className="body">
                <p>一個房名比對器把官網的「Homey Room」對上後台的「Homey 2 Double Room」只給了 1/3 分，低於門檻，於是把一間早就存在的房型報成「新房型待上架」。</p>
                <p>眼睛掃過那兩行字的人都知道是同一間房。但門檻已經先做完決定，而它的計算過程從來沒攤開給人看。當時的修法是去補那個比對器，該做的其實是讓沒配對上的房型在報告寫出來之前先送到人眼前。現在的規則是：儀器的結論不准在計算過程沒一起附上的情況下進入報告。</p>
              </div>
            </details>
          </Reveal>
        </SectionFx>

        {/* ── 04 fields + arbitration ───────────────────── */}
        <SectionFx id="fields">
          <span className="ghost" aria-hidden="true">05</span>
          <Reveal>
            <div className="kick">Twenty fields</div>
            <h2>20 個欄位，分給兩個來源</h2>
            <p className="small" style={{ maxWidth: '38em' }}>
              你們後台（ADM）是被驗證的對象，不是真相。真相在官網和訂位系統，而每個欄位先指定聽誰的。
              準確率一律對照人工核對過的答案卷（Golden Set）：拿後台當答案卷的話，系統每次正確抓出後台的錯誤都會被算成它自己錯。
            </p>
          </Reveal>
          <Reveal axis="z">
            <div className="chart-pair">
              <figure>
                <figcaption>圖 1 20 個欄位，每個聽誰的（PRD §3.1）</figcaption>
                <SsotDonut />
              </figure>
              <figure>
                <figcaption>圖 2 五種比對邏輯</figcaption>
                <LogicBars />
              </figure>
            </div>
          </Reveal>
          <Reveal>
            <figure>
              <figcaption>圖 3 兩邊說法不同時，怎麼裁（PRD §2.5.1 的 6A→6B→6C）</figcaption>
              <div className="scrollx">
                <Seq>
                  <Step n="第一步" t="這個欄位聽誰的" s="14 個聽官網，5 個聽訂位系統" />
                  <To label="衝突時" />
                  <Step n="第二步" t="問誰比較新" s="官網 60 天內更新過就信官網，更久就信訂位系統；查不到更新時間就回到第一步的預設" />
                  <To />
                  <Step n="第三步" t="最後才跟後台比" s={<Pills><Pill tone="ok" t="綠 一致" /><Pill tone="warn" t="黃 有差異" /><Pill tone="bad" t="紅 取不到" /></Pills>} />
                </Seq>
              </div>
            </figure>
          </Reveal>
          <Reveal>
            <div className="note">
              <p>Gallery、Room Photos、Description(EN) 這三個欄位排除在自動填值率的分母之外。它們依設計就是人工定奪：系統偵測變動，但不自動產生正確值(PRD §4.2.1)。</p>
            </div>
          </Reveal>
          <Reveal>
            <details className="more">
              <summary>新酒店上架的產出，不是一張平的欄位表</summary>
              <div className="body">
                <p>依 2026-08-04 定案的驗收規格，新酒店上架（第 2 類任務）交付的是三層的房級報告：第一層一列一個酒店欄位；第二層一列一種房型，該房型所有屬性都在同一列；第三層一列一組「房型 × 方案」的訂位代碼對應。</p>
                <p>每一格是一個原子值，自帶七件事：ADM 值、官網值、GDS 值、採信來源、判定、證據、run version。對不上任何一間房的值不算完成。</p>
              </div>
            </details>
          </Reveal>
        </SectionFx>

        {/* ── 05 booking code ───────────────────────────── */}
        <SectionFx id="mapping">
          <span className="ghost" aria-hidden="true">06</span>
          <Reveal>
            <div className="kick">Mapping</div>
            <h2>訂位代碼怎麼對：三道關卡，過了就結束</h2>
          </Reveal>
          <Reveal>
            <div className="two">
              <figure style={{ margin: 0 }}>
                <figcaption>圖 4 三道關卡，上面過了就不走下面（PRD 稱 Path A／B／C）</figcaption>
                <Stack>
                  <Step n="第一關" t="查表拼出代碼，到訂位系統驗證"
                        s={<>拿這個房型基準方案代碼的前三碼，接上這間酒店促銷專用的尾碼，拼出候選代碼，再到訂位系統確認真的訂得到。<Pills><Pill tone="ok" t="查得到 → 成案" /><Pill tone="warn" t="查不到 → 轉人工，絕不硬寫" /></Pills></>} />
                  <DownTo label="這間酒店沒有可查的表" />
                  <Step n="第二關" t="讀房型描述，由判斷決定" s="平常的歸類走這裡就好；若是第一次幫全新的基準方案建碼，門檻更高，而且一定要人確認 —— 因為之後所有促銷代碼都從它衍生" />
                  <DownTo label="仍不明" />
                  <Step n="第三關" t="比價錢" s="同一天訂位系統的含稅價對官網價，差 0.01 就標記" />
                </Stack>
              </figure>
              <div>
                <h3 style={{ marginTop: 0 }}>為什麼第一關不打分數</h3>
                <p className="small">訂位代碼是有或沒有的問題：一個代碼在訂位系統裡要嘛訂得到，要嘛不存在。系統的回應本身就是標準答案，把它稀釋成一個機率分數，只會讓確定的答案看起來像猜測。分數留給第二關那種需要判斷的地方。</p>
                <div className="note">
                  <p className="tiny" style={{ margin: 0 }}>2026-08-13 PM 裁示已生效：第一關能不能用，逐間酒店判定，不整個集團寫死。每次執行都要說明這一間走的是哪關。</p>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal axis="xr">
            <div className="tw">
              <table>
                <thead><tr><th>集團</th><th>代碼前三碼</th><th>促銷尾碼</th><th>第一關（查表）</th><th>備註</th></tr></thead>
                <tbody>
                  <tr><th>Hilton</th><td>穩定</td><td>是</td><td><span className="tag ok">可用</span></td><td>尾碼 C 是加佣旗標，要當成另一個維度</td></tr>
                  <tr><th>Mandarin Oriental</th><td>穩定</td><td>是</td><td><span className="tag ok">可用</span></td><td><code>S**</code> 之類佔位前綴是未完成碼，上線前須清掉</td></tr>
                  <tr><th>Hyatt</th><td>穩定</td><td>是</td><td><span className="tag ok">可用</span></td><td>先前「兩套命名系統」是資料錯位的假象</td></tr>
                  <tr><th>Four Seasons</th><td>穩定</td><td>是（逐間）</td><td><span className="tag ok">可用</span></td><td>同一個 PP4 在大手町是 9 折、在香港是最高 8 折，字典必須逐間維護</td></tr>
                  <tr><th>Virtuoso</th><td>穩定</td><td>是</td><td><span className="tag ok">可用</span></td><td>方案覆蓋稀疏屬正常</td></tr>
                  <tr><th>Marriott</th><td>會漂移</td><td>否</td><td><span className="tag wait">不適用</span></td><td>後三碼不帶方案語意，促銷改走 B ＋ C。PRD 已接受較低自動化率</td></tr>
                </tbody>
              </table>
            </div>
          </Reveal>
        </SectionFx>

        {/* ── 06 harness ────────────────────────────────── */}
        <SectionFx id="harness">
          <span className="ghost" aria-hidden="true">07</span>
          <Reveal>
            <div className="kick">The harness</div>
            <h2>你們拿真案例去測，弄不壞它</h2>
            <p>兩個具體的擔心：測試會不會把系統搞砸，以及它會不會越學越歪。這件事被設計成你不需要小心。規則做成執行時擋得住的機制，不寫成請人記得的文件。</p>
          </Reveal>
          <Reveal axis="z">
            <figure>
              <figcaption>圖 5 存檔會自動分成兩半</figcaption>
              <div className="scrollx">
                <Stack>
                  <Step t={<code>bash scripts/save-work.sh 「你找到了什麼」</code>} />
                  <DownTo label="照 repo-contract.json 分類每個檔案" />
                  <Seq>
                    <Step n="當天的收穫" t="runs/ · data/learned/ · knowledge/ · summaries/"
                          s={<Pills><Pill tone="ok" t="立即 commit ＋ push，不設閘門" /></Pills>} />
                    <Step n="動到骨架" t="instruments/ · skills/ · CLAUDE.md"
                          s={<><span>先跑 74 個檢查點</span><Pills><Pill tone="ok" t="綠 → push，訊息帶著測試結果" /><Pill tone="bad" t="紅 → 擋下，說出哪一項掛掉" /></Pills></>} />
                  </Seq>
                </Stack>
              </div>
            </figure>
          </Reveal>
          <Reveal>
            <div className="two">
              <div>
                <p className="small">紅燈不會賠掉你當天的收穫。兩者若綁在同一個 commit，要保住一天的查證結果就得連同一個沒過測試的程式改動一起推上去。</p>
                <p className="tiny"><code>git log</code> 上每個動到骨架的 commit 都帶著當時的測試結果。要回答「這次測試有沒有動到 harness」，翻紀錄就看得到。</p>
              </div>
              <ul className="lines" style={{ fontSize: '0.86rem' }}>
                <li>檔案放到沒人定義過的位置：擋下，並告訴你該去哪</li>
                <li>建立沒人宣告過的資料夾：自測直接變紅，推不出去</li>
                <li>改到 COT 的檔案(<code>data/given/</code>、<code>tickets/</code>)：拒絕</li>
                <li>金鑰、快取、日誌：不動，留在你的機器上</li>
              </ul>
            </div>
          </Reveal>
          <Reveal>
            <details className="more">
              <summary>為什麼換人、換電腦、換模型都成立</summary>
              <div className="body">
                <p>整套護欄只需要 <code>git</code> 和 <code>python3</code>。擋下的動作發生在執行的那一刻，不是靠 agent 記得某條指示，所以模型換了、推理強度調低了，閘門一樣關著。</p>
                <p>使用它的人是產品專員，沒有分支要開，沒有工程術語要學。存個檔不該需要記 git 指令。</p>
                <p>另外一條原則：規則要放在讀得到的地方。路徑契約放在根目錄，在任何人決定「這個檔案要放哪」之前就讀得到，每個任務技能也直接寫明產物要放哪個資料夾。一條規則如果寫在你已經走到那裡之後才會打開的檔案裡，它就只是一段事後才能證明你錯了的文字。</p>
              </div>
            </details>
          </Reveal>
        </SectionFx>

        {/* ── 07 learning loop ──────────────────────────── */}
        <SectionFx id="loop">
          <span className="ghost" aria-hidden="true">08</span>
          <Reveal>
            <div className="kick">Compounding</div>
            <h2>案子看得越多，它越準</h2>
          </Reveal>
          <Reveal axis="x">
            <div className="two">
              <figure style={{ margin: 0 }}>
                <figcaption>圖 6 迴路的兩半</figcaption>
                <div className="scrollx">
                  <Seq>
                    <Step n="01" t="開工前先讀" s="這間酒店的知識頁" />
                    <To />
                    <Step n="02" t="執行與判斷" />
                    <To />
                    <Step n="03" t="專員審核" />
                    <To />
                    <Step n="04" t="寫回 repo" s="字典 · 知識頁 · 經驗" />
                    <To label="回到 01，同樣的功課免費" />
                    <Step n="↺" t="下一次" />
                  </Seq>
                </div>
              </figure>
              <div>
                <div className="figs" style={{ margin: 0, gap: '0.8rem 2rem' }}>
                  <div><div className="v">58</div><div className="l">條經驗，每條寫明推翻了什麼</div></div>
                  <div><div className="v">27</div><div className="l">間酒店知識頁</div></div>
                  <div><div className="v">162</div><div className="l">個 run version</div></div>
                </div>
                <p className="voice" style={{ marginTop: '1.2rem', fontSize: '0.98rem' }}>
                  迴路有兩半：開工前讀，收工後寫。只有寫沒有讀是日記，只有讀沒有寫是說明書。
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <h3>PM 的指示也是知識</h3>
            <p className="small">一條只存在於聊天訊息裡的指示，對下一個 session 等於不存在，同一個問題會被重新爭論一次。所以每條 PM 裁示都記進檔案，並寫明它取代了什麼。目前 14 條，舉三例：</p>
            <div className="tw">
              <table>
                <thead><tr><th className="n">日期</th><th>裁示</th><th>取代了什麼</th></tr></thead>
                <tbody>
                  <tr><th className="n">08-04</th><td>Cat-2 輸出是三層房級報告，每個原子值帶 ADM/官網/GDS/採信來源/判定/證據/run version</td><td className="tiny">PRD 隱含的平面 20 欄位清單</td></tr>
                  <tr><th className="n">08-13</th><td><b>正確性優先於執行成本</b>。專員讀到的 MISMATCH/NEW/PASS 就是交付物本身，便宜但會縮小檢查範圍的路徑不要走</td><td className="tiny">PRD §8「這個順序也讓成本最低」的理由。順序保留，成本不再是理由</td></tr>
                  <tr><th className="n">08-13</th><td>30 間酒店的官網網址由交付物自己維護，且只在身分驗證通過後寫入</td><td className="tiny">COT 是否維護靜態清單的未決問題。日後提供則合併，不覆蓋</td></tr>
                </tbody>
              </table>
            </div>
          </Reveal>
        </SectionFx>

        {/* ── 08 PRD map ────────────────────────────────── */}
        <SectionFx id="prd">
          <span className="ghost" aria-hidden="true">09</span>
          <Reveal>
            <div className="kick">PRD map</div>
            <h2>PRD v3.2 逐條對應</h2>
            <p className="small">左邊是 PRD 章節，右邊是它在交付物裡的位置。每一列都對得上一個可以打開來看的檔案。</p>
          </Reveal>
          <Reveal>
            <div className="tw">
              <table style={{ minWidth: 680 }}>
                <thead><tr><th style={{ width: '20%' }}>PRD</th><th style={{ width: '47%' }}>交付物實作</th><th style={{ width: '33%' }}>狀態</th></tr></thead>
                <tbody>
                  <tr><th>§2.2 五大任務類別</th><td><code>classify-task</code> 分診，加五個任務技能</td><td><span className="tag ok">已交付</span> 黃金 50 案分類 50/50</td></tr>
                  <tr><th>§2.4 分層取證</th><td>取證階梯落在技能與憲法；<code>field-crawl</code> 官網改版時自我修復</td><td><span className="tag ok">已交付</span></td></tr>
                  <tr><th>§2.5 兩層模型 ＋ 6A/6B/6C</th><td><code>instruments/compare/arbitration.py</code></td><td><span className="tag ok">已交付</span></td></tr>
                  <tr><th>§3.1 20 欄位 × SSOT</th><td><code>schema/</code>；房型層級欄位以 <code>room_key</code> 承載</td><td><span className="tag ok">已交付</span></td></tr>
                  <tr><th>§3.3.2 受控字串字典</th><td>COT 字典 v0 已匯入；未命中交判斷並寫回字典，可重跑不重複寫入</td><td><span className="tag ok">已交付</span></td></tr>
                  <tr><th>§3.3.3 語意差異</th><td>四類實質變動觸發標記，純文案潤飾不標記</td><td><span className="tag ok">已交付</span></td></tr>
                  <tr><th>§3.3.4 圖片比對</th><td>一律送人工，排除於三個硬性指標之外</td><td><span className="tag ok">已交付</span></td></tr>
                  <tr><th>§4 驗收指標 ＋ EQS</th><td><code>commands/</code> 可執行入口；「AI 草稿被改了多少」逐字計分，中文逐字、英文逐詞；商業因素的改寫不列入分母</td><td><span className="tag info">機制已備</span> 分母隨真實案件累積</td></tr>
                  <tr><th>§4.4 Proposal Card</th><td><code>schema/proposal-card.schema.json</code></td><td><span className="tag ok">已交付</span></td></tr>
                  <tr><th>§5 Email Loop</th><td>R1 需核准、R2/R3 各 +24h 自動、72h 升級人工；硬退信停用、軟退信退避重試</td><td><span className="tag wait">待 COT</span> Gmail OAuth 與 R2/R3 範本</td></tr>
                  <tr><th>§6 Admin 介面</th><td>Email Preview 單頁已交付；Proposal 結構化輸出可直接餵進 Sheets 兩層審核表</td><td><span className="tag info">分工執行中</span> 驗收期間以 Discord ＋ Asana 為控制面</td></tr>
                  <tr><th>§6.6 Kill Switch</th><td>每次執行前檢查，讀不到開關時預設為停</td><td><span className="tag ok">已交付</span></td></tr>
                  <tr><th>§7 Property Code Mapping</th><td>Present/Missing/Stale 狀態，不阻擋 20 欄位流程</td><td><span className="tag ok">已交付</span></td></tr>
                  <tr><th>§8 Mapping 三路徑</th><td>Path A 錨點＋後綴＋GDS 驗證；B2 強制人工確認；Path C 零容差。逐間後綴字典，跨酒店套用一律拒絕</td><td><span className="tag ok">已交付</span></td></tr>
                  <tr><th>§9 稽核日誌</th><td>九類事件全數實作；全量與參照(SHA-256 ＋ ref)分流；寫入失敗不拖垮呼叫</td><td><span className="tag ok">已交付</span></td></tr>
                  <tr><th>§10 風險：官網改版</th><td>agent 重新檢視頁面並重寫抽取器，不等人來修</td><td><span className="tag ok">已交付</span></td></tr>
                  <tr><th>§10 風險：GDS 限流</th><td>併發上限、帶抖動的退避重試並遵守 Retry-After、每次呼叫進稽核日誌</td><td><span className="tag ok">已交付</span></td></tr>
                  <tr><th>§11 Phase-1B</th><td>九項全數記錄在範圍檔案並標明理由</td><td><span className="tag off">刻意不做</span></td></tr>
                </tbody>
              </table>
            </div>
          </Reveal>
        </SectionFx>

        {/* ── 09 acceptance ─────────────────────────────── */}
        <SectionFx id="accept">
          <span className="ghost" aria-hidden="true">10</span>
          <Reveal>
            <div className="kick">Acceptance</div>
            <h2>驗收指標與現況</h2>
          </Reveal>
          <Reveal axis="z">
            <div className="two">
              <figure style={{ margin: 0 }}>
                <figcaption>圖 7 黃金 50 案分布與分類結果</figcaption>
                <GoldenStack />
              </figure>
              <figure style={{ margin: 0 }}>
                <figcaption>圖 8 74 個自測檢查點</figcaption>
                <Waffle />
                <p className="tiny" style={{ marginTop: '0.8rem' }}>
                  離線可跑，不需金鑰。動到程式、技能或憲法之前自動執行一次。
                  深色是 8/18 為了這次驗收新增的 7 項。
                </p>
              </figure>
            </div>
          </Reveal>
          <Reveal>
            <div className="tw">
              <table>
                <thead><tr><th>指標</th><th className="n">門檻</th><th className="n">現況</th><th>依據</th></tr></thead>
                <tbody>
                  <tr><th>任務分類準確率</th><td className="n">≥ 80%</td><td className="n"><b style={{ color: 'var(--ok)' }}>100%</b> 50/50</td><td>對照 COT 黃金 50 案。純規則基準線 39/50 ＝ 78%</td></tr>
                  <tr><th>草稿採用率</th><td className="n">≥ 70%</td><td className="n"><span className="tag info">累積中</span></td><td rowSpan={2}>分母是專員實際審過的案件數。依 08-13 議定，由真實使用自己填滿</td></tr>
                  <tr><th>直接採用率</th><td className="n">≥ 50%</td><td className="n"><span className="tag info">累積中</span></td></tr>
                  <tr><th>欄位自動填值率</th><td className="n">≥ 85%</td><td className="n"><span className="tag info">可量測</span></td><td>已有可執行入口，並明確宣告分母</td></tr>
                  <tr><th>欄位正確率</th><td className="n">≥ 90%</td><td className="n"><span className="tag wait">待 Golden Set</span></td><td>依 PRD §4.2.2 必須對照人工核對過的答案卷，不得對照你們後台</td></tr>
                </tbody>
              </table>
            </div>
          </Reveal>
          <Reveal>
            <div className="note">
              <p>欄位正確率不是還沒做。依規格不能拿你們後台當答案卷，那會讓系統每次正確抓出後台錯誤都被扣分。答案卷（Golden Set，8–10 間酒店的人工核對值）一到位就能立刻計算，在那之前以真實案件逐件驗收。</p>
            </div>
          </Reveal>
          <Reveal>
            <h3>等 COT 這邊三件事</h3>
            <div className="tw">
              <table>
                <thead><tr><th style={{ width: '34%' }}>項目</th><th>會解鎖什麼</th></tr></thead>
                <tbody>
                  <tr><th>人工核對的答案卷<br /><span className="tiny">8–10 間 × 20 欄位（PRD 稱 Golden Set）</span></th><td>欄位正確率（≥90% 硬閘門）可以立刻計算</td></tr>
                  <tr><th>Gmail 寄信授權</th><td>問酒店的三輪信件，從「可預覽」變成「可實際寄出」</td></tr>
                  <tr><th>其餘酒店的促銷尾碼對照表</th><td>第一關（查表驗證）能覆蓋更多酒店。目前已驗證 7 間的真實對照表</td></tr>
                </tbody>
              </table>
            </div>
          </Reveal>

          <div className="endmark">
            <span>Ryvn × Curators of Travel</span>
            <span>AI Product Specialist Agent · MVP</span>
            <span>2026.08.19 · Self-test 74/74</span>
          </div>
        </SectionFx>
      </main>
    </>
  );
}
