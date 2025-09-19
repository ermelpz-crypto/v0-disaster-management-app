import type React from "react"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/admin/auth/login")
  }

  // Get user profile with role
  const { data: profile } = await supabase.from("user_profiles").select("*").eq("id", user.id).single()

  if (!profile) {
    redirect("/admin/auth/login")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar userProfile={profile} />
      <div className="lg:pl-64">
        <AdminHeader user={user} userProfile={profile} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
