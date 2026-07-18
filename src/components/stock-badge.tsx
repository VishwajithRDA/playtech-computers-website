import { cn } from "../lib/utils"
import type { StockStatus } from "../lib/catalog-data"

const CONFIG: Record<StockStatus, { label: string; dot: string; classes: string }> = {
  "in-stock": {
    label: "In Stock",
    dot: "bg-accent",
    classes: "border-accent/40 bg-accent/10 text-accent",
  },
  "out-of-stock": {
    label: "Out of Stock",
    dot: "bg-destructive",
    classes: "border-destructive/40 bg-destructive/10 text-destructive",
  },
  "call-for-price": {
    label: "Call for Price",
    dot: "bg-primary",
    classes: "border-primary/40 bg-primary/10 text-primary",
  },
}

export function StockBadge({
  status,
  className,
}: {
  status: StockStatus
  className?: string
}) {
  const c = CONFIG[status]
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium tracking-wide",
        c.classes,
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", c.dot)} aria-hidden="true" />
      {c.label}
    </span>
  )
}
