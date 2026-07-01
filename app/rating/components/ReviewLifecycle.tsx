"use client"
import React from "react"

const funnelData = [
  { value: 4821, name: "Total Reviews",       fill: "#0E0E0E" },
  { value: 3820, name: "Verified", fill: "#3A3A3A" },
  { value: 2940, name: "With Text",        fill: "#6A6A6A" },
  { value: 1850, name: "Positive",       fill: "#B8D4A8" },
  { value: 380,  name: "Converted to Sales", fill: "#5A8A46" },
]

export function ReviewLifecycle() {
  return (
    <div style={{ background: "#E8E4D4", borderRadius: 16, overflow: "hidden" }}>
      <div style={{ padding: "20px 24px 16px", borderBottom: "1px solid rgba(14,14,14,0.1)" }}>
        <p style={{ fontSize: 9.5, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(14,14,14,0.4)", marginBottom: 4 }}>Funnel</p>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, fontStyle: "italic", color: "#0E0E0E" }}>Review Lifecycle</h2>
      </div>
      <div style={{ padding: "16px 24px 20px" }}>
        {funnelData.map((d, i) => {
          const pct = (d.value / funnelData[0].value) * 100
          const isLast = i === funnelData.length - 1
          return (
            <div key={d.name} style={{ marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 10, color: "rgba(14,14,14,0.6)" }}>{d.name}</span>
                <span style={{ fontSize: 10, fontWeight: 600, color: isLast ? "#5A8A46" : "#0E0E0E", fontFamily: "'Playfair Display',serif" }}>
                  {d.value.toLocaleString()}
                </span>
              </div>
              <div style={{ height: 8, background: "rgba(14,14,14,0.1)", borderRadius: 99 }}>
                <div style={{
                  height: "100%", borderRadius: 99,
                  width: `${pct}%`,
                  background: isLast ? "#5A8A46" : d.fill,
                  transition: "width 0.6s ease",
                }} />
              </div>
              <div style={{ fontSize: 9, color: "rgba(14,14,14,0.35)", marginTop: 2, textAlign: "right" }}>{pct.toFixed(0)}%</div>
            </div>
          )
        })}
        <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", borderTop: "1px solid rgba(14,14,14,0.12)", paddingTop: 12 }}>
          <div>
            <p style={{ fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(14,14,14,0.4)", marginBottom: 2 }}>Final Conversion</p>
            <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, color: "#5A8A46", lineHeight: 1 }}>7.9%</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(14,14,14,0.4)", marginBottom: 2 }}>Previous Month</p>
            <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, color: "#0E0E0E", lineHeight: 1 }}>6.2%</p>
          </div>
        </div>
      </div>
    </div>
  )
}