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

interface ResourceFormProps {
  resource?: any
  isEditing?: boolean
}

export function ResourceForm({ resource, isEditing = false }: ResourceFormProps) {
  const router = useRouter()
  const supabase = createClient()

  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: resource?.name || "",
    category: resource?.category || "",
    type: resource?.type || "",
    quantity: resource?.quantity || 1,
    available_quantity: resource?.available_quantity || 1,
    unit: resource?.unit || "unit",
    location: resource?.location || "",
    status: resource?.status || "available",
    condition: resource?.condition || "excellent",
    acquisition_date: resource?.acquisition_date || "",
    cost: resource?.cost || 0,
    notes: resource?.notes || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const supabase = createClient()

      if (isEditing && resource) {
        // Update existing resource
        const { error } = await supabase
          .from("resources")
          .update({
            ...formData,
            updated_at: new Date().toISOString(),
          })
          .eq("id", resource.id)

        if (error) throw error

        // Log activity
        await supabase.rpc("log_activity", {
          p_action: "updated resource",
          p_resource_type: "resource",
          p_resource_id: resource.id,
          p_details: { name: formData.name },
        })

        toast.success("Resource updated successfully")
      } else {
        // Create new resource
        const { data, error } = await supabase.from("resources").insert(formData).select().single()

        if (error) throw error

        // Log activity
        await supabase.rpc("log_activity", {
          p_action: "created resource",
          p_resource_type: "resource",
          p_resource_id: data.id,
          p_details: { name: formData.name },
        })

        toast.success("Resource added successfully")
      }

      router.push("/admin/resources")
    } catch (error) {
      console.error("Error saving resource:", error)
      toast.error("Failed to save resource")
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
        <CardTitle>{isEditing ? "Edit Resource" : "Add New Resource"}</CardTitle>
        <CardDescription>
          {isEditing ? "Update resource details" : "Fill in the details of the new resource"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Resource Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter resource name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vehicle">Vehicle</SelectItem>
                  <SelectItem value="equipment">Equipment</SelectItem>
                  <SelectItem value="personnel">Personnel</SelectItem>
                  <SelectItem value="medical">Medical</SelectItem>
                  <SelectItem value="communication">Communication</SelectItem>
                  <SelectItem value="shelter">Shelter</SelectItem>
                  <SelectItem value="food">Food</SelectItem>
                  <SelectItem value="water">Water</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type *</Label>
              <Input
                id="type"
                value={formData.type}
                onChange={(e) => handleInputChange("type", e.target.value)}
                placeholder="Specific type or model"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="Storage location"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Total Quantity *</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={formData.quantity}
                onChange={(e) => handleInputChange("quantity", Number.parseInt(e.target.value) || 1)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="available_quantity">Available Quantity *</Label>
              <Input
                id="available_quantity"
                type="number"
                min="0"
                max={formData.quantity}
                value={formData.available_quantity}
                onChange={(e) => handleInputChange("available_quantity", Number.parseInt(e.target.value) || 0)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="unit">Unit *</Label>
              <Input
                id="unit"
                value={formData.unit}
                onChange={(e) => handleInputChange("unit", e.target.value)}
                placeholder="unit, piece, kg, liter, etc."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="deployed">Deployed</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="damaged">Damaged</SelectItem>
                  <SelectItem value="retired">Retired</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="condition">Condition</Label>
              <Select value={formData.condition} onValueChange={(value) => handleInputChange("condition", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excellent">Excellent</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="fair">Fair</SelectItem>
                  <SelectItem value="poor">Poor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="acquisition_date">Acquisition Date</Label>
              <Input
                id="acquisition_date"
                type="date"
                value={formData.acquisition_date}
                onChange={(e) => handleInputChange("acquisition_date", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cost">Cost (PHP)</Label>
              <Input
                id="cost"
                type="number"
                min="0"
                step="0.01"
                value={formData.cost}
                onChange={(e) => handleInputChange("cost", Number.parseFloat(e.target.value) || 0)}
                placeholder="Acquisition cost"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              placeholder="Additional notes or specifications"
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : isEditing ? "Update Resource" : "Add Resource"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
