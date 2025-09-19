import { Sidebar } from "@/components/sidebar"
import { FileText, Download, Scale, BookOpen } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function MandatePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <Sidebar />

          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Mandate & Legal Basis</h1>
                <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                  <Download className="h-4 w-4" />
                  Download Full Document
                </Button>
              </div>

              <div className="prose max-w-none">
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Scale className="h-6 w-6 text-mdrrmo-primary" />
                      Republic Act No. 10121
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <h3 className="text-lg font-semibold mb-4">
                      Philippine Disaster Risk Reduction and Management Act of 2010
                    </h3>
                    <p className="text-gray-700 mb-4">
                      This act provides for the development of policies and plans and the implementation of actions and
                      measures pertaining to all aspects of disaster risk reduction and management, including good
                      governance during times of disasters.
                    </p>
                    <h4 className="font-semibold mb-3">Key Mandates:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-mdrrmo-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Establish a comprehensive disaster risk reduction and management system
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-mdrrmo-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Develop and implement disaster risk reduction and management plans
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-mdrrmo-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Conduct disaster preparedness activities and public awareness campaigns
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-mdrrmo-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Coordinate disaster response and recovery operations
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-mdrrmo-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Maintain and operate multi-hazard early warning systems
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <BookOpen className="h-6 w-6 text-mdrrmo-primary" />
                      Local Government Code of 1991
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <h3 className="text-lg font-semibold mb-4">Republic Act No. 7160</h3>
                    <p className="text-gray-700 mb-4">
                      Empowers local government units to exercise general supervision over all programs and projects
                      relating to public safety and order within their jurisdiction.
                    </p>
                    <h4 className="font-semibold mb-3">Municipal Responsibilities:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-mdrrmo-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Ensure public safety and maintain peace and order
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-mdrrmo-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Provide emergency services and disaster response
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-mdrrmo-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Implement risk reduction measures and preparedness programs
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <FileText className="h-6 w-6 text-mdrrmo-primary" />
                      NDRRMC Memorandum Circulars
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold">MC No. 4, s. 2012</h4>
                        <p className="text-gray-700 text-sm">
                          Guidelines on the Establishment of Local Disaster Risk Reduction and Management Offices
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold">MC No. 5, s. 2013</h4>
                        <p className="text-gray-700 text-sm">
                          Implementing Guidelines on the Allocation and Utilization of the Local Disaster Risk Reduction
                          and Management Fund
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold">MC No. 1, s. 2014</h4>
                        <p className="text-gray-700 text-sm">
                          Updated Guidelines on the Roles and Responsibilities of Local Disaster Risk Reduction and
                          Management Offices
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="bg-blue-50 border-l-4 border-mdrrmo-primary p-6 rounded-r-lg">
                  <h3 className="text-lg font-semibold text-mdrrmo-primary mb-2">Legal Authority</h3>
                  <p className="text-gray-700">
                    The Municipal Disaster Risk Reduction and Management Office operates under the full authority of
                    these laws and regulations, ensuring compliance with national standards while addressing local
                    disaster risks and vulnerabilities.
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
