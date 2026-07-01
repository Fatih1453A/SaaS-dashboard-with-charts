"use client"
import React, { useState } from "react"
import { MetricCard } from "./components/MetricCard"
import { MLAlerts } from "./components/MLAlerts"
import { SentimentChart } from "./components/SentimentChart"
import { RadarFactors } from "./components/RadarFactors"
import { CorrelationChart } from "./components/CorrelationChart"
import { ReviewLifecycle } from "./components/ReviewLifecycle"
import { ActivityHeatmap } from "./components/ActivityHeatmap"
import { TopicMatrix } from "./components/TopicMatrix"
import { RecentReviews } from "./components/RecentReviews"

export default function ReviewsDashboard() {
  const [period, setPeriod] = useState("Month")
  const periods = ["Week", "Month", "Quarter", "Year"]

  return (
    <div style={{
      minHeight: "100vh", background: "#F3F5F9",
      paddingLeft: "calc(72px + 2rem)", paddingRight: "24px",
      paddingTop: "24px", paddingBottom: "40px",
      display: "flex", flexDirection: "column", gap: 24,
      fontFamily: "'DM Sans','Helvetica Neue',sans-serif",
    }}>

      {/* TOPBAR */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontStyle: "italic", color: "#0E0E0E", margin: 0 }}>Review Analytics</h1>
          <span style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(14,14,14,0.4)" }}>ML · April 2025</span>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ display: "flex", gap: 4 }}>
            {periods.map(p => (
              <button key={p} onClick={() => setPeriod(p)} style={{
                fontSize: 11, padding: "6px 14px", borderRadius: 99, border: "none", cursor: "pointer",
                background: period === p ? "#0E0E0E" : "transparent",
                color: period === p ? "#fff" : "rgba(14,14,14,0.5)",
                border: period === p ? "none" : "1px solid rgba(14,14,14,0.2)",
                transition: "all 0.15s", letterSpacing: "0.04em",
              }}>{p}</button>
            ))}
          </div>
          <button style={{
            display: "flex", alignItems: "center", gap: 6, fontSize: 11, padding: "6px 16px",
            borderRadius: 99, border: "1px solid rgba(14,14,14,0.2)", background: "#fff",
            color: "rgba(14,14,14,0.5)", cursor: "pointer", transition: "all 0.15s", letterSpacing: "0.04em",
          }}>
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 9h8M6 2v6M3.5 5 6 8l2.5-3" /></svg>
            Export
          </button>
        </div>
      </div>

      {/* KPI CARDS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
        <MetricCard label="Total Reviews" value="4,821" delta="+12.4% vs previous period" deltaType="pos" />
        <MetricCard label="ML Sentiment" value="78%" delta="+8 pp over 2 months" deltaType="pos" />
        <MetricCard label="Average Rating" value="4.3★" delta="Goal 4.5★ — 87% achieved" deltaType="neutral" accent="#8A8A8A" />
        <MetricCard label="Critical Issues" value="4" delta="−2 compared to March" deltaType="pos" />
      </div>

      {/* ML ALERT SECTION */}
      <div>
        <p style={{ fontSize: 9.5, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(14,14,14,0.35)", marginBottom: 10 }}>ML Insights</p>
        <MLAlerts />
      </div>

      {/* GRAPHS GRID */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 14 }}>
        <SentimentChart />
        <RadarFactors />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <CorrelationChart />
        <ReviewLifecycle />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <ActivityHeatmap />
        <TopicMatrix />
      </div>

      <RecentReviews />
    </div>
  )
}