"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

interface IncidentAnalyticsProps {
  incidents: any[]
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export function IncidentAnalytics({ incidents }: IncidentAnalyticsProps) {
  // Process data for charts
  const incidentsByType = incidents.reduce((acc, incident) => {
    acc[incident.incident_type] = (acc[incident.incident_type] || 0) + 1
    return acc
  }, {})

  const typeData = Object.entries(incidentsByType).map(([type, count]) => ({
    type: type.charAt(0).toUpperCase() + type.slice(1),
    count,
  }))

  const incidentsBySeverity = incidents.reduce((acc, incident) => {
    acc[incident.severity] = (acc[incident.severity] || 0) + 1
    return acc
  }, {})

  const severityData = Object.entries(incidentsBySeverity).map(([severity, count]) => ({
    name: severity.charAt(0).toUpperCase() + severity.slice(1),
    value: count as number,
  }))

  // Monthly incidents trend
  const monthlyData = incidents.reduce((acc, incident) => {
    const month = new Date(incident.created_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })
    acc[month] = (acc[month] || 0) + 1
    return acc
  }, {})

  const trendData = Object.entries(monthlyData)
    .map(([month, count]) => ({ month, incidents: count }))
    .slice(-6) // Last 6 months

  // Status distribution
  const statusData = incidents.reduce((acc, incident) => {
    acc[incident.status] = (acc[incident.status] || 0) + 1
    return acc
  }, {})

  const statusChartData = Object.entries(statusData).map(([status, count]) => ({
    status: status.charAt(0).toUpperCase() + status.slice(1),
    count,
  }))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Incidents by Type */}
      <Card>
        <CardHeader>
          <CardTitle>Incidents by Type</CardTitle>
          <CardDescription>Distribution of incident types</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={typeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Incidents by Severity */}
      <Card>
        <CardHeader>
          <CardTitle>Incidents by Severity</CardTitle>
          <CardDescription>Severity level distribution</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={severityData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {severityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Monthly Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Incident Trend</CardTitle>
          <CardDescription>Incidents reported over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="incidents" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Status Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Incident Status</CardTitle>
          <CardDescription>Current status of all incidents</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statusChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#F59E0B" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
