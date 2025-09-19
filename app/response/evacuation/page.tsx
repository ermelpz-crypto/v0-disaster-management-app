"use client"

import ResponseSidebar from "@/components/response-sidebar"
import { MapPin, Users, Utensils, Wifi, Car, Phone } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const evacuationCenters = [
  {
    id: 1,
    name: "Central Elementary School",
    address: "123 Main Street, Poblacion",
    status: "Available",
    capacity: 500,
    currentOccupancy: 0,
    facilities: ["Restrooms", "Kitchen", "Medical Station", "WiFi", "Parking"],
    contact: "(02) 8555-0101",
    coordinates: "14.5995° N, 120.9842° E",
    lastUpdated: "2 hours ago",
  },
  {
    id: 2,
    name: "Municipal Gymnasium",
    address: "456 Sports Complex, Barangay San Juan",
    status: "Partially Occupied",
    capacity: 800,
    currentOccupancy: 150,
    facilities: ["Restrooms", "Kitchen", "Medical Station", "Shower Facilities", "Parking"],
    contact: "(02) 8555-0102",
    coordinates: "14.6012° N, 120.9856° E",
    lastUpdated: "1 hour ago",
  },
  {
    id: 3,
    name: "Community Center Hall",
    address: "789 Community Drive, Barangay Santa Maria",
    status: "Available",
    capacity: 300,
    currentOccupancy: 0,
    facilities: ["Restrooms", "Kitchen", "WiFi", "Parking"],
    contact: "(02) 8555-0103",
    coordinates: "14.5978° N, 120.9823° E",
    lastUpdated: "30 minutes ago",
  },
  {
    id: 4,
    name: "High School Auditorium",
    address: "321 Education Avenue, Barangay San Pedro",
    status: "Under Maintenance",
    capacity: 400,
    currentOccupancy: 0,
    facilities: ["Restrooms", "Kitchen", "Medical Station", "WiFi"],
    contact: "(02) 8555-0104",
    coordinates: "14.6034° N, 120.9867° E",
    lastUpdated: "4 hours ago",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Available":
      return "bg-green-100 text-green-800 border-green-200"
    case "Partially Occupied":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "Full":
      return "bg-red-100 text-red-800 border-red-200"
    case "Under Maintenance":
      return "bg-gray-100 text-gray-800 border-gray-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getFacilityIcon = (facility: string) => {
  switch (facility) {
    case "Restrooms":
      return "🚻"
    case "Kitchen":
      return <Utensils className="w-4 h-4" />
    case "Medical Station":
      return "🏥"
    case "WiFi":
      return <Wifi className="w-4 h-4" />
    case "Parking":
      return <Car className="w-4 h-4" />
    case "Shower Facilities":
      return "🚿"
    default:
      return "📍"
  }
}

export default function EvacuationPage() {
  return (
    <div className="flex">
      <ResponseSidebar />
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-mdrrmo-primary mb-4">Evacuation Centers</h1>
            <p className="text-gray-600 text-lg">
              Real-time information on evacuation centers, capacity, and available facilities.
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-600">3</div>
                <div className="text-sm text-gray-600">Available Centers</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-yellow-600">1</div>
                <div className="text-sm text-gray-600">Partially Occupied</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-blue-600">2,000</div>
                <div className="text-sm text-gray-600">Total Capacity</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-purple-600">150</div>
                <div className="text-sm text-gray-600">Current Occupants</div>
              </CardContent>
            </Card>
          </div>

          {/* Evacuation Centers List */}
          <div className="space-y-6">
            {evacuationCenters.map((center) => (
              <Card key={center.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl mb-2">{center.name}</CardTitle>
                      <div className="flex items-center gap-2 text-gray-600 mb-2">
                        <MapPin className="w-4 h-4" />
                        {center.address}
                      </div>
                    </div>
                    <Badge className={getStatusColor(center.status)}>{center.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Capacity Information */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Capacity
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Total Capacity:</span>
                          <span className="font-medium">{center.capacity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Current Occupancy:</span>
                          <span className="font-medium">{center.currentOccupancy}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Available Space:</span>
                          <span className="font-medium text-green-600">
                            {center.capacity - center.currentOccupancy}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${(center.currentOccupancy / center.capacity) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Facilities */}
                    <div>
                      <h4 className="font-semibold mb-3">Available Facilities</h4>
                      <div className="space-y-2">
                        {center.facilities.map((facility, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            {getFacilityIcon(facility)}
                            <span>{facility}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Contact & Location */}
                    <div>
                      <h4 className="font-semibold mb-3">Contact & Location</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-4 h-4" />
                          <a href={`tel:${center.contact}`} className="text-blue-600 hover:underline">
                            {center.contact}
                          </a>
                        </div>
                        <div className="flex items-start gap-2 text-sm">
                          <MapPin className="w-4 h-4 mt-0.5" />
                          <span className="text-gray-600">{center.coordinates}</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-2">Last updated: {center.lastUpdated}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
                    <Button
                      variant="outline"
                      onClick={() => window.open(`https://maps.google.com/?q=${center.coordinates}`)}
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      View on Map
                    </Button>
                    <Button variant="outline" onClick={() => window.open(`tel:${center.contact}`)}>
                      <Phone className="w-4 h-4 mr-2" />
                      Call Center
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Emergency Instructions */}
          <Card className="mt-8 bg-orange-50 border-orange-200">
            <CardHeader>
              <CardTitle className="text-orange-800">Evacuation Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="text-orange-700">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">What to Bring:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Important documents (IDs, insurance papers)</li>
                    <li>• Emergency supplies (water, food, medicines)</li>
                    <li>• Change of clothes and blankets</li>
                    <li>• Mobile phone and charger</li>
                    <li>• Cash and emergency contact list</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Upon Arrival:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Register at the evacuation center desk</li>
                    <li>• Follow center rules and regulations</li>
                    <li>• Cooperate with center management</li>
                    <li>• Report any medical needs immediately</li>
                    <li>• Keep your area clean and organized</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
