"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"
import { useState } from "react"

export function IncidentFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [search, setSearch] = useState(searchParams.get("search") || "")
  const [status, setStatus] = useState(searchParams.get("status") || "")
  const [severity, setSeverity] = useState(searchParams.get("severity") || "")
  const [type, setType] = useState(searchParams.get("type") || "")

  const updateFilters = () => {
    const params = new URLSearchParams()
    if (search) params.set("search", search)
    if (status) params.set("status", status)
    if (severity) params.set("severity", severity)
    if (type) params.set("type", type)

    router.push(`/admin/incidents?${params.toString()}`)
  }

  const clearFilters = () => {
    setSearch("")
    setStatus("")
    setSeverity("")
    setType("")
    router.push("/admin/incidents")
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search incidents..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
          onKeyDown={(e) => e.key === "Enter" && updateFilters()}
        />
      </div>

      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger>
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="reported">Reported</SelectItem>
          <SelectItem value="responding">Responding</SelectItem>
          <SelectItem value="resolved">Resolved</SelectItem>
          <SelectItem value="closed">Closed</SelectItem>
        </SelectContent>
      </Select>

      <Select value={severity} onValueChange={setSeverity}>
        <SelectTrigger>
          <SelectValue placeholder="Severity" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="high">High</SelectItem>
          <SelectItem value="critical">Critical</SelectItem>
        </SelectContent>
      </Select>

      <Select value={type} onValueChange={setType}>
        <SelectTrigger>
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="fire">Fire</SelectItem>
          <SelectItem value="flood">Flood</SelectItem>
          <SelectItem value="earthquake">Earthquake</SelectItem>
          <SelectItem value="typhoon">Typhoon</SelectItem>
          <SelectItem value="landslide">Landslide</SelectItem>
          <SelectItem value="accident">Accident</SelectItem>
          <SelectItem value="medical">Medical</SelectItem>
          <SelectItem value="other">Other</SelectItem>
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
