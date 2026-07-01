"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  BarChart3,
  CalendarClock,
  Settings,
  TrendingUp,
  Package,
  LogOut,
  Headphones,
} from "lucide-react"

// ─── Types ───────────────────────────────────────────────
interface NavItemDef {
  label: string
  url: string
  icon: React.ReactNode
}

interface NavItemProps extends NavItemDef {
  active: boolean
  collapsed: boolean
}

// ─── Nav config ──────────────────────────────────────────
const NAV_TOP: NavItemDef[] = [
  { label: "Analytics", url: "/analytics", icon: <BarChart3 size={18} /> },
  { label: "Feedback Analysis", url: "/ml-analysis", icon: <TrendingUp size={18} /> },
  { label: "Articles", url: "/articles", icon: <Package size={18} /> },
  { label: "Inventory", url: "/actions", icon: <CalendarClock size={18} /> },
  { label: "Mathematics", url: "/datareport", icon: <CalendarClock size={18} /> },
  { label: "Rating", url: "/rating", icon: <CalendarClock size={18} /> },
]

const NAV_BOTTOM: NavItemDef[] = [
  { label: "Settings", url: "/settings", icon: <Settings size={18} /> },
  { label: "Support", url: "/support", icon: <Headphones size={18} /> },
]

// ─── NavItem ─────────────────────────────────────────────
function NavItem({ label, url, icon, active, collapsed }: NavItemProps) {
  return (
    <Link
      href={url}
      className={`
        flex items-center gap-3 px-3 py-2.5 rounded-2xl
        transition-colors duration-200 group relative overflow-hidden
        ${active
          ? "bg-white/10 text-white"
          : "text-slate-500 hover:text-white hover:bg-white/[0.07]"
        }
      `}
    >
      {/* Icon */}
      <span className={`flex-shrink-0 transition-colors ${active ? "text-white" : "text-slate-500 group-hover:text-white"}`}>
        {icon}
      </span>

      {/* Label — slides in/out via max-width */}
      <span
        className="text-sm font-medium whitespace-nowrap overflow-hidden"
        style={{
          maxWidth: collapsed ? 0 : 160,
          opacity: collapsed ? 0 : 1,
          transition: "max-width 0.42s cubic-bezier(0.4,0,0.2,1), opacity 0.28s ease",
        }}
      >
        {label}
      </span>

      {/* Active dot */}
      {active && (
        <span
          className="ml-auto w-1.5 h-1.5 rounded-full bg-white flex-shrink-0"
          style={{
            opacity: collapsed ? 0 : 1,
            transition: "opacity 0.28s ease",
          }}
        />
      )}
    </Link>
  )
}

// ─── AppSidebar ───────────────────────────────────────────
export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  
  const [collapsed, setCollapsed] = useState(true)
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const expand = () => {
    if (timeout.current) clearTimeout(timeout.current)
    setCollapsed(false)
  }
  const collapse = () => {
    timeout.current = setTimeout(() => setCollapsed(true), 180)
  }

  // Функция выхода - просто редирект на логин (демо-режим)
  const handleLogout = () => {
    router.push("/login")
    router.refresh()
  }

  return (
    <aside
      onMouseEnter={expand}
      onMouseLeave={collapse}
      style={{
        width: collapsed ? 72 : 224,
        transition: "width 0.42s cubic-bezier(0.4,0,0.2,1)",
        zIndex: 40,
      }}
      className="
        fixed top-0 left-0 h-full
        flex flex-col
        bg-[#1A1A2E] text-white
        rounded-r-[36px]
        py-7 overflow-hidden
        shadow-[4px_0_32px_rgba(0,0,0,0.18)]
      "
    >
      {/* ── Logo ── */}
      <div className="flex items-center gap-3 px-[18px] mb-9">
        <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
          <BarChart3 size={16} className="text-[#1A1A2E]" />
        </div>
        <div
          className="overflow-hidden flex flex-col"
          style={{
            maxWidth: collapsed ? 0 : 160,
            opacity: collapsed ? 0 : 1,
            transition: "max-width 0.42s cubic-bezier(0.4,0,0.2,1), opacity 0.28s ease",
          }}
        >
          <span className="text-sm font-semibold whitespace-nowrap leading-tight">Graspo</span>
          <span className="text-[11px] text-slate-400 whitespace-nowrap leading-tight"></span>
        </div>
      </div>

      {/* ── Main nav ── */}
      <nav className="flex-1 flex flex-col gap-1 px-3">
        {NAV_TOP.map(item => (
          <NavItem
            key={item.label}
            {...item}
            active={pathname === item.url || pathname.startsWith(item.url + "/")}
            collapsed={collapsed}
          />
        ))}
      </nav>

      {/* ── Bottom nav ── */}
      <div className="flex flex-col gap-1 px-3 mt-4">
        {/* Thin divider */}
        <div
          className="mb-3 mx-2 border-t border-white/[0.07]"
          style={{
            opacity: collapsed ? 0 : 1,
            transition: "opacity 0.28s ease",
          }}
        />

        {NAV_BOTTOM.map(item => (
          <NavItem
            key={item.label}
            {...item}
            active={pathname === item.url}
            collapsed={collapsed}
          />
        ))}

        {/* Log out button - демо-режим */}
        <button
          onClick={handleLogout}
          className="
            flex items-center gap-3 px-3 py-2.5 rounded-2xl w-full text-left
            text-slate-500 hover:text-white hover:bg-white/[0.07]
            transition-colors duration-200 group overflow-hidden
          "
        >
          <span className="flex-shrink-0 text-slate-500 group-hover:text-white transition-colors">
            <LogOut size={18} />
          </span>
          <span
            className="text-sm font-medium whitespace-nowrap overflow-hidden"
            style={{
              maxWidth: collapsed ? 0 : 160,
              opacity: collapsed ? 0 : 1,
              transition: "max-width 0.42s cubic-bezier(0.4,0,0.2,1), opacity 0.28s ease",
            }}
          >
            Sign Out
          </span>
        </button>
      </div>
    </aside>
  )
}