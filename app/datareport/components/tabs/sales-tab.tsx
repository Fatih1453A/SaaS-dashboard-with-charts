"use client"

import React, { useState } from "react"
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts"
import { C, Legend, StatBand, TableHead, RatingDots, StockBar, TrendBadge, I, type PillType } from "../shared"
import { KpiCard } from "../kpi-card"
import { CardShell } from "../card-shell"
import { RingChart } from "../ring-chart"

const salesData = [
  { day: "1",  rev: 180, orders: 55 },  { day: "3",  rev: 175, orders: 53 },
  { day: "5",  rev: 210, orders: 65 },  { day: "7",  rev: 195, orders: 60 },
  { day: "9",  rev: 260, orders: 80 },  { day: "11", rev: 290, orders: 88 },
  { day: "13", rev: 315, orders: 96 },  { day: "15", rev: 360, orders: 110 },
  { day: "17", rev: 390, orders: 120 }, { day: "19", rev: 430, orders: 132 },
  { day: "21", rev: 475, orders: 146 }, { day: "23", rev: 490, orders: 150 },
  { day: "25", rev: 530, orders: 162 }, { day: "27", rev: 555, orders: 168 },
  { day: "30", rev: 618, orders: 180 },
]

const planFactData = [
  { mo: "Окт", plan: 280, fact: 251 },
  { mo: "Ноя", plan: 320, fact: 318 },
  { mo: "Дек", plan: 410, fact: 445 },
  { mo: "Янв", plan: 300, fact: 287 },
  { mo: "Фев", plan: 350, fact: 362 },
  { mo: "Мар", plan: 390, fact: 418 },
  { mo: "Апр", plan: 430, fact: 421 },
]

const categoryData = [
  { name: "Одежда",     pct: 42, color: C.accent  },
  { name: "Обувь",      pct: 28, color: C.purple  },
  { name: "Аксессуары", pct: 18, color: C.amber   },
  { name: "Прочее",     pct: 12, color: "#D3D1C7" },
]

const articles = [
  { id: "WB-84712", name: "Пальто oversize beige",  cat: "Одежда",     orders: 412, rev: 618000, conv: 5.2, rating: 4, stock: 84,  trend: "up"   },
  { id: "WB-31049", name: "Кроссовки low white",    cat: "Обувь",      orders: 380, rev: 570000, conv: 4.8, rating: 5, stock: 22,  trend: "up"   },
  { id: "WB-55203", name: "Сумка tote black",       cat: "Аксессуары", orders: 291, rev: 436500, conv: 3.9, rating: 4, stock: 67,  trend: "flat" },
  { id: "WB-10872", name: "Платье midi floral",     cat: "Одежда",     orders: 267, rev: 400500, conv: 3.4, rating: 5, stock: 45,  trend: "up"   },
  { id: "WB-77634", name: "Джинсы straight fit",    cat: "Одежда",     orders: 218, rev: 327000, conv: 2.9, rating: 3, stock: 11,  trend: "down" },
  { id: "WB-22918", name: "Кардиган wool grey",     cat: "Одежда",     orders: 195, rev: 292500, conv: 2.7, rating: 4, stock: 53,  trend: "down" },
  { id: "WB-40155", name: "Ботинки chelsea tan",    cat: "Обувь",      orders: 180, rev: 270000, conv: 2.4, rating: 4, stock: 30,  trend: "up"   },
  { id: "WB-63210", name: "Блуза silk ivory",       cat: "Одежда",     orders: 162, rev: 243000, conv: 2.1, rating: 5, stock: 19,  trend: "flat" },
  { id: "WB-11834", name: "Шарф cashmere camel",   cat: "Аксессуары", orders: 148, rev: 222000, conv: 1.9, rating: 4, stock: 72,  trend: "up"   },
  { id: "WB-90021", name: "Юбка midi pleated",      cat: "Одежда",     orders: 135, rev: 202500, conv: 1.8, rating: 3, stock: 8,   trend: "down" },
]

function SalesTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: C.text, color: "#fff", fontSize: 11, borderRadius: 10, padding: "8px 12px" }}>
      <p style={{ color: "rgba(255,255,255,0.45)", marginBottom: 4 }}>День {label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.name === "rev" ? "#B8D4A8" : C.purpleBg }}>
          {p.name === "rev" ? `Выручка: ${p.value}К` : `Заказы: ${p.value}`}
        </p>
      ))}
    </div>
  )
}

function fmt(n: number) { return n.toLocaleString("ru") }

export function SalesTab() {
  const [filter, setFilter] = useState("all")
  const [search, setSearch] = useState("")

  const filtered = articles.filter(a => {
    const matchS = !search || a.name.toLowerCase().includes(search.toLowerCase()) || a.id.toLowerCase().includes(search.toLowerCase())
    const matchF = filter === "all"
      || (filter === "up"   && a.trend === "up")
      || (filter === "down" && a.trend === "down")
      || (filter === "low"  && a.stock < 20)
    return matchS && matchF
  })

  return (
    <>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: 22, fontStyle: "italic", fontWeight: 400, color: C.text }}>Sales analytics</h2>
        <p style={{ fontSize: 12, color: C.text3, marginTop: 3 }}>Daily monitoring · April 2025</p>
      </div>

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,minmax(0,1fr))", gap: 12, marginBottom: 20 }}>
        <KpiCard label="GMV today"    value="₽ 618К"   delta="+12% vs yesterday" deltaType="up" iconBg={C.greenBg}  iconColor={C.greenTx}  icon={I.chart} />
        <KpiCard label="Orders today" value="180"      delta="+9% vs yesterday"  deltaType="up" iconBg={C.purpleBg} iconColor={C.purpleTx} icon={I.bag}   />
        <KpiCard label="Avg. order"   value="₽ 1 478"  delta="stable"            deltaType="ne" iconBg={C.amberBg}  iconColor={C.amberTx}  icon={I.clock} />
        <KpiCard label="Returns"      value="2.1%"     delta="−0.4pp MoM"        deltaType="up" iconBg={C.redBg}    iconColor={C.redTx}    icon={I.back}  />
        <KpiCard label="Active SKUs"  value="312"      delta="of 347 total"      deltaType="ne" iconBg={C.surface2} iconColor={C.text3}    icon={I.bars}  />
      </div>

      {/* Revenue chart + Category ring */}
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.9fr) minmax(0,1fr)", gap: 12, marginBottom: 20 }}>
        <CardShell
          title="Revenue & orders — April"
          right={<Legend items={[{ color: C.accent, label: "Revenue (К)" }, { color: C.green, label: "Orders" }]} />}
        >
          <div style={{ padding: "16px 20px 4px" }}>
            <ResponsiveContainer width="100%" height={220}>
              <ComposedChart data={salesData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: C.text3 }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="rev" tick={{ fontSize: 10, fill: C.text3 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}К`} />
                <YAxis yAxisId="ord" orientation="right" hide />
                <Tooltip content={<SalesTooltip />} />
                <Bar yAxisId="rev" dataKey="rev" fill={C.purpleBg} radius={[4, 4, 0, 0]} barSize={18} />
                <Line yAxisId="ord" type="monotone" dataKey="orders" stroke={C.green} strokeWidth={2} dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <StatBand items={[{ label: "Avg/day", val: "94.7" }, { label: "Best day", val: "180" }, { label: "Avg check", val: "₽ 1 478" }]} />
        </CardShell>

        <CardShell title="By categories">
          <div style={{ padding: "16px 20px" }}>
            <RingChart value="4" label="categories" data={categoryData} />
          </div>
        </CardShell>
      </div>

      {/* ABC */}
      <div style={{ marginBottom: 20 }}>
        <p style={{ fontSize: 10, color: C.text3, textTransform: "uppercase", letterSpacing: "0.18em", marginBottom: 10 }}>ABC-анализ</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", borderRadius: 14, overflow: "hidden", border: `0.5px solid ${C.border}` }}>
          {[
            { tag: "A", label: "Key articles",  val: "47",  sub: "drive 80% of revenue", dark: true  },
            { tag: "B", label: "Mid articles",  val: "98",  sub: "drive 15% of revenue", dark: false },
            { tag: "C", label: "Weak articles", val: "167", sub: "drive 5% of revenue",  dark: false },
          ].map((abc, i) => (
            <div key={abc.tag} style={{ padding: 20, background: abc.dark ? C.accent : C.surface, borderRight: i < 2 ? `0.5px solid ${C.border}` : "none" }}>
              <div style={{ fontFamily: "Georgia, serif", fontSize: 15, fontStyle: "italic", color: abc.dark ? "rgba(255,255,255,0.6)" : C.accent, marginBottom: 8 }}>{abc.tag}</div>
              <p style={{ fontSize: 12, color: abc.dark ? "rgba(255,255,255,0.5)" : C.text3, marginBottom: 4 }}>{abc.label}</p>
              <p style={{ fontFamily: "Georgia, serif", fontSize: 24, fontStyle: "italic", color: abc.dark ? "#fff" : C.text, lineHeight: 1, marginBottom: 4 }}>{abc.val}</p>
              <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: abc.dark ? "rgba(255,255,255,0.3)" : C.text3 }}>{abc.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Plan vs Fact */}
      <CardShell
        title="Plan vs Fact" sub="Oct 2024 – Apr 2025"
        right={<Legend items={[{ color: "rgba(42,37,112,0.2)", label: "Plan" }, { color: C.accent, label: "Fact" }]} />}
      >
        <div style={{ padding: "16px 20px 4px" }}>
          <ResponsiveContainer width="100%" height={200}>
            <ComposedChart data={planFactData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
              <XAxis dataKey="mo" tick={{ fontSize: 10, fill: C.text3 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: C.text3 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}К`} />
              <Tooltip contentStyle={{ borderRadius: 10, border: "none", background: C.text, color: "#fff", fontSize: 11 }} itemStyle={{ color: "#fff" }} labelStyle={{ color: "rgba(255,255,255,0.4)" }} />
              <Bar dataKey="plan" fill="rgba(42,37,112,0.12)" radius={[3, 3, 0, 0]} barSize={22} />
              <Bar dataKey="fact" fill={C.accent}              radius={[3, 3, 0, 0]} barSize={12} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div style={{ padding: "10px 20px 16px", fontSize: 12, color: C.text3 }}>
          Plan fulfillment: <span style={{ color: C.text, fontWeight: 500 }}>97.9%</span> · April in progress
        </div>
      </CardShell>

      {/* Articles table */}
      <div style={{ marginTop: 20, background: C.surface, border: `0.5px solid ${C.border}`, borderRadius: 14, overflow: "hidden" }}>
        <div style={{ padding: "18px 20px 14px", borderBottom: `0.5px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <div>
            <p style={{ fontSize: 13, fontWeight: 500, color: C.text }}>Top articles</p>
            <p style={{ fontSize: 11, color: C.text3, marginTop: 2 }}>Product analytics</p>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
            {[{ key: "all", label: "All" }, { key: "up", label: "↑ Growth" }, { key: "down", label: "↓ Decline" }, { key: "low", label: "⚠ Low stock" }].map(f => (
              <button key={f.key} onClick={() => setFilter(f.key)}
                style={{ fontSize: 10.5, padding: "5px 12px", borderRadius: 20, border: `0.5px solid ${C.border2}`, cursor: "pointer", fontFamily: "inherit", background: filter === f.key ? C.accent : "transparent", color: filter === f.key ? "#fff" : C.text3, transition: "all 0.12s" }}>
                {f.label}
              </button>
            ))}
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Article or name…"
              style={{ fontSize: 11.5, padding: "6px 12px", borderRadius: 20, border: `0.5px solid ${C.border2}`, background: C.surface2, color: C.text, outline: "none", width: 180, fontFamily: "inherit" }} />
          </div>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5, tableLayout: "fixed" }}>
            <TableHead cols={["Article / Name", "Orders", "Revenue", "Conv.", "Rating", "Stock", "Trend"]} />
            <tbody>
              {filtered.map(row => (
                <tr key={row.id}>
                  <td style={{ padding: "10px 14px", borderBottom: `0.5px solid ${C.border}` }}>
                    <div style={{ fontWeight: 500, color: C.text }}>{row.name}</div>
                    <div style={{ fontSize: 10, color: C.text3, fontFamily: "monospace", marginTop: 2 }}>{row.id} · {row.cat}</div>
                  </td>
                  <td style={{ padding: "10px 14px", textAlign: "right", color: C.text2, borderBottom: `0.5px solid ${C.border}` }}>{fmt(row.orders)}</td>
                  <td style={{ padding: "10px 14px", textAlign: "right", fontWeight: 500, color: C.text, borderBottom: `0.5px solid ${C.border}` }}>₽ {fmt(row.rev)}</td>
                  <td style={{ padding: "10px 14px", textAlign: "right", color: C.text2, borderBottom: `0.5px solid ${C.border}` }}>{row.conv.toFixed(1)}%</td>
                  <td style={{ padding: "10px 14px", textAlign: "right", borderBottom: `0.5px solid ${C.border}` }}><RatingDots rating={row.rating} /></td>
                  <td style={{ padding: "10px 14px", borderBottom: `0.5px solid ${C.border}` }}><StockBar stock={row.stock} /></td>
                  <td style={{ padding: "10px 14px", textAlign: "right", borderBottom: `0.5px solid ${C.border}` }}><TrendBadge trend={row.trend} /></td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} style={{ textAlign: "center", padding: 36, color: C.text3, fontStyle: "italic", fontFamily: "Georgia, serif" }}>No matches</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
