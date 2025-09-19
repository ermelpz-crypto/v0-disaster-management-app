"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Phone, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigationItems = [
  { name: "HOME", href: "/" },
  {
    name: "ABOUT US",
    href: "/about",
    children: [
      { name: "Mission and Vision", href: "/about/mission-vision" },
      { name: "Mandate & Legal Basis", href: "/about/mandate" },
      { name: "Our Team / Officials", href: "/about/team" },
      { name: "Organizational Structure", href: "/about/structure" },
    ],
  },
  {
    name: "PREPAREDNESS",
    href: "/preparedness",
    children: [
      { name: "Family Emergency Plan", href: "/preparedness/family-plan" },
      { name: "What's in your Go-Bag?", href: "/preparedness/go-bag" },
      { name: "Hazard Maps", href: "/preparedness/hazard-maps" },
      { name: "IEC Materials", href: "/preparedness/iec-materials" },
      { name: "Trainings & Drills", href: "/preparedness/trainings" },
    ],
  },
  {
    name: "WARNINGS & ADVISORIES",
    href: "/warnings",
    isHighPriority: true,
    children: [
      { name: "Latest Weather Bulletin", href: "/warnings/weather" },
      { name: "Emergency Alerts", href: "/warnings/alerts" },
      { name: "Suspension of Classes/Work", href: "/warnings/suspensions" },
      { name: "Road & Infrastructure Status", href: "/warnings/road-status" },
    ],
  },
  {
    name: "RESPONSE & RECOVERY",
    href: "/response",
    children: [
      { name: "Emergency Hotlines", href: "/response/hotlines" },
      { name: "List of Evacuation Centers", href: "/response/evacuation-centers" },
      { name: "How to Report an Incident", href: "/response/report" },
      { name: "Donations & Relief Operations", href: "/response/donations" },
    ],
  },
  {
    name: "RESOURCES",
    href: "/resources",
    children: [
      { name: "Downloads", href: "/resources/downloads" },
      { name: "Photo & Video Gallery", href: "/resources/gallery" },
      { name: "Frequently Asked Questions", href: "/resources/faq" },
    ],
  },
  {
    name: "GET INVOLVED",
    href: "/get-involved",
    children: [
      { name: "Become a Volunteer", href: "/get-involved/volunteer" },
      { name: "Partnerships", href: "/get-involved/partnerships" },
    ],
  },
  {
    name: "CONTACT US",
    href: "/contact",
    children: [
      { name: "Contact Information", href: "/contact/info" },
      { name: "Location Map", href: "/contact/map" },
      { name: "Directory", href: "/contact/directory" },
    ],
  },
]

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 mdrrmo-primary rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-mdrrmo-primary">MDRRMO</h1>
                <p className="text-xs text-gray-600">Municipal Disaster Risk Reduction</p>
              </div>
            </Link>
          </div>

          {/* Emergency Hotline Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button asChild className="mdrrmo-response text-white hover:bg-red-700">
              <Link href="/response/hotlines">
                <Phone className="h-4 w-4 mr-2" />
                EMERGENCY HOTLINE
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <div className="flex space-x-1 pb-2">
            {navigationItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    pathname === item.href || pathname.startsWith(item.href + "/")
                      ? item.isHighPriority
                        ? "bg-red-100 text-red-800 border-l-4 border-red-600"
                        : "bg-blue-100 text-mdrrmo-primary border-l-4 border-mdrrmo-primary"
                      : item.isHighPriority
                        ? "text-red-700 hover:bg-red-50"
                        : "text-gray-700 hover:bg-gray-100",
                  )}
                >
                  {item.name}
                </Link>

                {/* Dropdown Menu */}
                {item.children && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-md shadow-lg border border-gray-200 py-2 z-50">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className={cn(
                          "block px-4 py-2 text-sm transition-colors",
                          pathname === child.href
                            ? "bg-blue-50 text-mdrrmo-primary font-medium"
                            : "text-gray-700 hover:bg-gray-50",
                        )}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block px-3 py-2 text-base font-medium rounded-md",
                      pathname === item.href || pathname.startsWith(item.href + "/")
                        ? item.isHighPriority
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-mdrrmo-primary"
                        : item.isHighPriority
                          ? "text-red-700"
                          : "text-gray-700",
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.children && (
                    <div className="ml-4 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className={cn(
                            "block px-3 py-2 text-sm rounded-md",
                            pathname === child.href
                              ? "bg-blue-50 text-mdrrmo-primary font-medium"
                              : "text-gray-600 hover:bg-gray-50",
                          )}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile Emergency Button */}
              <div className="pt-4 border-t border-gray-200">
                <Button asChild className="w-full mdrrmo-response text-white hover:bg-red-700">
                  <Link href="/response/hotlines">
                    <Phone className="h-4 w-4 mr-2" />
                    EMERGENCY HOTLINE
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
