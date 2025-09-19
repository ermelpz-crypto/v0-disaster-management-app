import { FileText, Download, Search, Calendar, Users, HelpCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const documentCategories = [
  {
    name: "Emergency Procedures",
    count: 15,
    color: "red",
    documents: [
      { title: "Earthquake Response Protocol", type: "PDF", size: "2.3 MB", downloads: 1250 },
      { title: "Fire Safety Guidelines", type: "PDF", size: "1.8 MB", downloads: 980 },
      { title: "Flood Evacuation Procedures", type: "PDF", size: "3.1 MB", downloads: 1450 },
    ],
  },
  {
    name: "Preparedness Guides",
    count: 12,
    color: "blue",
    documents: [
      { title: "Family Emergency Plan Template", type: "PDF", size: "1.2 MB", downloads: 2100 },
      { title: "Go-Bag Checklist", type: "PDF", size: "0.8 MB", downloads: 1800 },
      { title: "Home Safety Assessment", type: "PDF", size: "2.0 MB", downloads: 750 },
    ],
  },
  {
    name: "Training Materials",
    count: 8,
    color: "green",
    documents: [
      { title: "First Aid Training Manual", type: "PDF", size: "5.2 MB", downloads: 650 },
      { title: "CPR Guidelines", type: "PDF", size: "1.5 MB", downloads: 890 },
      { title: "Community Response Training", type: "PDF", size: "3.8 MB", downloads: 420 },
    ],
  },
]

const faqs = [
  {
    question: "What should I do during an earthquake?",
    answer:
      "Drop, Cover, and Hold On. Get under a sturdy desk or table, cover your head and neck, and hold on until shaking stops. If outdoors, move away from buildings and power lines.",
  },
  {
    question: "How do I prepare an emergency kit?",
    answer:
      "Include water (1 gallon per person per day), non-perishable food, flashlight, battery-powered radio, first aid kit, medications, and important documents in waterproof containers.",
  },
  {
    question: "When should I evacuate my home?",
    answer:
      "Evacuate immediately when ordered by authorities, when you feel unsafe, or when facing immediate threats like fire, flooding, or structural damage to your home.",
  },
  {
    question: "How can I stay informed during emergencies?",
    answer:
      "Monitor local radio, TV, and official social media accounts. Sign up for emergency alerts and keep a battery-powered or hand-crank radio for power outages.",
  },
]

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-mdrrmo-primary mb-4">Resources</h1>
          <p className="text-gray-600 text-lg">
            Access emergency procedures, preparedness guides, training materials, and frequently asked questions.
          </p>
        </div>

        {/* Search Bar */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Search documents, guides, and resources..." className="pl-10" />
              </div>
              <Button>Search</Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Document Library */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Document Library
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {documentCategories.map((category, index) => (
                    <div key={index}>
                      <div className="flex items-center gap-3 mb-4">
                        <h3 className="text-lg font-semibold">{category.name}</h3>
                        <Badge variant="secondary">{category.count} documents</Badge>
                      </div>
                      <div className="space-y-3">
                        {category.documents.map((doc, docIndex) => (
                          <div
                            key={docIndex}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-10 h-10 bg-${category.color}-100 rounded-lg flex items-center justify-center`}
                              >
                                <FileText className={`w-5 h-5 text-${category.color}-600`} />
                              </div>
                              <div>
                                <div className="font-medium">{doc.title}</div>
                                <div className="text-sm text-gray-600">
                                  {doc.type} • {doc.size} • {doc.downloads} downloads
                                </div>
                              </div>
                            </div>
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        ))}
                      </div>
                      <div className="text-center mt-4">
                        <Button variant="ghost" className={`text-${category.color}-600`}>
                          View All {category.name}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Link
                    href="/preparedness/family-plan"
                    className="block p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <div className="font-medium text-blue-800">Family Emergency Plan</div>
                    <div className="text-sm text-blue-600">Create your personalized plan</div>
                  </Link>
                  <Link
                    href="/preparedness/go-bag"
                    className="block p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <div className="font-medium text-green-800">Go-Bag Checklist</div>
                    <div className="text-sm text-green-600">Interactive preparation guide</div>
                  </Link>
                  <Link
                    href="/preparedness/hazard-maps"
                    className="block p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
                  >
                    <div className="font-medium text-orange-800">Hazard Maps</div>
                    <div className="text-sm text-orange-600">View local risk areas</div>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Recent Updates */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Recent Updates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm">
                    <div className="font-medium">New Flood Response Protocol</div>
                    <div className="text-gray-600">Updated evacuation procedures</div>
                    <div className="text-xs text-gray-500">2 days ago</div>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">First Aid Training Manual</div>
                    <div className="text-gray-600">Revised CPR guidelines included</div>
                    <div className="text-xs text-gray-500">1 week ago</div>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">Emergency Contact Directory</div>
                    <div className="text-gray-600">Updated hotline numbers</div>
                    <div className="text-xs text-gray-500">2 weeks ago</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Get Involved */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Get Involved
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full bg-transparent" variant="outline">
                    Volunteer Registration
                  </Button>
                  <Button className="w-full bg-transparent" variant="outline">
                    Community Training
                  </Button>
                  <Button className="w-full bg-transparent" variant="outline">
                    Partnership Opportunities
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5" />
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                  <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <Button variant="outline">View All FAQs</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
