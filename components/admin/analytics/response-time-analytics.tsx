"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

interface ResponseTimeAnalyticsProps {
  incidents: any[]
}

export function ResponseTimeAnalytics({ incidents }: ResponseTimeAnalyticsProps) {
  // Filter incidents with response times
  const incidentsWithResponseTime = incidents.filter((i) => i.response_time_minutes)

  // Average response time by incident type
  const responseTimeByType = incidentsWithResponseTime.reduce((acc, incident) => {
    if (!acc[incident.incident_type]) {
      acc[incident.incident_type] = { total: 0, count: 0 }
    }
    acc[incident.incident_type].total += incident.response_time_minutes
    acc[incident.incident_type].count += 1
    return acc
  }, {})

  const avgResponseByType = Object.entries(responseTimeByType).map(([type, data]: [string, any]) => ({
    type: type.charAt(0).toUpperCase() + type.slice(1),
    avgTime: Math.round(data.total / data.count),
  }))

  // Response time trend over months
  const monthlyResponseTime = incidentsWithResponseTime.reduce((acc, incident) => {
    const month = new Date(incident.created_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })
    if (!acc[month]) {
      acc[month] = { total: 0, count: 0 }
    }
    acc[month].total += incident.response_time_minutes
    acc[month].count += 1
    return acc
  }, {})

  const trendData = Object.entries(monthlyResponseTime)
    .map(([month, data]: [string, any]) => ({
      month,
      avgTime: Math.round(data.total / data.count),
    }))
    .slice(-6)

  // Response time by severity
  const responseTimeBySeverity = incidentsWithResponseTime.reduce((acc, incident) => {
    if (!acc[incident.severity]) {
      acc[incident.severity] = { total: 0, count: 0 }
    }
    acc[incident.severity].total += incident.response_time_minutes
    acc[incident.severity].count += 1
    return acc
  }, {})

  const avgResponseBySeverity = Object.entries(responseTimeBySeverity).map(([severity, data]: [string, any]) => ({
    severity: severity.charAt(0).toUpperCase() + severity.slice(1),
    avgTime: Math.round(data.total / data.count),
  }))

  // Resolution time analysis
  const incidentsWithResolutionTime = incidents.filter((i) => i.resolution_time_minutes)
  const avgResolutionTime =
    incidentsWithResolutionTime.length > 0
      ? Math.round(
          incidentsWithResolutionTime.reduce((sum, i) => sum + i.resolution_time_minutes, 0) /
            incidentsWithResolutionTime.length,
        )
      : 0

  const avgResponseTime =
    incidentsWithResponseTime.length > 0
      ? Math.round(
          incidentsWithResponseTime.reduce((sum, i) => sum + i.response_time_minutes, 0) /
            incidentsWithResponseTime.length,
        )
      : 0

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Average Response Time</CardTitle>
            <CardDescription>Time to first response</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{avgResponseTime}m</div>
            <p className="text-sm text-muted-foreground">Based on {incidentsWithResponseTime.length} incidents</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Resolution Time</CardTitle>
            <CardDescription>Time to complete resolution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{avgResolutionTime}m</div>
            <p className="text-sm text-muted-foreground">Based on {incidentsWithResolutionTime.length} incidents</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Response Rate</CardTitle>
            <CardDescription>Incidents with recorded response times</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {incidents.length > 0 ? Math.round((incidentsWithResponseTime.length / incidents.length) * 100) : 0}%
            </div>
            <p className="text-sm text-muted-foreground">
              {incidentsWithResponseTime.length} of {incidents.length} incidents
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Response Time by Type */}
        <Card>
          <CardHeader>
            <CardTitle>Response Time by Incident Type</CardTitle>
            <CardDescription>Average response time for different incident types</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={avgResponseByType}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} minutes`, "Avg Response Time"]} />
                <Bar dataKey="avgTime" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Response Time by Severity */}
        <Card>
          <CardHeader>
            <CardTitle>Response Time by Severity</CardTitle>
            <CardDescription>Average response time for different severity levels</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={avgResponseBySeverity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="severity" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} minutes`, "Avg Response Time"]} />
                <Bar dataKey="avgTime" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Response Time Trend */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Response Time Trend</CardTitle>
            <CardDescription>Average response time over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} minutes`, "Avg Response Time"]} />
                <Line type="monotone" dataKey="avgTime" stroke="#F59E0B" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
