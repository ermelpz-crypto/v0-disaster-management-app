"use client"

import type React from "react"

import ResponseSidebar from "@/components/response-sidebar"
import { AlertTriangle, MapPin, Phone, Clock, Camera, Send } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export default function IncidentReportPage() {
  const [formData, setFormData] = useState({
    incidentType: "",
    severity: "",
    location: "",
    description: "",
    reporterName: "",
    reporterContact: "",
    reporterEmail: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Incident report submitted:", formData)
    alert("Incident report submitted successfully. Emergency responders have been notified.")
  }

  return (
    <div className="flex">
      <ResponseSidebar />
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-mdrrmo-primary mb-4">Report Incident</h1>
            <p className="text-gray-600 text-lg">
              Submit incident reports for immediate response and assistance from emergency teams.
            </p>
          </div>

          {/* Emergency Notice */}
          <Card className="mb-8 bg-red-50 border-red-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                <h2 className="text-lg font-semibold text-red-800">Emergency Situations</h2>
              </div>
              <p className="text-red-700 mb-4">
                For immediate life-threatening emergencies, call <strong>911</strong> directly. Use this form for
                non-emergency incidents or to provide detailed follow-up information.
              </p>
              <div className="flex gap-3">
                <Button className="bg-red-600 hover:bg-red-700" onClick={() => window.open("tel:911")}>
                  <Phone className="w-4 h-4 mr-2" />
                  Call 911 Now
                </Button>
                <Button
                  variant="outline"
                  className="border-red-300 text-red-700 bg-transparent"
                  onClick={() => window.open("tel:(02)8999-1234")}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  MDRRMO Hotline
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Incident Report Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                Incident Report Form
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Incident Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="incidentType">Type of Incident *</Label>
                    <Select
                      value={formData.incidentType}
                      onValueChange={(value) => setFormData({ ...formData, incidentType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select incident type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fire">Fire</SelectItem>
                        <SelectItem value="flood">Flooding</SelectItem>
                        <SelectItem value="landslide">Landslide</SelectItem>
                        <SelectItem value="earthquake">Earthquake</SelectItem>
                        <SelectItem value="accident">Vehicle Accident</SelectItem>
                        <SelectItem value="medical">Medical Emergency</SelectItem>
                        <SelectItem value="infrastructure">Infrastructure Damage</SelectItem>
                        <SelectItem value="hazmat">Hazardous Materials</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="severity">Severity Level *</Label>
                    <Select
                      value={formData.severity}
                      onValueChange={(value) => setFormData({ ...formData, severity: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low - Minor incident, no immediate danger</SelectItem>
                        <SelectItem value="medium">Medium - Moderate risk, assistance needed</SelectItem>
                        <SelectItem value="high">High - Serious situation, urgent response required</SelectItem>
                        <SelectItem value="critical">Critical - Life-threatening emergency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Location */}
                <div>
                  <Label htmlFor="location">Incident Location *</Label>
                  <div className="flex gap-2">
                    <Input
                      id="location"
                      placeholder="Enter specific address or landmark"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="flex-1"
                      required
                    />
                    <Button type="button" variant="outline" size="icon">
                      <MapPin className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Be as specific as possible (street address, barangay, nearby landmarks)
                  </p>
                </div>

                {/* Description */}
                <div>
                  <Label htmlFor="description">Incident Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide detailed description of the incident, including what happened, when it occurred, number of people affected, and any immediate dangers..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={5}
                    required
                  />
                </div>

                {/* Photo Upload */}
                <div>
                  <Label>Photos/Evidence (Optional)</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 mb-2">Upload photos of the incident</p>
                    <Button type="button" variant="outline" size="sm">
                      Choose Files
                    </Button>
                    <p className="text-xs text-gray-500 mt-2">
                      Accepted formats: JPG, PNG, PDF. Max size: 10MB per file.
                    </p>
                  </div>
                </div>

                {/* Reporter Information */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Reporter Information</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="reporterName">Full Name *</Label>
                      <Input
                        id="reporterName"
                        placeholder="Your full name"
                        value={formData.reporterName}
                        onChange={(e) => setFormData({ ...formData, reporterName: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="reporterContact">Contact Number *</Label>
                      <Input
                        id="reporterContact"
                        placeholder="Your phone number"
                        value={formData.reporterContact}
                        onChange={(e) => setFormData({ ...formData, reporterContact: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <Label htmlFor="reporterEmail">Email Address (Optional)</Label>
                    <Input
                      id="reporterEmail"
                      type="email"
                      placeholder="Your email address for updates"
                      value={formData.reporterEmail}
                      onChange={(e) => setFormData({ ...formData, reporterEmail: e.target.value })}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-3 pt-6 border-t">
                  <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
                    <Send className="w-4 h-4 mr-2" />
                    Submit Report
                  </Button>
                  <Button type="button" variant="outline">
                    Save as Draft
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* What Happens Next */}
          <Card className="mt-8 bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-800 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                What Happens Next?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-blue-700">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <div className="font-medium">Immediate Acknowledgment</div>
                    <div className="text-sm">You'll receive a confirmation with your report reference number</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <div className="font-medium">Assessment & Dispatch</div>
                    <div className="text-sm">
                      Our team will assess the situation and dispatch appropriate responders
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <div className="font-medium">Response & Updates</div>
                    <div className="text-sm">
                      You'll receive updates on the response status and any follow-up actions
                    </div>
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
