"use client"

import { Bell, Search, Clock } from "lucide-react"
import { Input } from "@/components/ui/input"

export function Header({ alertsCount = 0 }: { alertsCount?: number }) {
  const now = new Date()
  const timeString = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })

  return (
    <header className="bg-card border-b border-border px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search transactions, alerts..." className="pl-10 bg-input border-border" />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>{timeString}</span>
        </div>
        <button className="relative p-2 hover:bg-muted rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-foreground" />
          {alertsCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
              {alertsCount > 9 ? "9+" : alertsCount}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
