"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Edit, Truck, AlertTriangle } from "lucide-react"
import Link from "next/link"

interface Resource {
  id: string
  name: string
  category: string
  type: string
  quantity: number
  available_quantity: number
  unit: string
  location: string
  status: string
  condition?: string
  cost?: number
  created_at: string
}

interface ResourceTableProps {
  resources: Resource[]
}

const statusColors = {
  available: "bg-green-100 text-green-800",
  deployed: "bg-blue-100 text-blue-800",
  maintenance: "bg-yellow-100 text-yellow-800",
  damaged: "bg-red-100 text-red-800",
  retired: "bg-gray-100 text-gray-800",
}

const conditionColors = {
  excellent: "bg-green-100 text-green-800",
  good: "bg-blue-100 text-blue-800",
  fair: "bg-yellow-100 text-yellow-800",
  poor: "bg-red-100 text-red-800",
}

export function ResourceTable({ resources }: ResourceTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Available</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Condition</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {resources.map((resource) => (
            <TableRow key={resource.id}>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{resource.name}</span>
                  {resource.available_quantity < 5 && (
                    <AlertTriangle className="w-4 h-4 text-orange-500" title="Low stock" />
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="capitalize">
                  {resource.category}
                </Badge>
              </TableCell>
              <TableCell>{resource.type}</TableCell>
              <TableCell>
                {resource.quantity} {resource.unit}
              </TableCell>
              <TableCell>
                <span
                  className={`font-medium ${resource.available_quantity < 5 ? "text-orange-600" : "text-green-600"}`}
                >
                  {resource.available_quantity} {resource.unit}
                </span>
              </TableCell>
              <TableCell>{resource.location}</TableCell>
              <TableCell>
                <Badge className={statusColors[resource.status as keyof typeof statusColors]}>{resource.status}</Badge>
              </TableCell>
              <TableCell>
                {resource.condition && (
                  <Badge className={conditionColors[resource.condition as keyof typeof conditionColors]}>
                    {resource.condition}
                  </Badge>
                )}
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Link href={`/admin/resources/${resource.id}`}>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href={`/admin/resources/${resource.id}/edit`}>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href={`/admin/resources/${resource.id}/deploy`}>
                    <Button variant="ghost" size="sm" disabled={resource.status !== "available"}>
                      <Truck className="w-4 h-4" />
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
