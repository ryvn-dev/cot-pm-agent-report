'use client';

import {
  Bar, BarChart, Cell, LabelList, Legend, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';

const AQUA = '#2c8caa';
const DEEP = '#17607c';
const MID = '#58bfdb';
const LIGHT = '#bfe4ef';
const INK2 = '#51656f';
const INK3 = '#8ba0a9';
const BAD = '#af5148';

const tip = {
  contentStyle: {
    background: 'rgba(255,255,255,0.92)', border: '1px solid #dde8ec',
    borderRadius: 8, fontSize: 12, backdropFilter: 'blur(8px)',
  },
};

/* PRD §3.1 — primary SSOT per field */
export function SsotDonut() {
  const data = [
    { name: '聽官網的', value: 14, fill: DEEP },
    { name: '聽訂位系統的', value: 5, fill: MID },
    { name: '訂位代碼另計', value: 1, fill: LIGHT },
  ];
  return (
    <div className="chart">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data} dataKey="value" nameKey="name"
            innerRadius="52%" outerRadius="78%" stroke="#fff" strokeWidth={2}
            label={({ name, value }) => `${name} ${value}`}
            labelLine={{ stroke: '#c2d4db' }}
            isAnimationActive
          >
            {data.map((d) => <Cell key={d.name} fill={d.fill} />)}
          </Pie>
          <Tooltip {...tip} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

/* comparison logic × field count */
export function LogicBars() {
  const data = [
    { name: '結構化解析', v: 9, fill: DEEP },
    { name: '受控字串', v: 5, fill: AQUA },
    { name: '結構化邏輯', v: 3, fill: MID },
    { name: '圖片比對', v: 2, fill: BAD },
    { name: '語意差異', v: 1, fill: LIGHT },
  ];
  return (
    <div className="chart">
      <ResponsiveContainer>
        <BarChart data={data} layout="vertical" margin={{ left: 8, right: 30, top: 8, bottom: 0 }}>
          <XAxis type="number" hide domain={[0, 10]} />
          <YAxis type="category" dataKey="name" width={86} axisLine={false} tickLine={false}
                 tick={{ fontSize: 12, fill: INK2 }} />
          <Bar dataKey="v" barSize={16} radius={[0, 3, 3, 0]} isAnimationActive>
            {data.map((d) => <Cell key={d.name} fill={d.fill} />)}
            <LabelList dataKey="v" position="right" style={{ fontSize: 11, fill: INK2 }} />
          </Bar>
          <Tooltip {...tip} cursor={{ fill: 'rgba(88,191,219,0.08)' }} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/* golden 50 distribution */
export function GoldenStack() {
  const data = [
    { name: 'T1 資料更正', a: 15, b: 5, total: 20 },
    { name: 'T2 新上架', a: 11, b: 3, total: 14 },
    { name: 'T3 無法訂', a: 3, b: 2, total: 5 },
    { name: 'T4 例外', a: 5, b: 2, total: 7 },
    { name: 'T5 公告', a: 2, b: 0, total: 2 },
    { name: '跨類別', a: 1, b: 1, total: 2 },
  ];
  return (
    <div className="chart tall">
      <ResponsiveContainer>
        <BarChart data={data} margin={{ left: 0, right: 8, top: 18, bottom: 0 }}>
          <XAxis dataKey="name" axisLine={{ stroke: '#c2d4db' }} tickLine={false}
                 tick={{ fontSize: 11, fill: INK2 }} interval={0} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: INK3 }} width={26} />
          <Legend
            wrapperStyle={{ fontSize: 12 }}
            formatter={(value) => <span style={{ color: INK2 }}>{value}</span>}
          />
          <Tooltip {...tip} cursor={{ fill: 'rgba(88,191,219,0.08)' }} />
          <Bar dataKey="a" name="一般案例" stackId="g" fill={DEEP} barSize={28} isAnimationActive />
          <Bar dataKey="b" name="邊界案例" stackId="g" fill={LIGHT} radius={[3, 3, 0, 0]} isAnimationActive>
            <LabelList dataKey="total" position="top" style={{ fontSize: 11, fill: INK2 }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/* 74 checkpoints, one square each; the last 7 are the 08-18 additions */
export function Waffle() {
  return (
    <div className="waffle" role="img" aria-label="74 個自測檢查點，全部通過；其中 7 項為 8 月 18 日新增">
      {Array.from({ length: 74 }, (_, i) => (
        <i key={i} className={i >= 67 ? 'new' : undefined} title={`檢查點 ${i + 1}:通過`} />
      ))}
    </div>
  );
}
