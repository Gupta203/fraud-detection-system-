"use client"

import { useEffect, useState } from "react"
import type { ToastNotification } from "@/lib/notification-service"
import { X, AlertCircle, CheckCircle, AlertTriangle, Info } from "lucide-react"

interface ToastProps {
  notification: ToastNotification
  onClose: () => void
}

export function Toast({ notification, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (notification.duration === 0) return

    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300)
    }, notification.duration || 3000)

    return () => clearTimeout(timer)
  }, [notification.duration, onClose])

  const iconMap = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
  }

  const bgMap = {
    success: "bg-green-500/10 border-green-500/20",
    error: "bg-red-500/10 border-red-500/20",
    warning: "bg-yellow-500/10 border-yellow-500/20",
    info: "bg-blue-500/10 border-blue-500/20",
  }

  return (
    <div
      className={`transform transition-all duration-300 ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <div className={`rounded-lg border p-4 ${bgMap[notification.type]} backdrop-blur-sm`}>
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">{iconMap[notification.type]}</div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground text-sm">{notification.title}</h3>
            <p className="text-muted-foreground text-sm mt-1">{notification.message}</p>
            {notification.action && (
              <button
                onClick={notification.action.onClick}
                className="mt-2 text-sm font-medium text-blue-400 hover:text-blue-300"
              >
                {notification.action.label}
              </button>
            )}
          </div>
          <button
            onClick={() => {
              setIsVisible(false)
              setTimeout(onClose, 300)
            }}
            className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
