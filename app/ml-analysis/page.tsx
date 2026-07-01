"use client"

import React, { useState, useEffect, useRef } from "react"
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// ── DATA ──────────────────────────────────────────────────────────────────────

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

const categoryData = [
  { name: "Clothing",     pct: 42, color: "#0E0E0E" },
  { name: "Footwear",      pct: 28, color: "#B8D4A8" },
  { name: "Accessories", pct: 18, color: "#8A8A8A" },
  { name: "Other",     pct: 12, color: "#C4C4C4" },
]

const articles = [
  { id: "WB-84712", name: "Oversize coat beige",  cat: "Clothing",     orders: 412, rev: 618000, conv: 5.2, rating: 4, stock: 84,  trend: "up"   },
  { id: "WB-31049", name: "Low sneakers white",    cat: "Footwear",      orders: 380, rev: 570000, conv: 4.8, rating: 5, stock: 22,  trend: "up"   },
  { id: "WB-55203", name: "Tote bag black",       cat: "Accessories", orders: 291, rev: 436500, conv: 3.9, rating: 4, stock: 67,  trend: "flat" },
  { id: "WB-10872", name: "Midi dress floral",     cat: "Clothing",     orders: 267, rev: 400500, conv: 3.4, rating: 5, stock: 45,  trend: "up"   },
  { id: "WB-77634", name: "Straight fit jeans",    cat: "Clothing",     orders: 218, rev: 327000, conv: 2.9, rating: 3, stock: 11,  trend: "down" },
  { id: "WB-22918", name: "Wool cardigan grey",     cat: "Clothing",     orders: 195, rev: 292500, conv: 2.7, rating: 4, stock: 53,  trend: "down" },
  { id: "WB-40155", name: "Chelsea boots tan",    cat: "Footwear",      orders: 180, rev: 270000, conv: 2.4, rating: 4, stock: 30,  trend: "up"   },
  { id: "WB-63210", name: "Silk blouse ivory",       cat: "Clothing",     orders: 162, rev: 243000, conv: 2.1, rating: 5, stock: 19,  trend: "flat" },
  { id: "WB-11834", name: "Cashmere scarf camel",   cat: "Accessories", orders: 148, rev: 222000, conv: 1.9, rating: 4, stock: 72,  trend: "up"   },
  { id: "WB-90021", name: "Midi pleated skirt",      cat: "Clothing",     orders: 135, rev: 202500, conv: 1.8, rating: 3, stock: 8,   trend: "down" },
  { id: "WB-47519", name: "Short puffer black",   cat: "Clothing",     orders: 121, rev: 181500, conv: 1.6, rating: 4, stock: 34,  trend: "flat" },
  { id: "WB-30088", name: "Canvas sneakers white",      cat: "Footwear",      orders: 114, rev: 171000, conv: 1.5, rating: 3, stock: 55,  trend: "down" },
  { id: "WB-58840", name: "Wide leg trousers ecru",    cat: "Clothing",     orders: 108, rev: 162000, conv: 1.4, rating: 4, stock: 41,  trend: "up"   },
  { id: "WB-12443", name: "Sunglasses brown",   cat: "Accessories", orders: 102, rev: 153000, conv: 1.3, rating: 5, stock: 88,  trend: "up"   },
  { id: "WB-73366", name: "Linen stripe shirt",   cat: "Clothing",     orders: 96,  rev: 144000, conv: 1.2, rating: 3, stock: 27,  trend: "flat" },
  { id: "WB-60112", name: "Heeled boots black",    cat: "Footwear",      orders: 89,  rev: 133500, conv: 1.2, rating: 4, stock: 15,  trend: "down" },
  { id: "WB-29017", name: "Ribbed top beige",       cat: "Clothing",     orders: 82,  rev: 123000, conv: 1.1, rating: 4, stock: 63,  trend: "up"   },
  { id: "WB-81944", name: "Leather belt black",     cat: "Accessories", orders: 74,  rev: 111000, conv: 1.0, rating: 3, stock: 39,  trend: "flat" },
  { id: "WB-44028", name: "Tights 40den nude",    cat: "Other",     orders: 68,  rev: 34000,  conv: 0.9, rating: 4, stock: 210, trend: "flat" },
  { id: "WB-55590", name: "Merino wool socks",      cat: "Other",     orders: 61,  rev: 30500,  conv: 0.8, rating: 3, stock: 180, trend: "up"   },
]

type Article = typeof articles[number]

const PER_PAGE = 10

// ── SUBCOMPONENTS ─────────────────────────────────────────────────────────────

function MetricCard({
  label, value, delta, deltaType, accentColor,
}: {
  label: string; value: string; delta: string
  deltaType: "pos" | "neg" | "neutral"; accentColor?: string
}) {
  const deltaColor =
    deltaType === "pos" ? "#5A8A46" : deltaType === "neg" ? "#C84B31" : "#8A8A8A"
  return (
    <div className="group relative bg-white border border-black/[0.08] rounded-2xl p-5 overflow-hidden transition-shadow hover:shadow-md">
      <p className="text-[9.5px] tracking-[0.18em] uppercase text-black/40 font-normal mb-2">{label}</p>
      <p className="font-serif text-[28px] font-normal leading-none text-black mb-2">{value}</p>
      <div className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: deltaColor }} />
        <span className="text-[11px]" style={{ color: deltaColor }}>{delta}</span>
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"
        style={{ background: accentColor ?? "#B8D4A8" }}
      />
    </div>
  )
}

function RatingDots({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 justify-end">
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={i}
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: i < rating ? "#0E0E0E" : "#E5E5E5" }}
        />
      ))}
    </div>
  )
}

function TrendBadge({ trend }: { trend: string }) {
  if (trend === "up")
    return <span className="inline-block text-[9.5px] px-2 py-0.5 rounded-full bg-green-100 text-green-700 uppercase tracking-wide">↑ Growth</span>
  if (trend === "down")
    return <span className="inline-block text-[9.5px] px-2 py-0.5 rounded-full bg-red-100 text-red-600 uppercase tracking-wide">↓ Decline</span>
  return <span className="inline-block text-[9.5px] px-2 py-0.5 rounded-full bg-black/[0.05] text-black/40 uppercase tracking-wide">— Stable</span>
}

function StockCell({ stock }: { stock: number }) {
  const color = stock < 20 ? "#C84B31" : stock < 40 ? "#B87A1E" : "#5A8A46"
  const pct = Math.min(Math.round(stock / 2.1), 100)
  return (
    <div className="flex items-center gap-2 justify-end">
      <span className="text-xs tabular-nums" style={{ color }}>{stock}</span>
      <div className="w-12 h-[2px] rounded-full bg-black/10">
        <div className="h-[2px] rounded-full" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  )
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[#0E0E0E] text-white text-xs rounded-xl px-3 py-2 shadow-xl">
      <p className="text-white/50 mb-1">Day {label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color === "#0E0E0E" ? "#B8D4A8" : p.color }}>
          {p.name === "rev" ? `Revenue: ${p.value}K` : `Orders: ${p.value}`}
        </p>
      ))}
    </div>
  )
}

// ── EXTRA DATA ────────────────────────────────────────────────────────────────

const correlationData = [
  { sku: "WB-847", neg: 12, sales: 412, active: false },
  { sku: "WB-310", neg: 8,  sales: 380, active: false },
  { sku: "WB-552", neg: 22, sales: 291, active: false },
  { sku: "WB-108", neg: 5,  sales: 267, active: false },
  { sku: "WB-776", neg: 41, sales: 128, active: false },
  { sku: "WB-229", neg: 37, sales: 145, active: false },
  { sku: "WB-401", neg: 18, sales: 180, active: false },
  { sku: "WB-632", neg: 9,  sales: 162, active: false },
  { sku: "WB-118", neg: 14, sales: 148, active: true  },
  { sku: "WB-900", neg: 51, sales: 67,  active: false },
  { sku: "WB-475", neg: 28, sales: 121, active: false },
  { sku: "WB-300", neg: 33, sales: 89,  active: false },
  { sku: "WB-588", neg: 11, sales: 108, active: false },
  { sku: "WB-124", neg: 6,  sales: 102, active: false },
  { sku: "WB-733", neg: 20, sales: 96,  active: false },
  { sku: "WB-601", neg: 44, sales: 52,  active: false },
]

const weeklyGrowth = [
  18, 22, 19, 28, 24, 31, 26, 35, 30, 42, 38, 48, 44, 55, 51, 62, 58, 70, 65, 78, 72, 85, 80, 91
]

const planFactData = [
  { mo: "Oct", plan: 280, fact: 251 },
  { mo: "Nov", plan: 320, fact: 318 },
  { mo: "Dec", plan: 410, fact: 445 },
  { mo: "Jan", plan: 300, fact: 287 },
  { mo: "Feb", plan: 350, fact: 362 },
  { mo: "Mar", plan: 390, fact: 418 },
  { mo: "Apr", plan: 430, fact: 421 },
]

const channelStats = [
  { label: "Wildberries", val: "+18.4%", sub: "vs last month", color: "#7B2FBE" },
  { label: "Ozon",        val: "+11.2%", sub: "vs last month", color: "#005BFF" },
  { label: "Yandex Market", val: "+6.7%", sub: "vs last month", color: "#FF4433" },
]

// ── GRASPO-STYLE CORRELATION CHART ────────────────────────────────────────────

function GraspoCorrelationChart() {
  const [hovered, setHovered] = useState<number | null>(null)
  const maxSales = Math.max(...correlationData.map(d => d.sales))

  return (
    <div className="bg-white border border-black/[0.08] rounded-2xl overflow-hidden">
      <div className="px-6 py-5 border-b border-black/[0.07]">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-black font-medium mb-1">
              Review & Sales Correlation
            </p>
            <p className="text-[11px] text-black/40">
              Relationship between negative triggers and order dynamics by SKU
            </p>
          </div>
          <div className="flex gap-4">
            {["Fabric Quality", "Size Chart", "Logistics"].map((t) => (
              <span key={t} className="text-[9.5px] tracking-[0.14em] uppercase text-black/35">{t}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 pb-4 pt-5">
        <div className="flex items-end gap-[5px]" style={{ height: 180 }}>
          {correlationData.map((d, i) => {
            const isHov = hovered === i
            const heightPct = (d.sales / maxSales) * 100
            const isActive = d.active
            return (
              <div
                key={d.sku}
                className="flex-1 flex flex-col items-center gap-1 cursor-pointer group"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {isHov && (
                  <div className="text-[9px] text-black/50 whitespace-nowrap mb-0.5 font-mono">
                    {d.sales}
                  </div>
                )}
                <div
                  className="w-full rounded-t-[3px] transition-all duration-150"
                  style={{
                    height: `${heightPct}%`,
                    background: isActive ? "#0E0E0E" : isHov ? "#555" : "rgba(14,14,14,0.13)",
                    marginTop: "auto",
                  }}
                />
              </div>
            )
          })}
        </div>
        <div className="flex gap-[5px] mt-2">
          {correlationData.map((d, i) => (
            <div key={d.sku} className="flex-1 text-center">
              <span
                className={`text-[7.5px] font-mono transition-colors ${
                  hovered === i ? "text-black/60" : "text-black/20"
                }`}
              >
                {d.sku.replace("WB-", "")}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-black/[0.07] px-6 py-4 flex items-center justify-between">
        <div>
          <p className="text-[9.5px] tracking-[0.16em] uppercase text-black/35 mb-1">
            Critical SKUs
          </p>
          <p className="font-serif text-[22px] text-black leading-none">4</p>
        </div>
        <div>
          <p className="text-[9.5px] tracking-[0.16em] uppercase text-black/35 mb-1">
            Avg. Negative Reviews
          </p>
          <p className="font-serif text-[22px] text-black leading-none">24.8</p>
        </div>
        <div>
          <p className="text-[9.5px] tracking-[0.16em] uppercase text-black/35 mb-1">
            Revenue Loss
          </p>
          <p className="font-serif text-[22px] text-[#C84B31] leading-none">−$318K</p>
        </div>
        <button className="text-[10px] tracking-[0.12em] uppercase border border-black/20 rounded-full px-4 py-2 hover:bg-black hover:text-white transition-all">
          View Plan
        </button>
      </div>
    </div>
  )
}

// ── FINTECH-STYLE BLOCK ────────────────────────────────────────────────────────

function SparkLine({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const h = 56
  const w = 180
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w
    const y = h - ((v - min) / (max - min)) * h
    return `${x},${y}`
  }).join(" ")
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <polyline points={pts} stroke={color} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  )
}

function FintechGrowthBlock() {
  const [activeChan, setActiveChan] = useState(0)

  return (
    <div className="grid grid-cols-[1fr_1fr_300px] gap-3.5">

      <div className="bg-[#0E0E0E] rounded-2xl p-6 flex flex-col justify-between" style={{ minHeight: 260 }}>
        <div className="flex items-center justify-between">
          <span className="text-[10px] tracking-[0.2em] uppercase text-white/40">Revenue Growth</span>
          <div className="flex gap-1">
            {["Week", "Month"].map((t, i) => (
              <button
                key={t}
                className={`text-[9px] px-2.5 py-1 rounded-full border transition-all ${
                  i === 1
                    ? "bg-white text-black border-transparent"
                    : "border-white/20 text-white/40 bg-transparent"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[10px] text-white/30 mb-1">Calculated using ML forecasting model</p>
          <p className="text-white/20 text-[10px] mb-4">across all sales channels</p>
          <SparkLine data={weeklyGrowth} color="#B8D4A8" />
        </div>

        <div>
          <p className="text-[9px] tracking-[0.2em] uppercase text-white/30 mb-1">Current Growth</p>
          <p className="text-white font-sans font-light" style={{ fontSize: 52, lineHeight: 1 }}>
            +18.4<span className="text-[28px]">%</span>
          </p>
          <p className="text-[10px] text-white/30 mt-1">+11.2% vs last month</p>
        </div>
      </div>

      <div className="bg-[#E8E4D4] rounded-2xl p-6 flex flex-col justify-between" style={{ minHeight: 260 }}>
        <div className="flex items-center justify-between">
          <span className="text-[10px] tracking-[0.2em] uppercase text-black/50">Plan / Actual</span>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-[2px] bg-black/40 rounded" />
            <span className="text-[9px] text-black/40 uppercase tracking-wide mr-2">plan</span>
            <div className="w-3 h-[2px] bg-black rounded" />
            <span className="text-[9px] text-black/40 uppercase tracking-wide">fact</span>
          </div>
        </div>

        <div className="flex items-end gap-2 mt-4" style={{ height: 120 }}>
          {planFactData.map((d, i) => {
            const maxV = 480
            const planH = (d.plan / maxV) * 100
            const factH = (d.fact / maxV) * 100
            const over = d.fact >= d.plan
            return (
              <div key={d.mo} className="flex-1 flex flex-col items-center gap-0.5">
                <div className="w-full flex gap-[2px] items-end" style={{ height: 100 }}>
                  <div
                    className="flex-1 rounded-t-sm"
                    style={{ height: `${planH}%`, background: "rgba(14,14,14,0.18)" }}
                  />
                  <div
                    className="flex-1 rounded-t-sm"
                    style={{ height: `${factH}%`, background: over ? "#0E0E0E" : "#C84B31" }}
                  />
                </div>
                <span className="text-[8px] text-black/40 uppercase tracking-wide">{d.mo}</span>
              </div>
            )
          })}
        </div>

        <div className="flex items-end justify-between mt-2">
          <div>
            <p className="text-[9px] uppercase tracking-[0.14em] text-black/40 mb-0.5">Plan Achievement</p>
            <p className="font-sans text-black" style={{ fontSize: 32, fontWeight: 300, lineHeight: 1 }}>
              97.9<span className="text-[18px]">%</span>
            </p>
          </div>
          <p className="text-[10px] text-black/40 text-right">April 2025<br />in progress</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {channelStats.map((c, i) => (
          <div
            key={c.label}
            onClick={() => setActiveChan(i)}
            className="rounded-2xl px-5 py-4 cursor-pointer flex items-center justify-between transition-all"
            style={{
              background: activeChan === i ? c.color : "white",
              border: activeChan === i ? "none" : "0.5px solid rgba(14,14,14,0.08)",
            }}
          >
            <div>
              <p
                className="text-[9.5px] tracking-[0.14em] uppercase mb-1"
                style={{ color: activeChan === i ? "rgba(255,255,255,0.5)" : "rgba(14,14,14,0.4)" }}
              >
                {c.label}
              </p>
              <p
                className="font-sans font-light"
                style={{
                  fontSize: 24,
                  lineHeight: 1,
                  color: activeChan === i ? "#fff" : "#0E0E0E",
                }}
              >
                {c.val}
              </p>
            </div>
            <div
              className="text-[9px] px-2.5 py-1 rounded-full"
              style={{
                background: activeChan === i ? "rgba(255,255,255,0.18)" : "rgba(14,14,14,0.05)",
                color: activeChan === i ? "#fff" : "rgba(14,14,14,0.4)",
              }}
            >
              {c.sub}
            </div>
          </div>
        ))}

        <div className="bg-[#0E0E0E] rounded-2xl px-5 py-4">
          <p className="text-[9px] tracking-[0.18em] uppercase text-white/30 mb-3">Top SKU</p>
          <div className="space-y-2">
            {[
              { name: "Oversize coat", id: "WB-84712", val: "$618K", delta: "+12%" },
              { name: "Low sneakers",  id: "WB-31049", val: "$570K", delta: "+8%"  },
            ].map((row) => (
              <div key={row.id} className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-white font-light">{row.name}</p>
                  <p className="text-[9px] text-white/30 font-mono">{row.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-[12px] text-white">{row.val}</p>
                  <p className="text-[9px] text-[#B8D4A8]">{row.delta}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────

export default function SellerAnalyticsPage() {
  const [period, setPeriod]           = useState("30d")
  const [filterTrend, setFilterTrend] = useState("all")
  const [search, setSearch]           = useState("")
  const [page, setPage]               = useState(1)

  const filtered = articles.filter((a) => {
    const matchSearch =
      !search ||
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.id.toLowerCase().includes(search.toLowerCase())
    const matchTrend =
      filterTrend === "all" ||
      (filterTrend === "up"   && a.trend === "up") ||
      (filterTrend === "down" && a.trend === "down") ||
      (filterTrend === "low"  && a.stock < 20)
    return matchSearch && matchTrend
  })

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const pageData   = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const periods = ["7d", "30d", "90d", "Year"]
  const filters = [
    { key: "all",  label: "All" },
    { key: "up",   label: "↑ Growth" },
    { key: "down", label: "↓ Decline" },
    { key: "low",  label: "⚠ Low Stock" },
  ]

  return (
    <div
      className="flex flex-col gap-6 p-6 min-h-screen bg-[#F3F5F9]"
      style={{ paddingLeft: "calc(72px + 2rem)" }}
    >

      {/* ── TOPBAR ── */}
      <div className="flex items-end justify-between">
        <div className="flex items-baseline gap-3">
          <h1 className="font-serif text-[22px] font-normal italic text-black">Sales Overview</h1>
          <span className="text-[11px] tracking-[0.14em] uppercase text-black/40 font-light">April 2025</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {periods.map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`text-[11px] px-3.5 py-1.5 rounded-full border transition-all font-sans tracking-wide ${
                  period === p
                    ? "bg-[#0E0E0E] text-white border-transparent"
                    : "border-black/20 text-black/50 hover:border-black/50 hover:text-black/70 bg-transparent"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1.5 text-[11px] px-4 py-1.5 rounded-full border border-black/20 bg-white text-black/50 hover:bg-[#0E0E0E] hover:text-white hover:border-transparent transition-all tracking-wide">
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2 9h8M6 2v6M3.5 5 6 8l2.5-3" />
            </svg>
            Export
          </button>
        </div>
      </div>

      {/* ── METRICS ── */}
      <div className="grid grid-cols-4 gap-3.5">
        <MetricCard label="Revenue"            value="$4.2M" delta="+18.4% vs previous period" deltaType="pos" />
        <MetricCard label="Orders"             value="2,841"  delta="+11.2% vs previous period" deltaType="pos" />
        <MetricCard label="Active SKUs" value="312"    delta="Total items: 347"         deltaType="neutral" accentColor="#8A8A8A" />
        <MetricCard label="Conversion Rate"          value="3.7%"   delta="−0.3% decrease"             deltaType="neg"  accentColor="#C84B31" />
      </div>

      {/* ── CHARTS ROW ── */}
      <div className="grid grid-cols-[1fr_340px] gap-3.5">

        <div className="bg-white border border-black/[0.08] rounded-2xl overflow-hidden">
          <div className="px-6 py-5 border-b border-black/[0.07] flex justify-between items-end">
            <div>
              <p className="text-[9.5px] tracking-[0.18em] uppercase text-black/35 mb-1">Dynamics</p>
              <h2 className="font-serif text-[17px] italic text-black">Orders & Revenue</h2>
            </div>
            <div className="flex gap-4">
              {[{ color: "#0E0E0E", label: "Revenue" }, { color: "#B8D4A8", label: "Orders" }].map((l) => (
                <div key={l.label} className="flex items-center gap-1.5">
                  <div className="w-5 h-[3px] rounded" style={{ background: l.color }} />
                  <span className="text-[10px] tracking-[0.08em] uppercase text-black/40">{l.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="px-6 pt-5 pb-2">
            <ResponsiveContainer width="100%" height={210}>
              <ComposedChart data={salesData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#8A8A8A" }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="rev" tick={{ fontSize: 10, fill: "#8A8A8A" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}K`} />
                <YAxis yAxisId="orders" orientation="right" hide />
                <Tooltip content={<CustomTooltip />} />
                <Bar yAxisId="rev" dataKey="rev" fill="rgba(14,14,14,0.10)" radius={[4, 4, 0, 0]} barSize={18} />
                <Line yAxisId="orders" type="monotone" dataKey="orders" stroke="#B8D4A8" strokeWidth={2} dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 border-t border-black/[0.07]">
            {[
              { label: "Avg/Day",   val: "94.7" },
              { label: "Best Day", val: "180" },
              { label: "Avg. Check",   val: "$1,478" },
            ].map((s, i) => (
              <div key={s.label} className={`px-4 py-3.5 ${i < 2 ? "border-r border-black/[0.07]" : ""}`}>
                <p className="text-[9px] tracking-[0.16em] uppercase text-black/35 mb-1">{s.label}</p>
                <p className="font-serif text-[17px] text-black">{s.val}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-black/[0.08] rounded-2xl overflow-hidden">
          <div className="px-6 py-5 border-b border-black/[0.07]">
            <p className="text-[9.5px] tracking-[0.18em] uppercase text-black/35 mb-1">Structure</p>
            <h2 className="font-serif text-[17px] italic text-black">By Category</h2>
          </div>
          <div className="px-6 pt-4">
            <div className="flex justify-center" style={{ height: 150 }}>
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    dataKey="pct"
                    innerRadius={46}
                    outerRadius={68}
                    paddingAngle={2}
                    startAngle={90}
                    endAngle={-270}
                  >
                    {categoryData.map((c) => (
                      <Cell key={c.name} fill={c.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(v: number) => [`${v}%`, ""]}
                    contentStyle={{ borderRadius: 12, border: "none", background: "#0E0E0E", color: "#fff", fontSize: 12, padding: "6px 12px" }}
                    itemStyle={{ color: "#fff" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-1 divide-y divide-black/[0.06]">
              {categoryData.map((c) => (
                <div key={c.name} className="flex items-center gap-2.5 py-2.5 hover:opacity-70 cursor-pointer transition-opacity">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: c.color }} />
                  <span className="flex-1 text-xs text-black/60 font-light">{c.name}</span>
                  <div className="w-14 h-[2px] bg-black/10 rounded-full">
                    <div className="h-[2px] rounded-full" style={{ width: `${c.pct}%`, background: c.color }} />
                  </div>
                  <span className="text-xs font-medium text-black w-7 text-right">{c.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── ABC ANALYSIS ── */}
      <div>
        <p className="text-[9.5px] tracking-[0.18em] uppercase text-black/35 mb-3">ABC Analysis</p>
        <div className="grid grid-cols-3 gap-[1px] bg-black/[0.07] rounded-2xl overflow-hidden">
          {[
            { tag: "A", label: "Key SKUs", val: "47",  sub: "generate 80% of revenue",  bg: "bg-[#0E0E0E]", tagCls: "bg-[#0E0E0E] text-white" },
            { tag: "B", label: "Medium SKUs",  val: "98",  sub: "generate 15% of revenue",  bg: "bg-white",     tagCls: "bg-black/10 text-black"  },
            { tag: "C", label: "Weak SKUs",   val: "167", sub: "generate 5% of revenue",   bg: "bg-white",     tagCls: "bg-black/[0.07] text-black/50" },
          ].map((abc) => (
            <div key={abc.tag} className={`${abc.bg} p-5`}>
              <div className={`inline-flex items-center justify-center w-7 h-7 rounded-lg font-serif text-[15px] italic mb-3 ${abc.tagCls}`}>{abc.tag}</div>
              <p className={`text-xs mb-1.5 ${abc.bg === "bg-[#0E0E0E]" ? "text-white/50" : "text-black/50"}`}>{abc.label}</p>
              <p className={`font-serif text-2xl leading-none mb-1 ${abc.bg === "bg-[#0E0E0E]" ? "text-white" : "text-black"}`}>{abc.val}</p>
              <p className={`text-[10px] tracking-[0.1em] uppercase ${abc.bg === "bg-[#0E0E0E]" ? "text-white/30" : "text-black/35"}`}>{abc.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── GRASPO: CORRELATION CHART ── */}
      <GraspoCorrelationChart />

      {/* ── FINTECH: GROWTH BLOCK ── */}
      <div>
        <p className="text-[9.5px] tracking-[0.18em] uppercase text-black/35 mb-3">Growth Dynamics</p>
        <FintechGrowthBlock />
      </div>

      {/* ── ARTICLES TABLE ── */}
      <div className="bg-white border border-black/[0.08] rounded-2xl overflow-hidden">
        <div className="px-6 py-5 border-b border-black/[0.07] flex justify-between items-end">
          <div>
            <p className="text-[9.5px] tracking-[0.18em] uppercase text-black/35 mb-1">Product Analytics</p>
            <h2 className="font-serif text-[17px] italic text-black">Top SKUs</h2>
          </div>
        </div>

        <div className="px-5 py-3.5 border-b border-black/[0.07] flex items-center justify-between gap-3 flex-wrap bg-white">
          <div className="flex gap-1.5 flex-wrap">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => { setFilterTrend(f.key); setPage(1) }}
                className={`text-[10.5px] px-3 py-1 rounded-full border transition-all tracking-wide font-sans ${
                  filterTrend === f.key
                    ? "bg-[#0E0E0E] text-white border-transparent"
                    : "border-black/20 text-black/45 hover:text-black hover:border-black/50 bg-transparent"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-black/30 text-sm pointer-events-none">⌕</span>
            <input
              type="text"
              placeholder="SKU or name…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1) }}
              className="text-xs pl-8 pr-4 py-1.5 rounded-full border border-black/20 bg-[#F3F5F9] text-black placeholder:text-black/30 outline-none focus:border-black/40 focus:bg-white transition-all w-52"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-[12.5px]">
            <thead>
              <tr className="bg-[#F3F5F9]">
                {["SKU / Name", "Orders", "Revenue", "Conversion", "Rating", "Stock", "Trend"].map((h, i) => (
                  <th
                    key={h}
                    className={`px-4 py-2.5 text-[9.5px] tracking-[0.15em] uppercase text-black/35 font-normal border-b border-black/[0.07] ${i > 0 ? "text-right" : "text-left"}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pageData.map((row) => (
                <tr key={row.id} className="border-b border-black/[0.06] hover:bg-black/[0.02] transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-medium text-black">{row.name}</div>
                    <div className="text-[10px] text-black/35 font-mono mt-0.5">{row.id} · {row.cat}</div>
                  </td>
                  <td className="px-4 py-3 text-right text-black/60">{row.orders.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right font-medium text-black">${row.rev.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right text-black/60">{row.conv.toFixed(1)}%</td>
                  <td className="px-4 py-3 text-right"><RatingDots rating={row.rating} /></td>
                  <td className="px-4 py-3"><StockCell stock={row.stock} /></td>
                  <td className="px-4 py-3 text-right"><TrendBadge trend={row.trend} /></td>
                </tr>
              ))}
              {pageData.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-black/30 text-sm italic font-serif">
                    No matches found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-5 py-3 border-t border-black/[0.07]">
          <span className="text-[11px] text-black/35">
            Showing {Math.min((page - 1) * PER_PAGE + 1, filtered.length)}–{Math.min(page * PER_PAGE, filtered.length)} of {filtered.length}
          </span>
          <div className="flex gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-7 h-7 rounded-md border border-black/15 text-xs text-black/40 hover:border-black/40 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-all bg-transparent"
            >
              ‹
            </button>
            <button className="w-7 h-7 rounded-md bg-[#0E0E0E] text-white text-xs">
              {page}
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-7 h-7 rounded-md border border-black/15 text-xs text-black/40 hover:border-black/40 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-all bg-transparent"
            >
              ›
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}