"use client"

import * as React from "react"
import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import {
  ArrowRight,
  Ruler,
  Droplet,
  PenTool,
  ClipboardList,
  Map,
  Search,
  Lock,
  Trash2,
  Video,
  Wrench,
  Truck,
  LucideIcon
} from "lucide-react"
import { cn } from "@/lib/utils"
import { SERVICIOS } from "@/lib/constants"
import { Container } from "@/components/ui/Container"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Icon mapping for services
const ICON_MAP: Record<string, LucideIcon> = {
  "Ruler": Ruler,
  "Droplet": Droplet,
  "PenTool": PenTool,
  "ClipboardList": ClipboardList,
  "Map": Map,
  "Search": Search,
  "Lock": Lock,
  "Trash2": Trash2,
  "Video": Video,
  "Wrench": Wrench,
  "Truck": Truck,
}

interface ServicesSectionProps {
  title?: string
  subtitle?: string
  showAllLink?: boolean
  limit?: number
  className?: string
}

// Sticky Service Card Component
interface StickyServiceCardProps {
  servicio: {
    id: string
    nombre: string
    descripcion: string
    icon: string
    slug: string
    normativa?: string | null
  }
  index: number
}

function StickyServiceCard({ servicio, index }: StickyServiceCardProps) {
  const IconComponent = ICON_MAP[servicio.icon]

  return (
    <Link
      href={`/servicios/${servicio.slug}`}
      className={cn(
        "service-tile group relative overflow-hidden rounded-[2.5rem]",
        "border border-white/5 bg-zinc-950/40 backdrop-blur-2xl p-8 md:p-10",
        "transition-all duration-500 ease-out",
        "hover:-translate-y-1 hover:border-orange-500/50",
        "hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.45)]",
        "min-h-[320px]"
      )}
    >
      {/* Background watermark number - textura imperceptible al 3% */}
      <div className="absolute -top-6 -right-2 z-0 text-8xl font-mono font-bold text-white/[0.05] pointer-events-none select-none transition-colors group-hover:text-orange-500/10">
        {String(index + 1).padStart(2, "0")}
      </div>

      <div className="relative z-10 flex flex-col">
        {/* Icon */}
        <div className="mb-6">
          <div className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-500/20 bg-orange-500/10 text-orange-500 shadow-[0_0_20px_rgba(234,88,12,0.1)] transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:text-orange-400">
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_center,rgba(234,88,12,0.22),transparent_70%)] opacity-80" />
            {IconComponent && (
              <IconComponent
                className="relative h-7 w-7 transition-transform duration-300 group-hover:scale-105"
                strokeWidth={1.75}
                aria-hidden="true"
              />
            )}
          </div>
        </div>

        {/* Title - flujo natural sin restricciones */}
        <h3 className="font-heading font-bold text-xl tracking-tight text-white mb-4 transition-colors group-hover:text-orange-500" lang="es">
          {servicio.nombre}
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed text-zinc-400 mb-6">
          {servicio.descripcion}
        </p>

        {/* Normativa badge (si existe) */}
        {servicio.normativa && (
          <div className="mb-4">
            <Badge variant="info" size="sm">
              {servicio.normativa}
            </Badge>
          </div>
        )}

        {/* CTA - aparece deslizándose hacia arriba */}
        <div className="mt-auto pt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-orange-500 opacity-0 -translate-x-2 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0">
          <span>Saber más</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  )
}

export function ServicesSection({
  title = "Nuestros servicios",
  subtitle = "Soluciones integrales en ingeniería de acueducto y alcantarillado con tecnología de punta y personal certificado",
  showAllLink = true,
  limit,
  className,
}: ServicesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set(".services-header, .service-tile", { opacity: 1, y: 0 })
        return
      }

      const section = sectionRef.current
      if (!section) return

      const cards = gsap.utils.toArray<HTMLElement>(".service-tile", section)

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })

      tl.from(".services-header", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "expo.out",
      }).from(
        cards,
        {
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "expo.out",
        },
        "-=0.2"
      )
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  )

  const displayedServices = limit ? SERVICIOS.slice(0, limit) : SERVICIOS

  return (
      <section
      ref={sectionRef}
      id="servicios"
      className={cn("servicios-section py-24 md:py-32 relative", className)}
      style={{
        background: "linear-gradient(135deg, #0A2540 0%, #051629 100%)"
      }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-coral-energetico/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-coral-energetico/20 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10 px-6">
        {/* Section Header */}
        <div className="services-header text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {title}
          </h2>
          <p className="text-white/80 text-lg md:text-xl leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedServices.map((servicio, index) => (
            <StickyServiceCard
              key={servicio.id}
              servicio={servicio}
              index={index}
            />
          ))}
        </div>

        {/* CTA */}
        {showAllLink && limit && limit < SERVICIOS.length && (
          <div className="services-cta text-center mt-20">
            <Button variant="primary" size="lg" asChild>
              <Link href="/servicios">
                Ver todos los servicios
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        )}
      </Container>
    </section>
  )
}
