"use client"

import React from "react"
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { C } from "./shared"

interface RingItem {
  name: string
  pct: number
  color: string
}

interface RingChartProps {
  data: RingItem[]
  value: string
  label: string
  size?: number
}

export function RingChart({ data, value, label, size = 140 }: RingChartProps) {
  const items = data.map(d => ({ ...d, value: d.pct }))
  return (
    <div>
      <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", height: size }}>
        <ResponsiveContainer width={size} height={size}>
          <PieChart>
            <Pie
              data={items} dataKey="value"
              innerRadius={size * 0.33} outerRadius={size * 0.46}
              paddingAngle={2} startAngle={90} endAngle={-270}
            >
              {items.map(c => <Cell key={c.name} fill={c.color} />)}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div style={{ position: "absolute", textAlign: "center", pointerEvents: "none" }}>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 20, fontStyle: "italic", color: C.text, lineHeight: 1 }}>
            {value}
          </div>
          <div style={{ fontSize: 9.5, color: C.text3, marginTop: 2 }}>{label}</div>
        </div>
      </div>
      <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
        {data.map(d => (
          <div key={d.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, color: C.text2 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: d.color }} />
              {d.name}
            </span>
            <strong style={{ color: C.text, fontWeight: 500 }}>{d.pct}%</strong>
          </div>
        ))}
      </div>
    </div>
  )
}
