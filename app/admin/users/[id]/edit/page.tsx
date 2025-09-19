import { createClient } from "@/lib/supabase/server"
import { UserForm } from "@/components/admin/user-form"
import { notFound } from "next/navigation"

export default async function EditUserPage({
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

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Edit User</h1>
        <p className="text-gray-600">Update {user.full_name}'s account details</p>
      </div>

      <UserForm user={user} isEditing={true} />
    </div>
  )
}
