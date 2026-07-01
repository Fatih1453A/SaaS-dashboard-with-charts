"use client"
import React from "react"
import { C, KpiGrid } from "./components/Cards"
import { CorrelationChart } from "./components/MainCharts"
import { ActionPlan, ScenariosWithTrend } from "./components/ActionPlan"
import { CategoryCorrelation, SentimentRadar } from "./components/CategoryCharts"
import { AttributeDistribution } from "./components/Attributes"

export default function GraspoDashboard() {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, padding: "32px 28px", color: C.text, fontFamily: "sans-serif" }}>
      <header style={{ maxWidth: 1200, margin: "0 auto 28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontSize: 20, fontWeight: 500, letterSpacing: "-0.3px", margin: 0 }}>
          Graspo — Platform Analytics
        </h1>
        <span style={{ fontSize: 12, color: C.muted }}>April 2026 · Exploratory Report</span>
      </header>

      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>
        <KpiGrid />
        
        <CorrelationChart />

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
          <ActionPlan />
          <ScenariosWithTrend />
        </div>

        <CategoryCorrelation />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <AttributeDistribution />
          <SentimentRadar />
        </div>
      </div>

      <footer style={{ maxWidth: 1200, margin: "20px auto 0", textAlign: "center", fontSize: 11, color: C.muted }}>
        Graspo Intelligence Unit — Confidential · Index: ML_RU_01
      </footer>
    </div>
  )
}