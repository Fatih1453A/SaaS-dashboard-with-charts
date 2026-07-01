"use client"

import React from "react"
import {
  ComposedChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts"
import { C, Legend, StatBand, TableHead, Pill, I, type PillType } from "../shared"
import { KpiCard } from "../kpi-card"
import { CardShell } from "../card-shell"
import { RingChart } from "../ring-chart"

const attendanceData = [
  { mo: "Янв", on: 172, late: 18, absent: 10 },
  { mo: "Фев", on: 168, late: 20, absent: 12 },
  { mo: "Мар", on: 175, late: 15, absent: 10 },
  { mo: "Апр", on: 180, late: 12, absent: 8  },
  { mo: "Май", on: 171, late: 19, absent: 10 },
  { mo: "Июн", on: 165, late: 22, absent: 13 },
  { mo: "Июл", on: 170, late: 17, absent: 13 },
  { mo: "Авг", on: 178, late: 14, absent: 8  },
  { mo: "Сен", on: 176, late: 16, absent: 8  },
  { mo: "Окт", on: 182, late: 10, absent: 8  },
  { mo: "Ноя", on: 179, late: 13, absent: 8  },
  { mo: "Дек", on: 174, late: 16, absent: 10 },
]

const HEATMAP = [
  0.9, 0.3, 0.6, 0.8, 0.5, 0.1, 0.2,
  0.7, 0.4, 0.9, 0.6, 0.8, 0.2, 0.1,
  0.5, 0.9, 0.3, 0.7, 0.6, 0.1, 0.2,
  0.8, 0.6, 0.5, 0.9, 0.4, 0.1, 0.3,
]

const newsEvents = [
  { mo: "Апр", d: "18", title: "Board meeting",       desc: "Attend all Project managers..." },
  { mo: "Апр", d: "15", title: "Team meeting",        desc: "Q2 planning kickoff" },
  { mo: "Апр", d: "10", title: "Updated policy",      desc: "New remote work guidelines" },
  { mo: "Апр", d: "08", title: "Leave policy update", desc: "New allocation rules" },
  { mo: "Апр", d: "05", title: "Salary revision",     desc: "Annual review results" },
]

const applications = [
  { name: "Guy Hawkins",   role: "UI/UX Designer",   status: "Interview", type: "up" as PillType },
  { name: "Floyd Miles",   role: "Python Developer",  status: "Screening", type: "ne" as PillType },
  { name: "Robert Fox",    role: "Laravel Developer", status: "Offer",     type: "up" as PillType },
  { name: "Kristin Janes", role: "Product Designer",  status: "Rejected",  type: "dn" as PillType },
  { name: "Tom Sinclair",  role: "Data Analyst",      status: "Applied",   type: "am" as PillType },
]

export function OverviewTab() {
  return (
    <>
      {/* Greeting */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <p style={{ fontSize: 13, color: C.text3, marginBottom: 3 }}>Hello, Andrew,</p>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: 28, fontStyle: "italic", fontWeight: 400, color: C.text, letterSpacing: "-0.02em" }}>
            Good Morning
          </h1>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 7, background: C.accent, color: "#fff", border: "none", borderRadius: 10, padding: "10px 20px", fontSize: 12.5, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}>
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d="M8 3v10M3 8h10"/></svg>
          New Report
        </button>
      </div>

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,minmax(0,1fr))", gap: 12, marginBottom: 20 }}>
        <KpiCard label="Total employees" value="200"  delta="+3 this month"   deltaType="up" iconBg={C.purpleBg} iconColor={C.purpleTx} icon={I.users}   />
        <KpiCard label="On leave"        value="12"   delta="of 200 total"    deltaType="ne" iconBg={C.amberBg}  iconColor={C.amberTx}  icon={I.doc}     />
        <KpiCard label="New joinee"      value="15"   delta="+5 this week"    deltaType="up" iconBg={C.greenBg}  iconColor={C.greenTx}  icon={I.addUser} />
        <KpiCard label="Happiness rate"  value="80%"  delta="+2pp vs last mo" deltaType="up" iconBg={C.redBg}    iconColor={C.redTx}    icon={I.smile}   />
        <KpiCard label="Open positions"  value="24"   delta="8 urgent"        deltaType="am" iconBg={C.amberBg}  iconColor={C.amberTx}  icon={I.bag}     />
      </div>

      {/* Attendance + News */}
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.9fr) minmax(0,1fr)", gap: 12, marginBottom: 20 }}>
        <CardShell
          title="Attendance overview"
          sub="Monthly presence · 2024–2025"
          right={<Legend items={[{ color: C.accent, label: "On time" }, { color: C.purple, label: "Late" }, { color: C.surface2, label: "Absent" }]} />}
        >
          <div style={{ padding: "20px 20px 0" }}>
            <ResponsiveContainer width="100%" height={210}>
              <ComposedChart data={attendanceData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
                <XAxis dataKey="mo" tick={{ fontSize: 10, fill: C.text3 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: C.text3 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 10, border: "none", background: C.text, color: "#fff", fontSize: 11 }} itemStyle={{ color: "#fff" }} labelStyle={{ color: "rgba(255,255,255,0.4)" }} />
                <Bar dataKey="on"     fill={C.accent}   radius={[3, 3, 0, 0]} barSize={10} stackId="a" />
                <Bar dataKey="late"   fill={C.purple}   radius={[0, 0, 0, 0]} barSize={10} stackId="a" />
                <Bar dataKey="absent" fill={C.surface2} radius={[3, 3, 0, 0]} barSize={10} stackId="a" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <StatBand items={[{ label: "Avg on-time", val: "87%" }, { label: "Peak month", val: "Апр" }, { label: "Avg absent", val: "9.5" }]} />
        </CardShell>

        <CardShell title="News & events">
          {newsEvents.map(ev => (
            <div key={ev.d + ev.title} style={{ display: "grid", gridTemplateColumns: "44px 1fr", gap: 12, padding: "13px 20px", borderBottom: `0.5px solid ${C.border}`, alignItems: "start" }}>
              <div style={{ background: C.purpleBg, borderRadius: 8, padding: 6, textAlign: "center" }}>
                <div style={{ fontSize: 8, color: C.purpleTx, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 500 }}>{ev.mo}</div>
                <div style={{ fontFamily: "Georgia, serif", fontSize: 16, fontStyle: "italic", color: C.accent, lineHeight: 1 }}>{ev.d}</div>
              </div>
              <div>
                <p style={{ fontSize: 12.5, color: C.text, fontWeight: 500, marginBottom: 2 }}>{ev.title}</p>
                <p style={{ fontSize: 11, color: C.text3 }}>{ev.desc}</p>
              </div>
            </div>
          ))}
        </CardShell>
      </div>

      {/* Heatmap + Ring + Applications */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 12 }}>
        <CardShell title="Activity heatmap" sub="Last 28 days">
          <div style={{ padding: "16px 20px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 3, marginBottom: 5 }}>
              {["Mo","Tu","We","Th","Fr","Sa","Su"].map(d => (
                <div key={d} style={{ fontSize: 9, color: C.text3, textAlign: "center", textTransform: "uppercase", letterSpacing: "0.06em" }}>{d}</div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 3 }}>
              {HEATMAP.map((v, i) => {
                const bg = v > 0.75 ? C.accent : v > 0.5 ? C.purple : v > 0.25 ? C.purpleBg : C.surface2
                return <div key={i} style={{ aspectRatio: "1", borderRadius: 3, background: bg }} />
              })}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
              {[{ bg: C.surface2, lbl: "Low" }, { bg: C.purpleBg, lbl: "Med" }, { bg: C.purple, lbl: "High" }, { bg: C.accent, lbl: "Peak" }].map(l => (
                <div key={l.lbl} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 9.5, color: C.text3 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: l.bg }} />
                  {l.lbl}
                </div>
              ))}
            </div>
          </div>
        </CardShell>

        <CardShell title="Project overview" sub="Status distribution">
          <div style={{ padding: "16px 20px" }}>
            <RingChart
              value="125" label="projects"
              data={[
                { name: "Active",  pct: 78, color: C.accent },
                { name: "On hold", pct: 10, color: C.purple },
                { name: "At risk", pct: 12, color: C.red    },
              ]}
            />
          </div>
        </CardShell>

        <CardShell title="Recent job applications">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, tableLayout: "fixed" }}>
            <TableHead cols={["Name", "Role", "Status"]} />
            <tbody>
              {applications.map(r => (
                <tr key={r.name}>
                  <td style={{ padding: "10px 14px", color: C.text, fontWeight: 500, borderBottom: `0.5px solid ${C.border}` }}>{r.name}</td>
                  <td style={{ padding: "10px 14px", color: C.text3, fontSize: 11, textAlign: "right", borderBottom: `0.5px solid ${C.border}` }}>{r.role}</td>
                  <td style={{ padding: "10px 14px", textAlign: "right", borderBottom: `0.5px solid ${C.border}` }}>
                    <Pill type={r.type}>{r.status}</Pill>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardShell>
      </div>
    </>
  )
}
