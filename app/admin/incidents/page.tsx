import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Filter } from "lucide-react"
import Link from "next/link"
import { IncidentFilters } from "@/components/admin/incident-filters"
import { IncidentTable } from "@/components/admin/incident-table"

interface SearchParams {
  status?: string
  severity?: string
  type?: string
  search?: string
  page?: string
}

export default async function IncidentsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const supabase = await createClient()

  // Build query with filters
  let query = supabase
    .from("emergency_incidents")
    .select(`
      *,
      reported_by_profile:user_profiles!emergency_incidents_reported_by_fkey(full_name),
      assigned_to_profile:user_profiles!emergency_incidents_assigned_to_fkey(full_name)
    `)
    .order("created_at", { ascending: false })

  // Apply filters
  if (params.status) {
    query = query.eq("status", params.status)
  }
  if (params.severity) {
    query = query.eq("severity", params.severity)
  }
  if (params.type) {
    query = query.eq("incident_type", params.type)
  }
  if (params.search) {
    query = query.or(
      `title.ilike.%${params.search}%,description.ilike.%${params.search}%,location.ilike.%${params.search}%`,
    )
  }

  const { data: incidents, error } = await query

  // Get statistics
  const [
    { count: totalIncidents },
    { count: reportedIncidents },
    { count: respondingIncidents },
    { count: resolvedIncidents },
  ] = await Promise.all([
    supabase.from("emergency_incidents").select("*", { count: "exact", head: true }),
    supabase.from("emergency_incidents").select("*", { count: "exact", head: true }).eq("status", "reported"),
    supabase.from("emergency_incidents").select("*", { count: "exact", head: true }).eq("status", "responding"),
    supabase.from("emergency_incidents").select("*", { count: "exact", head: true }).eq("status", "resolved"),
  ])

  const stats = [
    { label: "Total", value: totalIncidents || 0, color: "bg-gray-100 text-gray-800" },
    { label: "Reported", value: reportedIncidents || 0, color: "bg-yellow-100 text-yellow-800" },
    { label: "Responding", value: respondingIncidents || 0, color: "bg-blue-100 text-blue-800" },
    { label: "Resolved", value: resolvedIncidents || 0, color: "bg-green-100 text-green-800" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Incident Management</h1>
          <p className="text-gray-600">Monitor and manage emergency incidents</p>
        </div>
        <Link href="/admin/incidents/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Report Incident
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

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <IncidentFilters />
        </CardContent>
      </Card>

      {/* Incidents Table */}
      <Card>
        <CardHeader>
          <CardTitle>Emergency Incidents</CardTitle>
          <CardDescription>{incidents?.length || 0} incidents found</CardDescription>
        </CardHeader>
        <CardContent>
          <IncidentTable incidents={incidents || []} />
        </CardContent>
      </Card>
    </div>
  )
}
