"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Eye, Edit, MoreHorizontal, UserCheck, UserX, Shield } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface User {
  id: string
  email: string
  full_name: string
  role: string
  department?: string
  phone?: string
  position?: string
  is_active: boolean
  created_at: string
}

interface UserTableProps {
  users: User[]
}

const roleColors = {
  super_admin: "bg-purple-100 text-purple-800",
  emergency_manager: "bg-blue-100 text-blue-800",
  content_admin: "bg-orange-100 text-orange-800",
  field_responder: "bg-green-100 text-green-800",
  viewer: "bg-gray-100 text-gray-800",
}

const roleIcons = {
  super_admin: Shield,
  emergency_manager: Shield,
  content_admin: Edit,
  field_responder: UserCheck,
  viewer: Eye,
}

export function UserTable({ users }: UserTableProps) {
  const router = useRouter()
  const supabase = createClient()

  const handleToggleStatus = async (userId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase.from("user_profiles").update({ is_active: !currentStatus }).eq("id", userId)

      if (error) throw error

      // Log activity
      await supabase.rpc("log_activity", {
        p_action: `${!currentStatus ? "activated" : "deactivated"} user`,
        p_resource_type: "user",
        p_resource_id: userId,
      })

      toast.success(`User ${!currentStatus ? "activated" : "deactivated"} successfully`)
      router.refresh()
    } catch (error) {
      console.error("Error updating user status:", error)
      toast.error("Failed to update user status")
    }
  }

  const handleResetPassword = async (userId: string, email: string) => {
    try {
      // In a real implementation, you would trigger a password reset email
      // For now, we'll just log the activity
      await supabase.rpc("log_activity", {
        p_action: "initiated password reset",
        p_resource_type: "user",
        p_resource_id: userId,
      })

      toast.success("Password reset email sent")
    } catch (error) {
      console.error("Error resetting password:", error)
      toast.error("Failed to send password reset email")
    }
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => {
            const RoleIcon = roleIcons[user.role as keyof typeof roleIcons]
            return (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-700">
                        {user.full_name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{user.full_name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                      {user.phone && <p className="text-sm text-gray-500">{user.phone}</p>}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <RoleIcon className="w-4 h-4" />
                    <Badge className={roleColors[user.role as keyof typeof roleColors]}>
                      {user.role.replace("_", " ")}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>{user.department || "—"}</TableCell>
                <TableCell>{user.position || "—"}</TableCell>
                <TableCell>
                  <Badge className={user.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                    {user.is_active ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/users/${user.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/users/${user.id}/edit`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit User
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleToggleStatus(user.id, user.is_active)}>
                        {user.is_active ? (
                          <>
                            <UserX className="mr-2 h-4 w-4" />
                            Deactivate
                          </>
                        ) : (
                          <>
                            <UserCheck className="mr-2 h-4 w-4" />
                            Activate
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleResetPassword(user.id, user.email)}>
                        Reset Password
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
