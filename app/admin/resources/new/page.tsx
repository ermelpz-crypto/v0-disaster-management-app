import { ResourceForm } from "@/components/admin/resource-form"

export default function NewResourcePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Add New Resource</h1>
        <p className="text-gray-600">Register a new resource in the inventory</p>
      </div>

      <ResourceForm />
    </div>
  )
}
