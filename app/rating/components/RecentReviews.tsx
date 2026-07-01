"use client"
import React, { useState } from "react"

const recentReviews = [
  { id: 1, article: "Oversize Coat Beige",  sku: "WB-84712", rating: 5, sentiment: "pos", text: "Excellent tailoring quality, true to size. Fast delivery.", date: "Apr 22", cat: "Clothing",     mlTags: ["quality", "delivery"] },
  { id: 2, article: "Low Sneakers White",    sku: "WB-31049", rating: 2, sentiment: "neg", text: "Sole came off after 2 weeks. Very disappointed with quality.", date: "Apr 21", cat: "Footwear",      mlTags: ["defect", "quality"] },
  { id: 3, article: "Tote Bag Black",       sku: "WB-55203", rating: 4, sentiment: "pos", text: "Good bag with many compartments. Zipper is a bit stiff.", date: "Apr 21", cat: "Accessories", mlTags: ["quality"] },
  { id: 4, article: "Midi Floral Dress",     sku: "WB-10872", rating: 3, sentiment: "neu", text: "Average quality. Color slightly different from website photos.", date: "Apr 20", cat: "Clothing",     mlTags: ["description", "color"] },
  { id: 5, article: "Straight Fit Jeans",    sku: "WB-77634", rating: 5, sentiment: "pos", text: "Exceeded expectations! Dense fabric, good stitching, everything fits.", date: "Apr 20", cat: "Clothing",     mlTags: ["quality", "price"] },
]

function SentimentPip({ s }: { s: string }) {
  const c = s === "pos" ? "#5A8A46" : s === "neg" ? "#C84B31" : "#8A8A8A"
  return <span style={{ display: "inline-block", width: 7, height: 7, borderRadius: "50%", background: c, marginRight: 6, flexShrink: 0 }} />
}

function RatingDots({ n }: { n: number }) {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {Array.from({ length: 5 }, (_, i) => (
        <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: i < n ? "#0E0E0E" : "#E5E5E5" }} />
      ))}
    </div>
  )
}

export function RecentReviews() {
  const [activeTab, setActiveTab] = useState("all")
  const tabs = [
    { key: "all", label: "All Categories" },
    { key: "cloth", label: "Clothing" },
    { key: "shoes", label: "Footwear" },
    { key: "acc", label: "Accessories" },
  ]

  return (
    <div style={{ background: "#fff", border: "1px solid rgba(14,14,14,0.08)", borderRadius: 16, overflow: "hidden" }}>
      <div style={{ padding: "20px 24px 16px", borderBottom: "1px solid rgba(14,14,14,0.07)", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <p style={{ fontSize: 9.5, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(14,14,14,0.35)", marginBottom: 4 }}>Feed</p>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, fontStyle: "italic", color: "#0E0E0E" }}>Recent Reviews</h2>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {tabs.map(t => (
            <button key={t.key} onClick={() => setActiveTab(t.key)} style={{
              fontSize: 10, padding: "5px 12px", borderRadius: 99, border: "none", cursor: "pointer",
              background: activeTab === t.key ? "#0E0E0E" : "transparent",
              color: activeTab === t.key ? "#fff" : "rgba(14,14,14,0.45)",
              border: activeTab === t.key ? "none" : "1px solid rgba(14,14,14,0.2)",
              transition: "all 0.15s",
            }}>{t.label}</button>
          ))}
        </div>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", fontSize: 12.5, borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#F3F5F9" }}>
              {["SKU", "Review", "Rating", "Type", "ML Tags", "Date"].map((h, i) => (
                <th key={h} style={{
                  padding: "10px 16px", fontSize: 9.5, letterSpacing: "0.15em", textTransform: "uppercase",
                  color: "rgba(14,14,14,0.35)", fontWeight: "normal", textAlign: "left",
                  borderBottom: "1px solid rgba(14,14,14,0.07)",
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentReviews.map((r, i) => (
              <tr key={r.id} style={{ borderBottom: "1px solid rgba(14,14,14,0.06)", transition: "background 0.15s", cursor: "pointer" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(14,14,14,0.02)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <td style={{ padding: "12px 16px", whiteSpace: "nowrap" }}>
                  <div style={{ fontWeight: 500, color: "#0E0E0E", fontSize: 12 }}>{r.article}</div>
                  <div style={{ fontSize: 10, color: "rgba(14,14,14,0.35)", fontFamily: "monospace", marginTop: 2 }}>{r.sku} · {r.cat}</div>
                </td>
                <td style={{ padding: "12px 16px", maxWidth: 280 }}>
                  <p style={{ fontSize: 11, color: "rgba(14,14,14,0.6)", lineHeight: 1.4, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", margin: 0 }}>{r.text}</p>
                </td>
                <td style={{ padding: "12px 16px" }}><RatingDots n={r.rating} /></td>
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <SentimentPip s={r.sentiment} />
                    <span style={{ fontSize: 10, color: "rgba(14,14,14,0.5)" }}>
                      {r.sentiment === "pos" ? "Positive" : r.sentiment === "neg" ? "Negative" : "Neutral"}
                    </span>
                  </div>
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    {r.mlTags.map(tag => (
                      <span key={tag} style={{ fontSize: 9, padding: "2px 8px", borderRadius: 99, background: "rgba(14,14,14,0.06)", color: "rgba(14,14,14,0.5)", letterSpacing: "0.06em" }}>{tag}</span>
                    ))}
                  </div>
                </td>
                <td style={{ padding: "12px 16px", fontSize: 11, color: "rgba(14,14,14,0.4)", whiteSpace: "nowrap" }}>{r.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ padding: "12px 20px", borderTop: "1px solid rgba(14,14,14,0.07)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 11, color: "rgba(14,14,14,0.35)" }}>Showing 5 of 4,821 reviews</span>
        <button style={{
          fontSize: 10, padding: "6px 18px", borderRadius: 99, border: "1px solid rgba(14,14,14,0.2)",
          background: "transparent", cursor: "pointer", color: "rgba(14,14,14,0.5)", letterSpacing: "0.06em", transition: "all 0.15s",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = "#0E0E0E"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "transparent" }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(14,14,14,0.5)"; e.currentTarget.style.borderColor = "rgba(14,14,14,0.2)" }}>
          All Reviews →
        </button>
      </div>
    </div>
  )
}