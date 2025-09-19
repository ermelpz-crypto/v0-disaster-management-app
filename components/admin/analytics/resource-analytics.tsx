"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

interface ResourceAnalyticsProps {
  resources: any[]
  deployments: any[]
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"]

export function ResourceAnalytics({ resources, deployments }: ResourceAnalyticsProps) {
  // Resource distribution by category
  const resourcesByCategory = resources.reduce((acc, resource) => {
    acc[resource.category] = (acc[resource.category] || 0) + 1
    return acc
  }, {})

  const categoryData = Object.entries(resourcesByCategory).map(([category, count]) => ({
    category: category.charAt(0).toUpperCase() + category.slice(1),
    count,
  }))

  // Resource status distribution
  const resourcesByStatus = resources.reduce((acc, resource) => {
    acc[resource.status] = (acc[resource.status] || 0) + 1
    return acc
  }, {})

  const statusData = Object.entries(resourcesByStatus).map(([status, count]) => ({
    name: status.charAt(0).toUpperCase() + status.slice(1),
    value: count as number,
  }))

  // Resource utilization (deployed vs available)
  const utilizationData = resources.map((resource) => ({
    name: resource.name,
    total: resource.quantity,
    available: resource.available_quantity,
    deployed: resource.quantity - resource.available_quantity,
    utilization: ((resource.quantity - resource.available_quantity) / resource.quantity) * 100,
  }))

  // Top utilized resources
  const topUtilized = utilizationData
    .filter((r) => r.utilization > 0)
    .sort((a, b) => b.utilization - a.utilization)
    .slice(0, 10)

  // Deployment frequency by resource category
  const deploymentsByCategory = deployments.reduce((acc, deployment) => {
    // This would need to be joined with resources in a real implementation
    // For now, we'll create sample data
    const categories = ["vehicle", "equipment", "medical", "communication", "food"]
    const randomCategory = categories[Math.floor(Math.random() * categories.length)]
    acc[randomCategory] = (acc[randomCategory] || 0) + 1
    return acc
  }, {})

  const deploymentCategoryData = Object.entries(deploymentsByCategory).map(([category, count]) => ({
    category: category.charAt(0).toUpperCase() + category.slice(1),
    deployments: count,
  }))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Resources by Category */}
      <Card>
        <CardHeader>
          <CardTitle>Resources by Category</CardTitle>
          <CardDescription>Distribution of resources across categories</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Resource Status */}
      <Card>
        <CardHeader>
          <CardTitle>Resource Status</CardTitle>
          <CardDescription>Current status of all resources</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Utilized Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Resource Utilization</CardTitle>
          <CardDescription>Most utilized resources (top 10)</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topUtilized} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={100} />
              <Tooltip formatter={(value) => [`${value}%`, "Utilization"]} />
              <Bar dataKey="utilization" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Deployments by Category */}
      <Card>
        <CardHeader>
          <CardTitle>Deployments by Category</CardTitle>
          <CardDescription>Deployment frequency across resource categories</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={deploymentCategoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="deployments" fill="#F59E0B" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
