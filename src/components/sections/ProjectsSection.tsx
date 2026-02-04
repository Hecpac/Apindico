"use client"

import * as React from "react"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { PROYECTOS } from "@/lib/constants"
import { Button } from "@/components/ui/Button"

interface ProjectsSectionProps {
  title?: string
  subtitle?: string
  limit?: number
  showAllLink?: boolean
  className?: string
}

export function ProjectsSection({
  title = "Proyectos destacados",
  subtitle = "Conozca algunos de nuestros trabajos más representativos",
  limit = 5,
  showAllLink = true,
  className,
}: ProjectsSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const displayedProjects = PROYECTOS.slice(0, limit)
  const resumeTimeoutRef = useRef<number | null>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  // Auto-play carousel every 3 seconds
  useEffect(() => {
    if (!isAutoPlaying || prefersReducedMotion || displayedProjects.length <= 1) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % displayedProjects.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, prefersReducedMotion, displayedProjects.length])

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) {
        window.clearTimeout(resumeTimeoutRef.current)
        resumeTimeoutRef.current = null
      }
    }
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)

    // Resume autoplay after 5 seconds (unless reduced motion is enabled)
    if (resumeTimeoutRef.current) {
      window.clearTimeout(resumeTimeoutRef.current)
    }
    if (!prefersReducedMotion) {
      resumeTimeoutRef.current = window.setTimeout(() => setIsAutoPlaying(true), 5000)
    }
  }

  if (displayedProjects.length === 0) {
    return null
  }

  return (
    <section
      id="proyectos"
      className={cn(
        "relative h-screen overflow-hidden bg-gris-900 scroll-mt-28 md:scroll-mt-32",
        className
      )}
    >
      {/* Slides Container */}
      <div className="relative h-full w-full">
        {displayedProjects.map((proyecto, index) => (
          <div
            key={proyecto.id}
            className={cn(
              "absolute inset-0 transition-all duration-700 ease-in-out",
              index === currentSlide
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105 pointer-events-none"
            )}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              {proyecto.imagen ? (
                <Image
                  src={proyecto.imagen}
                  alt={proyecto.titulo}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-azul-oscuro to-azul-principal" />
              )}
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-azul-principal/90 via-azul-principal/50 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative h-full flex items-end">
              <div className="w-full max-w-7xl mx-auto px-8 pb-20 md:pb-32">
                {/* Project Number */}
                <div className="mb-4">
                  <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full text-sm font-bold">
                    Proyecto {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Title */}
                <h2 className="font-heading text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 max-w-4xl leading-tight">
                  {proyecto.titulo}
                </h2>

                {/* Client */}
                {proyecto.cliente && (
                  <p className="text-xl md:text-2xl text-white/80 mb-6">
                    Cliente: {proyecto.cliente}
                  </p>
                )}

                {/* Description */}
                {proyecto.descripcion && (
                  <p className="text-base sm:text-lg md:text-xl text-white/70 mb-8 max-w-2xl">
                    {proyecto.descripcion}
                  </p>
                )}

                {/* CTA */}
                <Link
                  href={`/proyectos/${proyecto.id}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-coral-energetico text-white rounded-full font-semibold hover:bg-coral-oscuro transition-colors duration-300 group"
                >
                  Ver detalles
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="flex gap-3 px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
          {displayedProjects.map((proyecto, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent rounded-full",
                index === currentSlide
                  ? "w-12 h-2 bg-[#FF6B35] shadow-lg shadow-[#FF6B35]/50"
                  : "w-2 h-2 bg-white/60 hover:bg-white hover:scale-125"
              )}
              aria-label={`Ir al proyecto ${index + 1}: ${proyecto.titulo}`}
              aria-current={index === currentSlide ? "true" : "false"}
              title={proyecto.titulo}
            />
          ))}
        </div>
      </div>

      {/* View All Projects Button */}
      {showAllLink && PROYECTOS.length > limit && (
        <div className="absolute top-24 right-6 sm:top-20 md:top-16 md:right-8 z-20">
          <Button variant="secondary" size="md" asChild>
            <Link href="/proyectos">
              Ver todos
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      )}

      {/* Section Header - Optional overlay */}
      <div className="absolute top-24 left-6 sm:top-20 md:top-16 md:left-8 z-20 max-w-[90%]">
        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
          {title}
        </h2>
        <p className="text-white/70 text-sm sm:text-base md:text-lg max-w-md">
          {subtitle}
        </p>
      </div>
    </section>
  )
}
