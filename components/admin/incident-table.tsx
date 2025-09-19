"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Edit, MapPin } from "lucide-react"
import Link from "next/link"

interface Incident {
  id: string
  incident_number: string
  title: string
  description: string
  incident_type: string
  severity: string
  status: string
  location: string
  casualties: number
  created_at: string
  reported_by_profile?: { full_name: string }
  assigned_to_profile?: { full_name: string }
}

interface IncidentTableProps {
  incidents: Incident[]
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

export function IncidentTable({ incidents }: IncidentTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Incident #</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Severity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Reported By</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {incidents.map((incident) => (
            <TableRow key={incident.id}>
              <TableCell className="font-medium">{incident.incident_number}</TableCell>
              <TableCell>
                <div>
                  <p className="font-medium">{incident.title}</p>
                  <p className="text-sm text-gray-500 truncate max-w-xs">{incident.description}</p>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="capitalize">
                  {incident.incident_type}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={severityColors[incident.severity as keyof typeof severityColors]}>
                  {incident.severity}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={statusColors[incident.status as keyof typeof statusColors]}>{incident.status}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                  <span className="truncate max-w-xs">{incident.location}</span>
                </div>
              </TableCell>
              <TableCell>{incident.reported_by_profile?.full_name || "System"}</TableCell>
              <TableCell>{new Date(incident.created_at).toLocaleDateString()}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Link href={`/admin/incidents/${incident.id}`}>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href={`/admin/incidents/${incident.id}/edit`}>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
