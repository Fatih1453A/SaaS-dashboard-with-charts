"use client"

import React from "react"
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts"
import { C, Legend, ProgBar, I } from "../shared"
import { KpiCard } from "../kpi-card"
import { CardShell } from "../card-shell"

const audienceData = [
  { day: "Пн", new: 240, ret: 480 }, { day: "Вт", new: 310, ret: 510 },
  { day: "Ср", new: 280, ret: 460 }, { day: "Чт", new: 390, ret: 540 },
  { day: "Пт", new: 420, ret: 580 }, { day: "Сб", new: 200, ret: 310 },
  { day: "Вс", new: 170, ret: 290 },
]

const funnelData = [
  { stage: "Просмотры",  val: 14800, color: C.purpleBg, txt: C.purpleTx },
  { stage: "Карточка",   val: 8200,  color: "#E6F1FB",  txt: "#0C447C"  },
  { stage: "Корзина",    val: 3100,  color: C.amberBg,  txt: C.amberTx  },
  { stage: "Заказ",      val: 1480,  color: C.greenBg,  txt: C.greenTx  },
  { stage: "Повторный",  val: 540,   color: C.redBg,    txt: C.redTx    },
]

function fmt(n: number) { return n.toLocaleString("ru") }

export function AudienceTab() {
  return (
    <>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: 22, fontStyle: "italic", fontWeight: 400, color: C.text }}>Audience</h2>
        <p style={{ fontSize: 12, color: C.text3, marginTop: 3 }}>Visitor behaviour · April 2025</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 12, marginBottom: 20 }}>
        <KpiCard label="Total visitors" value="48 320" delta="+14.2% WoW"        deltaType="up" iconBg={C.purpleBg} iconColor={C.purpleTx} icon={I.users}   />
        <KpiCard label="New users"      value="18 940" delta="+8.7%"              deltaType="up" iconBg={C.greenBg}  iconColor={C.greenTx}  icon={I.addUser} />
        <KpiCard label="Bounce rate"    value="38.2%"  delta="−2.1pp improvement" deltaType="up" iconBg={C.amberBg}  iconColor={C.amberTx}  icon={I.back}    />
        <KpiCard label="Avg. session"   value="4:32"   delta="+0:18 vs last week" deltaType="up" iconBg={C.redBg}    iconColor={C.redTx}    icon={I.clock}   />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.6fr) minmax(0,1fr)", gap: 12, marginBottom: 20 }}>
        <CardShell
          title="New vs returning — weekly"
          right={<Legend items={[{ color: C.accent, label: "New" }, { color: C.purple, label: "Returning" }]} />}
        >
          <div style={{ padding: "16px 20px 8px" }}>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={audienceData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: C.text3 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: C.text3 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 10, border: "none", background: C.text, color: "#fff", fontSize: 11 }} itemStyle={{ color: "#fff" }} labelStyle={{ color: "rgba(255,255,255,0.4)" }} />
                <Area type="monotone" dataKey="new" stroke={C.accent} strokeWidth={2} fill={C.purpleBg} fillOpacity={0.4} />
                <Area type="monotone" dataKey="ret" stroke={C.purple} strokeWidth={2} fill={C.purpleBg} fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardShell>

        <CardShell title="Traffic sources">
          <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { label: "Organic search", val: 42, color: C.accent  },
              { label: "Direct",         val: 28, color: C.purple  },
              { label: "Social",         val: 18, color: C.green   },
              { label: "Referral",       val: 8,  color: C.amber   },
              { label: "Other",          val: 4,  color: "#D3D1C7" },
            ].map(s => <ProgBar key={s.label} label={s.label} val={s.val} max={100} color={s.color} />)}
          </div>
        </CardShell>
      </div>

      <CardShell title="Conversion funnel" sub="Daily visitor path">
        <div style={{ padding: 20 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {funnelData.map((f, i) => {
              const pct = Math.round((f.val / funnelData[0].val) * 100)
              return (
                <div key={f.stage} style={{ display: "grid", gridTemplateColumns: "120px 1fr 60px 60px", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 12, color: C.text2 }}>{f.stage}</span>
                  <div style={{ height: 28, borderRadius: 5, background: C.surface2, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${pct}%`, background: f.color, borderRadius: 5, display: "flex", alignItems: "center", paddingLeft: 10 }}>
                      <span style={{ fontSize: 11, color: f.txt, fontWeight: 500, whiteSpace: "nowrap" }}>{fmt(f.val)}</span>
                    </div>
                  </div>
                  <span style={{ fontSize: 12, color: C.text3, textAlign: "right" }}>{pct}%</span>
                  {i > 0
                    ? <span style={{ fontSize: 10.5, color: C.red, textAlign: "right" }}>↓ {100 - Math.round((f.val / funnelData[i - 1].val) * 100)}%</span>
                    : <span />
                  }
                </div>
              )
            })}
          </div>
        </div>
      </CardShell>
    </>
  )
}
