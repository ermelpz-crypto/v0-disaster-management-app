import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Package, MapPin, Users } from "lucide-react"
import { RealTimeStatus } from "@/components/admin/real-time-status"
import { LiveActivityFeed } from "@/components/admin/live-activity-feed"

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Fetch dashboard statistics
  const [
    { count: totalIncidents },
    { count: activeIncidents },
    { count: totalResources },
    { count: availableResources },
    { count: evacuationCenters },
    { count: activeAlerts },
  ] = await Promise.all([
    supabase.from("emergency_incidents").select("*", { count: "exact", head: true }),
    supabase.from("emergency_incidents").select("*", { count: "exact", head: true }).neq("status", "closed"),
    supabase.from("resources").select("*", { count: "exact", head: true }),
    supabase.from("resources").select("*", { count: "exact", head: true }).eq("status", "available"),
    supabase.from("evacuation_centers").select("*", { count: "exact", head: true }),
    supabase.from("alerts").select("*", { count: "exact", head: true }).eq("status", "active"),
  ])

  // Fetch recent incidents
  const { data: recentIncidents } = await supabase
    .from("emergency_incidents")
    .select("*, user_profiles!emergency_incidents_reported_by_fkey(full_name)")
    .order("created_at", { ascending: false })
    .limit(5)

  const stats = [
    {
      title: "Total Incidents",
      value: totalIncidents || 0,
      description: `${activeIncidents || 0} active`,
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Resources",
      value: totalResources || 0,
      description: `${availableResources || 0} available`,
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Evacuation Centers",
      value: evacuationCenters || 0,
      description: "Ready for deployment",
      icon: MapPin,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Active Alerts",
      value: activeAlerts || 0,
      description: "Currently broadcasting",
      icon: Users,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
  ]

  return (
    <div className="space-y-6">
      <RealTimeStatus />

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`p-2 rounded-md ${stat.bgColor}`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Incidents */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Incidents</CardTitle>
            <CardDescription>Latest emergency incidents reported</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentIncidents?.map((incident) => (
                <div key={incident.id} className="flex items-center space-x-4">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      incident.severity === "critical"
                        ? "bg-red-500"
                        : incident.severity === "high"
                          ? "bg-orange-500"
                          : incident.severity === "medium"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{incident.title}</p>
                    <p className="text-sm text-gray-500">{incident.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{new Date(incident.created_at).toLocaleDateString()}</p>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        incident.status === "resolved"
                          ? "bg-green-100 text-green-800"
                          : incident.status === "responding"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {incident.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <LiveActivityFeed />
      </div>
    </div>
  )
}
