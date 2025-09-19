"use client"

import { WarningsSidebar } from "@/components/warnings-sidebar"
import { useState } from "react"
import { Bold as Road, MapPin, Clock, AlertTriangle, CheckCircle, XCircle, RefreshCw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

const roadStatus = [
  {
    id: 1,
    name: "Main Highway (KM 15-18)",
    status: "Impassable",
    lastUpdated: "2024-01-15 14:30 PST",
    reason: "Landslide blocking both lanes",
    alternateRoute: "Use Bypass Road via Barangay San Pedro",
    estimatedClearance: "6-8 hours",
    priority: "High",
    coordinates: { lat: 14.6091, lng: 121.0223 },
  },
  {
    id: 2,
    name: "Bridge Street Bridge",
    status: "One-Lane",
    lastUpdated: "2024-01-15 13:45 PST",
    reason: "Structural inspection ongoing",
    alternateRoute: "Use Old Bridge (2km detour)",
    estimatedClearance: "2-3 days",
    priority: "Medium",
    coordinates: { lat: 14.6101, lng: 121.0233 },
  },
  {
    id: 3,
    name: "Riverside Road (Barangay Centro)",
    status: "Impassable",
    lastUpdated: "2024-01-15 12:15 PST",
    reason: "Severe flooding (1.5m deep)",
    alternateRoute: "Use Main Street to Municipal Road",
    estimatedClearance: "Until flood subsides",
    priority: "High",
    coordinates: { lat: 14.6081, lng: 121.0213 },
  },
  {
    id: 4,
    name: "Mountain View Road",
    status: "Passable",
    lastUpdated: "2024-01-15 11:30 PST",
    reason: "Clear conditions",
    alternateRoute: "N/A",
    estimatedClearance: "N/A",
    priority: "Low",
    coordinates: { lat: 14.6121, lng: 121.0243 },
  },
  {
    id: 5,
    name: "Coastal Highway",
    status: "One-Lane",
    lastUpdated: "2024-01-15 10:00 PST",
    reason: "Road repair work in progress",
    alternateRoute: "Inland Route via Barangay Hills",
    estimatedClearance: "5 days",
    priority: "Medium",
    coordinates: { lat: 14.6071, lng: 121.0203 },
  },
  {
    id: 6,
    name: "School Zone Road",
    status: "Passable",
    lastUpdated: "2024-01-15 09:15 PST",
    reason: "Normal traffic flow",
    alternateRoute: "N/A",
    estimatedClearance: "N/A",
    priority: "Low",
    coordinates: { lat: 14.6111, lng: 121.0253 },
  },
]

export default function RoadStatusPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [lastRefresh, setLastRefresh] = useState(new Date())

  const filteredRoads = roadStatus.filter(
    (road) =>
      road.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      road.reason.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Passable":
        return "text-green-700 bg-green-100"
      case "One-Lane":
        return "text-yellow-700 bg-yellow-100"
      case "Impassable":
        return "text-red-700 bg-red-100"
      default:
        return "text-gray-700 bg-gray-100"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Passable":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "One-Lane":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case "Impassable":
        return <XCircle className="h-5 w-5 text-red-600" />
      default:
        return <Road className="h-5 w-5 text-gray-600" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-600 text-white"
      case "Medium":
        return "bg-orange-600 text-white"
      case "Low":
        return "bg-green-600 text-white"
      default:
        return "bg-gray-600 text-white"
    }
  }

  const refreshData = () => {
    setLastRefresh(new Date())
    // In real app, this would fetch fresh data from API
  }

  const statusCounts = {
    passable: roadStatus.filter((r) => r.status === "Passable").length,
    oneLane: roadStatus.filter((r) => r.status === "One-Lane").length,
    impassable: roadStatus.filter((r) => r.status === "Impassable").length,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <WarningsSidebar />

          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Road & Infrastructure Status</h1>
                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-600">Last updated: {lastRefresh.toLocaleTimeString()}</div>
                  <Button onClick={refreshData} variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </div>

              {/* Status Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Card className="border-l-4 border-green-500">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Passable Roads</p>
                        <p className="text-2xl font-bold text-green-700">{statusCounts.passable}</p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-yellow-500">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">One-Lane Traffic</p>
                        <p className="text-2xl font-bold text-yellow-700">{statusCounts.oneLane}</p>
                      </div>
                      <AlertTriangle className="h-8 w-8 text-yellow-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-red-500">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Impassable Roads</p>
                        <p className="text-2xl font-bold text-red-700">{statusCounts.impassable}</p>
                      </div>
                      <XCircle className="h-8 w-8 text-red-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Search */}
              <div className="mb-6">
                <Input
                  placeholder="Search roads or conditions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-md"
                />
              </div>

              {/* Interactive Map Placeholder */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Interactive Road Status Map
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-600 mb-2">Road Status Map</h3>
                      <p className="text-gray-500 max-w-md">
                        Interactive map showing real-time road conditions with color-coded status indicators. Click on
                        road markers for detailed information.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Road Status Table */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">Detailed Road Status</h2>

                {filteredRoads.map((road) => (
                  <Card key={road.id} className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            {getStatusIcon(road.status)}
                            <h3 className="text-lg font-semibold text-gray-900">{road.name}</h3>
                            <Badge className={getStatusColor(road.status)}>{road.status}</Badge>
                            <Badge className={getPriorityColor(road.priority)}>{road.priority} Priority</Badge>
                          </div>
                          <div className="flex items-center text-sm text-gray-600 mb-3">
                            <Clock className="h-4 w-4 mr-1" />
                            Last updated: {road.lastUpdated}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Current Condition:</h4>
                          <p className="text-gray-700 text-sm mb-3">{road.reason}</p>

                          {road.estimatedClearance !== "N/A" && (
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Estimated Clearance:</h4>
                              <p className="text-gray-700 text-sm">{road.estimatedClearance}</p>
                            </div>
                          )}
                        </div>

                        {road.alternateRoute !== "N/A" && (
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Alternate Route:</h4>
                            <p className="text-gray-700 text-sm">{road.alternateRoute}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredRoads.length === 0 && (
                <div className="text-center py-12">
                  <Road className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No roads found</h3>
                  <p className="text-gray-500">Try adjusting your search terms</p>
                </div>
              )}

              <div className="mt-8 bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg">
                <h3 className="text-lg font-semibold text-orange-800 mb-3">Road Status Information</h3>
                <div className="text-orange-700 space-y-2">
                  <p className="text-sm">• Road conditions are monitored 24/7 and updated in real-time</p>
                  <p className="text-sm">
                    • <strong>Passable:</strong> Normal traffic flow with no restrictions
                  </p>
                  <p className="text-sm">
                    • <strong>One-Lane:</strong> Reduced capacity, expect delays and follow traffic control
                  </p>
                  <p className="text-sm">
                    • <strong>Impassable:</strong> Road completely closed, use alternate routes only
                  </p>
                  <p className="text-sm">• Report road hazards or changes in conditions to MDRRMO: (02) 123-4567</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
