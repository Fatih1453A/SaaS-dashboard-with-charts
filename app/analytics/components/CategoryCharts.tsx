"use client"
import React from "react"
import { 
  BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from "recharts"
import { Card, CardTitle, C } from "./Cards"

export const CategoryCorrelation = () => {
  const SKU_LABELS = ["BLK","WHT","BEG","GRN","RED","BLU","YLW","PNK","GRY","VLT","ORG","TRQ"]
  const CORR_BASE  = [72, 55, 88, 41, 63, 79, 34, 91, 58, 67, 44, 76]
  
  const corrData = SKU_LABELS.map((s, i) => ({
    sku: `GR-${s}`,
    "Fabric Quality":  Math.round(CORR_BASE[i] * 0.45),
    "Size Chart": Math.round(CORR_BASE[i] * 0.35),
    "Logistics":       Math.round(CORR_BASE[i] * 0.20),
  }))

  return (
    <Card>
      <CardTitle title="Review & Sales Correlation — by Category" sub="Relationship between negative triggers and order dynamics" />
      <div style={{ display: "flex", gap: 14, marginBottom: 12, flexWrap: "wrap" }}>
        {[{ color: C.green, label: "Fabric Quality" }, { color: C.blue, label: "Size Chart" }, { color: C.amber, label: "Logistics" }].map(l => (
          <span key={l.label} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: C.muted }}>
            <span style={{ width: 9, height: 9, borderRadius: 2, background: l.color }} />
            {l.label}
          </span>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={corrData} barCategoryGap="18%">
          <CartesianGrid strokeDasharray="3 3" stroke={C.neutral} vertical={false} />
          <XAxis dataKey="sku" tick={{ fontSize: 9, fill: C.muted }} axisLine={false} tickLine={false} />
          <YAxis hide />
          <Tooltip content={({ active, payload, label }: any) => (
            active && payload ? (
              <div style={{ background: "#fff", border: `0.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontSize: 12, boxShadow: C.shadow }}>
                <p style={{ fontWeight: 500, margin: "0 0 6px" }}>{label}</p>
                {payload.map((p: any) => <p key={p.name} style={{ color: p.fill, margin: "2px 0" }}>{p.name}: {p.value}</p>)}
              </div>
            ) : null
          )} />
          <Bar dataKey="Fabric Quality" stackId="a" fill={C.green} fillOpacity={0.85} />
          <Bar dataKey="Size Chart" stackId="a" fill={C.blue} fillOpacity={0.75} />
          <Bar dataKey="Logistics" stackId="a" fill={C.amber} fillOpacity={0.75} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}

export const SentimentRadar = () => {
  const radarData = [
    { attr: "Fit", current: 85, previous: 78 },
    { attr: "Color", current: 92, previous: 85 },
    { attr: "Fabric", current: 40, previous: 55 },
    { attr: "Price", current: 60, previous: 52 },
    { attr: "Logistics", current: 50, previous: 62 },
  ]
  return (
    <Card>
      <CardTitle title="Sentiment Radar" sub="Current period vs. Previous" />
      <ResponsiveContainer width="100%" height={240}>
        <RadarChart data={radarData}>
          <PolarGrid stroke={C.border} />
          <PolarAngleAxis dataKey="attr" tick={{ fontSize: 11, fill: C.muted }} />
          <Radar name="Current Period" dataKey="current" stroke={C.black} fill={C.black} fillOpacity={0.08} strokeWidth={2} />
          <Radar name="Previous Period" dataKey="previous" stroke={C.blue} fill={C.blue} fillOpacity={0.07} strokeWidth={1.5} strokeDasharray="4 3" />
          <Legend iconSize={9} wrapperStyle={{ fontSize: 11, color: C.muted, paddingTop: 8 }} />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </Card>
  )
}