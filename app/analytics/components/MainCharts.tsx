"use client"
import React from "react"
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, C } from "./Cards"

export const CorrelationChart = () => {
  const SKU_LABELS = ["BLK","WHT","BEG","GRN","RED","BLU","YLW","PNK","GRY","VLT","ORG","TRQ"]
  const COR_BASE = [72, 55, 88, 41, 63, 79, 34, 91, 58, 67, 44, 76]
  const data = SKU_LABELS.map((s, i) => ({ sku: `GR-${s}`, value: COR_BASE[i], highlight: i === 2 }))

  return (
    <Card>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
        <div>
          <p style={{ fontSize: 13, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em", margin: 0 }}>Review & Sales Correlation</p>
          <p style={{ fontSize: 11, color: C.muted, margin: "3px 0 0" }}>Relationship between negative triggers and order dynamics</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barCategoryGap="14%">
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" vertical={false} />
          <XAxis dataKey="sku" tick={{ fontSize: 9, fill: C.muted }} axisLine={false} tickLine={false} />
          <YAxis hide />
          <Tooltip content={({ active, payload, label }: any) => (
            active && payload ? (
              <div style={{ background: "#fff", border: `0.5px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", fontSize: 12, boxShadow: C.shadow }}>
                <p style={{ fontWeight: 500, margin: 0 }}>{label}</p>
                <p style={{ margin: 0, color: C.muted }}>Index: {payload[0].value}</p>
              </div>
            ) : null
          )} />
          <Bar dataKey="value" radius={[3, 3, 0, 0]}>
            {data.map((entry, i) => <Cell key={i} fill={entry.highlight ? C.black : "#d1d1d6"} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}