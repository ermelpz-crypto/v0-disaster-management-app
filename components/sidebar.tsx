"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const aboutNavItems = [
  { name: "Overview", href: "/about" },
  { name: "Mission and Vision", href: "/about/mission-vision" },
  { name: "Mandate & Legal Basis", href: "/about/mandate" },
  { name: "Our Team / Officials", href: "/about/team" },
  { name: "Organizational Structure", href: "/about/structure" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-full lg:w-64 bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">About Us</h2>
      <nav className="space-y-2">
        {aboutNavItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "block px-3 py-2 text-sm rounded-md transition-colors",
              pathname === item.href
                ? "bg-blue-50 text-mdrrmo-primary font-medium border-l-4 border-mdrrmo-primary"
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
