import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  icon?: React.ReactNode
  className?: string
  variant?: "default" | "accent" | "chart"
}

export function StatCard({
  title,
  value,
  change,
  changeLabel,
  icon,
  className,
  variant = "default",
}: StatCardProps) {
  const isPositive = change !== undefined && change > 0
  const isNegative = change !== undefined && change < 0
  const isNeutral = change === 0

  const variantStyles = {
    default: "bg-card",
    accent: "bg-gradient-to-br from-chart-1/10 to-chart-1/5 border-chart-1/20",
    chart: "bg-gradient-to-br from-chart-2/10 to-chart-2/5 border-chart-2/20",
  }

  return (
    <Card className={cn("overflow-hidden", variantStyles[variant], className)}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-muted-foreground">{title}</span>
            <span className="text-2xl font-bold tracking-tight">{value}</span>
            {change !== undefined && (
              <div className="flex items-center gap-1.5 mt-1">
                <span
                  className={cn(
                    "flex items-center gap-0.5 text-xs font-medium",
                    isPositive && "text-chart-1",
                    isNegative && "text-destructive",
                    isNeutral && "text-muted-foreground"
                  )}
                >
                  {isPositive && <TrendingUp className="size-3" />}
                  {isNegative && <TrendingDown className="size-3" />}
                  {isNeutral && <Minus className="size-3" />}
                  {isPositive && "+"}
                  {change}%
                </span>
                {changeLabel && (
                  <span className="text-xs text-muted-foreground">{changeLabel}</span>
                )}
              </div>
            )}
          </div>
          {icon && (
            <div className="flex size-10 items-center justify-center rounded-lg bg-secondary/80">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
