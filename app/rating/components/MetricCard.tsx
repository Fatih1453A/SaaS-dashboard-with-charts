"use client"
import React from "react"

interface MetricCardProps {
  label: string
  value: string
  delta: string
  deltaType: "pos" | "neg" | "neutral"
  accent?: string
}

export function MetricCard({ label, value, delta, deltaType, accent = "#B8D4A8" }: MetricCardProps) {
  const dc = deltaType === "pos" ? "#5A8A46" : deltaType === "neg" ? "#C84B31" : "#8A8A8A"
  
  return (
    <div 
      style={{
        background: "#fff", border: "1px solid rgba(14,14,14,0.08)", borderRadius: 16,
        padding: "20px", overflow: "hidden", position: "relative",
        transition: "box-shadow 0.2s",
      }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)"}
      onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
    >
      <p style={{ fontSize: 9.5, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(14,14,14,0.4)", marginBottom: 8, fontFamily: "'DM Sans',sans-serif" }}>{label}</p>
      <p style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 28, color: "#0E0E0E", lineHeight: 1, marginBottom: 8 }}>{value}</p>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: dc, flexShrink: 0 }} />
        <span style={{ fontSize: 11, color: dc, fontFamily: "'DM Sans',sans-serif" }}>{delta}</span>
      </div>
      <div 
        style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
          background: accent, transformOrigin: "left",
          transform: "scaleX(0)", transition: "transform 0.3s",
        }} 
        className="card-accent-line" 
      />
    </div>
  )
}