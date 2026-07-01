"use client"
import React from "react"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { Card, CardTitle, C } from "./Cards"

export const ActionPlan = () => {
  const skuPlan = [
    { sku: "GR-2026-BLK", action: "Stock Replenishment", priority: "High" },
    { sku: "GR-2026-WHT", action: "Return Analysis", priority: "Medium" },
    { sku: "GR-2025-BEG", action: "Discontinue Product", priority: "Low" },
    { sku: "GR-2026-GRN", action: "Expand Color Line", priority: "High" },
  ]

  return (
    <Card>
      <CardTitle title="SKU Action Plan" sub="Priority based on sentiment analysis" />
      {skuPlan.map((row, i) => (
        <div
          key={row.sku}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 0",
            borderBottom: i < skuPlan.length - 1 ? `0.5px solid ${C.border}` : "none",
          }}
        >
          <div>
            <p style={{ fontSize: 13, fontWeight: 500, margin: 0 }}>{row.sku}</p>
            <p style={{ fontSize: 11, color: C.muted, margin: "2px 0 0", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {row.action}
            </p>
          </div>
          <span style={{ 
            fontSize: 10, fontWeight: 500, padding: "3px 9px", borderRadius: 5, 
            background: row.priority === "High" ? C.black : row.priority === "Medium" ? C.neutral : "#f0f0f0", 
            color: row.priority === "High" ? "#fff" : row.priority === "Medium" ? "#3a3a3c" : C.muted 
          }}>
            {row.priority}
          </span>
        </div>
      ))}
    </Card>
  )
}

export const ScenariosWithTrend = () => {
  const scenarios = [
    { label: "Optimistic", pct: 88, value: "+28%", color: C.black },
    { label: "Realistic", pct: 58, value: "+14%", color: "#888" },
    { label: "Pessimistic", pct: 22, value: "+4%", color: C.neutral },
  ]

  const trendData = [
    { day: "01", accuracy: 88 },
    { day: "03", accuracy: 89 },
    { day: "05", accuracy: 90 },
    { day: "08", accuracy: 88 },
    { day: "10", accuracy: 92 },
    { day: "12", accuracy: 91 },
    { day: "15", accuracy: 94 },
    { day: "17", accuracy: 95 },
    { day: "20", accuracy: 96 },
  ]

  return (
    <Card>
      <CardTitle title="Scenario Analysis" sub="Forecast range for next quarter" />
      {scenarios.map(s => (
        <div key={s.label} style={{ display: "flex", alignItems: "center", marginBottom: 12, gap: 10, fontSize: 12 }}>
          <span style={{ minWidth: 110, color: C.muted }}>{s.label}</span>
          <div style={{ flex: 1, height: 6, borderRadius: 3, background: "#e5e5ea", overflow: "hidden" }}>
            <div style={{ width: `${s.pct}%`, height: "100%", borderRadius: 3, background: s.color }} />
          </div>
          <span style={{ minWidth: 36, textAlign: "right", fontWeight: 500 }}>{s.value}</span>
        </div>
      ))}

      <div style={{ marginTop: 22 }}>
        <CardTitle title="Model Accuracy Trend" sub="Accuracy over the last 20 days" />
        <ResponsiveContainer width="100%" height={130}>
          <AreaChart data={trendData}>
            <defs>
              <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={C.blue} stopOpacity={0.15} />
                <stop offset="95%" stopColor={C.blue} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={C.neutral} vertical={false} />
            <XAxis dataKey="day" tick={{ fontSize: 9, fill: C.muted }} axisLine={false} tickLine={false} />
            <YAxis domain={[82, 100]} hide />
            <Tooltip formatter={(v: number) => [`${v}%`, "Accuracy"]} />
            <Area
              type="monotone"
              dataKey="accuracy"
              stroke={C.blue}
              strokeWidth={2}
              fill="url(#blueGrad)"
              dot={{ r: 3, fill: C.blue, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}