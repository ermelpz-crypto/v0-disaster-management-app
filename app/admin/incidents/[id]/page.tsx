import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, User, AlertTriangle, Edit } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

export default async function IncidentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: incident, error } = await supabase
    .from("emergency_incidents")
    .select(`
      *,
      reported_by_profile:user_profiles!emergency_incidents_reported_by_fkey(full_name, email, phone),
      assigned_to_profile:user_profiles!emergency_incidents_assigned_to_fkey(full_name, email, phone)
    `)
    .eq("id", id)
    .single()

  if (error || !incident) {
    notFound()
  }

  const severityColors = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-orange-100 text-orange-800",
    critical: "bg-red-100 text-red-800",
  }

  const statusColors = {
    reported: "bg-yellow-100 text-yellow-800",
    responding: "bg-blue-100 text-blue-800",
    resolved: "bg-green-100 text-green-800",
    closed: "bg-gray-100 text-gray-800",
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{incident.title}</h1>
          <p className="text-gray-600">Incident #{incident.incident_number}</p>
        </div>
        <Link href={`/admin/incidents/${incident.id}/edit`}>
          <Button>
            <Edit className="w-4 h-4 mr-2" />
            Edit Incident
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Incident Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Badge className={severityColors[incident.severity as keyof typeof severityColors]}>
                  {incident.severity} severity
                </Badge>
                <Badge className={statusColors[incident.status as keyof typeof statusColors]}>{incident.status}</Badge>
                <Badge variant="outline" className="capitalize">
                  {incident.incident_type}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>{incident.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>{new Date(incident.created_at).toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-gray-400" />
                  <span>{incident.casualties} casualties</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400">₱</span>
                  <span>{incident.damages_estimated?.toLocaleString() || 0} estimated damages</span>
                </div>
              </div>

              {incident.description && (
                <div>
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-gray-700">{incident.description}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Personnel */}
          <Card>
            <CardHeader>
              <CardTitle>Personnel</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-sm text-gray-500 mb-2">Reported By</h4>
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="font-medium">{incident.reported_by_profile?.full_name || "System"}</p>
                    {incident.reported_by_profile?.email && (
                      <p className="text-sm text-gray-500">{incident.reported_by_profile.email}</p>
                    )}
                  </div>
                </div>
              </div>

              {incident.assigned_to_profile && (
                <div>
                  <h4 className="font-medium text-sm text-gray-500 mb-2">Assigned To</h4>
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="font-medium">{incident.assigned_to_profile.full_name}</p>
                      <p className="text-sm text-gray-500">{incident.assigned_to_profile.email}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                  <div>
                    <p className="text-sm font-medium">Incident Reported</p>
                    <p className="text-xs text-gray-500">{new Date(incident.created_at).toLocaleString()}</p>
                  </div>
                </div>
                {incident.resolved_at && (
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                    <div>
                      <p className="text-sm font-medium">Incident Resolved</p>
                      <p className="text-xs text-gray-500">{new Date(incident.resolved_at).toLocaleString()}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
