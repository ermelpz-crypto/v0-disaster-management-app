"use client"

import { useEffect, useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import type { RealtimeChannel } from "@supabase/supabase-js"

export function useRealtime<T>(table: string, filter?: string, initialData: T[] = []) {
  const [data, setData] = useState<T[]>(initialData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )

    let channel: RealtimeChannel

    const setupRealtime = async () => {
      try {
        // Initial data fetch
        let query = supabase.from(table).select("*")
        if (filter) {
          query = query.filter(...filter.split(","))
        }

        const { data: initialData, error: fetchError } = await query
        if (fetchError) throw fetchError

        setData(initialData || [])
        setLoading(false)

        // Setup realtime subscription
        channel = supabase
          .channel(`${table}_changes`)
          .on(
            "postgres_changes",
            {
              event: "*",
              schema: "public",
              table: table,
              filter: filter,
            },
            (payload) => {
              console.log("[v0] Realtime update:", payload)

              if (payload.eventType === "INSERT") {
                setData((prev) => [...prev, payload.new as T])
              } else if (payload.eventType === "UPDATE") {
                setData((prev) => prev.map((item) => ((item as any).id === payload.new.id ? (payload.new as T) : item)))
              } else if (payload.eventType === "DELETE") {
                setData((prev) => prev.filter((item) => (item as any).id !== payload.old.id))
              }
            },
          )
          .subscribe()
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error")
        setLoading(false)
      }
    }

    setupRealtime()

    return () => {
      if (channel) {
        supabase.removeChannel(channel)
      }
    }
  }, [table, filter])

  return { data, loading, error }
}
