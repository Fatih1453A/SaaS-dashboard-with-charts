"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Send, Clock, CheckCircle2, Loader2,
  MessageSquare, XCircle, ArrowLeft, User, Shield, Plus, Sparkles
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// Pastel palette
const C = {
  lavender: "#E8E0FF",
  lavenderdark: "#C4B5FD",
  pink:     "#FFD6E7",
  peach:    "#FFE4CC",
  mint:     "#C8F0E4",
  yellow:   "#FFF3C4",
  blue:     "#C8E4FF",
  white:    "#FFFFFF",
  bg:       "#F0ECFF",
  text:     "#2D2B4E",
  muted:    "#9896B8",
}

// Blob SVG mascot
const BlobMascot = ({ color, size = 72 }: { color: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
    <path
      d="M40 8C52 6 68 14 72 26C76 38 70 56 58 66C46 76 24 76 14 64C4 52 6 30 16 18C22 10 28 10 40 8Z"
      fill={color}
    />
    <circle cx="30" cy="36" r="5" fill="#2D2B4E" />
    <circle cx="50" cy="36" r="5" fill="#2D2B4E" />
    <circle cx="32" cy="34" r="2" fill="white" />
    <circle cx="52" cy="34" r="2" fill="white" />
    <path d="M32 50 Q40 58 48 50" stroke="#2D2B4E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <circle cx="62" cy="20" r="3" fill="white" opacity="0.7" />
    <circle cx="58" cy="14" r="1.5" fill="white" opacity="0.5" />
  </svg>
)

// Mock data
const MOCK_TICKETS = [
  {
    id: "1",
    subject: "Login Issue",
    status: "open",
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    subject: "Feature Request",
    status: "closed",
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    subject: "Payment Problem",
    status: "open",
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

const MOCK_MESSAGES: Record<string, any[]> = {
  "1": [
    { id: "m1", text: "Hi! I can't log into my account. Please help!", is_admin: false, created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
    { id: "m2", text: "Hello! We're sorry for the inconvenience. Could you please try resetting your password?", is_admin: true, created_at: new Date(Date.now() - 1.9 * 24 * 60 * 60 * 1000).toISOString() },
    { id: "m3", text: "I've tried that, but it still doesn't work.", is_admin: false, created_at: new Date(Date.now() - 1.8 * 24 * 60 * 60 * 1000).toISOString() },
  ],
  "2": [
    { id: "m4", text: "I would love to see an integration with Slack.", is_admin: false, created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
    { id: "m5", text: "Great suggestion! We'll add it to our roadmap.", is_admin: true, created_at: new Date(Date.now() - 4.8 * 24 * 60 * 60 * 1000).toISOString() },
  ],
  "3": [
    { id: "m6", text: "My subscription was charged twice this month.", is_admin: false, created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
    { id: "m7", text: "We apologize for this. Our team is checking the issue right now.", is_admin: true, created_at: new Date(Date.now() - 0.8 * 24 * 60 * 60 * 1000).toISOString() },
  ],
}

export default function SupportPage() {
  const [tickets, setTickets] = useState<any[]>([])
  const [selectedTicket, setSelectedTicket] = useState<any>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [subject, setSubject] = useState("")
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => { fetchTickets() }, [])
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages])

  const fetchTickets = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 600))
    setTickets(MOCK_TICKETS)
    setFetching(false)
  }

  const fetchMessages = async (ticketId: string) => {
    await new Promise(resolve => setTimeout(resolve, 300))
    setMessages(MOCK_MESSAGES[ticketId] || [])
  }

  const handleOpenTicket = (ticket: any) => {
    setSelectedTicket(ticket)
    fetchMessages(ticket.id)
  }

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const newTicket = {
      id: Date.now().toString(),
      subject,
      status: "open",
      created_at: new Date().toISOString(),
    }
    
    setTickets(prev => [newTicket, ...prev])
    MOCK_MESSAGES[newTicket.id] = [
      { id: "new1", text: newMessage, is_admin: false, created_at: new Date().toISOString() }
    ]
    
    setSubject("")
    setNewMessage("")
    setLoading(false)
    
    // Auto-select the new ticket
    setSelectedTicket(newTicket)
    setMessages(MOCK_MESSAGES[newTicket.id])
  }

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedTicket) return
    
    const newMsg = {
      id: Date.now().toString(),
      text: newMessage,
      is_admin: false,
      created_at: new Date().toISOString(),
    }
    
    // Add to messages
    setMessages(prev => [...prev, newMsg])
    
    // Save to mock
    if (MOCK_MESSAGES[selectedTicket.id]) {
      MOCK_MESSAGES[selectedTicket.id].push(newMsg)
    }
    
    setNewMessage("")
    
    // Simulate admin response
    setTimeout(() => {
      const adminReply = {
        id: Date.now().toString(),
        text: "Thank you for your message! Our team will get back to you shortly.",
        is_admin: true,
        created_at: new Date().toISOString(),
      }
      setMessages(prev => [...prev, adminReply])
      if (MOCK_MESSAGES[selectedTicket.id]) {
        MOCK_MESSAGES[selectedTicket.id].push(adminReply)
      }
    }, 1500)
  }

  const closeTicket = async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 300))
    setTickets(prev => prev.map(t => 
      t.id === id ? { ...t, status: "closed" } : t
    ))
    setSelectedTicket(null)
  }

  return (
    <div
      className="min-h-screen p-6 lg:p-10"
      style={{ background: C.bg, fontFamily: "'Nunito', 'Helvetica Neue', sans-serif", color: C.text }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');`}</style>

      <div className="max-w-5xl mx-auto">

        {/* ── Page header ── */}
        <motion.div
          initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <BlobMascot color={C.lavenderdark} size={56} />
          <div>
            <h1 className="text-3xl font-black" style={{ color: C.text, letterSpacing: "-0.02em" }}>
              Support Center
            </h1>
            <p className="text-sm font-semibold" style={{ color: C.muted }}>
              We're here to help 💜
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-12 gap-5">

          {/* ── LEFT: ticket list ── */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">

            {/* New ticket btn */}
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedTicket(null)}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-[24px] font-black text-sm shadow-md transition-all"
              style={{ background: C.lavenderdark, color: "white" }}
            >
              <Plus size={18} /> New Request
            </motion.button>

            {/* Tickets */}
            <div
              className="rounded-[28px] p-4 flex flex-col gap-2 overflow-y-auto"
              style={{ background: C.white, maxHeight: 520 }}
            >
              <p className="text-[10px] font-black uppercase tracking-widest px-2 mb-1" style={{ color: C.muted }}>
                My Tickets
              </p>

              {fetching && (
                <div className="flex justify-center py-8">
                  <Loader2 size={22} className="animate-spin" style={{ color: C.lavenderdark }} />
                </div>
              )}

              {!fetching && tickets.length === 0 && (
                <div className="text-center py-10">
                  <BlobMascot color={C.pink} size={56} />
                  <p className="mt-3 text-sm font-bold" style={{ color: C.muted }}>No tickets yet 🌸</p>
                </div>
              )}

              {tickets.map((t) => (
                <motion.button
                  key={t.id}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={() => handleOpenTicket(t)}
                  className="w-full text-left p-4 rounded-[20px] transition-all"
                  style={{
                    background: selectedTicket?.id === t.id ? C.lavenderdark : C.bg,
                    color: selectedTicket?.id === t.id ? "white" : C.text,
                  }}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-black text-xs truncate pr-3">{t.subject}</span>
                    <span
                      className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{
                        background: t.status === "closed" ? C.lavender : C.mint,
                        color: C.text,
                      }}
                    >
                      {t.status === "closed" ? "closed" : "open"}
                    </span>
                  </div>
                  <p className="text-[10px] font-semibold opacity-60">
                    {new Date(t.created_at).toLocaleDateString("en-US")}
                  </p>
                </motion.button>
              ))}
            </div>
          </div>

          {/* ── RIGHT: chat or form ── */}
          <div className="col-span-12 lg:col-span-8">
            <AnimatePresence mode="wait">

              {/* ── CHAT ── */}
              {selectedTicket ? (
                <motion.div
                  key="chat"
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
                  className="flex flex-col rounded-[32px] overflow-hidden shadow-sm"
                  style={{ background: C.white, height: 600 }}
                >
                  {/* Chat header */}
                  <div
                    className="flex items-center justify-between px-6 py-5"
                    style={{ background: C.lavender }}
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setSelectedTicket(null)}
                        className="lg:hidden p-2 rounded-full hover:bg-white/40"
                      >
                        <ArrowLeft size={16} />
                      </button>
                      <BlobMascot color={C.lavenderdark} size={40} />
                      <div>
                        <h2 className="font-black text-base leading-tight">{selectedTicket.subject}</h2>
                        <span
                          className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full"
                          style={{ background: selectedTicket.status === "closed" ? C.pink : C.mint, color: C.text }}
                        >
                          {selectedTicket.status === "closed" ? "closed" : "open"}
                        </span>
                      </div>
                    </div>

                    {selectedTicket.status !== "closed" && (
                      <button
                        onClick={() => closeTicket(selectedTicket.id)}
                        className="flex items-center gap-1.5 text-[10px] font-black uppercase px-3 py-2 rounded-2xl transition-all hover:bg-white/50"
                        style={{ color: C.text }}
                      >
                        Close <XCircle size={15} />
                      </button>
                    )}
                  </div>

                  {/* Messages */}
                  <div
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto px-6 py-5 space-y-4"
                    style={{ background: C.bg }}
                  >
                    {messages.map((m, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03 }}
                        className={`flex ${m.is_admin ? "justify-start" : "justify-end"} items-end gap-2`}
                      >
                        {m.is_admin && <BlobMascot color={C.lavenderdark} size={32} />}
                        <div
                          className="max-w-[75%] px-5 py-3.5 rounded-[20px] shadow-sm"
                          style={{
                            background: m.is_admin ? C.white : C.lavenderdark,
                            color: m.is_admin ? C.text : "white",
                            borderBottomLeftRadius: m.is_admin ? 6 : undefined,
                            borderBottomRightRadius: !m.is_admin ? 6 : undefined,
                          }}
                        >
                          <p className="text-[9px] font-black uppercase opacity-50 mb-1 tracking-wider">
                            {m.is_admin ? "Graspo Support" : "You"}
                          </p>
                          <p className="text-sm font-semibold leading-relaxed">{m.text}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Input */}
                  {selectedTicket.status !== "closed" ? (
                    <div className="px-5 py-4 flex gap-3 items-center" style={{ background: C.white }}>
                      <input
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        className="flex-1 rounded-[18px] px-5 py-3 text-sm font-semibold outline-none border-2 transition-all"
                        style={{
                          background: C.bg,
                          border: `2px solid transparent`,
                          color: C.text,
                        }}
                        onFocus={(e) => e.target.style.borderColor = C.lavenderdark}
                        onBlur={(e) => e.target.style.borderColor = "transparent"}
                      />
                      <motion.button
                        whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
                        onClick={sendMessage}
                        className="w-11 h-11 rounded-full flex items-center justify-center shadow-md flex-shrink-0"
                        style={{ background: C.lavenderdark }}
                      >
                        <Send size={17} color="white" />
                      </motion.button>
                    </div>
                  ) : (
                    <div
                      className="px-6 py-4 text-center text-xs font-bold"
                      style={{ background: C.lavender, color: C.muted }}
                    >
                      This conversation is closed. Create a new ticket if you need help 🌸
                    </div>
                  )}
                </motion.div>

              ) : (

                /* ── NEW TICKET FORM ── */
                <motion.div
                  key="form"
                  initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                  className="rounded-[32px] p-8 shadow-sm"
                  style={{ background: C.white }}
                >
                  <div className="max-w-md mx-auto">
                    {/* Mascots row */}
                    <div className="flex justify-center gap-3 mb-6">
                      {[C.pink, C.lavenderdark, C.peach, C.mint].map((c, i) => (
                        <motion.div
                          key={i}
                          animate={{ y: [0, -6, 0] }}
                          transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                        >
                          <BlobMascot color={c} size={48} />
                        </motion.div>
                      ))}
                    </div>

                    <h2 className="text-2xl font-black text-center mb-1" style={{ color: C.text }}>
                      New Request
                    </h2>
                    <p className="text-sm text-center font-semibold mb-8" style={{ color: C.muted }}>
                      Tell us — we'll help you out ✨
                    </p>

                    <form onSubmit={handleCreateTicket} className="space-y-4">
                      <input
                        placeholder="Subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                        className="w-full rounded-[18px] px-5 py-4 text-sm font-bold outline-none border-2 transition-all"
                        style={{ background: C.bg, borderColor: "transparent", color: C.text }}
                        onFocus={(e) => e.target.style.borderColor = C.lavenderdark}
                        onBlur={(e) => e.target.style.borderColor = "transparent"}
                      />
                      <textarea
                        placeholder="Describe your issue..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        required
                        rows={6}
                        className="w-full rounded-[18px] px-5 py-4 text-sm font-semibold outline-none border-2 transition-all resize-none"
                        style={{ background: C.bg, borderColor: "transparent", color: C.text }}
                        onFocus={(e) => e.target.style.borderColor = C.lavenderdark}
                        onBlur={(e) => e.target.style.borderColor = "transparent"}
                      />

                      <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                        className="w-full py-4 rounded-[18px] font-black text-white text-base flex items-center justify-center gap-2 shadow-lg"
                        style={{ background: C.lavenderdark }}
                      >
                        {loading
                          ? <Loader2 size={20} className="animate-spin" />
                          : <><Sparkles size={18} /> Submit Request</>
                        }
                      </motion.button>
                    </form>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}