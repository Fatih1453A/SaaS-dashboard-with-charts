"use client"
import React from "react"

const topicHeatmap = [
  { topic: "Quality",  "5★": 94, "4★": 78, "3★": 40, "2★": 18, "1★": 8  },
  { topic: "Delivery",  "5★": 82, "4★": 70, "3★": 55, "2★": 35, "1★": 20 },
  { topic: "Packaging",  "5★": 88, "4★": 72, "3★": 45, "2★": 22, "1★": 12 },
  { topic: "Description",  "5★": 75, "4★": 65, "3★": 50, "2★": 40, "1★": 28 },
  { topic: "Price",      "5★": 90, "4★": 80, "3★": 60, "2★": 30, "1★": 15 },
  { topic: "Size",    "5★": 70, "4★": 58, "3★": 42, "2★": 55, "1★": 48 },
]

export function TopicMatrix() {
  const stars = ["5★", "4★", "3★", "2★", "1★"]
  return (
    <div style={{ background: "#fff", border: "1px solid rgba(14,14,14,0.08)", borderRadius: 16, overflow: "hidden" }}>
      <div style={{ padding: "20px 24px 16px", borderBottom: "1px solid rgba(14,14,14,0.07)" }}>
        <p style={{ fontSize: 9.5, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(14,14,14,0.35)", marginBottom: 4 }}>ML Matrix</p>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, fontStyle: "italic", color: "#0E0E0E" }}>Topics × Rating</h2>
      </div>
      <div style={{ padding: "16px 24px 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "80px repeat(5,1fr)", gap: 3, marginBottom: 4 }}>
          <div />
          {stars.map(s => (
            <div key={s} style={{ fontSize: 9, color: "rgba(14,14,14,0.4)", textAlign: "center", letterSpacing: "0.06em", paddingBottom: 4 }}>{s}</div>
          ))}
        </div>
        {topicHeatmap.map(row => (
          <div key={row.topic} style={{ display: "grid", gridTemplateColumns: "80px repeat(5,1fr)", gap: 3, marginBottom: 3 }}>
            <div style={{ fontSize: 10, color: "rgba(14,14,14,0.6)", display: "flex", alignItems: "center" }}>{row.topic}</div>
            {stars.map(s => {
              const v = (row as any)[s]
              const alpha = v / 100
              return (
                <div key={s} title={`${row.topic} / ${s}: ${v}%`}
                  style={{
                    height: 28, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center",
                    background: `rgba(14,14,14,${alpha * 0.85})`,
                    cursor: "pointer", transition: "transform 0.1s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                >
                  <span style={{ fontSize: 9, color: alpha > 0.5 ? "#fff" : "rgba(14,14,14,0.5)", fontWeight: 600 }}>{v}%</span>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}