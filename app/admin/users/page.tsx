import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Users, UserCheck, UserX, Shield } from "lucide-react"
import Link from "next/link"
import { UserFilters } from "@/components/admin/user-filters"
import { UserTable } from "@/components/admin/user-table"

interface SearchParams {
  role?: string
  status?: string
  search?: string
  page?: string
}

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const supabase = await createClient()

  // Build query with filters
  let query = supabase.from("user_profiles").select("*").order("created_at", { ascending: false })

  // Apply filters
  if (params.role) {
    query = query.eq("role", params.role)
  }
  if (params.status === "active") {
    query = query.eq("is_active", true)
  } else if (params.status === "inactive") {
    query = query.eq("is_active", false)
  }
  if (params.search) {
    query = query.or(
      `full_name.ilike.%${params.search}%,email.ilike.%${params.search}%,department.ilike.%${params.search}%`,
    )
  }

  const { data: users, error } = await query

  // Get statistics
  const [
    { count: totalUsers },
    { count: activeUsers },
    { count: inactiveUsers },
    { count: superAdmins },
    { count: emergencyManagers },
    { count: fieldResponders },
  ] = await Promise.all([
    supabase.from("user_profiles").select("*", { count: "exact", head: true }),
    supabase.from("user_profiles").select("*", { count: "exact", head: true }).eq("is_active", true),
    supabase.from("user_profiles").select("*", { count: "exact", head: true }).eq("is_active", false),
    supabase.from("user_profiles").select("*", { count: "exact", head: true }).eq("role", "super_admin"),
    supabase.from("user_profiles").select("*", { count: "exact", head: true }).eq("role", "emergency_manager"),
    supabase.from("user_profiles").select("*", { count: "exact", head: true }).eq("role", "field_responder"),
  ])

  const stats = [
    {
      label: "Total Users",
      value: totalUsers || 0,
      description: `${activeUsers || 0} active`,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Active Users",
      value: activeUsers || 0,
      description: "Currently active",
      icon: UserCheck,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Inactive Users",
      value: inactiveUsers || 0,
      description: "Deactivated accounts",
      icon: UserX,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      label: "Administrators",
      value: (superAdmins || 0) + (emergencyManagers || 0),
      description: "Admin level access",
      icon: Shield,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600">Manage user accounts and permissions</p>
        </div>
        <Link href="/admin/users/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </Link>
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

      {/* Role Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Role Distribution</CardTitle>
          <CardDescription>User distribution across different roles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{superAdmins || 0}</div>
              <div className="text-sm text-gray-600">Super Admins</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{emergencyManagers || 0}</div>
              <div className="text-sm text-gray-600">Emergency Managers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{fieldResponders || 0}</div>
              <div className="text-sm text-gray-600">Field Responders</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {users?.filter((u) => u.role === "content_admin").length || 0}
              </div>
              <div className="text-sm text-gray-600">Content Admins</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">
                {users?.filter((u) => u.role === "viewer").length || 0}
              </div>
              <div className="text-sm text-gray-600">Viewers</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <UserFilters />
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>{users?.length || 0} users found</CardDescription>
        </CardHeader>
        <CardContent>
          <UserTable users={users || []} />
        </CardContent>
      </Card>
    </div>
  )
}
