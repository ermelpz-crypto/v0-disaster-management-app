"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"
import { useState } from "react"

export function UserFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [search, setSearch] = useState(searchParams.get("search") || "")
  const [role, setRole] = useState(searchParams.get("role") || "")
  const [status, setStatus] = useState(searchParams.get("status") || "")

  const updateFilters = () => {
    const params = new URLSearchParams()
    if (search) params.set("search", search)
    if (role) params.set("role", role)
    if (status) params.set("status", status)

    router.push(`/admin/users?${params.toString()}`)
  }

  const clearFilters = () => {
    setSearch("")
    setRole("")
    setStatus("")
    router.push("/admin/users")
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
          onKeyDown={(e) => e.key === "Enter" && updateFilters()}
        />
      </div>

      <Select value={role} onValueChange={setRole}>
        <SelectTrigger>
          <SelectValue placeholder="Role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="super_admin">Super Admin</SelectItem>
          <SelectItem value="emergency_manager">Emergency Manager</SelectItem>
          <SelectItem value="content_admin">Content Admin</SelectItem>
          <SelectItem value="field_responder">Field Responder</SelectItem>
          <SelectItem value="viewer">Viewer</SelectItem>
        </SelectContent>
      </Select>

      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger>
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
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
