import Link from "next/link"
import { Calendar, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const updates = [
  {
    id: 1,
    title: "New Flood Warning System Activated",
    excerpt: "Advanced sensors now monitor water levels in real-time across 15 critical areas in the municipality.",
    category: "Preparedness",
    date: "2024-01-15",
    href: "/preparedness/iec-materials",
  },
  {
    id: 2,
    title: "Emergency Drill Schedule for February",
    excerpt:
      "Monthly earthquake and fire drills scheduled for all barangays. Participation is mandatory for all residents.",
    category: "Warnings",
    date: "2024-01-12",
    href: "/warnings/alerts",
  },
  {
    id: 3,
    title: "Updated Evacuation Center Capacities",
    excerpt: "Three additional evacuation centers now operational with improved facilities and increased capacity.",
    category: "Response",
    date: "2024-01-10",
    href: "/response/evacuation-centers",
  },
  {
    id: 4,
    title: "Community Volunteer Training Program",
    excerpt: "Join our comprehensive disaster response training program. Next session starts February 1st.",
    category: "Get Involved",
    date: "2024-01-08",
    href: "/get-involved/volunteer",
  },
]

export function LatestUpdates() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest News & Updates</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay informed with the latest developments in disaster preparedness and response
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {updates.map((update) => (
            <Card key={update.id} className="h-full hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-mdrrmo-primary bg-blue-50 px-2 py-1 rounded-full">
                    {update.category}
                  </span>
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(update.date).toLocaleDateString()}
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight">
                  <Link href={update.href} className="hover:text-mdrrmo-primary transition-colors">
                    {update.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-gray-600 mb-4 text-pretty">{update.excerpt}</p>
                <Link href={update.href}>
                  <Button variant="ghost" size="sm" className="p-0 h-auto text-mdrrmo-primary hover:text-blue-700">
                    Read more
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/warnings">
              View All Updates
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
