import { Sidebar } from "@/components/sidebar"
import { Mail, Phone, User } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const teamMembers = [
  {
    id: 1,
    name: "Dr. Maria Santos",
    position: "MDRRMO Officer-in-Charge",
    photo: "/professional-woman-doctor.png",
    bio: "Dr. Santos has over 15 years of experience in disaster management and public health. She holds a PhD in Disaster Risk Management and has led numerous community resilience programs.",
    email: "maria.santos@mdrrmo.gov.ph",
    phone: "+63 2 123-4567",
  },
  {
    id: 2,
    name: "Engr. Juan Dela Cruz",
    position: "Operations Manager",
    photo: "/professional-engineer.png",
    bio: "Engr. Dela Cruz specializes in emergency response operations and infrastructure assessment. He has coordinated disaster response efforts for over 10 years.",
    email: "juan.delacruz@mdrrmo.gov.ph",
    phone: "+63 2 123-4568",
  },
  {
    id: 3,
    name: "Ms. Ana Reyes",
    position: "Community Preparedness Coordinator",
    photo: "/professional-woman-coordinator.jpg",
    bio: "Ms. Reyes leads community education and preparedness programs. She has extensive experience in public information campaigns and volunteer coordination.",
    email: "ana.reyes@mdrrmo.gov.ph",
    phone: "+63 2 123-4569",
  },
  {
    id: 4,
    name: "Mr. Roberto Garcia",
    position: "Early Warning Systems Specialist",
    photo: "/professional-man-technician.jpg",
    bio: "Mr. Garcia manages the municipality's early warning systems and weather monitoring equipment. He has a background in meteorology and communications technology.",
    email: "roberto.garcia@mdrrmo.gov.ph",
    phone: "+63 2 123-4570",
  },
  {
    id: 5,
    name: "Ms. Carmen Lopez",
    position: "Risk Assessment Analyst",
    photo: "/professional-woman-analyst.jpg",
    bio: "Ms. Lopez conducts hazard mapping and vulnerability assessments. She holds a master's degree in Geography and specializes in GIS applications for disaster management.",
    email: "carmen.lopez@mdrrmo.gov.ph",
    phone: "+63 2 123-4571",
  },
  {
    id: 6,
    name: "Mr. David Tan",
    position: "Training and Capacity Building Officer",
    photo: "/professional-man-trainer.jpg",
    bio: "Mr. Tan develops and conducts training programs for emergency responders and community volunteers. He is a certified disaster management trainer.",
    email: "david.tan@mdrrmo.gov.ph",
    phone: "+63 2 123-4572",
  },
]

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <Sidebar />

          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-8">Our Team / Officials</h1>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamMembers.map((member) => (
                  <Card key={member.id} className="group hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="text-center mb-4">
                        <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                          <img
                            src={member.photo || "/placeholder.svg"}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                        <p className="text-mdrrmo-primary font-medium mb-3">{member.position}</p>
                      </div>

                      <div className="space-y-3">
                        <p className="text-sm text-gray-600 leading-relaxed">{member.bio}</p>

                        <div className="pt-3 border-t border-gray-100 space-y-2">
                          <div className="flex items-center text-sm text-gray-600">
                            <Mail className="h-4 w-4 mr-2 text-mdrrmo-primary" />
                            <a href={`mailto:${member.email}`} className="hover:text-mdrrmo-primary transition-colors">
                              {member.email}
                            </a>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Phone className="h-4 w-4 mr-2 text-mdrrmo-primary" />
                            <a href={`tel:${member.phone}`} className="hover:text-mdrrmo-primary transition-colors">
                              {member.phone}
                            </a>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-12 bg-gray-50 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Join Our Team</h2>
                <p className="text-gray-700 mb-6">
                  We are always looking for dedicated professionals to join our mission of building disaster-resilient
                  communities. If you have experience in disaster management, emergency response, or community
                  development, we'd love to hear from you.
                </p>
                <Button className="mdrrmo-primary text-white">
                  <User className="h-4 w-4 mr-2" />
                  View Career Opportunities
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
