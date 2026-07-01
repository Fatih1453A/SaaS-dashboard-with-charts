"use client"

import React from "react"
import { C } from "./shared"

interface TopbarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  tabs: { key: string; label: string }[]
}

export function Topbar({ activeTab, onTabChange, tabs }: TopbarProps) {
  return (
    <div style={{
      position: "sticky",
      top: 16, // Отступ сверху, чтобы он "парил"
      zIndex: 100,
      display: "flex",
      justifyContent: "center", // Центрируем ползунок
      width: "100%",
      pointerEvents: "none", // Чтобы клики сквозь пустые области проходили к контенту
    }}>
      <div style={{
        pointerEvents: "auto", // Возвращаем кликабельность самому ползунку
        background: "rgba(255, 255, 255, 0.8)", // Эффект стекла
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        padding: "4px",
        borderRadius: "14px",
        display: "flex",
        alignItems: "center",
        gap: "4px",
        border: "0.5px solid rgba(0,0,0,0.08)",
        boxShadow: "0 4px 20px -5px rgba(0,0,0,0.1)",
      }}>
        {tabs.map(t => {
          const isActive = activeTab === t.key
          return (
            <button
              key={t.key}
              onClick={() => onTabChange(t.key)}
              style={{
                padding: "8px 20px",
                borderRadius: "10px",
                fontSize: "13px",
                fontWeight: isActive ? 500 : 400,
                cursor: "pointer",
                border: "none",
                background: isActive ? "#fff" : "transparent",
                color: isActive ? C.accent : C.text3,
                // Тень только у активного элемента, чтобы создать эффект объема
                boxShadow: isActive ? "0 2px 8px rgba(0,0,0,0.06)" : "none",
                transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                fontFamily: "inherit",
                whiteSpace: "nowrap",
              }}
            >
              {t.label}
            </button>
          )
        })}

        {/* Разделитель перед профилем */}
        <div style={{ width: "1px", height: "20px", background: "rgba(0,0,0,0.06)", margin: "0 8px" }} />

        {/* Мини-аватар прямо в ползунке */}
        <div style={{ 
          width: 28, height: 28, background: C.purpleBg, borderRadius: "50%", 
          display: "flex", alignItems: "center", justifyContent: "center", 
          fontSize: "10px", fontWeight: 600, color: C.purpleTx, cursor: "pointer",
          marginRight: "4px"
        }}>
          AN
        </div>
      </div>
    </div>
  )
}