import { createClient } from "@/lib/supabase/server"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IncidentAnalytics } from "@/components/admin/analytics/incident-analytics"
import { ResourceAnalytics } from "@/components/admin/analytics/resource-analytics"
import { ResponseTimeAnalytics } from "@/components/admin/analytics/response-time-analytics"
import { OverviewMetrics } from "@/components/admin/analytics/overview-metrics"
import { TrendAnalysis } from "@/components/admin/analytics/trend-analysis"

export default async function AnalyticsPage() {
  const supabase = await createClient()

  // Fetch analytics data
  const [
    { data: incidents },
    { data: resources },
    { data: deployments },
    { data: evacuationCenters },
    { data: alerts },
    { data: trainingRecords },
  ] = await Promise.all([
    supabase.from("emergency_incidents").select("*"),
    supabase.from("resources").select("*"),
    supabase.from("resource_deployments").select("*"),
    supabase.from("evacuation_centers").select("*"),
    supabase.from("alerts").select("*"),
    supabase.from("training_records").select("*"),
  ])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
        <p className="text-gray-600">Comprehensive insights and performance metrics</p>
      </div>

      {/* Overview Metrics */}
      <OverviewMetrics
        incidents={incidents || []}
        resources={resources || []}
        deployments={deployments || []}
        evacuationCenters={evacuationCenters || []}
        alerts={alerts || []}
        trainingRecords={trainingRecords || []}
      />

      {/* Analytics Tabs */}
      <Tabs defaultValue="incidents" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="incidents">Incidents</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="response">Response Times</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="incidents" className="space-y-6">
          <IncidentAnalytics incidents={incidents || []} />
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <ResourceAnalytics resources={resources || []} deployments={deployments || []} />
        </TabsContent>

        <TabsContent value="response" className="space-y-6">
          <ResponseTimeAnalytics incidents={incidents || []} />
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <TrendAnalysis
            incidents={incidents || []}
            resources={resources || []}
            trainingRecords={trainingRecords || []}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
