"use client"

import * as React from "react"
import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { SERVICIOS } from "@/lib/constants"
import { Container } from "@/components/ui/Container"
import { Button } from "@/components/ui/Button"
import { ChipFilter } from "@/components/ui/ChipFilter"
import { ServiceCard } from "@/components/ui/ServiceCard"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const FILTERS = [
  { id: "all", label: "Todos" },
  { id: "diagnostico", label: "Diagnóstico" },
  { id: "mantenimiento", label: "Mantenimiento" },
  { id: "rehabilitacion", label: "Rehabilitación" },
  { id: "catastro", label: "Catastro" },
] as const

type FilterId = (typeof FILTERS)[number]["id"]

const CATEGORY_MAP: Record<string, FilterId> = {
  "inspeccion-cctv": "diagnostico",
  "medicion-caudal": "diagnostico",
  "prueba-hidrostatica": "diagnostico",
  "hermeticidad": "diagnostico",
  "servicios-vactor": "mantenimiento",
  "limpieza-redes": "mantenimiento",
  "reparacion-cipp": "rehabilitacion",
  "diseno-redes": "rehabilitacion",
  "catastro-redes": "catastro",
  "catastro-usuarios": "catastro",
  "topografia": "diagnostico",
}

interface ServicesSectionProps {
  title?: string
  subtitle?: string
  showAllLink?: boolean
  limit?: number
  ctaLabel?: string
  className?: string
}

export function ServicesSection({
  title = "Nuestros servicios",
  subtitle = "Soluciones integrales en ingeniería de acueducto y alcantarillado con tecnología de punta y personal certificado",
  showAllLink = true,
  limit,
  ctaLabel = "Ver todos los servicios",
  className,
}: ServicesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
  const [activeFilter, setActiveFilter] = useState<FilterId>("all")

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

      ScrollTrigger.matchMedia({
        "(max-width: 767px)": () => {
          gsap.set(cards, { transformOrigin: "center top" })
          cards.forEach((card, idx) => {
            if (idx === 0) return
            const previous = cards[idx - 1]
            gsap.to(previous, {
              scale: 0.95,
              opacity: 0.5,
              scrollTrigger: {
                trigger: card,
                start: "top 55%",
                end: "bottom 45%",
                scrub: true,
              },
            })
          })
        },
      })
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  )

  const displayedServices = limit ? SERVICIOS.slice(0, limit) : SERVICIOS
  const filteredServices =
    activeFilter === "all"
      ? displayedServices
      : displayedServices.filter(
          (servicio) => CATEGORY_MAP[servicio.id] === activeFilter
        )

  const counts = FILTERS.reduce<Record<FilterId, number>>((acc, filter) => {
    if (filter.id === "all") {
      acc[filter.id] = displayedServices.length
      return acc
    }
    acc[filter.id] = displayedServices.filter(
      (servicio) => CATEGORY_MAP[servicio.id] === filter.id
    ).length
    return acc
  }, {} as Record<FilterId, number>)

  return (
      <section
      ref={sectionRef}
      id="servicios"
      className={cn(
        "servicios-section py-20 md:py-24 relative bg-[color:var(--color-bg)] text-[color:var(--color-text)]",
        className
      )}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute inset-0 bg-[color:var(--color-bg)]" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-[color:var(--color-accent)]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[color:var(--color-accent)]/20 rounded-full blur-3xl" />
      </div>

      <Container size="xl" className="relative z-10 px-6">
        {/* Section Header */}
        <div className="services-header text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {title}
          </h2>
          <p className="text-white/80 text-lg md:text-xl leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {FILTERS.map((filter) => (
            <ChipFilter
              key={filter.id}
              label={filter.label}
              count={counts[filter.id]}
              active={activeFilter === filter.id}
              onClick={() => setActiveFilter(filter.id)}
            />
          ))}
        </div>

        {/* Services Grid */}
        <div className="flex flex-col gap-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6">
          {filteredServices.map((servicio) => (
            <ServiceCard
              key={servicio.id}
              icon={servicio.icon}
              nombre={servicio.nombre}
              descripcion={servicio.descripcion}
              slug={servicio.slug}
              normativa={servicio.normativa}
              showQuoteCta
              className="service-tile"
            />
          ))}
        </div>

        {/* CTA */}
        {showAllLink && limit && limit < SERVICIOS.length && (
          <div className="services-cta text-center mt-20">
            <Button variant="primary" size="lg" asChild>
              <Link href="/servicios">
                {ctaLabel}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        )}
      </Container>
    </section>
  )
}
