"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

interface IncidentFormProps {
  incident?: any
  isEditing?: boolean
}

export function IncidentForm({ incident, isEditing = false }: IncidentFormProps) {
  const router = useRouter()
  const supabase = createClient()

  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: incident?.title || "",
    description: incident?.description || "",
    incident_type: incident?.incident_type || "",
    severity: incident?.severity || "",
    status: incident?.status || "reported",
    location: incident?.location || "",
    casualties: incident?.casualties || 0,
    damages_estimated: incident?.damages_estimated || 0,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const supabase = createClient()

      if (isEditing && incident) {
        // Update existing incident
        const { error } = await supabase
          .from("emergency_incidents")
          .update({
            ...formData,
            updated_at: new Date().toISOString(),
          })
          .eq("id", incident.id)

        if (error) throw error

        // Log activity
        await supabase.rpc("log_activity", {
          p_action: "updated incident",
          p_resource_type: "incident",
          p_resource_id: incident.id,
          p_details: { title: formData.title },
        })

        toast.success("Incident updated successfully")
      } else {
        // Create new incident
        const { data, error } = await supabase
          .from("emergency_incidents")
          .insert({
            ...formData,
            incident_number: `${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`,
          })
          .select()
          .single()

        if (error) throw error

        // Log activity
        await supabase.rpc("log_activity", {
          p_action: "created incident",
          p_resource_type: "incident",
          p_resource_id: data.id,
          p_details: { title: formData.title },
        })

        toast.success("Incident reported successfully")
      }

      router.push("/admin/incidents")
    } catch (error) {
      console.error("Error saving incident:", error)
      toast.error("Failed to save incident")
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
        <CardTitle>{isEditing ? "Edit Incident" : "Report New Incident"}</CardTitle>
        <CardDescription>
          {isEditing ? "Update incident details" : "Fill in the details of the emergency incident"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Incident Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Brief description of the incident"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="Incident location"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="incident_type">Incident Type *</Label>
              <Select
                value={formData.incident_type}
                onValueChange={(value) => handleInputChange("incident_type", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select incident type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fire">Fire</SelectItem>
                  <SelectItem value="flood">Flood</SelectItem>
                  <SelectItem value="earthquake">Earthquake</SelectItem>
                  <SelectItem value="typhoon">Typhoon</SelectItem>
                  <SelectItem value="landslide">Landslide</SelectItem>
                  <SelectItem value="accident">Accident</SelectItem>
                  <SelectItem value="medical">Medical Emergency</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="severity">Severity *</Label>
              <Select value={formData.severity} onValueChange={(value) => handleInputChange("severity", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select severity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {isEditing && (
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reported">Reported</SelectItem>
                    <SelectItem value="responding">Responding</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="casualties">Casualties</Label>
              <Input
                id="casualties"
                type="number"
                min="0"
                value={formData.casualties}
                onChange={(e) => handleInputChange("casualties", Number.parseInt(e.target.value) || 0)}
                placeholder="Number of casualties"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="damages_estimated">Estimated Damages (PHP)</Label>
              <Input
                id="damages_estimated"
                type="number"
                min="0"
                step="0.01"
                value={formData.damages_estimated}
                onChange={(e) => handleInputChange("damages_estimated", Number.parseFloat(e.target.value) || 0)}
                placeholder="Estimated damage cost"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Detailed description of the incident"
              rows={4}
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : isEditing ? "Update Incident" : "Report Incident"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
