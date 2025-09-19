"use client"

import { WarningsSidebar } from "@/components/warnings-sidebar"
import { useState } from "react"
import { AlertTriangle, Clock, MapPin, Users, Archive } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const emergencyAlerts = [
  {
    id: 1,
    title: "IMMEDIATE EVACUATION REQUIRED",
    severity: "Critical",
    category: "Evacuation",
    issueTime: "2024-01-15 13:30 PST",
    expiryTime: "2024-01-15 18:00 PST",
    affectedAreas: ["Barangay San Miguel", "Barangay Santa Cruz", "Barangay San Jose"],
    description:
      "Due to rising water levels in the Marikina River, immediate evacuation is ordered for all residents in flood-prone areas. Proceed to designated evacuation centers immediately.",
    instructions: [
      "Evacuate immediately to the nearest evacuation center",
      "Bring essential items: documents, medicines, water, food",
      "Follow evacuation routes posted in your barangay",
      "Do not attempt to cross flooded roads",
    ],
    contactInfo: "Emergency Hotline: 8888-0000",
    isActive: true,
    pushToGlobal: true,
  },
  {
    id: 2,
    title: "Landslide Warning - Hillside Communities",
    severity: "Warning",
    category: "Landslide",
    issueTime: "2024-01-15 10:15 PST",
    expiryTime: "2024-01-16 06:00 PST",
    affectedAreas: ["Barangay Hillcrest", "Barangay Mountain View"],
    description:
      "Continuous heavy rainfall has saturated soil conditions. Residents in hillside areas are advised to be on high alert for possible landslides.",
    instructions: [
      "Monitor local conditions closely",
      "Prepare emergency kits and evacuation plans",
      "Report any signs of ground movement immediately",
      "Avoid areas near steep slopes during heavy rain",
    ],
    contactInfo: "MDRRMO: (02) 123-4567",
    isActive: true,
    pushToGlobal: false,
  },
  {
    id: 3,
    title: "Power Line Down - Safety Advisory",
    severity: "Advisory",
    category: "Infrastructure",
    issueTime: "2024-01-15 08:45 PST",
    expiryTime: "2024-01-15 16:00 PST",
    affectedAreas: ["Barangay Centro", "Main Street vicinity"],
    description:
      "A power line is down on Main Street near the municipal hall due to strong winds. Area is cordoned off for public safety.",
    instructions: [
      "Avoid the cordoned area on Main Street",
      "Use alternate routes for transportation",
      "Do not touch or approach downed power lines",
      "Report any additional downed lines immediately",
    ],
    contactInfo: "Meralco: 16211, MDRRMO: (02) 123-4567",
    isActive: true,
    pushToGlobal: false,
  },
]

const archivedAlerts = [
  {
    id: 4,
    title: "Flash Flood Warning - Downtown Area",
    severity: "Warning",
    category: "Flood",
    issueTime: "2024-01-14 15:20 PST",
    expiryTime: "2024-01-14 21:00 PST",
    status: "Expired",
    description: "Flash flood warning issued for downtown commercial area due to heavy rainfall.",
  },
  {
    id: 5,
    title: "Strong Wind Advisory",
    severity: "Advisory",
    category: "Weather",
    issueTime: "2024-01-13 12:00 PST",
    expiryTime: "2024-01-13 18:00 PST",
    status: "Resolved",
    description: "Strong winds expected due to enhanced southwest monsoon.",
  },
]

export default function AlertsPage() {
  const [filterSeverity, setFilterSeverity] = useState("All")
  const [showArchived, setShowArchived] = useState(false)

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "bg-red-600 text-white"
      case "Warning":
        return "bg-orange-600 text-white"
      case "Advisory":
        return "bg-yellow-600 text-white"
      default:
        return "bg-gray-600 text-white"
    }
  }

  const getSeverityBorderColor = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "border-red-500 bg-red-50"
      case "Warning":
        return "border-orange-500 bg-orange-50"
      case "Advisory":
        return "border-yellow-500 bg-yellow-50"
      default:
        return "border-gray-500 bg-gray-50"
    }
  }

  const filteredAlerts = emergencyAlerts.filter(
    (alert) => filterSeverity === "All" || alert.severity === filterSeverity,
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <WarningsSidebar />

          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Emergency Alerts</h1>
                <div className="flex items-center gap-4">
                  <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Severities</SelectItem>
                      <SelectItem value="Critical">Critical</SelectItem>
                      <SelectItem value="Warning">Warning</SelectItem>
                      <SelectItem value="Advisory">Advisory</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant={showArchived ? "default" : "outline"} onClick={() => setShowArchived(!showArchived)}>
                    <Archive className="h-4 w-4 mr-2" />
                    {showArchived ? "Show Active" : "Show Archived"}
                  </Button>
                </div>
              </div>

              {!showArchived ? (
                <>
                  {/* Active Alerts */}
                  <div className="space-y-6">
                    {filteredAlerts.length === 0 ? (
                      <div className="text-center py-12">
                        <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-600 mb-2">No active alerts</h3>
                        <p className="text-gray-500">There are currently no emergency alerts matching your filter.</p>
                      </div>
                    ) : (
                      filteredAlerts.map((alert) => (
                        <Card key={alert.id} className={`border-l-4 ${getSeverityBorderColor(alert.severity)}`}>
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                  <Badge className={getSeverityColor(alert.severity)}>{alert.severity}</Badge>
                                  <Badge variant="outline">{alert.category}</Badge>
                                  {alert.pushToGlobal && (
                                    <Badge className="bg-purple-600 text-white">GLOBAL BANNER</Badge>
                                  )}
                                </div>
                                <CardTitle className="text-xl mb-2">{alert.title}</CardTitle>
                                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                                  <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-1" />
                                    Issued: {alert.issueTime}
                                  </div>
                                  <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-1" />
                                    Expires: {alert.expiryTime}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-700 mb-4 text-lg leading-relaxed">{alert.description}</p>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                  <MapPin className="h-4 w-4 mr-2" />
                                  Affected Areas
                                </h4>
                                <ul className="space-y-1">
                                  {alert.affectedAreas.map((area, index) => (
                                    <li key={index} className="text-sm text-gray-700 flex items-center">
                                      <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                                      {area}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                  <Users className="h-4 w-4 mr-2" />
                                  Instructions
                                </h4>
                                <ul className="space-y-2">
                                  {alert.instructions.map((instruction, index) => (
                                    <li key={index} className="text-sm text-gray-700 flex items-start">
                                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                      {instruction}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            <div
                              className={`rounded-lg p-4 ${
                                alert.severity === "Critical"
                                  ? "bg-red-100"
                                  : alert.severity === "Warning"
                                    ? "bg-orange-100"
                                    : "bg-yellow-100"
                              }`}
                            >
                              <p className="text-sm font-medium">
                                <strong>Emergency Contact:</strong> {alert.contactInfo}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </>
              ) : (
                <>
                  {/* Archived Alerts */}
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-gray-900">Archived Alerts</h2>
                    {archivedAlerts.map((alert) => (
                      <Card key={alert.id} className="opacity-75">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <Badge className={getSeverityColor(alert.severity)}>{alert.severity}</Badge>
                                <Badge variant="outline">{alert.category}</Badge>
                                <Badge variant="secondary">{alert.status}</Badge>
                              </div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">{alert.title}</h3>
                              <p className="text-gray-600 mb-2">{alert.description}</p>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span>Issued: {alert.issueTime}</span>
                                <span>Expired: {alert.expiryTime}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </>
              )}

              <div className="mt-8 bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                <h3 className="text-lg font-semibold text-red-800 mb-3">Alert System Information</h3>
                <div className="text-red-700 space-y-2">
                  <p className="text-sm">
                    • <strong>Critical alerts</strong> are automatically displayed on the website banner and sent via
                    SMS
                  </p>
                  <p className="text-sm">
                    • <strong>Warning alerts</strong> require immediate attention and preparation
                  </p>
                  <p className="text-sm">
                    • <strong>Advisory alerts</strong> provide important information for situational awareness
                  </p>
                  <p className="text-sm">
                    • All alerts include expiration times and are automatically archived when expired
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
