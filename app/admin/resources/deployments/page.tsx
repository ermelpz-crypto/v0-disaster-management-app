import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { DeploymentTable } from "@/components/admin/deployment-table"

export default async function DeploymentsPage() {
  const supabase = await createClient()

  // Fetch deployments with resource and user details
  const { data: deployments, error } = await supabase
    .from("resource_deployments")
    .select(`
      *,
      resources(name, category, type, unit),
      deployed_by_profile:user_profiles!resource_deployments_deployed_by_fkey(full_name),
      emergency_incidents(incident_number, title)
    `)
    .order("deployed_at", { ascending: false })

  // Get deployment statistics
  const [
    { count: totalDeployments },
    { count: activeDeployments },
    { count: returnedDeployments },
    { count: lostDamagedDeployments },
  ] = await Promise.all([
    supabase.from("resource_deployments").select("*", { count: "exact", head: true }),
    supabase.from("resource_deployments").select("*", { count: "exact", head: true }).eq("status", "deployed"),
    supabase.from("resource_deployments").select("*", { count: "exact", head: true }).eq("status", "returned"),
    supabase.from("resource_deployments").select("*", { count: "exact", head: true }).in("status", ["lost", "damaged"]),
  ])

  const stats = [
    { label: "Total", value: totalDeployments || 0, color: "bg-gray-100 text-gray-800" },
    { label: "Active", value: activeDeployments || 0, color: "bg-blue-100 text-blue-800" },
    { label: "Returned", value: returnedDeployments || 0, color: "bg-green-100 text-green-800" },
    { label: "Lost/Damaged", value: lostDamagedDeployments || 0, color: "bg-red-100 text-red-800" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin/resources">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Resources
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Resource Deployments</h1>
            <p className="text-gray-600">Track deployed resources and their status</p>
          </div>
        </div>
        <Link href="/admin/resources/deployments/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Deployment
          </Button>
        </Link>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <Badge className={stat.color}>{stat.value}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Deployments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Resource Deployments</CardTitle>
          <CardDescription>{deployments?.length || 0} deployments found</CardDescription>
        </CardHeader>
        <CardContent>
          <DeploymentTable deployments={deployments || []} />
        </CardContent>
      </Card>
    </div>
  )
}
