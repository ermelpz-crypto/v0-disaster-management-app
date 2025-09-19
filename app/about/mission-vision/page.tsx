import { Sidebar } from "@/components/sidebar"
import { Target, Eye, Heart, Shield } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function MissionVisionPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <Sidebar />

          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-8">Mission and Vision</h1>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <Card className="border-l-4 border-mdrrmo-primary">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <Target className="h-12 w-12 text-mdrrmo-primary mr-4" />
                      <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg mb-6">
                      To protect lives, property, and the environment through effective disaster risk reduction and
                      management strategies, ensuring our community is prepared, resilient, and capable of responding to
                      and recovering from disasters.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <Shield className="h-5 w-5 text-mdrrmo-primary mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Protect lives and property through proactive measures</span>
                      </div>
                      <div className="flex items-start">
                        <Shield className="h-5 w-5 text-mdrrmo-primary mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Build community resilience and preparedness</span>
                      </div>
                      <div className="flex items-start">
                        <Shield className="h-5 w-5 text-mdrrmo-primary mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Ensure effective disaster response and recovery</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-mdrrmo-accent">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <Eye className="h-12 w-12 text-yellow-600 mr-4" />
                      <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg mb-6">
                      A disaster-resilient municipality where every citizen is prepared, every community is protected,
                      and every response is swift and effective in safeguarding lives and promoting sustainable
                      development.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <Heart className="h-5 w-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Every citizen is disaster-prepared and informed</span>
                      </div>
                      <div className="flex items-start">
                        <Heart className="h-5 w-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Communities are resilient and self-reliant</span>
                      </div>
                      <div className="flex items-start">
                        <Heart className="h-5 w-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Sustainable development through risk reduction</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-gray-50 rounded-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Our Core Values</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="mdrrmo-prevention w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Integrity</h4>
                    <p className="text-sm text-gray-600">Acting with honesty and transparency in all our operations</p>
                  </div>
                  <div className="text-center">
                    <div className="mdrrmo-response w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Heart className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Compassion</h4>
                    <p className="text-sm text-gray-600">Serving with empathy and care for our community</p>
                  </div>
                  <div className="text-center">
                    <div className="mdrrmo-recovery w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Excellence</h4>
                    <p className="text-sm text-gray-600">Striving for the highest standards in disaster management</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
