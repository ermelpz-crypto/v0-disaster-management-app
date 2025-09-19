"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  AlertTriangle,
  Package,
  Users,
  MapPin,
  Bell,
  FileText,
  GraduationCap,
  BarChart3,
  Settings,
  Shield,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

interface UserProfile {
  id: string
  email: string
  full_name: string
  role: string
  department?: string
  phone?: string
  position?: string
  is_active: boolean
}

interface AdminSidebarProps {
  userProfile: UserProfile
}

const navigationItems = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    roles: ["super_admin", "emergency_manager", "content_admin", "field_responder", "viewer"],
  },
  {
    name: "Incidents",
    href: "/admin/incidents",
    icon: AlertTriangle,
    roles: ["super_admin", "emergency_manager", "field_responder"],
  },
  {
    name: "Resources",
    href: "/admin/resources",
    icon: Package,
    roles: ["super_admin", "emergency_manager"],
  },
  {
    name: "Evacuation Centers",
    href: "/admin/evacuation",
    icon: MapPin,
    roles: ["super_admin", "emergency_manager"],
  },
  {
    name: "Alerts & Warnings",
    href: "/admin/alerts",
    icon: Bell,
    roles: ["super_admin", "emergency_manager"],
  },
  {
    name: "Content Management",
    href: "/admin/content",
    icon: FileText,
    roles: ["super_admin", "content_admin", "emergency_manager"],
  },
  {
    name: "Training Records",
    href: "/admin/training",
    icon: GraduationCap,
    roles: ["super_admin", "emergency_manager"],
  },
  {
    name: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
    roles: ["super_admin", "emergency_manager"],
  },
  {
    name: "User Management",
    href: "/admin/users",
    icon: Users,
    roles: ["super_admin"],
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
    roles: ["super_admin", "emergency_manager"],
  },
]

export function AdminSidebar({ userProfile }: AdminSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  const filteredNavigation = navigationItems.filter((item) => item.roles.includes(userProfile.role))

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-200 transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">MDRRMO</h1>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {filteredNavigation.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                isActive ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                isCollapsed && "justify-center",
              )}
              title={isCollapsed ? item.name : undefined}
            >
              <item.icon className={cn("w-5 h-5", !isCollapsed && "mr-3")} />
              {!isCollapsed && item.name}
            </Link>
          )
        })}
      </nav>

      {/* User Info */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700">{userProfile.full_name.charAt(0).toUpperCase()}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{userProfile.full_name}</p>
              <p className="text-xs text-gray-500 capitalize">{userProfile.role.replace("_", " ")}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
