"use client"

import React from "react"

export const C = {
  accent:   "#2A2570",
  purple:   "#7F77DD",
  purpleBg: "#EEEDFE",
  purpleTx: "#3C3489",
  green:    "#1D9E75",
  greenBg:  "#E1F5EE",
  greenTx:  "#085041",
  red:      "#C84B31",
  redBg:    "#FAECE7",
  redTx:    "#712B13",
  amber:    "#BA7517",
  amberBg:  "#FAEEDA",
  amberTx:  "#633806",
  text:     "#0E0E0E",
  text2:    "#5A5850",
  text3:    "#9A9890",
  border:   "rgba(0,0,0,0.08)",
  border2:  "rgba(0,0,0,0.13)",
  bg:       "#F5F4F0",
  surface:  "#FFFFFF",
  surface2: "#F0EEE9",
} as const

export type PillType = "up" | "dn" | "ne" | "am" | "pu"

const PILL_STYLES: Record<PillType, React.CSSProperties> = {
  up: { background: C.greenBg,  color: C.greenTx  },
  dn: { background: C.redBg,    color: C.redTx    },
  ne: { background: C.surface2, color: C.text3    },
  am: { background: C.amberBg,  color: C.amberTx  },
  pu: { background: C.purpleBg, color: C.purpleTx },
}

export function Pill({ type, children }: { type: PillType; children: React.ReactNode }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      padding: "3px 9px", borderRadius: 20,
      fontSize: 10.5, fontWeight: 500, letterSpacing: "0.02em",
      ...PILL_STYLES[type],
    }}>
      {children}
    </span>
  )
}

export function RatingDots({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", gap: 3, justifyContent: "flex-end" }}>
      {Array.from({ length: 5 }, (_, i) => (
        <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: i < rating ? C.accent : C.surface2 }} />
      ))}
    </div>
  )
}

export function TrendBadge({ trend }: { trend: string }) {
  if (trend === "up")   return <Pill type="up">↑ Рост</Pill>
  if (trend === "down") return <Pill type="dn">↓ Спад</Pill>
  return <Pill type="ne">— Стабильно</Pill>
}

export function StockBar({ stock }: { stock: number }) {
  const color = stock < 20 ? C.red : stock < 40 ? C.amber : C.green
  const pct   = Math.min(Math.round(stock / 2.1), 100)
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: "flex-end" }}>
      <span style={{ fontSize: 12, color, fontFamily: "monospace" }}>{stock}</span>
      <div style={{ width: 44, height: 2, background: C.surface2, borderRadius: 2 }}>
        <div style={{ width: `${pct}%`, height: 2, background: color, borderRadius: 2 }} />
      </div>
    </div>
  )
}

export function Legend({ items }: { items: { color: string; label: string }[] }) {
  return (
    <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
      {items.map(it => (
        <div key={it.label} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: C.text3 }}>
          <div style={{ width: 8, height: 8, borderRadius: 2, background: it.color, flexShrink: 0 }} />
          {it.label}
        </div>
      ))}
    </div>
  )
}

export function ProgBar({ label, val, max, color }: { label: string; val: number; max: number; color: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: C.text2 }}>
        <span>{label}</span>
        <span style={{ color: C.text, fontWeight: 500 }}>{val}%</span>
      </div>
      <div style={{ height: 4, background: C.surface2, borderRadius: 3, overflow: "hidden" }}>
        <div style={{ width: `${(val / max) * 100}%`, height: "100%", background: color, borderRadius: 3 }} />
      </div>
    </div>
  )
}

export function TableHead({ cols }: { cols: string[] }) {
  return (
    <thead>
      <tr style={{ background: C.surface2 }}>
        {cols.map((h, i) => (
          <th key={h} style={{
            padding: "10px 14px", fontSize: 10, color: C.text3, fontWeight: 400,
            textTransform: "uppercase", letterSpacing: "0.1em",
            textAlign: i > 0 ? "right" : "left",
            borderBottom: `0.5px solid ${C.border2}`,
          }}>
            {h}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export function SectionHeading({ title, sub }: { title: string; sub: string }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <h2 style={{ fontFamily: "Georgia, serif", fontSize: 22, fontStyle: "italic", fontWeight: 400, color: C.text }}>{title}</h2>
      <p style={{ fontSize: 12, color: C.text3, marginTop: 3 }}>{sub}</p>
    </div>
  )
}

export function IconBox({ children, bg, color }: { children: React.ReactNode; bg: string; color: string }) {
  return (
    <div style={{ width: 36, height: 36, borderRadius: 9, background: bg, display: "flex", alignItems: "center", justifyContent: "center", color, flexShrink: 0 }}>
      {children}
    </div>
  )
}

export function StatBand({ items }: { items: { label: string; val: string }[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${items.length},1fr)`, borderTop: `0.5px solid ${C.border}` }}>
      {items.map((s, i) => (
        <div key={s.label} style={{ padding: "12px 16px", borderRight: i < items.length - 1 ? `0.5px solid ${C.border}` : "none" }}>
          <p style={{ fontSize: 9.5, color: C.text3, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 3 }}>{s.label}</p>
          <p style={{ fontFamily: "Georgia, serif", fontSize: 17, fontStyle: "italic", color: C.text }}>{s.val}</p>
        </div>
      ))}
    </div>
  )
}

export const I = {
  users:   <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><circle cx="8" cy="5.5" r="2.5"/><path d="M2 13c0-3 2.5-5 6-5s6 2 6 5"/></svg>,
  doc:     <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><rect x="3" y="2" width="10" height="12" rx="2"/><path d="M6 6h4M6 9h2"/></svg>,
  addUser: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><circle cx="7" cy="5.5" r="2.5"/><path d="M1 13c0-3 2.5-5 6-5"/><path d="M12 9v5M9.5 11.5h5"/></svg>,
  smile:   <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><circle cx="8" cy="8" r="5.5"/><path d="M5.5 9.5c.6 1 1.2 1.5 2.5 1.5s1.9-.5 2.5-1.5"/><circle cx="6" cy="7" r=".5" fill="currentColor"/><circle cx="10" cy="7" r=".5" fill="currentColor"/></svg>,
  bag:     <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><rect x="2" y="4" width="12" height="9" rx="2"/><path d="M5 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1"/></svg>,
  chart:   <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M3 12L6 8l3 2 4-5"/></svg>,
  bars:    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><rect x="2" y="9" width="3" height="5" rx="1"/><rect x="6.5" y="6" width="3" height="8" rx="1"/><rect x="11" y="3" width="3" height="11" rx="1"/></svg>,
  clock:   <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><circle cx="8" cy="8" r="5.5"/><path d="M8 5v3l2 2"/></svg>,
  back:    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M3 8h7a3 3 0 0 1 0 6H8M3 8l2-2M3 8l2 2"/></svg>,
  check:   <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M3 8l3.5 3.5L13 5"/></svg>,
  task:    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><rect x="2" y="3" width="12" height="11" rx="2"/><path d="M5 7h6M5 10h4"/></svg>,
  money:   <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><circle cx="8" cy="8" r="5.5"/><path d="M8 5.5c-1.1 0-2 .7-2 1.5s.9 1.3 2 1.5 2 .7 2 1.5-.9 1.5-2 1.5M8 5v.5M8 11v.5"/></svg>,
  down:    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M8 3v10M4.5 9.5L8 13l3.5-3.5"/></svg>,
}
