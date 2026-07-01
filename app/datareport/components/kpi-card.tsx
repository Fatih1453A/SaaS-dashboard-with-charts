"use client"

import React from "react"
import { C, Pill, IconBox, type PillType } from "./shared"

interface KpiCardProps {
  label: string
  value: string
  delta: string
  deltaType: PillType
  iconBg: string
  iconColor: string
  icon: React.ReactNode
}

export function KpiCard({ label, value, delta, deltaType, iconBg, iconColor, icon }: KpiCardProps) {
  return (
    <div style={{
      background: C.surface, border: `0.5px solid ${C.border}`,
      borderRadius: 14, padding: "18px 20px",
      display: "flex", flexDirection: "column", gap: 14,
    }}>
      <IconBox bg={iconBg} color={iconColor}>{icon}</IconBox>
      <div>
        <p style={{ fontSize: 10.5, color: C.text3, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>
          {label}
        </p>
        <p style={{ fontFamily: "Georgia, serif", fontSize: 26, fontStyle: "italic", fontWeight: 400, color: C.text, lineHeight: 1 }}>
          {value}
        </p>
      </div>
      <Pill type={deltaType}>{delta}</Pill>
    </div>
  )
}
