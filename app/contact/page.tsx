"use client"

import { MapPin, Phone, Mail, Clock, Users, Building, Car } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

const officeLocations = [
  {
    name: "MDRRMO Main Office",
    address: "123 Municipal Hall Complex, Poblacion",
    phone: "(02) 8555-0100",
    email: "mdrrmo@municipality.gov.ph",
    hours: "Monday - Friday: 8:00 AM - 5:00 PM",
    services: ["Emergency Coordination", "Disaster Planning", "Training Programs"],
    coordinates: "14.5995° N, 120.9842° E",
  },
  {
    name: "Emergency Operations Center",
    address: "456 Emergency Response Building, Barangay San Juan",
    phone: "(02) 8999-1234",
    email: "eoc@municipality.gov.ph",
    hours: "24/7 Operations",
    services: ["Emergency Response", "Incident Command", "Real-time Monitoring"],
    coordinates: "14.6012° N, 120.9856° E",
  },
  {
    name: "Community Training Center",
    address: "789 Training Facility, Barangay Santa Maria",
    phone: "(02) 8555-0150",
    email: "training@municipality.gov.ph",
    hours: "Monday - Saturday: 7:00 AM - 6:00 PM",
    services: ["Public Training", "Workshops", "Community Programs"],
    coordinates: "14.5978° N, 120.9823° E",
  },
]

const keyPersonnel = [
  {
    name: "Dr. Maria Santos",
    position: "MDRRMO Officer",
    phone: "(02) 8555-0101",
    email: "maria.santos@municipality.gov.ph",
    department: "Administration",
  },
  {
    name: "Engr. Juan Dela Cruz",
    position: "Operations Chief",
    phone: "(02) 8555-0102",
    email: "juan.delacruz@municipality.gov.ph",
    department: "Operations",
  },
  {
    name: "Ms. Ana Rodriguez",
    position: "Training Coordinator",
    phone: "(02) 8555-0103",
    email: "ana.rodriguez@municipality.gov.ph",
    department: "Training & Education",
  },
  {
    name: "Mr. Carlos Mendoza",
    position: "Communications Officer",
    phone: "(02) 8555-0104",
    email: "carlos.mendoza@municipality.gov.ph",
    department: "Communications",
  },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-mdrrmo-primary mb-4">Contact Us</h1>
          <p className="text-gray-600 text-lg">
            Get in touch with our team for emergency assistance, information, or general inquiries.
          </p>
        </div>

        {/* Emergency Contact Banner */}
        <Card className="mb-8 bg-red-50 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-red-800 mb-2">Emergency Hotlines</h2>
                <p className="text-red-700">For immediate emergency assistance, call these numbers:</p>
              </div>
              <div className="flex gap-4">
                <Button size="lg" className="bg-red-600 hover:bg-red-700" onClick={() => window.open("tel:911")}>
                  <Phone className="w-4 h-4 mr-2" />
                  911
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-red-300 text-red-700 bg-transparent"
                  onClick={() => window.open("tel:(02)8999-1234")}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  MDRRMO
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Your first name" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Your last name" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="your.email@example.com" />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="Your contact number" />
                </div>

                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="What is this regarding?" />
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Please provide details about your inquiry or concern..."
                    rows={5}
                  />
                </div>

                <Button type="submit" className="w-full">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Office Locations */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Office Locations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {officeLocations.map((office, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <h3 className="font-semibold text-lg mb-2">{office.name}</h3>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                          <span>{office.address}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-500" />
                          <a href={`tel:${office.phone}`} className="text-blue-600 hover:underline">
                            {office.phone}
                          </a>
                        </div>

                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-500" />
                          <a href={`mailto:${office.email}`} className="text-blue-600 hover:underline">
                            {office.email}
                          </a>
                        </div>

                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span>{office.hours}</span>
                        </div>
                      </div>

                      <div className="mt-3">
                        <div className="text-sm font-medium mb-1">Services:</div>
                        <div className="flex flex-wrap gap-1">
                          {office.services.map((service, serviceIndex) => (
                            <span key={serviceIndex} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2 mt-3">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(`https://maps.google.com/?q=${office.coordinates}`)}
                        >
                          <MapPin className="w-4 h-4 mr-1" />
                          Directions
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => window.open(`tel:${office.phone}`)}>
                          <Phone className="w-4 h-4 mr-1" />
                          Call
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Key Personnel Directory */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Key Personnel Directory
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {keyPersonnel.map((person, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{person.name}</h3>
                      <p className="text-mdrrmo-primary font-medium">{person.position}</p>
                      <p className="text-sm text-gray-600">{person.department}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <a href={`tel:${person.phone}`} className="text-blue-600 hover:underline">
                        {person.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <a href={`mailto:${person.email}`} className="text-blue-600 hover:underline">
                        {person.email}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Map and Directions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Location & Directions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid lg:grid-cols-2 gap-6">
              <div>
                <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center mb-4">
                  <div className="text-center text-gray-600">
                    <MapPin className="w-12 h-12 mx-auto mb-2" />
                    <p>Interactive Map</p>
                    <p className="text-sm">MDRRMO Main Office Location</p>
                  </div>
                </div>
                <Button className="w-full bg-transparent" variant="outline">
                  <Car className="w-4 h-4 mr-2" />
                  Get Directions
                </Button>
              </div>

              <div>
                <h3 className="font-semibold mb-3">How to Reach Us</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <strong>By Public Transport:</strong>
                    <p className="text-gray-600">
                      Take Bus Route 101 or 205 to Municipal Hall stop. The MDRRMO office is located within the
                      Municipal Hall Complex.
                    </p>
                  </div>
                  <div>
                    <strong>By Private Vehicle:</strong>
                    <p className="text-gray-600">
                      Parking is available at the Municipal Hall parking area. Enter through the main gate and follow
                      signs to MDRRMO.
                    </p>
                  </div>
                  <div>
                    <strong>Landmarks:</strong>
                    <p className="text-gray-600">
                      Near Central Plaza, opposite the Public Market, beside the Municipal Library.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
