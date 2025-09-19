import { createClient } from "@/lib/supabase/server"
import { IncidentForm } from "@/components/admin/incident-form"
import { notFound } from "next/navigation"

export default async function EditIncidentPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: incident, error } = await supabase.from("emergency_incidents").select("*").eq("id", id).single()

  if (error || !incident) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Edit Incident</h1>
        <p className="text-gray-600">Update incident #{incident.incident_number}</p>
      </div>

      <IncidentForm incident={incident} isEditing={true} />
    </div>
  )
}
