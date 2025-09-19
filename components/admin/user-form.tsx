"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"

interface UserFormProps {
  user?: any
  isEditing?: boolean
}

export function UserForm({ user, isEditing = false }: UserFormProps) {
  const router = useRouter()
  const supabase = createClient()

  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: user?.email || "",
    full_name: user?.full_name || "",
    role: user?.role || "viewer",
    department: user?.department || "",
    phone: user?.phone || "",
    position: user?.position || "",
    is_active: user?.is_active ?? true,
    password: "",
    confirmPassword: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const supabase = createClient()

      if (isEditing && user) {
        // Update existing user profile
        const { error } = await supabase
          .from("user_profiles")
          .update({
            full_name: formData.full_name,
            role: formData.role,
            department: formData.department,
            phone: formData.phone,
            position: formData.position,
            is_active: formData.is_active,
            updated_at: new Date().toISOString(),
          })
          .eq("id", user.id)

        if (error) throw error

        // Log activity
        await supabase.rpc("log_activity", {
          p_action: "updated user profile",
          p_resource_type: "user",
          p_resource_id: user.id,
          p_details: { full_name: formData.full_name },
        })

        toast.success("User updated successfully")
      } else {
        // Create new user
        if (formData.password !== formData.confirmPassword) {
          toast.error("Passwords do not match")
          return
        }

        if (formData.password.length < 6) {
          toast.error("Password must be at least 6 characters")
          return
        }

        // Sign up the user
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.full_name,
              role: formData.role,
            },
          },
        })

        if (authError) throw authError

        if (authData.user) {
          // Update the user profile with additional details
          const { error: profileError } = await supabase
            .from("user_profiles")
            .update({
              full_name: formData.full_name,
              role: formData.role,
              department: formData.department,
              phone: formData.phone,
              position: formData.position,
              is_active: formData.is_active,
            })
            .eq("id", authData.user.id)

          if (profileError) throw profileError

          // Log activity
          await supabase.rpc("log_activity", {
            p_action: "created user account",
            p_resource_type: "user",
            p_resource_id: authData.user.id,
            p_details: { full_name: formData.full_name, email: formData.email },
          })
        }

        toast.success("User created successfully")
      }

      router.push("/admin/users")
    } catch (error) {
      console.error("Error saving user:", error)
      toast.error("Failed to save user")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? "Edit User" : "Add New User"}</CardTitle>
        <CardDescription>
          {isEditing ? "Update user account details" : "Fill in the details for the new user account"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="user@mdrrmo.gov.ph"
                required
                disabled={isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name *</Label>
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={(e) => handleInputChange("full_name", e.target.value)}
                placeholder="Enter full name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role *</Label>
              <Select value={formData.role} onValueChange={(value) => handleInputChange("role", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="super_admin">Super Admin</SelectItem>
                  <SelectItem value="emergency_manager">Emergency Manager</SelectItem>
                  <SelectItem value="content_admin">Content Admin</SelectItem>
                  <SelectItem value="field_responder">Field Responder</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                value={formData.department}
                onChange={(e) => handleInputChange("department", e.target.value)}
                placeholder="Department or unit"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => handleInputChange("position", e.target.value)}
                placeholder="Job position or title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+63-XXX-XXX-XXXX"
              />
            </div>

            {!isEditing && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    placeholder="Minimum 6 characters"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    placeholder="Confirm password"
                    required
                  />
                </div>
              </>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="is_active"
              checked={formData.is_active}
              onCheckedChange={(checked) => handleInputChange("is_active", checked)}
            />
            <Label htmlFor="is_active">Active Account</Label>
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : isEditing ? "Update User" : "Create User"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
