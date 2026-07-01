"use client"
import React from "react"
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, Tooltip, ResponsiveContainer } from "recharts"

const radarData = [
  { subject: "Quality",    A: 87, B: 65 },
  { subject: "Delivery",    A: 72, B: 80 },
  { subject: "Packaging",    A: 79, B: 60 },
  { subject: "Description",    A: 65, B: 72 },
  { subject: "Price",        A: 81, B: 55 },
  { subject: "Support",   A: 58, B: 70 },
]

export function RadarFactors() {
  return (
    <div style={{ background: "#0E0E0E", borderRadius: 16, overflow: "hidden" }}>
      <div style={{ padding: "20px 24px 16px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <p style={{ fontSize: 9.5, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 4 }}>Quality</p>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, fontStyle: "italic", color: "#fff" }}>Factor Radar</h2>
      </div>
      <div style={{ padding: "8px 0 0" }}>
        <ResponsiveContainer width="100%" height={210}>
          <RadarChart data={radarData} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
            <PolarGrid stroke="rgba(255,255,255,0.1)" />
            <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9, fill: "rgba(255,255,255,0.4)", letterSpacing: "0.06em" }} />
            <Radar name="Current" dataKey="A" stroke="#B8D4A8" fill="#B8D4A8" fillOpacity={0.25} strokeWidth={2} />
            <Radar name="Previous" dataKey="B" stroke="rgba(255,255,255,0.3)" fill="rgba(255,255,255,0.05)" strokeWidth={1.5} strokeDasharray="4 4" />
            <Tooltip contentStyle={{ background: "#1A1A1A", border: "none", borderRadius: 10, fontSize: 11, color: "#fff" }} itemStyle={{ color: "#B8D4A8" }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div style={{ display: "flex", gap: 20, padding: "12px 24px 20px" }}>
        {[{ c: "#B8D4A8", l: "April 2025" }, { c: "rgba(255,255,255,0.3)", l: "March 2025", dash: true }].map(x => (
          <div key={x.l} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <svg width={20} height={3}><line x1="0" y1="1.5" x2="20" y2="1.5" stroke={x.c} strokeWidth={x.dash ? 1.5 : 2} strokeDasharray={x.dash ? "4 3" : "none"} /></svg>
            <span style={{ fontSize: 9.5, color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em" }}>{x.l}</span>
          </div>
        ))}
      </div>
    </div>
  )
}