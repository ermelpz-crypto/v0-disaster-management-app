"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const preparednessNavItems = [
  { name: "Overview", href: "/preparedness" },
  { name: "Family Emergency Plan", href: "/preparedness/family-plan" },
  { name: "What's in your Go-Bag?", href: "/preparedness/go-bag" },
  { name: "Hazard Maps", href: "/preparedness/hazard-maps" },
  { name: "IEC Materials", href: "/preparedness/iec-materials" },
  { name: "Trainings & Drills", href: "/preparedness/trainings" },
]

export function PreparednessSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-full lg:w-64 bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Preparedness</h2>
      <nav className="space-y-2">
        {preparednessNavItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "block px-3 py-2 text-sm rounded-md transition-colors",
              pathname === item.href
                ? "bg-green-50 text-green-800 font-medium border-l-4 border-green-600"
                : "text-gray-700 hover:bg-gray-50",
            )}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  )
}
