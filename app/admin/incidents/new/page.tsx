import { IncidentForm } from "@/components/admin/incident-form"

export default function NewIncidentPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Report New Incident</h1>
        <p className="text-gray-600">Create a new emergency incident report</p>
      </div>

      <IncidentForm />
    </div>
  )
}
