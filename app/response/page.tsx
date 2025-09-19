import ResponseSidebar from "@/components/response-sidebar"
import { Phone, MapPin, FileText, AlertTriangle, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ResponsePage() {
  return (
    <div className="flex">
      <ResponseSidebar />
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-mdrrmo-primary mb-4">Response & Recovery</h1>
            <p className="text-gray-600 text-lg">
              Immediate response tools and recovery resources for emergency situations.
            </p>
          </div>

          {/* Emergency Status Banner */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle className="w-6 h-6 text-red-600" />
              <h2 className="text-xl font-semibold text-red-800">Current Emergency Status</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 border border-red-100">
                <div className="text-2xl font-bold text-green-600">NORMAL</div>
                <div className="text-sm text-gray-600">Alert Level</div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-red-100">
                <div className="text-2xl font-bold text-blue-600">3</div>
                <div className="text-sm text-gray-600">Active Incidents</div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-red-100">
                <div className="text-2xl font-bold text-purple-600">12</div>
                <div className="text-sm text-gray-600">Response Teams</div>
              </div>
            </div>
          </div>

          {/* Quick Action Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="border-red-200 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Phone className="w-6 h-6 text-red-600" />
                  </div>
                  <CardTitle className="text-lg">Emergency Hotlines</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Access 24/7 emergency contact numbers and direct lines to response teams.
                </p>
                <Link href="/response/hotlines">
                  <Button className="w-full bg-red-600 hover:bg-red-700">View Hotlines</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">Evacuation Centers</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Find nearest evacuation centers with real-time capacity and facility information.
                </p>
                <Link href="/response/evacuation">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Find Centers</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-orange-200 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <FileText className="w-6 h-6 text-orange-600" />
                  </div>
                  <CardTitle className="text-lg">Report Incident</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Submit incident reports and request immediate assistance from response teams.
                </p>
                <Link href="/response/incident-report">
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">Report Now</Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-mdrrmo-primary" />
                <CardTitle>Recent Response Activities</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="font-medium">Medical Assistance Deployed</div>
                    <div className="text-sm text-gray-600">Emergency medical team dispatched to Barangay San Jose</div>
                    <div className="text-xs text-gray-500 mt-1">2 hours ago</div>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="font-medium">Evacuation Center Opened</div>
                    <div className="text-sm text-gray-600">
                      Central Elementary School activated as evacuation center
                    </div>
                    <div className="text-xs text-gray-500 mt-1">4 hours ago</div>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="font-medium">Relief Goods Distributed</div>
                    <div className="text-sm text-gray-600">
                      Food packs distributed to 150 families in affected areas
                    </div>
                    <div className="text-xs text-gray-500 mt-1">6 hours ago</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
