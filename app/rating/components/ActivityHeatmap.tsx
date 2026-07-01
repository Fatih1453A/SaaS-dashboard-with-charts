"use client"
import React from "react"

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const HOURS = ["0", "2", "4", "6", "8", "10", "12", "14", "16", "18", "20", "22"]
const weekHourGrid = [
  [12, 8, 5, 3, 2, 4, 9, 18, 28, 35, 40, 38, 42, 44, 39, 36, 32, 38, 45, 41, 35, 28, 20, 14],
  [10, 6, 4, 2, 2, 3, 7, 15, 24, 32, 37, 35, 40, 41, 37, 34, 30, 35, 42, 38, 32, 25, 18, 12],
  [11, 7, 4, 3, 2, 4, 8, 16, 26, 34, 39, 37, 41, 43, 38, 35, 31, 37, 44, 40, 34, 27, 19, 13],
  [14, 9, 6, 4, 3, 5, 10, 20, 31, 38, 43, 41, 45, 47, 42, 39, 35, 41, 48, 44, 38, 30, 22, 15],
  [18, 12, 8, 5, 3, 6, 12, 24, 38, 46, 52, 50, 55, 57, 51, 47, 43, 50, 58, 53, 46, 36, 27, 18],
  [22, 15, 10, 7, 5, 8, 14, 22, 30, 36, 40, 38, 42, 44, 39, 36, 35, 42, 50, 46, 40, 32, 24, 16],
  [20, 14, 9, 6, 4, 7, 12, 20, 27, 32, 36, 34, 38, 40, 35, 32, 31, 38, 45, 41, 36, 28, 21, 14],
]

export function ActivityHeatmap() {
  const maxV = 58
  return (
    <div style={{ background: "#fff", border: "1px solid rgba(14,14,14,0.08)", borderRadius: 16, overflow: "hidden" }}>
      <div style={{ padding: "20px 24px 16px", borderBottom: "1px solid rgba(14,14,14,0.07)" }}>
        <p style={{ fontSize: 9.5, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(14,14,14,0.35)", marginBottom: 4 }}>Activity</p>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, fontStyle: "italic", color: "#0E0E0E" }}>Reviews by Hour & Day</h2>
      </div>
      <div style={{ padding: "16px 24px 20px" }}>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 3, paddingTop: 22 }}>
            {DAYS.map(d => (
              <div key={d} style={{ height: 14, fontSize: 9, color: "rgba(14,14,14,0.35)", display: "flex", alignItems: "center", letterSpacing: "0.1em" }}>{d}</div>
            ))}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", gap: 3, marginBottom: 3, paddingLeft: 1 }}>
              {HOURS.map((h, i) => (
                <div key={h} style={{ flex: 2, fontSize: 8, color: "rgba(14,14,14,0.3)", textAlign: "left" }}>{h}</div>
              ))}
            </div>
            {weekHourGrid.map((row, di) => (
              <div key={di} style={{ display: "flex", gap: 2, marginBottom: 2 }}>
                {row.map((val, hi) => {
                  const pct = val / maxV
                  const bg = pct > 0.8 ? "#0E0E0E" : pct > 0.6 ? "#3A3A3A" : pct > 0.4 ? "#7A7A7A" : pct > 0.2 ? "#C4C4C4" : "#F0F0F0"
                  return (
                    <div key={hi} title={`${DAYS[di]} ${hi}:00 — ${val} reviews`}
                      style={{ flex: 1, height: 14, borderRadius: 3, background: bg, cursor: "pointer", transition: "opacity 0.15s" }}
                      onMouseEnter={e => e.currentTarget.style.opacity = "0.7"}
                      onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                    />
                  )
                })}
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 12, alignItems: "center" }}>
          <span style={{ fontSize: 9, color: "rgba(14,14,14,0.35)", letterSpacing: "0.12em", textTransform: "uppercase" }}>Less</span>
          {["#F0F0F0", "#C4C4C4", "#7A7A7A", "#3A3A3A", "#0E0E0E"].map((c, i) => (
            <div key={i} style={{ width: 14, height: 14, borderRadius: 3, background: c }} />
          ))}
          <span style={{ fontSize: 9, color: "rgba(14,14,14,0.35)", letterSpacing: "0.12em", textTransform: "uppercase" }}>More</span>
        </div>
      </div>
    </div>
  )
}