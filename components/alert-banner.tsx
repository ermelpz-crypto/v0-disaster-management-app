"use client"

import { useState, useEffect } from "react"
import { X, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Alert {
  id: string
  message: string
  severity: "critical" | "warning" | "advisory"
  isActive: boolean
}

export function AlertBanner() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([])

  // Mock active alerts - in real app, this would come from CMS/API
  useEffect(() => {
    const mockAlerts: Alert[] = [
      {
        id: "1",
        message:
          "CRITICAL: Evacuation for Barangay San Miguel to start at 14:00. Proceed to designated evacuation centers immediately.",
        severity: "critical",
        isActive: true,
      },
    ]
    setAlerts(mockAlerts)
  }, [])

  const activeAlerts = alerts.filter((alert) => alert.isActive && !dismissedAlerts.includes(alert.id))

  const dismissAlert = (alertId: string) => {
    setDismissedAlerts((prev) => [...prev, alertId])
  }

  if (activeAlerts.length === 0) return null

  return (
    <div className="relative">
      {activeAlerts.map((alert) => (
        <div
          key={alert.id}
          className={`w-full px-4 py-3 text-white font-medium text-sm ${
            alert.severity === "critical"
              ? "bg-red-600"
              : alert.severity === "warning"
                ? "bg-orange-500"
                : "bg-yellow-500 text-black"
          }`}
        >
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 flex-shrink-0" />
              <span className="text-balance">{alert.message}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => dismissAlert(alert.id)}
              className={`h-6 w-6 p-0 hover:bg-white/20 ${
                alert.severity === "advisory" ? "text-black hover:bg-black/10" : "text-white"
              }`}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
