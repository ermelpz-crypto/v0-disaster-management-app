"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRealtime } from "@/lib/hooks/use-realtime"
import { AlertTriangle, Package, Activity } from "lucide-react"

interface StatusMetrics {
  active_incidents: number
  available_resources: number
  deployed_resources: number
  active_users: number
  critical_alerts: number
}

export function RealTimeStatus() {
  const [metrics, setMetrics] = useState<StatusMetrics>({
    active_incidents: 0,
    available_resources: 0,
    deployed_resources: 0,
    active_users: 0,
    critical_alerts: 0,
  })

  const { data: incidents } = useRealtime("emergency_incidents", "status=neq.resolved", [])
  const { data: resources } = useRealtime("resources", "", [])
  const { data: alerts } = useRealtime("alerts", "severity=eq.critical,status=eq.active", [])

  useEffect(() => {
    const availableResources = resources.filter((r: any) => r.status === "available").length
    const deployedResources = resources.filter((r: any) => r.status === "deployed").length

    setMetrics({
      active_incidents: incidents.length,
      available_resources: availableResources,
      deployed_resources: deployedResources,
      active_users: 0, // Would be calculated from active sessions
      critical_alerts: alerts.length,
    })
  }, [incidents, resources, alerts])

  const statusCards = [
    {
      title: "Active Incidents",
      value: metrics.active_incidents,
      icon: AlertTriangle,
      color: metrics.active_incidents > 0 ? "text-red-500" : "text-green-500",
      bgColor: metrics.active_incidents > 0 ? "bg-red-50" : "bg-green-50",
    },
    {
      title: "Available Resources",
      value: metrics.available_resources,
      icon: Package,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "Deployed Resources",
      value: metrics.deployed_resources,
      icon: Activity,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      title: "Critical Alerts",
      value: metrics.critical_alerts,
      icon: AlertTriangle,
      color: metrics.critical_alerts > 0 ? "text-red-500" : "text-green-500",
      bgColor: metrics.critical_alerts > 0 ? "bg-red-50" : "bg-green-50",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statusCards.map((card) => (
        <Card key={card.title} className={`${card.bgColor} border-0`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{card.title}</p>
                <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
              </div>
              <card.icon className={`h-8 w-8 ${card.color}`} />
            </div>
            <div className="mt-2">
              <Badge variant="outline" className={`text-xs ${card.color} border-current`}>
                Live
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
