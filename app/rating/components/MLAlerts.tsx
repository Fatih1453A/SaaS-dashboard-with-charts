"use client"
import React from "react"

const mlAlerts = [
  { type: "crit",   icon: "◉", title: "Batch Defect",         desc: "WB-77634: 14 reviews with defect photos in 48h",        impact: "−$87K" },
  { type: "warn",   icon: "◈", title: "Size Anomaly",      desc: "Cardigan WB-22918: 60% report 'runs small'",         impact: "−$42K" },
  { type: "opport", icon: "✦", title: "Expand Color Range", desc: "412 mentions 'want in black' → +23% potential",     impact: "+$180K" },
]

export function MLAlerts() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {mlAlerts.map((a, i) => {
        const bg = a.type === "crit" ? "#FFF0EE" : a.type === "warn" ? "#FFF8EC" : "#F0FAF0"
        const bdr = a.type === "crit" ? "rgba(200,75,49,0.2)" : a.type === "warn" ? "rgba(184,122,30,0.2)" : "rgba(90,138,70,0.2)"
        const iclr = a.type === "crit" ? "#C84B31" : a.type === "warn" ? "#B87A1E" : "#5A8A46"
        const iclr2 = a.type === "opport" ? "#5A8A46" : "#0E0E0E"
        return (
          <div key={i} style={{ background: bg, border: `1px solid ${bdr}`, borderRadius: 12, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{ fontSize: 18, color: iclr, lineHeight: 1, marginTop: 1 }}>{a.icon}</span>
              <div>
                <p style={{ fontSize: 11, fontWeight: 600, color: "#0E0E0E", marginBottom: 3, fontFamily: "'DM Sans',sans-serif" }}>{a.title}</p>
                <p style={{ fontSize: 10, color: "rgba(14,14,14,0.5)", lineHeight: 1.4 }}>{a.desc}</p>
              </div>
            </div>
            <div style={{ flexShrink: 0, textAlign: "right" }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: iclr2, fontFamily: "'Playfair Display',serif" }}>{a.impact}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}