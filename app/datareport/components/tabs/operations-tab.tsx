"use client"

import React from "react"
import { C, TableHead, Pill, I, type PillType } from "../shared"
import { KpiCard } from "../kpi-card"
import { CardShell } from "../card-shell"

const interviews = [
  { name: "Guy Hawkins",   role: "UI/UX Designer",   time: "10:00–11:00", av: "GH", bg: C.purpleBg, txt: C.purpleTx },
  { name: "Floyd Miles",   role: "Python Developer",  time: "11:00–12:00", av: "FM", bg: C.greenBg,  txt: C.greenTx  },
  { name: "Robert Fox",    role: "Laravel Developer", time: "13:00–14:00", av: "RF", bg: C.amberBg,  txt: C.amberTx  },
  { name: "Kristin Janes", role: "Python Developer",  time: "13:00–14:00", av: "KJ", bg: C.redBg,    txt: C.redTx    },
  { name: "Tom Sinclair",  role: "Data Analyst",      time: "15:00–16:00", av: "TS", bg: C.purpleBg, txt: C.purpleTx },
  { name: "Sarah Lee",     role: "Product Manager",   time: "16:00–17:00", av: "SL", bg: C.greenBg,  txt: C.greenTx  },
]

const tasks = [
  { task: "Redesign onboarding flow", assignee: "G. Hawkins",  dept: "Design",      due: "Apr 12", priority: "High",   st: "up" as PillType, statusLabel: "Active"  },
  { task: "Fix auth token bug",        assignee: "R. Fox",      dept: "Engineering", due: "Apr 11", priority: "Urgent", st: "dn" as PillType, statusLabel: "Blocked" },
  { task: "Q2 marketing brief",        assignee: "K. Janes",    dept: "Marketing",   due: "Apr 14", priority: "Med",    st: "ne" as PillType, statusLabel: "Pending" },
  { task: "Salary revision report",    assignee: "F. Miles",    dept: "HR",          due: "Apr 13", priority: "Med",    st: "am" as PillType, statusLabel: "Review"  },
  { task: "Client demo prep",          assignee: "T. Sinclair", dept: "Sales",       due: "Apr 11", priority: "High",   st: "up" as PillType, statusLabel: "Active"  },
  { task: "Server migration plan",     assignee: "R. Fox",      dept: "Engineering", due: "Apr 15", priority: "Low",    st: "ne" as PillType, statusLabel: "Pending" },
  { task: "Social media content",      assignee: "K. Janes",    dept: "Marketing",   due: "Apr 12", priority: "Low",    st: "pu" as PillType, statusLabel: "Draft"   },
]

const departments = [
  { dept: "Engineering", tasks: 34, cap: 40, color: C.accent  },
  { dept: "Design",      tasks: 18, cap: 20, color: C.purple  },
  { dept: "Marketing",   tasks: 22, cap: 25, color: C.green   },
  { dept: "Sales",       tasks: 15, cap: 20, color: C.amber   },
  { dept: "HR & Ops",    tasks: 12, cap: 15, color: "#D4537E" },
]

export function OperationsTab() {
  return (
    <>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: 22, fontStyle: "italic", fontWeight: 400, color: C.text }}>Operations</h2>
        <p style={{ fontSize: 12, color: C.text3, marginTop: 3 }}>Daily ops monitor · April 11, 2025</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 12, marginBottom: 20 }}>
        <KpiCard label="Open tasks"    value="84"  delta="12 overdue"          deltaType="dn" iconBg={C.redBg}    iconColor={C.redTx}    icon={I.task}  />
        <KpiCard label="In progress"   value="31"  delta="+3 today"            deltaType="up" iconBg={C.amberBg}  iconColor={C.amberTx}  icon={I.clock} />
        <KpiCard label="Done today"    value="18"  delta="vs 14 yesterday"     deltaType="up" iconBg={C.greenBg}  iconColor={C.greenTx}  icon={I.check} />
        <KpiCard label="Team velocity" value="72%" delta="+5pp vs last sprint" deltaType="up" iconBg={C.purpleBg} iconColor={C.purpleTx} icon={I.bars}  />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1.3fr)", gap: 12, marginBottom: 20 }}>
        <CardShell title="Upcoming interviews" sub="Today · April 11">
          {interviews.map((iv, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "36px 1fr auto", gap: 10, padding: "12px 20px", borderBottom: i < interviews.length - 1 ? `0.5px solid ${C.border}` : "none", alignItems: "center" }}>
              <div style={{ width: 34, height: 34, borderRadius: "50%", background: iv.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 500, color: iv.txt, flexShrink: 0 }}>
                {iv.av}
              </div>
              <div>
                <p style={{ fontSize: 12.5, fontWeight: 500, color: C.text, marginBottom: 1 }}>{iv.name}</p>
                <p style={{ fontSize: 11, color: C.text3 }}>{iv.role}</p>
              </div>
              <div style={{ fontSize: 11, color: C.text2, background: C.surface2, borderRadius: 6, padding: "4px 8px", whiteSpace: "nowrap", fontFamily: "monospace" }}>
                {iv.time}
              </div>
            </div>
          ))}
        </CardShell>

        <CardShell title="Department workload" sub="Task distribution">
          <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
            {departments.map(d => (
              <div key={d.dept}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: C.text2, marginBottom: 5 }}>
                  <span>{d.dept}</span>
                  <span style={{ color: C.text, fontWeight: 500 }}>
                    {d.tasks} <span style={{ color: C.text3, fontWeight: 400 }}>/ {d.cap}</span>
                  </span>
                </div>
                <div style={{ height: 5, background: C.surface2, borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ width: `${(d.tasks / d.cap) * 100}%`, height: "100%", background: d.tasks / d.cap > 0.9 ? C.red : d.color, borderRadius: 3 }} />
                </div>
              </div>
            ))}
          </div>
        </CardShell>
      </div>

      <CardShell title="Task log — today">
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, tableLayout: "fixed" }}>
            <TableHead cols={["Task", "Assignee", "Dept", "Due", "Priority", "Status"]} />
            <tbody>
              {tasks.map((row, i, arr) => (
                <tr key={row.task}>
                  <td style={{ padding: "10px 14px", color: C.text, fontWeight: 500, borderBottom: i < arr.length - 1 ? `0.5px solid ${C.border}` : "none" }}>{row.task}</td>
                  <td style={{ padding: "10px 14px", color: C.text2, textAlign: "right", borderBottom: i < arr.length - 1 ? `0.5px solid ${C.border}` : "none" }}>{row.assignee}</td>
                  <td style={{ padding: "10px 14px", color: C.text3, fontSize: 11, textAlign: "right", borderBottom: i < arr.length - 1 ? `0.5px solid ${C.border}` : "none" }}>{row.dept}</td>
                  <td style={{ padding: "10px 14px", color: C.text3, fontFamily: "monospace", fontSize: 11, textAlign: "right", borderBottom: i < arr.length - 1 ? `0.5px solid ${C.border}` : "none" }}>{row.due}</td>
                  <td style={{ padding: "10px 14px", textAlign: "right", borderBottom: i < arr.length - 1 ? `0.5px solid ${C.border}` : "none" }}><Pill type={row.st}>{row.priority}</Pill></td>
                  <td style={{ padding: "10px 14px", textAlign: "right", borderBottom: i < arr.length - 1 ? `0.5px solid ${C.border}` : "none" }}><Pill type={row.st}>{row.statusLabel}</Pill></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardShell>
    </>
  )
}
