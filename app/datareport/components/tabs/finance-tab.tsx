"use client"

import React from "react"
import { C, TableHead, Pill, I } from "../shared"
import { KpiCard } from "../kpi-card"
import { CardShell } from "../card-shell"

const financeRows = [
  { cat: "Выручка (нетто)",    fact: 4200000, plan: 4300000, delta: -100000 },
  { cat: "Себестоимость",      fact: 1890000, plan: 1900000, delta: -10000  },
  { cat: "Валовая прибыль",    fact: 2310000, plan: 2400000, delta: -90000  },
  { cat: "Маркетинг",          fact: 420000,  plan: 400000,  delta: 20000   },
  { cat: "Логистика",          fact: 310000,  plan: 290000,  delta: 20000   },
  { cat: "Операционная приб.", fact: 1580000, plan: 1710000, delta: -130000 },
  { cat: "Налог (20%)",        fact: 316000,  plan: 342000,  delta: -26000  },
  { cat: "Чистая прибыль",     fact: 1264000, plan: 1368000, delta: -104000 },
]

const COST_LINES  = new Set(["Себестоимость","Маркетинг","Логистика","Налог (20%)"])
const TOTAL_LINES = new Set(["Валовая прибыль","Операционная приб.","Чистая прибыль"])

const channels = [
  { name: "Wildberries",    rev: "₽ 2.8М", growth: "+18.4%", share: 67, color: C.accent },
  { name: "Ozon",           rev: "₽ 0.9М", growth: "+11.2%", share: 21, color: C.purple },
  { name: "Яндекс Маркет", rev: "₽ 0.5М", growth: "+6.7%",  share: 12, color: C.green  },
]

const formulas = [
  { label: "Gross margin",  formula: "GM = (Revenue − COGS) / Revenue × 100" },
  { label: "Net margin",    formula: "NM = Net Profit / Revenue × 100"        },
  { label: "Plan variance", formula: "Δ% = (Fact − Plan) / Plan × 100"        },
]

function fmtM(n: number) {
  if (n >= 1_000_000) return `₽ ${(n / 1_000_000).toFixed(1)}М`
  if (n >= 1_000)     return `₽ ${(n / 1_000).toFixed(0)}К`
  return `₽ ${n}`
}

export function FinanceTab() {
  return (
    <>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: 22, fontStyle: "italic", fontWeight: 400, color: C.text }}>Finance</h2>
        <p style={{ fontSize: 12, color: C.text3, marginTop: 3 }}>P&L monitor · April 2025</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 12, marginBottom: 20 }}>
        <KpiCard label="Net revenue"  value="₽ 4.2М"  delta="+18.4% MoM"       deltaType="up" iconBg={C.greenBg}  iconColor={C.greenTx}  icon={I.chart} />
        <KpiCard label="Gross profit" value="₽ 2.31М" delta="55% margin"        deltaType="up" iconBg={C.purpleBg} iconColor={C.purpleTx} icon={I.bars}  />
        <KpiCard label="Net profit"   value="₽ 1.26М" delta="30.1% margin"      deltaType="up" iconBg={C.amberBg}  iconColor={C.amberTx}  icon={I.money} />
        <KpiCard label="Plan gap"     value="−₽ 104К" delta="−7.6% below plan"  deltaType="dn" iconBg={C.redBg}    iconColor={C.redTx}    icon={I.down}  />
      </div>

      {/* P&L Table */}
      <CardShell title="P&L statement" sub="April 2025 vs plan">
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5, tableLayout: "fixed" }}>
            <TableHead cols={["Line item", "Actual", "Plan", "Delta", "vs Plan"]} />
            <tbody>
              {financeRows.map((row, i) => {
                const pct     = ((row.fact - row.plan) / row.plan * 100).toFixed(1)
                const isCost  = COST_LINES.has(row.cat)
                const good    = isCost ? row.delta <= 0 : row.delta >= 0
                const isTot   = TOTAL_LINES.has(row.cat)
                const rowBg   = isTot ? C.surface2 : "transparent"
                const td      = { padding: "10px 16px", borderBottom: i < financeRows.length - 1 ? `0.5px solid ${C.border}` : "none", background: rowBg }
                return (
                  <tr key={row.cat}>
                    <td style={{ ...td, color: C.text, fontWeight: isTot ? 500 : 400 }}>{row.cat}</td>
                    <td style={{ ...td, textAlign: "right", color: C.text, fontWeight: isTot ? 500 : 400, fontFamily: "monospace" }}>{fmtM(row.fact)}</td>
                    <td style={{ ...td, textAlign: "right", color: C.text3, fontFamily: "monospace" }}>{fmtM(row.plan)}</td>
                    <td style={{ ...td, textAlign: "right", color: good ? C.green : C.red, fontFamily: "monospace" }}>
                      {row.delta > 0 ? "+" : ""}{fmtM(Math.abs(row.delta))}
                    </td>
                    <td style={{ ...td, textAlign: "right" }}>
                      <Pill type={good ? "up" : "dn"}>{row.delta > 0 ? "+" : ""}{pct}%</Pill>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </CardShell>

      {/* Channel breakdown */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 12, marginTop: 20 }}>
        {channels.map(ch => (
          <div key={ch.name} style={{ background: C.surface, border: `0.5px solid ${C.border}`, borderRadius: 14, padding: 20 }}>
            <p style={{ fontSize: 10, color: C.text3, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 12 }}>{ch.name}</p>
            <p style={{ fontFamily: "Georgia, serif", fontSize: 24, fontStyle: "italic", color: C.text, marginBottom: 8 }}>{ch.rev}</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <Pill type="up">{ch.growth}</Pill>
              <span style={{ fontSize: 11, color: C.text3 }}>{ch.share}% share</span>
            </div>
            <div style={{ height: 4, background: C.surface2, borderRadius: 3, overflow: "hidden" }}>
              <div style={{ width: `${ch.share}%`, height: "100%", background: ch.color, borderRadius: 3 }} />
            </div>
          </div>
        ))}
      </div>

      {/* Key formulas */}
      <div style={{ marginTop: 20, background: C.surface, border: `0.5px solid ${C.border}`, borderRadius: 14, padding: 20 }}>
        <p style={{ fontSize: 11, color: C.text3, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 12 }}>Key formulas</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 12 }}>
          {formulas.map(f => (
            <div key={f.label} style={{ background: C.surface2, borderRadius: 8, padding: "12px 14px", borderLeft: `2px solid ${C.accent}`, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>
              <p style={{ fontSize: 10, color: C.text3, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>{f.label}</p>
              <p style={{ fontFamily: "monospace", fontSize: 11.5, color: C.text2, lineHeight: 1.6 }}>{f.formula}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
