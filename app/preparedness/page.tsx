import { PreparednessSidebar } from "@/components/preparedness-sidebar"
import { Shield, Users, BookOpen, Map, Briefcase, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const preparednessAreas = [
  {
    title: "Family Emergency Plan",
    description: "Create a personalized emergency plan for your family",
    icon: Users,
    href: "/preparedness/family-plan",
    color: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    title: "Emergency Go-Bag",
    description: "Essential items checklist for emergency situations",
    icon: Briefcase,
    href: "/preparedness/go-bag",
    color: "bg-green-50 text-green-700 border-green-200",
  },
  {
    title: "Hazard Maps",
    description: "Interactive maps showing local disaster risks",
    icon: Map,
    href: "/preparedness/hazard-maps",
    color: "bg-red-50 text-red-700 border-red-200",
  },
  {
    title: "Educational Materials",
    description: "Download guides, posters, and training materials",
    icon: BookOpen,
    href: "/preparedness/iec-materials",
    color: "bg-purple-50 text-purple-700 border-purple-200",
  },
  {
    title: "Trainings & Drills",
    description: "Upcoming training sessions and past drill reports",
    icon: Calendar,
    href: "/preparedness/trainings",
    color: "bg-yellow-50 text-yellow-700 border-yellow-200",
  },
]

export default function PreparednessPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <PreparednessSidebar />

          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="text-center mb-12">
                <div className="mdrrmo-preparedness w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Disaster Preparedness</h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
                  Being prepared is the first line of defense against disasters. Learn how to protect yourself, your
                  family, and your community before disaster strikes.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {preparednessAreas.map((area) => {
                  const Icon = area.icon
                  return (
                    <Link key={area.title} href={area.href}>
                      <Card
                        className={`h-full transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer border-2 ${area.color}`}
                      >
                        <CardHeader className="text-center pb-4">
                          <Icon className="h-12 w-12 mx-auto mb-4" />
                          <CardTitle className="text-xl">{area.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0 text-center">
                          <p className="text-sm opacity-90">{area.description}</p>
                        </CardContent>
                      </Card>
                    </Link>
                  )
                })}
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                <h2 className="text-xl font-bold text-green-800 mb-3">Why Preparedness Matters</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-green-700">
                  <div>
                    <h3 className="font-semibold mb-2">Saves Lives</h3>
                    <p className="text-sm">
                      Proper preparation can mean the difference between life and death during emergencies.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Reduces Impact</h3>
                    <p className="text-sm">
                      Well-prepared communities recover faster and suffer less damage from disasters.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Builds Resilience</h3>
                    <p className="text-sm">
                      Preparedness creates stronger, more self-reliant communities that can help each other.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
