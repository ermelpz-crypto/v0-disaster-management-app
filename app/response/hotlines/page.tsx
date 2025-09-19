"use client"

import ResponseSidebar from "@/components/response-sidebar"
import { Phone, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const emergencyHotlines = [
  {
    category: "Primary Emergency",
    color: "red",
    contacts: [
      {
        name: "MDRRMO Emergency Hotline",
        number: "911",
        available: "24/7",
        description: "Main emergency response line",
      },
      {
        name: "Fire Department",
        number: "116",
        available: "24/7",
        description: "Fire emergencies and rescue operations",
      },
      { name: "Police Emergency", number: "117", available: "24/7", description: "Police assistance and security" },
    ],
  },
  {
    category: "Medical Emergency",
    color: "blue",
    contacts: [
      {
        name: "Emergency Medical Services",
        number: "(02) 8711-9999",
        available: "24/7",
        description: "Ambulance and medical assistance",
      },
      {
        name: "Municipal Health Office",
        number: "(02) 8555-0123",
        available: "8AM-5PM",
        description: "Health consultations and medical support",
      },
      { name: "Red Cross Emergency", number: "143", available: "24/7", description: "Disaster response and first aid" },
    ],
  },
  {
    category: "Disaster Response",
    color: "orange",
    contacts: [
      {
        name: "MDRRMO Operations Center",
        number: "(02) 8999-1234",
        available: "24/7",
        description: "Disaster coordination and response",
      },
      {
        name: "Evacuation Assistance",
        number: "(02) 8999-5678",
        available: "24/7",
        description: "Evacuation center information and transport",
      },
      {
        name: "Relief Operations",
        number: "(02) 8999-9012",
        available: "24/7",
        description: "Relief goods and assistance requests",
      },
    ],
  },
  {
    category: "Utilities & Infrastructure",
    color: "green",
    contacts: [
      {
        name: "Power Outage Reporting",
        number: "16211",
        available: "24/7",
        description: "Electrical power interruptions",
      },
      {
        name: "Water Service Emergency",
        number: "1627",
        available: "24/7",
        description: "Water supply issues and leaks",
      },
      {
        name: "Road Clearing Operations",
        number: "(02) 8777-4567",
        available: "24/7",
        description: "Road blockages and clearing",
      },
    ],
  },
]

export default function HotlinesPage() {
  return (
    <div className="flex">
      <ResponseSidebar />
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-mdrrmo-primary mb-4">Emergency Hotlines</h1>
            <p className="text-gray-600 text-lg">
              24/7 emergency contact numbers for immediate assistance and response coordination.
            </p>
          </div>

          {/* Quick Dial Section */}
          <Card className="mb-8 bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
            <CardHeader>
              <CardTitle className="text-red-800 flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Quick Emergency Dial
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <Button
                  size="lg"
                  className="h-16 bg-red-600 hover:bg-red-700 text-xl font-bold"
                  onClick={() => window.open("tel:911")}
                >
                  911
                  <span className="block text-sm font-normal">Emergency</span>
                </Button>
                <Button
                  size="lg"
                  className="h-16 bg-orange-600 hover:bg-orange-700 text-xl font-bold"
                  onClick={() => window.open("tel:116")}
                >
                  116
                  <span className="block text-sm font-normal">Fire Dept</span>
                </Button>
                <Button
                  size="lg"
                  className="h-16 bg-blue-600 hover:bg-blue-700 text-xl font-bold"
                  onClick={() => window.open("tel:117")}
                >
                  117
                  <span className="block text-sm font-normal">Police</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Hotlines by Category */}
          <div className="space-y-8">
            {emergencyHotlines.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className={`text-${category.color}-700 flex items-center gap-2`}>
                    <div className={`w-3 h-3 bg-${category.color}-500 rounded-full`}></div>
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.contacts.map((contact, contactIndex) => (
                      <div
                        key={contactIndex}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(`tel:${contact.number}`)}
                            className="ml-2"
                          >
                            <Phone className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="text-2xl font-bold text-mdrrmo-primary mb-2">{contact.number}</div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <Clock className="w-4 h-4" />
                          {contact.available}
                        </div>
                        <p className="text-sm text-gray-600">{contact.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Important Notes */}
          <Card className="mt-8 bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-800">Important Reminders</CardTitle>
            </CardHeader>
            <CardContent className="text-blue-700">
              <ul className="space-y-2">
                <li>• Stay calm and speak clearly when calling emergency numbers</li>
                <li>• Provide your exact location and nature of emergency</li>
                <li>• Keep your phone line open for follow-up calls from responders</li>
                <li>• For non-emergency inquiries, use regular office hours numbers</li>
                <li>• Save these numbers in your phone for quick access during emergencies</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
