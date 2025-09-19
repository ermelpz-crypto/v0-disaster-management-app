import { UserForm } from "@/components/admin/user-form"

export default function NewUserPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Add New User</h1>
        <p className="text-gray-600">Create a new user account</p>
      </div>

      <UserForm />
    </div>
  )
}
