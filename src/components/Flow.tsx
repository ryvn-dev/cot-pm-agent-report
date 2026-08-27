/* Typographic process notation — no boxes. A step is set in type:
   numeral, term, one short clause. Connectors are glyphs. Colour chips
   exist only for terminal states, where the outcome IS the message. */

export function Seq({ children }: { children: React.ReactNode }) {
  return <div className="seq">{children}</div>;
}

export function Stack({ children }: { children: React.ReactNode }) {
  return <div className="stack">{children}</div>;
}

export function Step({ n, t, s }: { n?: string; t: React.ReactNode; s?: React.ReactNode }) {
  return (
    <div className="fstep">
      {n ? <span className="fn">{n}</span> : null}
      <span className="ft">{t}</span>
      {s ? <span className="fs">{s}</span> : null}
    </div>
  );
}

export function To({ label }: { label?: string }) {
  return (
    <span className="fto" aria-hidden="true">
      {label ? <em>{label}</em> : null}
      <span>→</span>
    </span>
  );
}

export function DownTo({ label }: { label?: string }) {
  return (
    <div className="fdown" aria-hidden="true">
      <span>↓</span>
      {label ? <em>{label}</em> : null}
    </div>
  );
}

type Tone = 'ok' | 'warn' | 'bad' | 'info';

export function Pill({ t, tone }: { t: React.ReactNode; tone: Tone }) {
  return <span className={`fpill ${tone}`}>{t}</span>;
}

export function Pills({ children }: { children: React.ReactNode }) {
  return <span className="fpills">{children}</span>;
}
