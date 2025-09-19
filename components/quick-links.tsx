import Link from "next/link"
import { Shield, AlertTriangle, Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const quickLinks = [
  {
    title: "PREPAREDNESS",
    description: "Learn how to prepare your family and community for disasters",
    icon: Shield,
    href: "/preparedness",
    color: "mdrrmo-preparedness",
  },
  {
    title: "WARNINGS",
    description: "Get real-time alerts and emergency advisories",
    icon: AlertTriangle,
    href: "/warnings",
    color: "mdrrmo-response",
  },
  {
    title: "GET INVOLVED",
    description: "Join our volunteer program and help build resilient communities",
    icon: Users,
    href: "/get-involved",
    color: "mdrrmo-recovery",
  },
]

export function QuickLinks() {
  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Take Action Today</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Disaster preparedness is everyone's responsibility. Start with these essential resources.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {quickLinks.map((link) => {
            const Icon = link.icon
            return (
              <div key={link.title} className="text-center group">
                <div
                  className={`w-20 h-20 ${link.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{link.title}</h3>
                <p className="text-gray-300 mb-6 text-pretty leading-relaxed">{link.description}</p>
                <Button
                  asChild
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-gray-900 bg-transparent"
                >
                  <Link href={link.href}>
                    Explore Now
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
