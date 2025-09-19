"use client"

import { useState, useEffect } from "react"
import { AlertTriangle } from "lucide-react"

const mockAlerts = [
  "Weather Update: Tropical Storm Signal #2 raised over Metro Manila - Expected landfall at 18:00",
  "Traffic Advisory: EDSA Northbound closed due to flooding near Cubao - Use alternate routes",
  "Evacuation Notice: Residents of Barangay Riverside advised to evacuate by 15:00 today",
  "Service Update: Emergency hotlines experiencing high volume - Please be patient",
]

export function LiveAlertTicker() {
  const [currentAlert, setCurrentAlert] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAlert((prev) => (prev + 1) % mockAlerts.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  if (mockAlerts.length === 0) return null

  return (
    <div className="bg-yellow-400 text-black py-2 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 flex-shrink-0">
            <AlertTriangle className="h-4 w-4 animate-pulse" />
            <span className="font-bold text-sm uppercase">LIVE ALERTS</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="whitespace-nowrap animate-marquee text-sm font-medium" key={currentAlert}>
              {mockAlerts[currentAlert]}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
