"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const warningsNavItems = [
  { name: "Overview", href: "/warnings" },
  { name: "Latest Weather Bulletin", href: "/warnings/weather" },
  { name: "Emergency Alerts", href: "/warnings/alerts" },
  { name: "Suspension of Classes/Work", href: "/warnings/suspensions" },
  { name: "Road & Infrastructure Status", href: "/warnings/road-status" },
]

export function WarningsSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-full lg:w-64 bg-white rounded-lg shadow-sm p-6 border-l-4 border-red-500">
      <h2 className="text-lg font-semibold text-red-800 mb-4">Warnings & Advisories</h2>
      <nav className="space-y-2">
        {warningsNavItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "block px-3 py-2 text-sm rounded-md transition-colors",
              pathname === item.href
                ? "bg-red-50 text-red-800 font-medium border-l-4 border-red-600"
                : "text-gray-700 hover:bg-red-50 hover:text-red-700",
            )}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  )
}
