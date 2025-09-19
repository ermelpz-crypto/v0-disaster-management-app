"use client"

import { WarningsSidebar } from "@/components/warnings-sidebar"
import { useState } from "react"
import { ExternalLink, RefreshCw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const weatherBulletins = [
  {
    id: 1,
    title: "Tropical Cyclone Bulletin #15",
    source: "PAGASA",
    issueTime: "2024-01-15 14:00 PST",
    validUntil: "2024-01-15 20:00 PST",
    summary:
      "Tropical Storm 'AMANG' maintains strength while moving westward. Signal No. 2 remains in effect over Metro Manila and nearby provinces.",
    details: {
      location: "18.5°N, 121.2°E",
      maxWinds: "85 km/h",
      gustiness: "105 km/h",
      movement: "West at 15 km/h",
      pressure: "990 hPa",
    },
    warnings: [
      "Moderate to heavy rainfall expected",
      "Possible flooding in low-lying areas",
      "Strong winds may damage light structures",
    ],
    isFeatured: true,
    externalLink: "https://pagasa.dost.gov.ph/bulletin/tropical-cyclone",
  },
  {
    id: 2,
    title: "Weather Advisory #8",
    source: "PAGASA",
    issueTime: "2024-01-15 11:00 PST",
    validUntil: "2024-01-15 17:00 PST",
    summary:
      "Southwest monsoon enhanced by Tropical Storm Amang brings scattered rainshowers and thunderstorms over Luzon.",
    details: {
      rainfall: "10-25mm/hour",
      visibility: "5-8 km",
      humidity: "85-95%",
      temperature: "24-28°C",
    },
    warnings: ["Possible flash floods in urban areas", "Reduced visibility during heavy rainfall"],
    isFeatured: false,
    externalLink: "https://pagasa.dost.gov.ph/advisory/weather",
  },
  {
    id: 3,
    title: "Rainfall Warning #3",
    source: "PAGASA",
    issueTime: "2024-01-15 08:30 PST",
    validUntil: "2024-01-15 14:30 PST",
    summary: "Yellow rainfall warning issued for Metro Manila. Moderate to heavy rainfall expected within 2-3 hours.",
    details: {
      expectedRainfall: "15-30mm within 3 hours",
      affectedAreas: "Metro Manila, Rizal, Bulacan",
      riskLevel: "Moderate",
    },
    warnings: ["Flooding possible in flood-prone areas", "Monitor local conditions closely"],
    isFeatured: false,
    externalLink: "https://pagasa.dost.gov.ph/warning/rainfall",
  },
]

export default function WeatherPage() {
  const [lastUpdated, setLastUpdated] = useState(new Date())

  const refreshData = () => {
    setLastUpdated(new Date())
    // In real app, this would fetch fresh data from API
  }

  const getWarningColor = (level: string) => {
    switch (level?.toLowerCase()) {
      case "red":
        return "bg-red-100 text-red-800 border-red-200"
      case "orange":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "yellow":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-blue-100 text-blue-800 border-blue-200"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <WarningsSidebar />

          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Latest Weather Bulletin</h1>
                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-600">Last updated: {lastUpdated.toLocaleTimeString()}</div>
                  <Button onClick={refreshData} variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </div>

              {/* Featured Bulletin */}
              {weatherBulletins
                .filter((b) => b.isFeatured)
                .map((bulletin) => (
                  <Card key={bulletin.id} className="mb-8 border-l-4 border-red-500 bg-red-50">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl text-red-800 mb-2">{bulletin.title}</CardTitle>
                          <div className="flex items-center gap-4 text-sm text-red-700">
                            <Badge className="bg-red-600 text-white">FEATURED</Badge>
                            <span>Source: {bulletin.source}</span>
                            <span>Issued: {bulletin.issueTime}</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <a href={bulletin.externalLink} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View Full Bulletin
                          </a>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-red-800 mb-6 text-lg leading-relaxed">{bulletin.summary}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h4 className="font-semibold text-red-800 mb-3">Current Conditions</h4>
                          <div className="space-y-2">
                            {Object.entries(bulletin.details).map(([key, value]) => (
                              <div key={key} className="flex justify-between text-sm">
                                <span className="capitalize text-red-700">{key.replace(/([A-Z])/g, " $1")}:</span>
                                <span className="font-medium text-red-800">{value}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-red-800 mb-3">Warnings & Advisories</h4>
                          <ul className="space-y-2">
                            {bulletin.warnings.map((warning, index) => (
                              <li key={index} className="flex items-start text-sm text-red-700">
                                <span className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                {warning}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="bg-red-100 rounded-lg p-4">
                        <p className="text-sm text-red-800">
                          <strong>Valid Until:</strong> {bulletin.validUntil}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}

              {/* Other Bulletins */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Recent Weather Bulletins</h2>

                {weatherBulletins
                  .filter((b) => !b.isFeatured)
                  .map((bulletin) => (
                    <Card key={bulletin.id} className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg mb-2">{bulletin.title}</CardTitle>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span>Source: {bulletin.source}</span>
                              <span>Issued: {bulletin.issueTime}</span>
                              <span>Valid until: {bulletin.validUntil}</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <a href={bulletin.externalLink} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View Full
                            </a>
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 mb-4">{bulletin.summary}</p>

                        {bulletin.warnings.length > 0 && (
                          <div className="mb-4">
                            <h4 className="font-semibold text-gray-900 mb-2">Key Warnings:</h4>
                            <ul className="space-y-1">
                              {bulletin.warnings.map((warning, index) => (
                                <li key={index} className="flex items-start text-sm text-gray-700">
                                  <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                  {warning}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          {Object.entries(bulletin.details)
                            .slice(0, 4)
                            .map(([key, value]) => (
                              <div key={key} className="text-center p-3 bg-gray-50 rounded-lg">
                                <div className="font-medium text-gray-900">{value}</div>
                                <div className="text-gray-600 capitalize text-xs mt-1">
                                  {key.replace(/([A-Z])/g, " $1")}
                                </div>
                              </div>
                            ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>

              <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">Weather Information Sources</h3>
                <div className="text-blue-700 space-y-2">
                  <p className="text-sm">
                    • Official weather bulletins are sourced directly from PAGASA (Philippine Atmospheric, Geophysical
                    and Astronomical Services Administration)
                  </p>
                  <p className="text-sm">
                    • Local weather monitoring stations provide additional real-time data for our municipality
                  </p>
                  <p className="text-sm">• Bulletins are updated automatically every 3 hours or as conditions change</p>
                  <p className="text-sm">
                    • For the most current information, always refer to official PAGASA bulletins
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
