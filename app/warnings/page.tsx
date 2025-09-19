import { WarningsSidebar } from "@/components/warnings-sidebar"
import { AlertTriangle, CloudRain, Ban, Bold as Road, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const currentAlerts = [
  {
    id: 1,
    title: "Tropical Storm Warning",
    severity: "Critical",
    time: "2 hours ago",
    description: "Tropical Storm Signal #2 raised over Metro Manila and surrounding areas",
    category: "Weather",
  },
  {
    id: 2,
    title: "Flood Advisory",
    severity: "Warning",
    time: "4 hours ago",
    description: "Moderate to heavy flooding expected in low-lying areas",
    category: "Flood",
  },
  {
    id: 3,
    title: "Road Closure",
    severity: "Advisory",
    time: "6 hours ago",
    description: "Main Highway closed due to landslide, use alternate routes",
    category: "Infrastructure",
  },
]

const warningsAreas = [
  {
    title: "Latest Weather Bulletin",
    description: "Current weather updates and forecasts from PAGASA",
    icon: CloudRain,
    href: "/warnings/weather",
    color: "bg-blue-50 text-blue-700 border-blue-200",
    count: "3 active bulletins",
  },
  {
    title: "Emergency Alerts",
    description: "Critical emergency alerts and public safety announcements",
    icon: AlertTriangle,
    href: "/warnings/alerts",
    color: "bg-red-50 text-red-700 border-red-200",
    count: "2 critical alerts",
  },
  {
    title: "Class/Work Suspensions",
    description: "Official announcements on class and work suspensions",
    icon: Ban,
    href: "/warnings/suspensions",
    color: "bg-yellow-50 text-yellow-700 border-yellow-200",
    count: "1 active suspension",
  },
  {
    title: "Road & Infrastructure Status",
    description: "Real-time updates on road conditions and infrastructure",
    icon: Road,
    href: "/warnings/road-status",
    color: "bg-orange-50 text-orange-700 border-orange-200",
    count: "5 road updates",
  },
]

export default function WarningsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <WarningsSidebar />

          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="text-center mb-12">
                <div className="mdrrmo-response w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertTriangle className="h-10 w-10 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Warnings & Advisories</h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
                  Stay informed with real-time alerts, weather updates, and critical information to keep you and your
                  community safe during emergencies.
                </p>
              </div>

              {/* Current Active Alerts */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Active Alerts</h2>
                <div className="space-y-4">
                  {currentAlerts.map((alert) => (
                    <Card
                      key={alert.id}
                      className={`border-l-4 ${
                        alert.severity === "Critical"
                          ? "border-red-500 bg-red-50"
                          : alert.severity === "Warning"
                            ? "border-orange-500 bg-orange-50"
                            : "border-yellow-500 bg-yellow-50"
                      }`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">{alert.title}</h3>
                              <Badge
                                className={
                                  alert.severity === "Critical"
                                    ? "bg-red-600 text-white"
                                    : alert.severity === "Warning"
                                      ? "bg-orange-600 text-white"
                                      : "bg-yellow-600 text-white"
                                }
                              >
                                {alert.severity}
                              </Badge>
                              <Badge variant="outline">{alert.category}</Badge>
                            </div>
                            <p className="text-gray-700 mb-2">{alert.description}</p>
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="h-4 w-4 mr-1" />
                              {alert.time}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Warnings Categories */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {warningsAreas.map((area) => {
                  const Icon = area.icon
                  return (
                    <Link key={area.title} href={area.href}>
                      <Card
                        className={`h-full transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer border-2 ${area.color}`}
                      >
                        <CardHeader className="pb-4">
                          <div className="flex items-center justify-between mb-3">
                            <Icon className="h-12 w-12" />
                            <span className="text-sm font-medium opacity-75">{area.count}</span>
                          </div>
                          <CardTitle className="text-xl">{area.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-sm opacity-90">{area.description}</p>
                        </CardContent>
                      </Card>
                    </Link>
                  )
                })}
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                <h2 className="text-xl font-bold text-red-800 mb-3">Emergency Alert System</h2>
                <div className="text-red-700 space-y-2">
                  <p className="text-sm">
                    • Critical alerts are automatically pushed to the website banner and mobile notifications
                  </p>
                  <p className="text-sm">
                    • Weather bulletins are updated in real-time from PAGASA and local monitoring stations
                  </p>
                  <p className="text-sm">
                    • All alerts include severity levels, affected areas, and recommended actions
                  </p>
                  <p className="text-sm">• Subscribe to SMS alerts by texting MDRRMO SUBSCRIBE to 2600</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
