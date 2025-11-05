"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { type ToastNotification, notificationManager } from "@/lib/notification-service"
import { Toast } from "./toast-notification"

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<ToastNotification[]>([])

  useEffect(() => {
    const unsubscribe = notificationManager.subscribe((notification) => {
      setNotifications((prev) => [...prev, notification])
    })

    return unsubscribe
  }, [])

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }, [])

  return (
    <>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md">
        {notifications.map((notification) => (
          <Toast
            key={notification.id}
            notification={notification}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </div>
    </>
  )
}
