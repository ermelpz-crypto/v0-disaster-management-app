"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const slides = [
  {
    id: 1,
    type: "prevention",
    color: "#34A853",
    eyebrow: "LATEST MITIGATION REPORT",
    headline: "Building Safer Communities",
    body: "Explore our new early-warning systems and infrastructure projects designed to prevent disaster.",
    cta: "Read the Report",
    image: "/placeholder-rg9yr.png",
  },
  {
    id: 2,
    type: "preparedness",
    color: "#FBBC05",
    eyebrow: "NEW PREPAREDNESS GUIDE",
    headline: "Are You Prepared?",
    body: "Download our free, comprehensive family and community preparedness toolkit.",
    cta: "Get the Toolkit",
    image: "/placeholder-kgyfn.png",
  },
  {
    id: 3,
    type: "response",
    color: "#EA4335",
    eyebrow: "ACTIVE RESPONSE",
    headline: "Real-Time Crisis Response",
    body: "See how our teams are deploying resources and how you can access immediate help.",
    cta: "Get Help Now",
    image: "/placeholder-2y0ue.png",
  },
  {
    id: 4,
    type: "recovery",
    color: "#4285F4",
    eyebrow: "RECOVERY PROGRAM",
    headline: "Rebuilding Together",
    body: "Learn about our long-term recovery programs and how to support community rebuilding efforts.",
    cta: "Learn More",
    image: "/placeholder-db3ph.png",
  },
]

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5500)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const current = slides[currentSlide]

  return (
    <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${current.image})`,
        }}
      />

      {/* Content Panel */}
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <div
              className="backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 rounded-2xl p-8 shadow-2xl transition-all duration-700 ease-in-out"
              style={{ borderLeft: `6px solid ${current.color}` }}
            >
              <div className="space-y-4">
                <p className="text-sm font-bold uppercase tracking-wider" style={{ color: current.color }}>
                  {current.eyebrow}
                </p>

                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white text-balance leading-tight">
                  {current.headline}
                </h1>

                <p className="text-lg text-gray-700 dark:text-gray-300 text-pretty leading-relaxed">{current.body}</p>

                <Button
                  size="lg"
                  className="text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  style={{ backgroundColor: current.color }}
                >
                  {current.cta}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Progress Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              index === currentSlide ? "scale-125 shadow-lg" : "scale-100 bg-white/50 hover:bg-white/70",
            )}
            style={{
              backgroundColor: index === currentSlide ? slide.color : undefined,
            }}
            aria-label={`Go to slide ${index + 1}`}
          >
            {index === currentSlide && (
              <div className="w-full h-full rounded-full animate-pulse" style={{ backgroundColor: slide.color }} />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
