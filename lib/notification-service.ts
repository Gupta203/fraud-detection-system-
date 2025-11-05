"use client"

export interface ToastNotification {
  id: string
  type: "success" | "error" | "warning" | "info"
  title: string
  message: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

export interface AlertNotification extends ToastNotification {
  severity: "critical" | "high" | "medium" | "low"
  timestamp: Date
  actionRequired: boolean
}

class NotificationManager {
  private listeners: Set<(notification: ToastNotification) => void> = new Set()
  private notifications: ToastNotification[] = []
  private maxNotifications = 5

  subscribe(listener: (notification: ToastNotification) => void) {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  notify(notification: Omit<ToastNotification, "id">) {
    const id = `notification-${Date.now()}-${Math.random()}`
    const fullNotification = { ...notification, id }

    this.notifications.push(fullNotification)
    if (this.notifications.length > this.maxNotifications) {
      this.notifications.shift()
    }

    this.listeners.forEach((listener) => listener(fullNotification))

    if (notification.duration !== 0) {
      const duration = notification.duration || 3000
      setTimeout(() => {
        this.removeNotification(id)
      }, duration)
    }

    return id
  }

  removeNotification(id: string) {
    this.notifications = this.notifications.filter((n) => n.id !== id)
  }

  success(title: string, message: string, duration?: number) {
    return this.notify({ type: "success", title, message, duration })
  }

  error(title: string, message: string, duration?: number) {
    return this.notify({ type: "error", title, message, duration })
  }

  warning(title: string, message: string, duration?: number) {
    return this.notify({ type: "warning", title, message, duration })
  }

  info(title: string, message: string, duration?: number) {
    return this.notify({ type: "info", title, message, duration })
  }

  getAll() {
    return [...this.notifications]
  }

  clear() {
    this.notifications = []
  }
}

export const notificationManager = new NotificationManager()
