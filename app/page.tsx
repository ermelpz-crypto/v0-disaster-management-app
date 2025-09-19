import { HeroCarousel } from "@/components/hero-carousel"
import { KeyInfoTiles } from "@/components/key-info-tiles"
import { LiveAlertTicker } from "@/components/live-alert-ticker"
import { LatestUpdates } from "@/components/latest-updates"
import { QuickLinks } from "@/components/quick-links"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <LiveAlertTicker />
      <HeroCarousel />
      <KeyInfoTiles />
      <LatestUpdates />
      <QuickLinks />
    </div>
  )
}
