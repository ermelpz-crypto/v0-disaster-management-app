import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Package, Truck, Wrench, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { ResourceFilters } from "@/components/admin/resource-filters"
import { ResourceTable } from "@/components/admin/resource-table"

interface SearchParams {
  category?: string
  status?: string
  search?: string
  page?: string
}

export default async function ResourcesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const supabase = await createClient()

  // Build query with filters
  let query = supabase.from("resources").select("*").order("created_at", { ascending: false })

  // Apply filters
  if (params.category) {
    query = query.eq("category", params.category)
  }
  if (params.status) {
    query = query.eq("status", params.status)
  }
  if (params.search) {
    query = query.or(`name.ilike.%${params.search}%,type.ilike.%${params.search}%,location.ilike.%${params.search}%`)
  }

  const { data: resources, error } = await query

  // Get statistics
  const [
    { count: totalResources },
    { count: availableResources },
    { count: deployedResources },
    { count: maintenanceResources },
    { count: lowStockResources },
  ] = await Promise.all([
    supabase.from("resources").select("*", { count: "exact", head: true }),
    supabase.from("resources").select("*", { count: "exact", head: true }).eq("status", "available"),
    supabase.from("resources").select("*", { count: "exact", head: true }).eq("status", "deployed"),
    supabase.from("resources").select("*", { count: "exact", head: true }).eq("status", "maintenance"),
    supabase.from("resources").select("*", { count: "exact", head: true }).lt("available_quantity", 5),
  ])

  const stats = [
    {
      label: "Total Resources",
      value: totalResources || 0,
      description: "All resources",
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Available",
      value: availableResources || 0,
      description: "Ready for deployment",
      icon: Package,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Deployed",
      value: deployedResources || 0,
      description: "Currently in use",
      icon: Truck,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      label: "Maintenance",
      value: maintenanceResources || 0,
      description: "Under maintenance",
      icon: Wrench,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Resource Management</h1>
          <p className="text-gray-600">Manage emergency response resources and equipment</p>
        </div>
        <div className="flex space-x-2">
          <Link href="/admin/resources/deployments">
            <Button variant="outline">
              <Truck className="w-4 h-4 mr-2" />
              Deployments
            </Button>
          </Link>
          <Link href="/admin/resources/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Resource
            </Button>
          </Link>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
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

      {/* Low Stock Alert */}
      {lowStockResources && lowStockResources > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              <p className="text-orange-800">
                <span className="font-medium">{lowStockResources} resources</span> are running low on stock (less than 5
                units available)
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <ResourceFilters />
        </CardContent>
      </Card>

      {/* Resources Table */}
      <Card>
        <CardHeader>
          <CardTitle>Resources</CardTitle>
          <CardDescription>{resources?.length || 0} resources found</CardDescription>
        </CardHeader>
        <CardContent>
          <ResourceTable resources={resources || []} />
        </CardContent>
      </Card>
    </div>
  )
}
