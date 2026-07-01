"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Lock, Mail, Loader2, ArrowRight, Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Simulate network request
    setTimeout(() => {
      // ANY credentials work - just a demo
      if (email.trim().length > 0 && password.trim().length > 0) {
        router.push("/analytics")
        router.refresh()
      } else {
        setError("Please fill in both fields")
        setLoading(false)
      }
    }, 800)
  }

  return (
    <div
      className="min-h-screen flex overflow-hidden selection:bg-[#b8a4ff] selection:text-black"
      style={{ background: "#0d0d0d", fontFamily: "'Georgia', serif" }}
    >
      {/* ── LEFT: Form side ── */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col justify-between w-full md:w-[52%] px-10 md:px-16 py-12"
      >
        {/* Nav */}
        <div className="flex items-center justify-between">
          <span
            className="text-white font-black text-xl tracking-tight lowercase"
            style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.03em" }}
          >
            graspo
          </span>
          <nav className="hidden md:flex gap-8 text-white/40 text-sm font-medium">
            <span className="hover:text-white/70 cursor-pointer transition-colors"></span>
            <span className="hover:text-white/70 cursor-pointer transition-colors"></span>
            <span className="hover:text-white/70 cursor-pointer transition-colors"></span>
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col justify-center max-w-md py-16">
          {/* Big title — editorial style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h1
              className="text-white leading-[0.92] mb-6"
              style={{
                fontSize: "clamp(3rem, 6vw, 4.5rem)",
                fontFamily: "'Georgia', serif",
                fontWeight: 900,
                letterSpacing: "-0.04em",
              }}
            >
              Sign{" "}
              <span
                style={{
                  color: "#b8a4ff",
                  fontStyle: "italic",
                }}
              >
                &
              </span>
              <br />
              Enter
            </h1>
            <p
              className="text-white/40 text-sm leading-relaxed mb-10"
              style={{ fontFamily: "sans-serif", maxWidth: "30ch" }}
            >
              Demo access — any credentials work.
              <br />
              Just fill in the fields and continue.
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleLogin}
            className="space-y-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
          >
            {/* Demo badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#b8a4ff]/10 border border-[#b8a4ff]/20 text-[#b8a4ff] text-xs font-medium w-fit"
              style={{ fontFamily: "sans-serif" }}
            >
              <Sparkles size={14} />
              <span>Demo mode — any login/password works</span>
            </motion.div>

            {/* Email */}
            <div className="relative group">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#b8a4ff] transition-colors"
                size={16}
              />
              <Input
                type="email"
                placeholder="email@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-13 pl-11 pr-4 py-3.5 bg-white/[0.04] border border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:border-[#b8a4ff]/60 focus:ring-0 text-sm transition-all"
                style={{ fontFamily: "sans-serif" }}
              />
            </div>

            {/* Password */}
            <div className="relative group">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#b8a4ff] transition-colors"
                size={16}
              />
              <Input
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-13 pl-11 pr-4 py-3.5 bg-white/[0.04] border border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:border-[#b8a4ff]/60 focus:ring-0 text-sm transition-all"
                style={{ fontFamily: "sans-serif" }}
              />
            </div>

            {/* Error */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-rose-400 text-xs font-medium pl-1"
                  style={{ fontFamily: "sans-serif" }}
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-13 py-3.5 rounded-2xl font-black text-black text-base flex items-center justify-center gap-2 group transition-all disabled:opacity-50"
              style={{
                background: "#b8a4ff",
                fontFamily: "sans-serif",
                letterSpacing: "-0.02em",
                boxShadow: "0 0 28px rgba(184,164,255,0.25)",
              }}
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  Continue
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </>
              )}
            </Button>
          </motion.form>

          {/* Footer note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-white/20 text-xs"
            style={{ fontFamily: "sans-serif" }}
          >
            No real account needed •{" "}
            <span className="text-[#b8a4ff]/60">
              Enter any credentials
            </span>
          </motion.p>
        </div>

        {/* Bottom arrow */}
        <div className="text-white/20 text-xs flex items-center gap-2" style={{ fontFamily: "sans-serif" }}>
          <span className="rotate-90 text-base">↓</span>
          <span>scroll</span>
        </div>
      </motion.div>

      {/* ── RIGHT: Image side ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="hidden md:block relative flex-1 m-4 rounded-[32px] overflow-hidden"
      >
        {/* Dark background */}
        <div className="absolute inset-0" style={{ background: "#0d0d0d" }} />

        {/* Image — centered, smaller */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="https://i.pinimg.com/736x/bd/d6/d1/bdd6d138232d6715480cbc96ea34fea5.jpg"
            alt=""
            className="rounded-[24px] object-cover"
            style={{ width: "75%", height: "75%", objectPosition: "center" }}
          />
        </div>
      </motion.div>
    </div>
  )
}