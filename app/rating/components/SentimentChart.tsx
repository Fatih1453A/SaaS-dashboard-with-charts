"use client"
import React from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const sentimentAreaData = [
  { mo: "Oct", pos: 62, neu: 22, neg: 16 },
  { mo: "Nov", pos: 65, neu: 20, neg: 15 },
  { mo: "Dec", pos: 71, neu: 18, neg: 11 },
  { mo: "Jan", pos: 68, neu: 21, neg: 11 },
  { mo: "Feb", pos: 74, neu: 17, neg: 9  },
  { mo: "Mar", pos: 76, neu: 16, neg: 8  },
  { mo: "Apr", pos: 78, neu: 14, neg: 8  },
]

const CustomAreaTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: "#0E0E0E", borderRadius: 12, padding: "8px 12px", fontSize: 11, color: "#fff" }}>
      <p style={{ color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.name === "pos" ? "#B8D4A8" : p.name === "neg" ? "#C84B31" : "rgba(255,255,255,0.5)" }}>
          {p.name === "pos" ? "Positive" : p.name === "neg" ? "Negative" : "Neutral"}: {p.value}%
        </p>
      ))}
    </div>
  )
}

export function SentimentChart() {
  return (
    <div style={{ background: "#fff", border: "1px solid rgba(14,14,14,0.08)", borderRadius: 16, overflow: "hidden" }}>
      <div style={{ padding: "20px 24px 16px", borderBottom: "1px solid rgba(14,14,14,0.07)", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <p style={{ fontSize: 9.5, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(14,14,14,0.35)", marginBottom: 4 }}>Dynamics</p>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, fontStyle: "italic", color: "#0E0E0E" }}>Sentiment over 7 months</h2>
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          {[{ c: "#B8D4A8", l: "Positive" }, { c: "#C4C4C4", l: "Neutral" }, { c: "#C84B31", l: "Negative" }].map(x => (
            <div key={x.l} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 20, height: 3, borderRadius: 2, background: x.c }} />
              <span style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(14,14,14,0.4)" }}>{x.l}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: "20px 24px 16px" }}>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={sentimentAreaData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="gPos" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#B8D4A8" stopOpacity={0.7} />
                <stop offset="95%" stopColor="#B8D4A8" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="gNeu" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#C4C4C4" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#C4C4C4" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="gNeg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#C84B31" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#C84B31" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
            <XAxis dataKey="mo" tick={{ fontSize: 10, fill: "#8A8A8A" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: "#8A8A8A" }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
            <Tooltip content={<CustomAreaTooltip />} />
            <Area type="monotone" dataKey="pos" stackId="1" stroke="#5A8A46" strokeWidth={2} fill="url(#gPos)" />
            <Area type="monotone" dataKey="neu" stackId="1" stroke="#8A8A8A" strokeWidth={1.5} fill="url(#gNeu)" />
            <Area type="monotone" dataKey="neg" stackId="1" stroke="#C84B31" strokeWidth={1.5} fill="url(#gNeg)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", borderTop: "1px solid rgba(14,14,14,0.07)" }}>
        {[{ l: "Positive", v: "78%", c: "#5A8A46" }, { l: "Neutral", v: "14%", c: "#8A8A8A" }, { l: "Negative", v: "8%", c: "#C84B31" }].map((s, i) => (
          <div key={s.l} style={{ padding: "14px 16px", borderRight: i < 2 ? "1px solid rgba(14,14,14,0.07)" : "none" }}>
            <p style={{ fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(14,14,14,0.35)", marginBottom: 4 }}>{s.l}</p>
            <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, color: s.c, lineHeight: 1 }}>{s.v}</p>
          </div>
        ))}
      </div>
    </div>
  )
}