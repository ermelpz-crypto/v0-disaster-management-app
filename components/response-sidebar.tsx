"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Phone, MapPin, FileText, Users, Truck, Heart } from "lucide-react"

const sidebarItems = [
  { href: "/response", label: "Overview", icon: Users },
  { href: "/response/hotlines", label: "Emergency Hotlines", icon: Phone },
  { href: "/response/evacuation", label: "Evacuation Centers", icon: MapPin },
  { href: "/response/incident-report", label: "Report Incident", icon: FileText },
  { href: "/response/relief-operations", label: "Relief Operations", icon: Truck },
  { href: "/response/medical-assistance", label: "Medical Assistance", icon: Heart },
]

export default function ResponseSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-mdrrmo-primary">Response & Recovery</h2>
        <p className="text-sm text-gray-600 mt-1">Emergency response tools and resources</p>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    isActive ? "bg-mdrrmo-primary text-white" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
