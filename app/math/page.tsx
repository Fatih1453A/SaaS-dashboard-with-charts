"use client"

import { useState } from "react"
import {
  AreaChart, Area,
  BarChart, Bar,
  LineChart, Line,
  XAxis, YAxis,
  CartesianGrid, Tooltip,
  ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts"

// ── Data ──────────────────────────────────────────────────────────────────────

const lineData = [
  { t: "08:00", v: 1200 },
  { t: "10:00", v: 1800 },
  { t: "12:00", v: 1500 },
  { t: "14:00", v: 2100 },
  { t: "16:00", v: 1700 },
  { t: "18:00", v: 2345 },
  { t: "20:00", v: 2000 },
]

const revenueBar = [
  { d: "Mon", a: 140, b: 90 },
  { d: "Tue", a: 200, b: 130 },
  { d: "Wed", a: 170, b: 80 },
  { d: "Thu", a: 260, b: 160 },
  { d: "Fri", a: 220, b: 120 },
  { d: "Sat", a: 310, b: 180 },
  { d: "Sun", a: 190, b: 100 },
]

const visitsDonut = [
  { name: "OSX", value: 28, color: "#FF9500" },
  { name: "Windows", value: 35, color: "#C7B7F8" },
  { name: "Android", value: 22, color: "#3478F6" },
  { name: "iOS", value: 15, color: "#34C759" },
]

const productivityData = [
  { d: "Mon", design: 3, dev: 4, comm: 2 },
  { d: "Tue", design: 2, dev: 5, comm: 3 },
  { d: "Wed", design: 4, dev: 3, comm: 1 },
  { d: "Thu", design: 3, dev: 4, comm: 4 },
  { d: "Fri", design: 5, dev: 2, comm: 2 },
  { d: "Sat", design: 1, dev: 1, comm: 1 },
  { d: "Sun", design: 0, dev: 0, comm: 0 },
]

const dailyVisits = [
  { d: "Mon", mob: 320, desk: 480 },
  { d: "Tue", mob: 410, desk: 620 },
  { d: "Wed", mob: 290, desk: 540 },
  { d: "Thu", mob: 500, desk: 750 },
  { d: "Fri", mob: 380, desk: 690 },
  { d: "Sat", mob: 220, desk: 310 },
  { d: "Sun", mob: 180, desk: 270 },
]

// Heatmap: regions × weeks, value 0-100
const heatRegions = ["Europe", "USA", "Asia", "Russia", "Other"]
const heatWeeks = ["20/12", "21/12", "22/12", "23/12", "24/12", "25/12", "26/12", "27/12", "28/12", "29/12", "30/12", "31/12", "1/01", "2/01"]
const heatmapData: Record<string, number[]> = {
  "Europe": [20, 30, 25, 40, 55, 60, 80, 70, 45, 30, 25, 50, 65, 75],
  "USA":    [35, 28, 45, 60, 70, 55, 75, 80, 50, 40, 30, 65, 70, 85],
  "Asia":   [15, 22, 30, 35, 40, 45, 50, 60, 55, 45, 35, 40, 55, 70],
  "Russia": [40, 35, 50, 65, 55, 70, 75, 65, 50, 45, 55, 60, 70, 80],
  "Other": [10, 18, 22, 28, 35, 30, 40, 45, 38, 28, 22, 35, 42, 52],
}

const todos = [
  { time: "19:00", text: "Reply to brand reviews", done: true },
  { time: "21:15", text: 'Team collaboration with "Marketing"', done: false },
  { time: "22:42", text: "Send UX report to Norman", done: false },
  { time: "09:00", text: "Update size chart", done: false },
]

const errors = [
  { time: "4:20 / Mar 18", code: "Out of Service – 408" },
  { time: "3:41 / Mar 18", code: "Temp Suspended – 512" },
  { time: "2:13 / Mar 17", code: "Not Found – 404" },
]

// ── Shared ────────────────────────────────────────────────────────────────────

const F = {
  sans: "'DM Sans', 'Helvetica Neue', sans-serif",
  black: "#111827",
  mid: "#6b7280",
  light: "#d1d5db",
  bg: "#f3f4f6",
  white: "#ffffff",
  blue: "#3478F6",
  green: "#34C759",
  orange: "#FF9500",
  red: "#FF3B30",
  purple: "#7C5CFC",
  lavender: "#C7B7F8",
}

function WCard({ children, style = {}, span2 = false }: {
  children: React.ReactNode
  style?: React.CSSProperties
  span2?: boolean
}) {
  return (
    <div style={{
      background: F.white,
      borderRadius: 14,
      padding: "18px 20px",
      boxShadow: "0 1px 6px rgba(0,0,0,0.07)",
      gridColumn: span2 ? "span 2" : undefined,
      ...style,
    }}>
      {children}
    </div>
  )
}

function Tag({ delta, up }: { delta: string; up: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <div style={{
        width: 16, height: 16, borderRadius: "50%",
        background: up ? "#34C75922" : "#FF3B3022",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 9,
      }}>
        {up ? "▲" : "▼"}
      </div>
      <span style={{ fontSize: 11, fontWeight: 600, color: up ? F.green : F.red }}>{delta}</span>
      <span style={{ fontSize: 10, color: F.mid }}>vs last week</span>
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return <p style={{ fontFamily: F.sans, fontSize: 12, color: F.mid, margin: "0 0 4px", fontWeight: 500 }}>{children}</p>
}

function BigNum({ children, color = F.black }: { children: React.ReactNode; color?: string }) {
  return <p style={{ fontFamily: F.sans, fontSize: 32, fontWeight: 800, color, margin: "0 0 6px", lineHeight: 1 }}>{children}</p>
}

const tip = {
  background: F.black,
  border: "none",
  borderRadius: 8,
  fontFamily: F.sans,
  fontSize: 11,
  color: "#fff",
  padding: "6px 10px",
}

// ── Gauge (SVG arc) ───────────────────────────────────────────────────────────

function GaugeWidget() {
  const pct = 72
  const r = 70
  const cx = 100
  const cy = 95
  const startAngle = Math.PI
  const endAngle = 0
  const angle = startAngle - (startAngle - endAngle) * (pct / 100)
  const arcX = cx + r * Math.cos(Math.PI - angle)
  const arcY = cy - r * Math.sin(Math.PI - angle)

  const describeArc = (start: number, end: number, color: string) => {
    const x1 = cx + r * Math.cos(start)
    const y1 = cy - r * Math.sin(start)
    const x2 = cx + r * Math.cos(end)
    const y2 = cy - r * Math.sin(end)
    const large = end - start > Math.PI ? 1 : 0
    return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 0 ${x2} ${y2}`
  }

  return (
    <WCard>
      <Label>Goal Progress</Label>
      <BigNum color={F.blue}>$468,000</BigNum>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <svg width="200" height="110" viewBox="0 0 200 110">
          {/* Track */}
          <path d={describeArc(Math.PI, 0, "#e5e7eb")} fill="none" stroke="#e5e7eb" strokeWidth="12" strokeLinecap="round" />
          {/* Progress */}
          <path d={describeArc(Math.PI, Math.PI - (Math.PI * pct / 100), F.blue)} fill="none" stroke={F.blue} strokeWidth="12" strokeLinecap="round" />
          {/* Dot */}
          <circle cx={cx + r * Math.cos(Math.PI - Math.PI * pct / 100)} cy={cy - r * Math.sin(Math.PI * pct / 100)} r="8" fill={F.blue} />
          {/* Center text */}
          <text x={cx} y={cy + 4} textAnchor="middle" fontFamily={F.sans} fontSize="22" fontWeight="800" fill={F.black}>{pct}%</text>
          <text x={cx} y={cy + 20} textAnchor="middle" fontFamily={F.sans} fontSize="10" fill={F.mid}>Received $545,000</text>
        </svg>
      </div>
    </WCard>
  )
}

// ── Line with custom tooltip ──────────────────────────────────────────────────

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: F.black, color: "#fff", borderRadius: 8, padding: "6px 12px", fontFamily: F.sans, fontSize: 11 }}>
      <p style={{ margin: 0, fontWeight: 700 }}>2,345</p>
      <p style={{ margin: 0, color: "#aaa" }}>{label}</p>
    </div>
  )
}

// ── Heatmap cell color ────────────────────────────────────────────────────────

function heatColor(v: number): string {
  if (v === 0) return "#f3f4f6"
  if (v < 20) return "#e0e7ff"
  if (v < 35) return "#c7d2fe"
  if (v < 50) return "#a5b4fc"
  if (v < 65) return "#818cf8"
  if (v < 80) return "#FBBF24"
  return "#F59E0B"
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function WidgetsPage() {
  const [todos_, setTodos] = useState(todos)
  const toggleTodo = (i: number) => setTodos(p => p.map((t, j) => j === i ? { ...t, done: !t.done } : t))

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap'); * { box-sizing: border-box; margin: 0; padding: 0; }`}</style>

      <div style={{ background: F.bg, minHeight: "100vh", padding: "32px 36px", fontFamily: F.sans }}>

        {/* Page title */}
        <h1 style={{ fontSize: 28, fontWeight: 800, color: F.black, marginBottom: 24, textAlign: "center" }}>
          Widgets & Analytics
        </h1>

        {/* ── Row 1: 4 cols ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 14 }}>

          {/* Gauge */}
          <GaugeWidget />

          {/* Active users – line */}
          <WCard>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <Label>Active Users</Label>
              <Tag delta="4.2%" up />
            </div>
            <BigNum>2,345</BigNum>
            <ResponsiveContainer width="100%" height={100}>
              <AreaChart data={lineData}>
                <defs>
                  <linearGradient id="lg1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={F.purple} stopOpacity={0.15} />
                    <stop offset="95%" stopColor={F.purple} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke={F.purple} fill="url(#lg1)" strokeWidth={2} dot={false} />
                <Tooltip content={<CustomTooltip />} />
              </AreaChart>
            </ResponsiveContainer>
          </WCard>

          {/* Revenue – bar */}
          <WCard>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <Label>Revenue</Label>
              <Tag delta="12.2%" up={false} />
            </div>
            <BigNum>$21,434</BigNum>
            <ResponsiveContainer width="100%" height={100}>
              <BarChart data={revenueBar} barGap={2}>
                <Bar dataKey="a" fill={F.green} radius={[3, 3, 0, 0]} />
                <Bar dataKey="b" fill="#86efac" radius={[3, 3, 0, 0]} />
                <Tooltip contentStyle={tip} cursor={{ fill: "#f9fafb" }} />
              </BarChart>
            </ResponsiveContainer>
          </WCard>

          {/* Server errors */}
          <WCard>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <Label>Server Errors</Label>
              <Tag delta="0%" up />
            </div>
            <BigNum color={F.red}>46</BigNum>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "6px 12px", marginTop: 6 }}>
              <span style={{ fontSize: 10, color: F.mid }}>Latest errors</span>
              <span style={{ fontSize: 10, color: F.mid, textAlign: "right" }}>Code</span>
              {errors.map((e, i) => (
                <>
                  <span key={`t${i}`} style={{ fontSize: 10, color: F.mid }}>{e.time}</span>
                  <span key={`c${i}`} style={{ fontSize: 10, color: F.black, textAlign: "right", fontWeight: 500 }}>{e.code}</span>
                </>
              ))}
            </div>
          </WCard>
        </div>

        {/* ── Row 2: 4 cols ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 14 }}>

          {/* Visits mobile vs desktop */}
          <WCard>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <Label>Visits</Label>
              <Tag delta="4.2%" up />
            </div>
            <BigNum>2,345</BigNum>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, marginBottom: 12 }}>
              <div>
                <p style={{ fontSize: 10, color: F.mid }}>📱 Mobile</p>
                <p style={{ fontSize: 20, fontWeight: 800, color: F.black }}>28%</p>
                <p style={{ fontSize: 10, color: F.mid }}>1,422</p>
              </div>
              <p style={{ fontSize: 18, fontWeight: 800, color: F.light, alignSelf: "center" }}>vs</p>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: 10, color: F.mid }}>💻 Desktop</p>
                <p style={{ fontSize: 20, fontWeight: 800, color: F.black }}>72%</p>
                <p style={{ fontSize: 10, color: F.mid }}>2,422</p>
              </div>
            </div>
            <div style={{ height: 6, borderRadius: 3, background: "#e5e7eb", overflow: "hidden" }}>
              <div style={{ height: "100%", width: "28%", background: F.orange }} />
            </div>
            <div style={{ height: 6, borderRadius: 3, background: "#e5e7eb", overflow: "hidden", marginTop: 4 }}>
              <div style={{ height: "100%", width: "72%", background: F.blue }} />
            </div>
          </WCard>

          {/* Today todo */}
          <WCard>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div>
                <Label>Today</Label>
                <p style={{ fontSize: 26, fontWeight: 800, color: F.black }}>Apr 19</p>
              </div>
              <span style={{ fontSize: 12, color: F.blue, fontWeight: 600, cursor: "pointer" }}>All →</span>
            </div>
            {todos_.map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "7px 0", borderBottom: i < todos_.length - 1 ? "1px solid #f3f4f6" : "none" }}>
                <span style={{ fontSize: 10, color: F.mid, minWidth: 36, marginTop: 2 }}>{t.time}</span>
                <p style={{ flex: 1, fontSize: 12, color: t.done ? F.mid : F.black, textDecoration: t.done ? "line-through" : "none", lineHeight: 1.4, margin: 0 }}>{t.text}</p>
                <div
                  onClick={() => toggleTodo(i)}
                  style={{
                    width: 16, height: 16, borderRadius: 4, border: `1.5px solid ${t.done ? F.blue : "#d1d5db"}`,
                    background: t.done ? F.blue : "transparent", cursor: "pointer", flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  {t.done && <span style={{ color: "#fff", fontSize: 9, fontWeight: 800 }}>✓</span>}
                </div>
              </div>
            ))}
          </WCard>

          {/* Visits by OS – donut */}
          <WCard>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <Label>Visits by Platform</Label>
              <Tag delta="4.2%" up />
            </div>
            <BigNum>12,563</BigNum>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
              {visitsDonut.map((d) => (
                <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: d.color, display: "inline-block" }} />
                  <span style={{ fontSize: 9, color: F.mid }}>{d.name}</span>
                </div>
              ))}
            </div>
            <ResponsiveContainer width="100%" height={110}>
              <PieChart>
                <Pie data={visitsDonut} cx="50%" cy="50%" startAngle={180} endAngle={0} innerRadius={34} outerRadius={54} paddingAngle={2} dataKey="value" strokeWidth={0}>
                  {visitsDonut.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip contentStyle={tip} formatter={(v: number, n: string) => [`${v}%`, n]} />
              </PieChart>
            </ResponsiveContainer>
          </WCard>

          {/* Today productivity – horizontal bars */}
          <WCard>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <Label>Productivity Today</Label>
              <Tag delta="0%" up />
            </div>
            <BigNum>5h 24m</BigNum>
            <ResponsiveContainer width="100%" height={110}>
              <BarChart data={productivityData} layout="vertical" barSize={6} barGap={2}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="d" tick={{ fontSize: 9, fill: F.mid, fontFamily: F.sans }} axisLine={false} tickLine={false} width={20} />
                <Bar dataKey="design" fill={F.purple} radius={[0, 3, 3, 0]} stackId="a" />
                <Bar dataKey="dev" fill={F.blue} radius={[0, 3, 3, 0]} stackId="a" />
                <Bar dataKey="comm" fill={F.green} radius={[0, 3, 3, 0]} stackId="a" />
                <Tooltip contentStyle={tip} cursor={{ fill: "#f9fafb" }} />
              </BarChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
              {[["Design", F.purple], ["Development", F.blue], ["Communication", F.green]].map(([l, c]) => (
                <div key={l as string} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: c as string, display: "inline-block" }} />
                  <span style={{ fontSize: 9, color: F.mid }}>{l}</span>
                </div>
              ))}
            </div>
          </WCard>
        </div>

        {/* ── Row 3: heatmap (wide) + daily visits ── */}
        <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 14 }}>

          {/* Heatmap */}
          <WCard>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <p style={{ fontSize: 18, fontWeight: 800, color: F.black }}>Sales Heatmap</p>
              <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#f9fafb", borderRadius: 8, padding: "4px 10px" }}>
                <span style={{ fontSize: 11, color: F.mid }}>📅 20/12/2020 – 2/01/2021</span>
              </div>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ borderCollapse: "separate", borderSpacing: 3, width: "100%" }}>
                <thead>
                  <tr>
                    <td style={{ width: 56 }} />
                    {heatWeeks.map((w) => (
                      <th key={w} style={{ fontSize: 9, color: F.mid, fontWeight: 500, textAlign: "center", paddingBottom: 4, minWidth: 32 }}>{w}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {heatRegions.map((region) => (
                    <tr key={region}>
                      <td style={{ fontSize: 11, color: F.mid, paddingRight: 8, fontWeight: 500 }}>{region}</td>
                      {heatmapData[region].map((v, ci) => (
                        <td key={ci} style={{ position: "relative" }}>
                          <div
                            title={`${v}%`}
                            style={{
                              width: "100%", height: 28, borderRadius: 5,
                              background: heatColor(v),
                              display: "flex", alignItems: "center", justifyContent: "center",
                            }}
                          >
                            {v >= 35 && (
                              <span style={{ fontSize: 8, fontWeight: 700, color: v >= 65 ? "#78350f" : "#3730a3" }}>{v}%</span>
                            )}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Legend */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 12 }}>
              <span style={{ fontSize: 10, color: F.mid }}>Less</span>
              {["#e0e7ff", "#a5b4fc", "#818cf8", "#FBBF24", "#F59E0B"].map((c) => (
                <div key={c} style={{ width: 18, height: 12, borderRadius: 3, background: c }} />
              ))}
              <span style={{ fontSize: 10, color: F.mid }}>More</span>
            </div>
          </WCard>

          {/* Daily visits bar */}
          <WCard>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <p style={{ fontSize: 18, fontWeight: 800, color: F.black }}>Daily Visits</p>
              <div style={{ display: "flex", gap: 10 }}>
                {[["Mobile", F.purple], ["Desktop", F.blue]].map(([l, c]) => (
                  <div key={l as string} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: c as string, display: "inline-block" }} />
                    <span style={{ fontSize: 10, color: F.mid }}>{l}</span>
                  </div>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={dailyVisits} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f8" vertical={false} />
                <XAxis dataKey="d" tick={{ fontSize: 10, fill: F.mid, fontFamily: F.sans }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: F.mid, fontFamily: F.sans }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tip} cursor={{ fill: "#f9fafb" }} />
                <Bar dataKey="mob" fill={F.purple} radius={[4, 4, 0, 0]} name="Mobile" />
                <Bar dataKey="desk" fill={F.blue} radius={[4, 4, 0, 0]} name="Desktop" />
              </BarChart>
            </ResponsiveContainer>
          </WCard>
        </div>

        {/* ── Row 4: extra analytics ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginTop: 14 }}>

          {/* Rating trend */}
          <WCard>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Label>Brand Rating</Label>
              <Tag delta="3.1%" up />
            </div>
            <BigNum color={F.blue}>4.52 ★</BigNum>
            <ResponsiveContainer width="100%" height={80}>
              <LineChart data={[{v:4.1},{v:4.3},{v:3.9},{v:4.5},{v:4.7},{v:4.2},{v:4.52}]}>
                <Line type="monotone" dataKey="v" stroke={F.blue} strokeWidth={2} dot={false} />
                <Tooltip contentStyle={tip} />
              </LineChart>
            </ResponsiveContainer>
          </WCard>

          {/* NPS gauge bar */}
          <WCard>
            <Label>NPS Index</Label>
            <BigNum color={F.green}>68 pts</BigNum>
            <p style={{ fontSize: 10, color: F.mid, marginBottom: 10 }}>Goal: 75 pts by end of quarter</p>
            {[
              { label: "Promoters", pct: 68, color: F.green },
              { label: "Neutral", pct: 20, color: F.orange },
              { label: "Critics", pct: 12, color: F.red },
            ].map((b) => (
              <div key={b.label} style={{ marginBottom: 7 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                  <span style={{ fontSize: 10, color: F.mid }}>{b.label}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: b.color }}>{b.pct}%</span>
                </div>
                <div style={{ height: 5, background: "#f0f0f8", borderRadius: 3 }}>
                  <div style={{ height: "100%", width: `${b.pct}%`, background: b.color, borderRadius: 3 }} />
                </div>
              </div>
            ))}
          </WCard>

          {/* Conversion funnel */}
          <WCard>
            <Label>Conversion Funnel</Label>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
              {[
                { label: "Product Views", v: 12400, pct: 100 },
                { label: "Added to Cart", v: 3720, pct: 30 },
                { label: "Orders Placed", v: 1490, pct: 12 },
                { label: "Left Review", v: 447, pct: 3.6 },
              ].map((f, i) => (
                <div key={f.label}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                    <span style={{ fontSize: 10, color: F.mid }}>{f.label}</span>
                    <span style={{ fontSize: 10, fontWeight: 700, color: F.black }}>{f.v.toLocaleString()}</span>
                  </div>
                  <div style={{ height: 8, background: "#f0f0f8", borderRadius: 4 }}>
                    <div style={{ height: "100%", width: `${f.pct}%`, background: [F.blue, F.purple, F.orange, F.green][i], borderRadius: 4, transition: "width 0.6s" }} />
                  </div>
                </div>
              ))}
            </div>
          </WCard>

          {/* Response rate */}
          <WCard>
            <Label>Review Response Rate</Label>
            <BigNum color={F.purple}>78%</BigNum>
            <p style={{ fontSize: 10, color: F.mid, marginBottom: 12 }}>23 reviews awaiting response</p>
            <ResponsiveContainer width="100%" height={80}>
              <BarChart data={[{v:65},{v:70},{v:68},{v:75},{v:72},{v:78}]} barSize={14}>
                <Bar dataKey="v" fill={F.lavender} radius={[3, 3, 0, 0]} />
                <Bar dataKey="v" fill={F.purple} radius={[3, 3, 0, 0]} hide />
                <Tooltip contentStyle={tip} />
              </BarChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
              <span style={{ fontSize: 9, color: F.mid }}>Seller responses</span>
              <span style={{ fontSize: 9, color: F.mid, fontWeight: 600, color: "#16a34a" }}>▲ +5% vs last month</span>
            </div>
          </WCard>
        </div>
      </div>
    </>
  )
}