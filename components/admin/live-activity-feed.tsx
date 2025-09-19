"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useRealtime } from "@/lib/hooks/use-realtime"
import { formatDistanceToNow } from "date-fns"
import { Activity, User, AlertTriangle, Package, FileText } from "lucide-react"

interface ActivityLog {
  id: string
  user_id: string
  action: string
  resource_type: string
  resource_id: string
  details: any
  created_at: string
  user_profiles?: {
    full_name: string
    role: string
  }
}

export function LiveActivityFeed() {
  const { data: activities, loading } = useRealtime<ActivityLog>("activity_logs", "", [])

  const getActivityIcon = (action: string, resourceType: string) => {
    if (action.includes("create")) return <FileText className="h-4 w-4 text-green-500" />
    if (action.includes("update")) return <Activity className="h-4 w-4 text-blue-500" />
    if (action.includes("delete")) return <AlertTriangle className="h-4 w-4 text-red-500" />

    switch (resourceType) {
      case "incident":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />
      case "resource":
        return <Package className="h-4 w-4 text-purple-500" />
      case "user":
        return <User className="h-4 w-4 text-blue-500" />
      default:
        return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  const getActionColor = (action: string) => {
    if (action.includes("create")) return "bg-green-100 text-green-800"
    if (action.includes("update")) return "bg-blue-100 text-blue-800"
    if (action.includes("delete")) return "bg-red-100 text-red-800"
    return "bg-gray-100 text-gray-800"
  }

  const formatAction = (action: string, resourceType: string) => {
    const actionMap: Record<string, string> = {
      create_incident: "Created incident",
      update_incident: "Updated incident",
      assign_incident: "Assigned incident",
      resolve_incident: "Resolved incident",
      create_resource: "Added resource",
      update_resource: "Updated resource",
      deploy_resource: "Deployed resource",
      create_user: "Created user",
      update_user: "Updated user",
      login: "Logged in",
      logout: "Logged out",
    }

    return actionMap[action] || `${action.replace("_", " ")} ${resourceType}`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Live Activity Feed
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-80">
          {loading ? (
            <div className="text-center text-sm text-muted-foreground py-8">Loading activities...</div>
          ) : activities.length === 0 ? (
            <div className="text-center text-sm text-muted-foreground py-8">No recent activities</div>
          ) : (
            <div className="space-y-3">
              {activities.slice(0, 20).map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50">
                  {getActivityIcon(activity.action, activity.resource_type)}
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{activity.user_profiles?.full_name || "Unknown User"}</p>
                      <Badge variant="outline" className={`text-xs ${getActionColor(activity.action)}`}>
                        {formatAction(activity.action, activity.resource_type)}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {activity.user_profiles?.role} •{" "}
                      {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
                    </p>
                    {activity.details && (
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {typeof activity.details === "string" ? activity.details : JSON.stringify(activity.details)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
