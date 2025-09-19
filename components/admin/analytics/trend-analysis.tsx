"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"

interface TrendAnalysisProps {
  incidents: any[]
  resources: any[]
  trainingRecords: any[]
}

export function TrendAnalysis({ incidents, resources, trainingRecords }: TrendAnalysisProps) {
  // Generate monthly data for the last 12 months
  const last12Months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date()
    date.setMonth(date.getMonth() - (11 - i))
    return {
      month: date.toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      date: date,
    }
  })

  // Incidents trend
  const incidentsTrend = last12Months.map(({ month, date }) => {
    const monthIncidents = incidents.filter((incident) => {
      const incidentDate = new Date(incident.created_at)
      return incidentDate.getMonth() === date.getMonth() && incidentDate.getFullYear() === date.getFullYear()
    })

    return {
      month,
      incidents: monthIncidents.length,
      critical: monthIncidents.filter((i) => i.severity === "critical").length,
      resolved: monthIncidents.filter((i) => i.status === "resolved" || i.status === "closed").length,
    }
  })

  // Resource acquisition trend
  const resourcesTrend = last12Months.map(({ month, date }) => {
    const monthResources = resources.filter((resource) => {
      if (!resource.acquisition_date) return false
      const resourceDate = new Date(resource.acquisition_date)
      return resourceDate.getMonth() === date.getMonth() && resourceDate.getFullYear() === date.getFullYear()
    })

    return {
      month,
      acquired: monthResources.length,
      totalValue: monthResources.reduce((sum, r) => sum + (r.cost || 0), 0),
    }
  })

  // Training trend
  const trainingTrend = last12Months.map(({ month, date }) => {
    const monthTraining = trainingRecords.filter((training) => {
      if (!training.completed_date) return false
      const trainingDate = new Date(training.completed_date)
      return trainingDate.getMonth() === date.getMonth() && trainingDate.getFullYear() === date.getFullYear()
    })

    return {
      month,
      completed: monthTraining.length,
      participants: monthTraining.reduce((sum, t) => sum + (t.participants_count || 0), 0),
    }
  })

  // Performance metrics trend
  const performanceTrend = last12Months.map(({ month }, index) => {
    // Simulate performance metrics
    const basePerformance = 95
    const variation = Math.sin(index * 0.5) * 3 + Math.random() * 2
    return {
      month,
      performance: Math.round((basePerformance + variation) * 10) / 10,
      uptime: Math.round((98 + Math.random() * 2) * 10) / 10,
    }
  })

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Incidents Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Incident Trends</CardTitle>
            <CardDescription>Monthly incident reports and resolution rates</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={incidentsTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="incidents" stroke="#3B82F6" strokeWidth={2} name="Total Incidents" />
                <Line type="monotone" dataKey="critical" stroke="#EF4444" strokeWidth={2} name="Critical" />
                <Line type="monotone" dataKey="resolved" stroke="#10B981" strokeWidth={2} name="Resolved" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Resource Acquisition Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Resource Acquisition</CardTitle>
            <CardDescription>Monthly resource acquisitions and investments</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={resourcesTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value, name) => [name === "totalValue" ? `₱${value.toLocaleString()}` : value, name]}
                />
                <Area
                  type="monotone"
                  dataKey="acquired"
                  stackId="1"
                  stroke="#F59E0B"
                  fill="#F59E0B"
                  name="Resources Acquired"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Training Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Training Activities</CardTitle>
            <CardDescription>Monthly training completions and participant counts</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trainingTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="completed" stroke="#8B5CF6" strokeWidth={2} name="Training Completed" />
                <Line type="monotone" dataKey="participants" stroke="#06B6D4" strokeWidth={2} name="Participants" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* System Performance Trend */}
        <Card>
          <CardHeader>
            <CardTitle>System Performance</CardTitle>
            <CardDescription>Monthly system performance and uptime metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={performanceTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[90, 100]} />
                <Tooltip formatter={(value) => [`${value}%`, ""]} />
                <Area
                  type="monotone"
                  dataKey="performance"
                  stackId="1"
                  stroke="#10B981"
                  fill="#10B981"
                  name="Performance Score"
                />
                <Area type="monotone" dataKey="uptime" stackId="2" stroke="#3B82F6" fill="#3B82F6" name="Uptime" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Incident Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">+12%</div>
            <p className="text-sm text-muted-foreground">vs last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resolution Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">87%</div>
            <p className="text-sm text-muted-foreground">incidents resolved</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resource Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">73%</div>
            <p className="text-sm text-muted-foreground">average utilization</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Training Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">94%</div>
            <p className="text-sm text-muted-foreground">completion rate</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
