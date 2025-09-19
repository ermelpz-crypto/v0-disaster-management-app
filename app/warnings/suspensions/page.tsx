import { WarningsSidebar } from "@/components/warnings-sidebar"
import { Calendar, Clock, Building, GraduationCap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const suspensions = [
  {
    id: 1,
    title: "Classes and Work Suspended - January 15, 2024",
    date: "2024-01-15",
    issueTime: "2024-01-15 05:30 PST",
    authority: "Office of the Mayor",
    scope: "All Levels",
    affectedSectors: ["Public Schools", "Private Schools", "Government Offices", "Some Private Companies"],
    reason: "Tropical Storm Amang - Safety precaution due to expected heavy rainfall and strong winds",
    details:
      "All classes in public and private schools, and work in government offices are suspended for the entire day. Private companies are advised to implement flexible work arrangements.",
    isActive: true,
  },
  {
    id: 2,
    title: "Afternoon Classes Suspended - January 12, 2024",
    date: "2024-01-12",
    issueTime: "2024-01-12 11:00 PST",
    authority: "Department of Education - Division Office",
    scope: "Afternoon Classes Only",
    affectedSectors: ["Public Elementary Schools", "Public High Schools"],
    reason: "Heavy rainfall and flooding in several barangays",
    details:
      "Only afternoon classes in public elementary and high schools are suspended. Morning classes proceeded as scheduled. Private schools may implement their own policies.",
    isActive: false,
  },
  {
    id: 3,
    title: "Government Work Suspended - January 8, 2024",
    date: "2024-01-08",
    issueTime: "2024-01-08 06:00 PST",
    authority: "Office of the Mayor",
    scope: "Government Offices Only",
    affectedSectors: ["Municipal Government", "Barangay Offices", "Government Agencies"],
    reason: "Transport strike affecting public transportation",
    details:
      "Work in all government offices is suspended to ensure employee safety during the transport strike. Essential services remain operational with skeleton workforce.",
    isActive: false,
  },
  {
    id: 4,
    title: "Classes Suspended - December 20, 2023",
    date: "2023-12-20",
    issueTime: "2023-12-20 04:45 PST",
    authority: "Office of the Mayor",
    scope: "All Levels",
    affectedSectors: ["All Educational Institutions"],
    reason: "Typhoon Paolo - Signal No. 2 raised over the area",
    details:
      "All classes in all levels, both public and private institutions, are suspended due to Typhoon Paolo. Resumption of classes will be announced separately.",
    isActive: false,
  },
]

export default function SuspensionsPage() {
  const activeSuspensions = suspensions.filter((s) => s.isActive)
  const pastSuspensions = suspensions.filter((s) => !s.isActive)

  const getScopeColor = (scope: string) => {
    switch (scope) {
      case "All Levels":
        return "bg-red-100 text-red-800"
      case "Government Offices Only":
        return "bg-blue-100 text-blue-800"
      case "Afternoon Classes Only":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <WarningsSidebar />

          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-8">Suspension of Classes/Work</h1>

              {/* Active Suspensions */}
              {activeSuspensions.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-red-800 mb-6">Current Suspensions</h2>
                  <div className="space-y-6">
                    {activeSuspensions.map((suspension) => (
                      <Card key={suspension.id} className="border-l-4 border-red-500 bg-red-50">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-xl text-red-800 mb-3">{suspension.title}</CardTitle>
                              <div className="flex items-center gap-4 text-sm text-red-700 mb-2">
                                <Badge className="bg-red-600 text-white">ACTIVE</Badge>
                                <Badge className={getScopeColor(suspension.scope)}>{suspension.scope}</Badge>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-red-600">
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  Announced: {suspension.issueTime}
                                </div>
                                <div className="flex items-center">
                                  <Building className="h-4 w-4 mr-1" />
                                  Authority: {suspension.authority}
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="mb-4">
                            <h4 className="font-semibold text-red-800 mb-2">Reason:</h4>
                            <p className="text-red-700">{suspension.reason}</p>
                          </div>

                          <div className="mb-4">
                            <h4 className="font-semibold text-red-800 mb-2">Details:</h4>
                            <p className="text-red-700 leading-relaxed">{suspension.details}</p>
                          </div>

                          <div>
                            <h4 className="font-semibold text-red-800 mb-2">Affected Sectors:</h4>
                            <div className="flex flex-wrap gap-2">
                              {suspension.affectedSectors.map((sector, index) => (
                                <Badge key={index} variant="outline" className="border-red-300 text-red-700">
                                  {sector}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Past Suspensions */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Suspension Announcements</h2>
                <div className="space-y-4">
                  {pastSuspensions.map((suspension) => (
                    <Card key={suspension.id} className="hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">{suspension.title}</h3>
                              <Badge className={getScopeColor(suspension.scope)}>{suspension.scope}</Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {new Date(suspension.date).toLocaleDateString("en-US", {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </div>
                              <div className="flex items-center">
                                <Building className="h-4 w-4 mr-1" />
                                {suspension.authority}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Reason:</h4>
                            <p className="text-gray-700 text-sm">{suspension.reason}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Affected Sectors:</h4>
                            <div className="flex flex-wrap gap-1">
                              {suspension.affectedSectors.map((sector, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {sector}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-600 text-sm leading-relaxed">{suspension.details}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {activeSuspensions.length === 0 && (
                <div className="text-center py-12 mb-8">
                  <GraduationCap className="h-16 w-16 text-green-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-green-700 mb-2">No Current Suspensions</h3>
                  <p className="text-green-600">Classes and work are proceeding as normal today.</p>
                </div>
              )}

              <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">Suspension Guidelines</h3>
                <div className="text-blue-700 space-y-2">
                  <p className="text-sm">
                    • Suspension announcements are typically made early morning (5:00-6:00 AM) for the entire day
                  </p>
                  <p className="text-sm">
                    • Partial suspensions (afternoon only) may be announced by 11:00 AM based on developing conditions
                  </p>
                  <p className="text-sm">
                    • Private institutions may implement their own policies but are encouraged to follow government
                    advisories
                  </p>
                  <p className="text-sm">
                    • Essential services and emergency personnel remain operational during suspensions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
