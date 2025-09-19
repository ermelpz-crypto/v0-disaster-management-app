"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, RotateCcw } from "lucide-react"
import Link from "next/link"

interface Deployment {
  id: string
  quantity_deployed: number
  deployment_location: string
  deployed_at: string
  expected_return?: string
  returned_at?: string
  status: string
  notes?: string
  resources: {
    name: string
    category: string
    type: string
    unit: string
  }
  deployed_by_profile: {
    full_name: string
  }
  emergency_incidents?: {
    incident_number: string
    title: string
  }
}

interface DeploymentTableProps {
  deployments: Deployment[]
}

const statusColors = {
  deployed: "bg-blue-100 text-blue-800",
  returned: "bg-green-100 text-green-800",
  lost: "bg-red-100 text-red-800",
  damaged: "bg-orange-100 text-orange-800",
}

export function DeploymentTable({ deployments }: DeploymentTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Resource</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Incident</TableHead>
            <TableHead>Deployed By</TableHead>
            <TableHead>Deployed At</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deployments.map((deployment) => (
            <TableRow key={deployment.id}>
              <TableCell>
                <div>
                  <p className="font-medium">{deployment.resources.name}</p>
                  <p className="text-sm text-gray-500">
                    {deployment.resources.category} - {deployment.resources.type}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                {deployment.quantity_deployed} {deployment.resources.unit}
              </TableCell>
              <TableCell>{deployment.deployment_location}</TableCell>
              <TableCell>
                {deployment.emergency_incidents ? (
                  <div>
                    <p className="font-medium">{deployment.emergency_incidents.incident_number}</p>
                    <p className="text-sm text-gray-500 truncate max-w-xs">{deployment.emergency_incidents.title}</p>
                  </div>
                ) : (
                  <span className="text-gray-400">No incident</span>
                )}
              </TableCell>
              <TableCell>{deployment.deployed_by_profile.full_name}</TableCell>
              <TableCell>{new Date(deployment.deployed_at).toLocaleString()}</TableCell>
              <TableCell>
                <Badge className={statusColors[deployment.status as keyof typeof statusColors]}>
                  {deployment.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Link href={`/admin/resources/deployments/${deployment.id}`}>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                  {deployment.status === "deployed" && (
                    <Button variant="ghost" size="sm" title="Mark as returned">
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
