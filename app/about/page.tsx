import { Sidebar } from "@/components/sidebar"
import { Target, Eye, Shield, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <Sidebar />

          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">About MDRRMO</h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
                  The Municipal Disaster Risk Reduction and Management Office is committed to building resilient
                  communities through comprehensive disaster preparedness, response, and recovery programs.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <Card className="border-l-4 border-mdrrmo-primary">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Target className="h-8 w-8 text-mdrrmo-primary mr-3" />
                      <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      To protect lives, property, and the environment through effective disaster risk reduction and
                      management strategies, ensuring our community is prepared, resilient, and capable of responding to
                      and recovering from disasters.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-mdrrmo-accent">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Eye className="h-8 w-8 text-yellow-600 mr-3" />
                      <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      A disaster-resilient municipality where every citizen is prepared, every community is protected,
                      and every response is swift and effective in safeguarding lives and promoting sustainable
                      development.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="mdrrmo-prevention w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Prevention</h3>
                  <p className="text-sm text-gray-600">Reducing disaster risks through planning and mitigation</p>
                </div>

                <div className="text-center">
                  <div className="mdrrmo-preparedness w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Preparedness</h3>
                  <p className="text-sm text-gray-600">Building capacity and readiness for effective response</p>
                </div>

                <div className="text-center">
                  <div className="mdrrmo-response w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Response</h3>
                  <p className="text-sm text-gray-600">Immediate actions to save lives and protect property</p>
                </div>

                <div className="text-center">
                  <div className="mdrrmo-recovery w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Recovery</h3>
                  <p className="text-sm text-gray-600">Restoring and rebuilding stronger communities</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
