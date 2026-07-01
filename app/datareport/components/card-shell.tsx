"use client"

import React from "react"
import { C } from "./shared"

interface CardShellProps {
  title: string
  sub?: string
  right?: React.ReactNode
  children: React.ReactNode
}

export function CardShell({ title, sub, right, children }: CardShellProps) {
  return (
    <div style={{ background: C.surface, border: `0.5px solid ${C.border}`, borderRadius: 14, overflow: "hidden" }}>
      <div style={{
        padding: "18px 20px 14px", borderBottom: `0.5px solid ${C.border}`,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 8,
      }}>
        <div>
          <p style={{ fontSize: 13, fontWeight: 500, color: C.text }}>{title}</p>
          {sub && <p style={{ fontSize: 11, color: C.text3, marginTop: 2 }}>{sub}</p>}
        </div>
        {right}
      </div>
      {children}
    </div>
  )
}
