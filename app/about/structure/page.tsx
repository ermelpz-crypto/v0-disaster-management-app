import { Sidebar } from "@/components/sidebar"
import { Download, FileText, Users, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function StructurePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <Sidebar />

          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Organizational Structure</h1>
                <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                  <Download className="h-4 w-4" />
                  Download Org Chart
                </Button>
              </div>

              {/* Organizational Chart Image */}
              <div className="mb-8 bg-gray-50 rounded-lg p-8 text-center">
                <img
                  src="/organizational-chart-mdrrmo-structure.jpg"
                  alt="MDRRMO Organizational Structure"
                  className="max-w-full h-auto mx-auto rounded-lg shadow-sm"
                />
                <p className="text-sm text-gray-600 mt-4">
                  Click the download button above to get a high-resolution PDF version
                </p>
              </div>

              {/* Text-based Hierarchy for Accessibility */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Organizational Hierarchy</h2>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Building className="h-6 w-6 text-mdrrmo-primary" />
                      Executive Level
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="pl-4 border-l-4 border-mdrrmo-primary">
                        <h3 className="font-semibold text-lg">Municipal Mayor</h3>
                        <p className="text-gray-600">Chairperson, Municipal DRRM Council</p>
                      </div>
                      <div className="pl-4 border-l-4 border-gray-300">
                        <h3 className="font-semibold">MDRRMO Officer-in-Charge</h3>
                        <p className="text-gray-600">Dr. Maria Santos</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Users className="h-6 w-6 text-mdrrmo-primary" />
                      Management Level
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="pl-4 border-l-4 border-mdrrmo-prevention">
                        <h3 className="font-semibold">Operations Manager</h3>
                        <p className="text-gray-600">Engr. Juan Dela Cruz</p>
                        <p className="text-sm text-gray-500">Emergency Response & Coordination</p>
                      </div>
                      <div className="pl-4 border-l-4 border-mdrrmo-preparedness">
                        <h3 className="font-semibold">Community Preparedness Coordinator</h3>
                        <p className="text-gray-600">Ms. Ana Reyes</p>
                        <p className="text-sm text-gray-500">Public Education & Outreach</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <FileText className="h-6 w-6 text-mdrrmo-primary" />
                      Technical Level
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="pl-4 border-l-4 border-mdrrmo-response">
                        <h3 className="font-semibold text-sm">Early Warning Systems Specialist</h3>
                        <p className="text-gray-600 text-sm">Mr. Roberto Garcia</p>
                      </div>
                      <div className="pl-4 border-l-4 border-mdrrmo-recovery">
                        <h3 className="font-semibold text-sm">Risk Assessment Analyst</h3>
                        <p className="text-gray-600 text-sm">Ms. Carmen Lopez</p>
                      </div>
                      <div className="pl-4 border-l-4 border-mdrrmo-prevention">
                        <h3 className="font-semibold text-sm">Training Officer</h3>
                        <p className="text-gray-600 text-sm">Mr. David Tan</p>
                      </div>
                      <div className="pl-4 border-l-4 border-mdrrmo-preparedness">
                        <h3 className="font-semibold text-sm">Administrative Assistant</h3>
                        <p className="text-gray-600 text-sm">Ms. Lisa Cruz</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Users className="h-6 w-6 text-mdrrmo-primary" />
                      Support Units
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold mb-2">Emergency Response Team</h3>
                        <p className="text-sm text-gray-600">First responders and rescue personnel</p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold mb-2">Community Volunteers</h3>
                        <p className="text-sm text-gray-600">Trained community disaster volunteers</p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold mb-2">Partner Agencies</h3>
                        <p className="text-sm text-gray-600">Collaborating government and NGO partners</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
