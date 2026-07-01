"use client"
import React from "react"
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const scatterData = [
  { rating: 5.0, response: 92, volume: 412, name: "Oversize Coat" },
  { rating: 4.8, response: 85, volume: 380, name: "Low Sneakers" },
  { rating: 4.5, response: 78, volume: 291, name: "Tote Bag" },
  { rating: 4.3, response: 88, volume: 267, name: "Midi Dress" },
  { rating: 3.1, response: 45, volume: 218, name: "Straight Jeans" },
  { rating: 3.5, response: 55, volume: 195, name: "Wool Cardigan" },
  { rating: 4.6, response: 80, volume: 180, name: "Chelsea Boots" },
  { rating: 4.9, response: 91, volume: 162, name: "Silk Blouse" },
  { rating: 4.2, response: 70, volume: 148, name: "Cashmere Scarf" },
  { rating: 2.8, response: 32, volume: 135, name: "Pleated Skirt" },
  { rating: 4.0, response: 62, volume: 121, name: "Short Puffer" },
  { rating: 3.2, response: 40, volume: 114, name: "Canvas Sneakers" },
]

const CustomScatterTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null
  const d = payload[0]?.payload
  return (
    <div style={{ background: "#0E0E0E", borderRadius: 12, padding: "8px 12px", fontSize: 11, color: "#fff" }}>
      <p style={{ fontFamily: "'Playfair Display',serif", marginBottom: 4 }}>{d.name}</p>
      <p style={{ color: "rgba(255,255,255,0.5)" }}>Rating: {d.rating}</p>
      <p style={{ color: "#B8D4A8" }}>Conversion: {d.response}%</p>
      <p style={{ color: "rgba(255,255,255,0.5)" }}>Volume: {d.volume}</p>
    </div>
  )
}

export function CorrelationChart() {
  return (
    <div style={{ background: "#fff", border: "1px solid rgba(14,14,14,0.08)", borderRadius: 16, overflow: "hidden" }}>
      <div style={{ padding: "20px 24px 16px", borderBottom: "1px solid rgba(14,14,14,0.07)" }}>
        <p style={{ fontSize: 9.5, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(14,14,14,0.35)", marginBottom: 4 }}>Correlation</p>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, fontStyle: "italic", color: "#0E0E0E" }}>Rating → Conversion</h2>
      </div>
      <div style={{ padding: "16px 24px" }}>
        <ResponsiveContainer width="100%" height={210}>
          <ScatterChart margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
            <XAxis dataKey="rating" type="number" domain={[2, 5.2]} name="Rating"
              tick={{ fontSize: 10, fill: "#8A8A8A" }} axisLine={false} tickLine={false}
              label={{ value: "Rating", position: "insideBottom", offset: -2, fontSize: 9, fill: "#8A8A8A", letterSpacing: "0.12em" }}
            />
            <YAxis dataKey="response" type="number" domain={[20, 100]} name="Conversion"
              tick={{ fontSize: 10, fill: "#8A8A8A" }} axisLine={false} tickLine={false}
              tickFormatter={v => `${v}%`}
            />
            <ZAxis dataKey="volume" range={[40, 300]} />
            <Tooltip content={<CustomScatterTooltip />} cursor={{ strokeDasharray: "4 4", stroke: "rgba(0,0,0,0.15)" }} />
            <Scatter data={scatterData} fill="#0E0E0E" fillOpacity={0.7} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}