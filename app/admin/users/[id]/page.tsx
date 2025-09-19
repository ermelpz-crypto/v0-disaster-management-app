import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, Phone, Calendar, MapPin, Briefcase, Edit, Shield } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

const roleColors = {
  super_admin: "bg-purple-100 text-purple-800",
  emergency_manager: "bg-blue-100 text-blue-800",
  content_admin: "bg-orange-100 text-orange-800",
  field_responder: "bg-green-100 text-green-800",
  viewer: "bg-gray-100 text-gray-800",
}

export default async function UserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: user, error } = await supabase.from("user_profiles").select("*").eq("id", id).single()

  if (error || !user) {
    notFound()
  }

  // Get user activity logs
  const { data: activities } = await supabase
    .from("activity_logs")
    .select("*")
    .eq("user_id", id)
    .order("created_at", { ascending: false })
    .limit(10)

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-xl font-bold text-gray-700">{user.full_name.charAt(0).toUpperCase()}</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{user.full_name}</h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
        <Link href={`/admin/users/${user.id}/edit`}>
          <Button>
            <Edit className="w-4 h-4 mr-2" />
            Edit User
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Badge className={roleColors[user.role as keyof typeof roleColors]}>
                  <Shield className="w-3 h-3 mr-1" />
                  {user.role.replace("_", " ")}
                </Badge>
                <Badge className={user.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                  {user.is_active ? "Active" : "Inactive"}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span>{user.email}</span>
                </div>
                {user.phone && (
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{user.phone}</span>
                  </div>
                )}
                {user.department && (
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{user.department}</span>
                  </div>
                )}
                {user.position && (
                  <div className="flex items-center space-x-2">
                    <Briefcase className="w-4 h-4 text-gray-400" />
                    <span>{user.position}</span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>Joined {new Date(user.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Role Permissions */}
          <Card>
            <CardHeader>
              <CardTitle>Role Permissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {user.role === "super_admin" && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-purple-700">Super Administrator</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Full system access and control</li>
                      <li>• User management and role assignment</li>
                      <li>• System configuration and settings</li>
                      <li>• All incident and resource management</li>
                      <li>• Analytics and reporting access</li>
                    </ul>
                  </div>
                )}
                {user.role === "emergency_manager" && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-blue-700">Emergency Manager</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Incident management and coordination</li>
                      <li>• Resource allocation and deployment</li>
                      <li>• Alert and warning management</li>
                      <li>• Training and evacuation center management</li>
                      <li>• Analytics and reporting access</li>
                    </ul>
                  </div>
                )}
                {user.role === "content_admin" && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-orange-700">Content Administrator</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Content management and publishing</li>
                      <li>• Training material management</li>
                      <li>• View incidents and resources</li>
                      <li>• Basic reporting access</li>
                    </ul>
                  </div>
                )}
                {user.role === "field_responder" && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-green-700">Field Responder</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Report and update incidents</li>
                      <li>• Resource deployment management</li>
                      <li>• View evacuation centers</li>
                      <li>• Basic system access</li>
                    </ul>
                  </div>
                )}
                {user.role === "viewer" && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-700">Viewer</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• View-only access to dashboard</li>
                      <li>• Read access to incidents and resources</li>
                      <li>• Basic reporting access</li>
                      <li>• No modification permissions</li>
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {activities?.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                    <div>
                      <p className="text-sm text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">{new Date(activity.created_at).toLocaleString()}</p>
                    </div>
                  </div>
                )) || <p className="text-sm text-gray-500">No recent activity</p>}
              </div>
            </CardContent>
          </Card>

          {/* Account Status */}
          <Card>
            <CardHeader>
              <CardTitle>Account Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Status</span>
                  <Badge className={user.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                    {user.is_active ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Created</span>
                  <span className="text-sm">{new Date(user.created_at).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Last Updated</span>
                  <span className="text-sm">{new Date(user.updated_at).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
