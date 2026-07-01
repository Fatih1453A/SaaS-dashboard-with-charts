"use client"
import React from "react"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { Card, CardTitle, C } from "./Cards"

export const AttributeDistribution = () => {
  const attributes = [
    { name: "Fit", pos: 85, neu: 10, neg:  5, n: 120 },
    { name: "Color", pos: 92, neu:  6, neg:  2, n: 200 },
    { name: "Fabric", pos: 40, neu: 15, neg: 45, n: 310 },
    { name: "Price", pos: 60, neu: 30, neg: 10, n: 150 },
    { name: "Logistics", pos: 50, neu: 20, neg: 30, n:  88 },
  ]
  return (
    <Card>
      <CardTitle title="Sentiment Distribution" sub="Positive / Neutral / Negative" />
      {attributes.map(a => (
        <div key={a.name} style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
            <span style={{ color: C.muted }}>{a.name}</span>
            <span style={{ fontWeight: 500 }}>n={a.n}</span>
          </div>
          <div style={{ height: 8, borderRadius: 4, display: "flex", overflow: "hidden", background: "#e5e5ea" }}>
            <div style={{ width: `${a.pos}%`, background: C.green }} />
            <div style={{ width: `${a.neu}%`, background: C.neutral }} />
            <div style={{ width: `${a.neg}%`, background: C.red }} />
          </div>
        </div>
      ))}
    </Card>
  )
}

export const ModelTrend = () => {
  const trendData = [
    { day: "01", accuracy: 88 }, { day: "10", accuracy: 92 }, { day: "20", accuracy: 96 },
  ]
  return (
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
          <Area type="monotone" dataKey="accuracy" stroke={C.blue} fill="url(#blueGrad)" dot={{ r: 3, fill: C.blue }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}