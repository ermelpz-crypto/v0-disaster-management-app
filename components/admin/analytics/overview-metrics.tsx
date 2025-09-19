"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Package, Truck, MapPin, Bell, GraduationCap, TrendingUp, Clock } from "lucide-react"

interface OverviewMetricsProps {
  incidents: any[]
  resources: any[]
  deployments: any[]
  evacuationCenters: any[]
  alerts: any[]
  trainingRecords: any[]
}

export function OverviewMetrics({
  incidents,
  resources,
  deployments,
  evacuationCenters,
  alerts,
  trainingRecords,
}: OverviewMetricsProps) {
  // Calculate metrics
  const activeIncidents = incidents.filter((i) => i.status !== "closed").length
  const criticalIncidents = incidents.filter((i) => i.severity === "critical").length
  const availableResources = resources.filter((r) => r.status === "available").length
  const activeDeployments = deployments.filter((d) => d.status === "deployed").length
  const activeEvacuationCenters = evacuationCenters.filter((e) => e.status === "active").length
  const activeAlerts = alerts.filter((a) => a.status === "active").length
  const completedTraining = trainingRecords.filter((t) => t.status === "completed").length

  // Calculate average response time
  const resolvedIncidents = incidents.filter((i) => i.response_time_minutes)
  const avgResponseTime =
    resolvedIncidents.length > 0
      ? Math.round(
          resolvedIncidents.reduce((sum, i) => sum + (i.response_time_minutes || 0), 0) / resolvedIncidents.length,
        )
      : 0

  const metrics = [
    {
      title: "Active Incidents",
      value: activeIncidents,
      description: `${criticalIncidents} critical`,
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50",
      trend: "+12%",
    },
    {
      title: "Available Resources",
      value: availableResources,
      description: `${resources.length} total`,
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      trend: "-3%",
    },
    {
      title: "Active Deployments",
      value: activeDeployments,
      description: `${deployments.length} total`,
      icon: Truck,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      trend: "+8%",
    },
    {
      title: "Evacuation Centers",
      value: activeEvacuationCenters,
      description: `${evacuationCenters.length} total`,
      icon: MapPin,
      color: "text-green-600",
      bgColor: "bg-green-50",
      trend: "0%",
    },
    {
      title: "Active Alerts",
      value: activeAlerts,
      description: `${alerts.length} total`,
      icon: Bell,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      trend: "+25%",
    },
    {
      title: "Training Completed",
      value: completedTraining,
      description: `${trainingRecords.length} total`,
      icon: GraduationCap,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      trend: "+15%",
    },
    {
      title: "Avg Response Time",
      value: `${avgResponseTime}m`,
      description: "Minutes to respond",
      icon: Clock,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      trend: "-5%",
    },
    {
      title: "System Performance",
      value: "98.5%",
      description: "Uptime this month",
      icon: TrendingUp,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      trend: "+0.2%",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => (
        <Card key={metric.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            <div className={`p-2 rounded-md ${metric.bgColor}`}>
              <metric.icon className={`w-4 h-4 ${metric.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">{metric.description}</p>
              <span
                className={`text-xs font-medium ${
                  metric.trend.startsWith("+")
                    ? "text-green-600"
                    : metric.trend.startsWith("-")
                      ? "text-red-600"
                      : "text-gray-600"
                }`}
              >
                {metric.trend}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
