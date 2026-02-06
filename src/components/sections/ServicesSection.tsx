"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion"
import { cn } from "@/lib/utils"
import { SERVICIOS } from "@/lib/constants"
import { Container } from "@/components/ui/Container"
import { Button } from "@/components/ui/Button"
import { ChipFilter } from "@/components/ui/ChipFilter"
import { ServiceCard } from "@/components/ui/ServiceCard"
import { AnimatedSection } from "@/components/motion/AnimatedSection"
import { StaggerContainer } from "@/components/motion/StaggerContainer"

const FILTERS = [
  { id: "all", label: "Todos" },
  { id: "diagnostico", label: "Diagnóstico" },
  { id: "mantenimiento", label: "Mantenimiento" },
  { id: "rehabilitacion", label: "Rehabilitación" },
  { id: "catastro", label: "Catastro" },
] as const

type FilterId = (typeof FILTERS)[number]["id"]
type ServiceItem = (typeof SERVICIOS)[number]

const CATEGORY_MAP: Record<string, FilterId> = {
  "inspeccion-cctv": "diagnostico",
  "medicion-caudal": "diagnostico",
  "prueba-hidrostatica": "diagnostico",
  hermeticidad: "diagnostico",
  "servicios-vactor": "mantenimiento",
  "limpieza-redes": "mantenimiento",
  "reparacion-cipp": "rehabilitacion",
  "diseno-redes": "rehabilitacion",
  "catastro-redes": "catastro",
  "catastro-usuarios": "catastro",
  topografia: "diagnostico",
}

interface MobileStackCardProps {
  service: ServiceItem
  index: number
  total: number
  progress: MotionValue<number>
  reduceMotion: boolean
}

function MobileStackCard({ service, index, total, progress, reduceMotion }: MobileStackCardProps) {
  const start = Math.max(0, index * 0.1 - 0.12)
  const settle = Math.min(1, start + 0.24)
  const finish = Math.min(1, settle + 0.26)

  const y = useTransform(progress, [start, settle, finish], [76, 0, -14])
  const scale = useTransform(progress, [start, settle, finish], [0.9, 1, 0.975])
  const opacity = useTransform(progress, [start, settle], [0.15, 1])
  const rotate = useTransform(progress, [start, settle], [1.8, 0])

  const topOffset = 132 + index * 28
  const isHero = index === 0

  const cardClass = "h-full !bg-[color:var(--color-surface)] !backdrop-blur-none"

  if (reduceMotion) {
    return (
      <div
        className={cn("service-tile h-full", index === 0 ? "mt-0" : "mt-6")}
        style={{ position: "sticky", top: `${topOffset}px`, zIndex: index + 1 }}
      >
        <ServiceCard
          icon={service.icon}
          nombre={service.nombre}
          descripcion={service.descripcion}
          slug={service.slug}
          normativa={service.normativa}
          showQuoteCta
          displayIndex={index + 1}
          featured={isHero}
          className={cardClass}
        />
      </div>
    )
  }

  return (
    <motion.div
      className={cn("service-tile h-full will-change-transform", index === 0 ? "mt-0" : "mt-6")}
      style={{ position: "sticky", top: `${topOffset}px`, zIndex: index + 1, y, scale, opacity, rotate }}
    >
      <ServiceCard
        icon={service.icon}
        nombre={service.nombre}
        descripcion={service.descripcion}
        slug={service.slug}
        normativa={service.normativa}
        showQuoteCta
        displayIndex={index + 1}
        featured={isHero}
        className={cardClass}
      />
    </motion.div>
  )
}

interface ServicesSectionProps {
  title?: string
  subtitle?: string
  showAllLink?: boolean
  limit?: number
  ctaLabel?: string
  stackOnMobile?: boolean
  className?: string
}

export function ServicesSection({
  title = "Nuestros servicios",
  subtitle = "Soluciones integrales en ingeniería de acueducto y alcantarillado con tecnología de punta y personal certificado",
  showAllLink = true,
  limit,
  ctaLabel = "Ver todos los servicios",
  stackOnMobile = false,
  className,
}: ServicesSectionProps) {
  const [activeFilter, setActiveFilter] = React.useState<FilterId>("all")
  const reduceMotion = useReducedMotion()
  const mobileStackRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: mobileStackRef,
    offset: ["start 85%", "end 25%"],
  })

  const displayedServices = limit ? SERVICIOS.slice(0, limit) : SERVICIOS
  const filteredServices =
    activeFilter === "all"
      ? displayedServices
      : displayedServices.filter((servicio) => CATEGORY_MAP[servicio.id] === activeFilter)

  const counts = FILTERS.reduce<Record<FilterId, number>>((acc, filter) => {
    if (filter.id === "all") {
      acc[filter.id] = displayedServices.length
      return acc
    }

    acc[filter.id] = displayedServices.filter((servicio) => CATEGORY_MAP[servicio.id] === filter.id).length
    return acc
  }, {} as Record<FilterId, number>)

  return (
    <section
      id="servicios"
      className={cn(
        "servicios-section relative overflow-clip bg-[color:var(--color-bg)] py-20 text-[color:var(--color-text)] md:py-24",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-65" aria-hidden="true">
        <div className="absolute inset-0 bg-[color:var(--color-bg)]" />
        <div className="absolute left-8 top-16 h-64 w-64 rounded-full bg-[color:var(--color-accent)]/18 blur-3xl" />
        <div className="absolute bottom-12 right-10 h-72 w-72 rounded-full bg-[color:var(--color-accent-2)]/16 blur-3xl" />
      </div>

      <Container size="xl" className="relative z-10 px-6">
        <AnimatedSection>
          <div className="services-header mx-auto mb-10 max-w-3xl text-center md:mb-12">
            <h2 className="mb-5 font-heading text-4xl font-bold text-[color:var(--color-text)] md:text-5xl lg:text-6xl">
              {title}
            </h2>
            <p className="text-lg leading-relaxed text-[color:var(--color-muted)] md:text-xl">{subtitle}</p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.05}>
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {FILTERS.filter((filter) => filter.id === "all" || counts[filter.id] > 0).map((filter) => (
              <ChipFilter
                key={filter.id}
                label={filter.label}
                count={counts[filter.id]}
                active={activeFilter === filter.id}
                onClick={() => setActiveFilter(filter.id)}
              />
            ))}
          </div>
        </AnimatedSection>

        {stackOnMobile && (
          <div className="md:hidden">
            <div ref={mobileStackRef} className="relative pb-10">
              {filteredServices.map((servicio, index) => {
                return (
                  <MobileStackCard
                    key={`mobile-${servicio.id}`}
                    service={servicio}
                    index={index}
                    total={filteredServices.length}
                    progress={scrollYProgress}
                    reduceMotion={Boolean(reduceMotion)}
                  />
                )
              })}
            </div>
          </div>
        )}

        <StaggerContainer
          className={cn(
            "grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4 xl:auto-rows-fr",
            stackOnMobile && "hidden md:grid"
          )}
        >
          {filteredServices.map((servicio, index) => {
            const isHero = index === 0
            const isTall = index === 1 || index === 2

            return (
              <div
                key={servicio.id}
                className={cn(
                  "service-tile h-full",
                  isHero && "md:col-span-2 xl:col-span-2 xl:row-span-2",
                  isTall && "xl:row-span-2"
                )}
              >
                <ServiceCard
                  icon={servicio.icon}
                  nombre={servicio.nombre}
                  descripcion={servicio.descripcion}
                  slug={servicio.slug}
                  normativa={servicio.normativa}
                  showQuoteCta
                  displayIndex={index + 1}
                  featured={isHero}
                  className="h-full"
                />
              </div>
            )
          })}
        </StaggerContainer>

        {showAllLink && limit && limit < SERVICIOS.length && (
          <AnimatedSection delay={0.05}>
            <div className="services-cta mt-16 text-center">
              <Button variant="outline" size="lg" asChild>
                <Link href="/servicios">
                  {ctaLabel}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </AnimatedSection>
        )}
      </Container>
    </section>
  )
}
