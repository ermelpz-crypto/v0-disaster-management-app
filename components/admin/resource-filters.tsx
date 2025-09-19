"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"
import { useState } from "react"

export function ResourceFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [search, setSearch] = useState(searchParams.get("search") || "")
  const [category, setCategory] = useState(searchParams.get("category") || "")
  const [status, setStatus] = useState(searchParams.get("status") || "")

  const updateFilters = () => {
    const params = new URLSearchParams()
    if (search) params.set("search", search)
    if (category) params.set("category", category)
    if (status) params.set("status", status)

    router.push(`/admin/resources?${params.toString()}`)
  }

  const clearFilters = () => {
    setSearch("")
    setCategory("")
    setStatus("")
    router.push("/admin/resources")
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search resources..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
          onKeyDown={(e) => e.key === "Enter" && updateFilters()}
        />
      </div>

      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger>
          <SelectValue placeholder="Category" />
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

      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger>
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="available">Available</SelectItem>
          <SelectItem value="deployed">Deployed</SelectItem>
          <SelectItem value="maintenance">Maintenance</SelectItem>
          <SelectItem value="damaged">Damaged</SelectItem>
          <SelectItem value="retired">Retired</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex space-x-2">
        <Button onClick={updateFilters} className="flex-1">
          Apply
        </Button>
        <Button variant="outline" onClick={clearFilters}>
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
