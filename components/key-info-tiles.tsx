import Link from "next/link"
import { Phone, CloudRain, AlertTriangle, MapPin, FileText } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const keyInfoItems = [
  {
    title: "Emergency Hotlines",
    description: "Get immediate help",
    icon: Phone,
    href: "/response/hotlines",
    priority: "high",
    className: "md:col-span-2 mdrrmo-response text-white",
  },
  {
    title: "Latest Weather Bulletin",
    description: "Current weather updates",
    icon: CloudRain,
    href: "/warnings/weather",
    priority: "medium",
    className: "bg-blue-50 text-blue-900 border-blue-200",
  },
  {
    title: "Active Emergency Alerts",
    description: "Critical announcements",
    icon: AlertTriangle,
    href: "/warnings/alerts",
    priority: "high",
    className: "bg-red-50 text-red-900 border-red-200",
  },
  {
    title: "Evacuation Centers",
    description: "Find safe locations",
    icon: MapPin,
    href: "/response/evacuation-centers",
    priority: "medium",
    className: "bg-green-50 text-green-900 border-green-200",
  },
  {
    title: "Report an Incident",
    description: "Submit emergency reports",
    icon: FileText,
    href: "/response/report",
    priority: "medium",
    className: "bg-yellow-50 text-yellow-900 border-yellow-200",
  },
]

export function KeyInfoTiles() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Access</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Access critical information and services quickly during emergencies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {keyInfoItems.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.title} href={item.href}>
                <Card
                  className={`h-full transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer border-2 ${item.className}`}
                >
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-4">
                      <Icon className="h-12 w-12" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-sm opacity-90">{item.description}</p>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
