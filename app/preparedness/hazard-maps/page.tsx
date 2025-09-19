"use client"

import { PreparednessSidebar } from "@/components/preparedness-sidebar"
import { useState } from "react"
import { Map, Layers, Info, Download } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const hazardLayers = [
  {
    id: "flood",
    name: "Flood Risk",
    color: "bg-blue-500",
    description: "Areas prone to flooding during heavy rainfall and typhoons",
    active: true,
  },
  {
    id: "landslide",
    name: "Landslide Risk",
    color: "bg-orange-500",
    description: "Steep slopes and areas susceptible to landslides",
    active: false,
  },
  {
    id: "storm-surge",
    name: "Storm Surge",
    color: "bg-purple-500",
    description: "Coastal areas at risk of storm surge during typhoons",
    active: false,
  },
  {
    id: "earthquake",
    name: "Earthquake Fault Lines",
    color: "bg-red-500",
    description: "Known fault lines and seismic activity zones",
    active: false,
  },
]

export default function HazardMapsPage() {
  const [activeLayers, setActiveLayers] = useState<Set<string>>(new Set(["flood"]))

  const toggleLayer = (layerId: string) => {
    const newActiveLayers = new Set(activeLayers)
    if (newActiveLayers.has(layerId)) {
      newActiveLayers.delete(layerId)
    } else {
      newActiveLayers.add(layerId)
    }
    setActiveLayers(newActiveLayers)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <PreparednessSidebar />

          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Hazard Maps</h1>
                <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                  <Download className="h-4 w-4" />
                  Download Maps
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Map Controls */}
                <div className="lg:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Layers className="h-5 w-5" />
                        Map Layers
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {hazardLayers.map((layer) => (
                        <div key={layer.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className={`w-4 h-4 rounded ${layer.color}`}></div>
                              <span className="text-sm font-medium">{layer.name}</span>
                            </div>
                            <Button
                              variant={activeLayers.has(layer.id) ? "default" : "outline"}
                              size="sm"
                              onClick={() => toggleLayer(layer.id)}
                              className="h-6 px-2 text-xs"
                            >
                              {activeLayers.has(layer.id) ? "ON" : "OFF"}
                            </Button>
                          </div>
                          <p className="text-xs text-gray-600">{layer.description}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="mt-4">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Info className="h-5 w-5" />
                        Legend
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-red-600 rounded"></div>
                          <span className="text-xs">High Risk</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                          <span className="text-xs">Medium Risk</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-green-500 rounded"></div>
                          <span className="text-xs">Low Risk</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Interactive Map */}
                <div className="lg:col-span-3">
                  <Card className="h-[600px]">
                    <CardContent className="p-0 h-full">
                      <div className="relative h-full bg-gray-100 rounded-lg overflow-hidden">
                        {/* Placeholder for interactive map */}
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
                          <div className="text-center">
                            <Map className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-600 mb-2">Interactive Hazard Map</h3>
                            <p className="text-gray-500 max-w-md">
                              This interactive map shows various hazard zones in our municipality. Use the layer
                              controls to view different types of risks.
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2 justify-center">
                              {Array.from(activeLayers).map((layerId) => {
                                const layer = hazardLayers.find((l) => l.id === layerId)
                                return layer ? (
                                  <Badge key={layerId} variant="secondary" className="text-xs">
                                    {layer.name} Active
                                  </Badge>
                                ) : null
                              })}
                            </div>
                          </div>
                        </div>

                        {/* Simulated map overlay elements */}
                        {activeLayers.has("flood") && (
                          <div className="absolute top-20 left-20 w-32 h-24 bg-blue-500 opacity-30 rounded-lg"></div>
                        )}
                        {activeLayers.has("landslide") && (
                          <div className="absolute bottom-32 right-24 w-28 h-20 bg-orange-500 opacity-30 rounded-lg"></div>
                        )}
                        {activeLayers.has("storm-surge") && (
                          <div className="absolute top-32 right-32 w-36 h-16 bg-purple-500 opacity-30 rounded-lg"></div>
                        )}
                        {activeLayers.has("earthquake") && (
                          <div className="absolute bottom-20 left-32 w-40 h-4 bg-red-500 opacity-50 rounded-full transform rotate-45"></div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="mt-8 bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                <h3 className="text-lg font-semibold text-red-800 mb-3">Important Disclaimer</h3>
                <div className="text-red-700 space-y-2">
                  <p className="text-sm">
                    • These hazard maps are for general planning purposes only and should not be used for site-specific
                    decisions.
                  </p>
                  <p className="text-sm">
                    • Actual hazard conditions may vary and can change over time due to development, climate change, and
                    other factors.
                  </p>
                  <p className="text-sm">
                    • For detailed risk assessments, consult with qualified professionals and local authorities.
                  </p>
                  <p className="text-sm">
                    • Maps are updated regularly based on the latest available data and scientific studies.
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
