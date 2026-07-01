"use client"

import React, { useState } from "react"
import { C } from "./components/shared"
import { Topbar } from "./components/topbar"
import { OverviewTab }   from "./components/tabs/overview-tab"
import { SalesTab }      from "./components/tabs/sales-tab"
import { AudienceTab }   from "./components/tabs/audience-tab"
import { OperationsTab } from "./components/tabs/operations-tab"
import { FinanceTab }    from "./components/tabs/finance-tab"

const TABS = [
  { key: "overview",   label: "Overview"   },
  { key: "sales",      label: "Sales"      },
  { key: "audience",   label: "Audience"   },
  { key: "operations", label: "Operations" },
  { key: "finance",    label: "Finance"    },
]

export default function DataReportPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const tabContent: Record<string, React.ReactNode> = {
    overview:   <OverviewTab />,
    sales:      <SalesTab />,
    audience:   <AudienceTab />,
    operations: <OperationsTab />,
    finance:    <FinanceTab />,
  }

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <Topbar activeTab={activeTab} onTabChange={setActiveTab} tabs={TABS} />
      <div style={{ padding: "28px 32px", paddingLeft: "calc(72px + 2rem)" }}>
        {tabContent[activeTab]}
      </div>
    </div>
  )
}
