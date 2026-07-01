"use client"
import React from "react"
import { motion } from "framer-motion"

export const C = {
  bg:      "#f5f5f7",
  card:    "rgba(255,255,255,0.72)",
  border:  "rgba(0,0,0,0.07)",
  shadow:  "0 2px 16px rgba(0,0,0,0.07)",
  text:    "#1d1d1f",
  muted:   "#6e6e73",
  neutral: "#d1d1d6",
  black:   "#1c1c1e",
  blue:    "#007aff",
  green:   "#34c759",
  red:     "#ff3b30",
  amber:   "#ff9f0a",
}

export const Card = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    style={{
      background: C.card,
      border: `0.5px solid ${C.border}`,
      borderRadius: 16,
      padding: "20px 22px",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      boxShadow: C.shadow,
      ...style,
    }}
  >
    {children}
  </motion.div>
)

export const CardTitle = ({ title, sub }: { title: string; sub?: string }) => (
  <div style={{ marginBottom: 14 }}>
    <p style={{ fontSize: 13, fontWeight: 500, color: C.text, margin: 0 }}>{title}</p>
    {sub && <p style={{ fontSize: 11, color: C.muted, margin: "3px 0 0" }}>{sub}</p>}
  </div>
)

export const KpiGrid = () => {
  const kpis = [
    { label: "Stock Control",  value: "100%", sub: "SKU Coverage" },
    { label: "Reviews Processed",  value: "15M+", sub: "+18% month over month" },
    { label: "Correlation Accuracy", value: "0.98", sub: "Model F1-score" },
    { label: "Order Monitoring",  value: "24/7", sub: "Response time: 12ms" },
  ]
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
      {kpis.map(k => (
        <div key={k.label} style={{ background: "rgba(255,255,255,0.55)", border: `0.5px solid ${C.border}`, borderRadius: 14, padding: "16px 18px" }}>
          <p style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 6px" }}>{k.label}</p>
          <p style={{ fontSize: 28, fontWeight: 500, letterSpacing: "-0.5px", margin: 0 }}>{k.value}</p>
          <p style={{ fontSize: 11, color: C.muted, margin: "4px 0 0" }}>{k.sub}</p>
        </div>
      ))}
    </div>
  )
}