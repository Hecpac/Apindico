"use client"

import * as React from "react"
import { useMemo, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ProjectCard } from "@/components/ui/ProjectCard"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

type ProjectItem = {
  id: string
  titulo: string
  cliente: string
  ubicacion: string
  servicioId: string
  descripcion: string
  imagen?: string
  fecha: string
}

const FILTERS = [
  { id: "all", label: "Todos" },
  { id: "cctv", label: "CCTV" },
  { id: "vactor", label: "Vactor" },
  { id: "acueducto", label: "Acueducto" },
]

const CATEGORY_MAP: Record<string, string> = {
  "inspeccion-cctv": "cctv",
  "servicios-vactor": "vactor",
  "limpieza-redes": "vactor",
  "prueba-hidrostatica": "acueducto",
  "medicion-caudal": "acueducto",
  "diseno-redes": "acueducto",
  "catastro-redes": "acueducto",
  "catastro-usuarios": "acueducto",
  "topografia": "acueducto",
  "reparacion-cipp": "acueducto",
  "hermeticidad": "acueducto",
}

interface ProjectsPortfolioSectionProps {
  projects: ProjectItem[]
}

export function ProjectsPortfolioSection({ projects }: ProjectsPortfolioSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeFilter, setActiveFilter] = useState("all")
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projects
    return projects.filter(
      (project) => CATEGORY_MAP[project.servicioId] === activeFilter
    )
  }, [projects, activeFilter])

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".portfolio-card", sectionRef.current)
      if (cards.length === 0) return

      if (prefersReducedMotion) {
        gsap.set(cards, { opacity: 1, y: 0 })
        return
      }

      gsap.set(cards, { opacity: 1, y: 0 })
      gsap.from(cards, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power4.out",
      })
    },
    { scope: sectionRef, dependencies: [activeFilter, prefersReducedMotion] }
  )

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-[#0b1220] text-white"
      aria-labelledby="portfolio-title"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between mb-10">
          <div>
            <h2
              id="portfolio-title"
              className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-white"
            >
              Portfolio de proyectos
            </h2>
            <p className="text-white/70 mt-2 max-w-2xl">
              Experiencia comprobada en inspección, mantenimiento y rehabilitación de
              redes de acueducto y alcantarillado.
            </p>
          </div>

          <div
            className="relative inline-flex flex-wrap gap-2 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-lg"
            role="tablist"
            aria-label="Filtros"
          >
            {FILTERS.map((filter) => {
              const isActive = activeFilter === filter.id
              return (
                <button
                  key={filter.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(filter.id)}
                  className={cn(
                    "relative px-4 py-2 rounded-full text-sm font-medium transition-colors",
                    isActive ? "text-white" : "text-white/60 hover:text-white"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="portfolio-filter-pill"
                      className="absolute inset-0 rounded-full bg-zinc-950/70 shadow-[0_8px_18px_rgba(0,0,0,0.35)]"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative z-10">{filter.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.titulo}
              client={project.cliente}
              location={project.ubicacion}
              year={project.fecha}
              image={project.imagen}
              href={`/proyectos/${project.id}`}
              className="portfolio-card h-full"
            />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center text-white/70 mt-12">
            No hay proyectos en esta categoría.
          </div>
        )}
      </div>
    </section>
  )
}
