"use client"

import * as React from "react"
import { useMemo, useState, useDeferredValue, useTransition } from "react"
import { motion } from "framer-motion"
import { SlidersHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { ProjectCard } from "@/components/ui/ProjectCard"
import { SearchInput } from "@/components/ui/SearchInput"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { EmptyState } from "@/components/ui/EmptyState"
import { getProjectCaseStudy } from "@/lib/projectCaseStudy"
import type { ProjectCategory } from "@/lib/projectCover"

const DEFAULT_FILTERS = [
  { id: "all", label: "Todos" },
  { id: "cctv", label: "CCTV" },
  { id: "vactor", label: "Vactor" },
  { id: "acueducto", label: "Acueducto" },
]

const CATEGORY_MAP: Partial<Record<string, ProjectCategory>> = {
  "inspeccion-cctv": "cctv",
  "servicios-vactor": "vactor",
  "limpieza-redes": "vactor",
  "prueba-hidrostatica": "acueducto",
  "medicion-caudal": "acueducto",
  "diseno-redes": "acueducto",
  "catastro-redes": "acueducto",
  "catastro-usuarios": "acueducto",
  topografia: "acueducto",
  "reparacion-cipp": "acueducto",
  hermeticidad: "acueducto",
}

const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  cctv: "CCTV",
  vactor: "Vactor",
  acueducto: "Acueducto",
  otro: "Proyecto",
}

const SORT_OPTIONS = [
  { id: "recent", label: "Más recientes" },
  { id: "oldest", label: "Más antiguos" },
  { id: "az", label: "A-Z título" },
] as const

interface ProjectItem {
  id: string
  titulo: string
  cliente: string
  ubicacion: string
  servicioId: string
  descripcion: string
  imagen?: string
  fecha: string
}

interface ProjectsPortfolioSectionProps {
  projects: ProjectItem[]
  filters?: string[]
}

export function ProjectsPortfolioSection({
  projects,
  filters,
}: ProjectsPortfolioSectionProps) {
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const deferredQuery = useDeferredValue(searchQuery)
  const [isPending, startTransition] = useTransition()
  const [sortBy, setSortBy] = useState<(typeof SORT_OPTIONS)[number]["id"]>(
    "recent"
  )

  const resolvedFilters = useMemo(() => {
    const labels = filters?.length ? filters : DEFAULT_FILTERS.map((filter) => filter.label)
    return DEFAULT_FILTERS.map((filter, index) => ({
      ...filter,
      label: labels[index] ?? filter.label,
    }))
  }, [filters])

  const searchFiltered = useMemo(() => {
    const query = deferredQuery.trim().toLowerCase()
    if (!query) return projects

    return projects.filter((project) =>
      [project.titulo, project.cliente, project.ubicacion, project.descripcion]
        .join(" ")
        .toLowerCase()
        .includes(query)
    )
  }, [projects, deferredQuery])

  const filterCounts = useMemo(() => {
    const counts = { all: searchFiltered.length, cctv: 0, vactor: 0, acueducto: 0 }
    searchFiltered.forEach((project) => {
      const category = CATEGORY_MAP[project.servicioId]
      if (category === "cctv" || category === "vactor" || category === "acueducto") {
        counts[category] += 1
      }
    })
    return counts
  }, [searchFiltered])

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return searchFiltered
    return searchFiltered.filter(
      (project) => CATEGORY_MAP[project.servicioId] === activeFilter
    )
  }, [searchFiltered, activeFilter])

  const sortedProjects = useMemo(() => {
    const sorted = [...filteredProjects]
    sorted.sort((a, b) => {
      if (sortBy === "az") {
        return a.titulo.localeCompare(b.titulo, "es", { sensitivity: "base" })
      }
      const yearA = Number.parseInt(a.fecha, 10) || 0
      const yearB = Number.parseInt(b.fecha, 10) || 0
      if (sortBy === "oldest") {
        return yearA - yearB
      }
      return yearB - yearA
    })
    return sorted
  }, [filteredProjects, sortBy])

  const featuredProjectIds = useMemo(() => {
    const ranked = [...sortedProjects].filter((project) =>
      project.titulo.toLowerCase().includes("cctv")
    )
    return new Set(ranked.slice(0, 2).map((project) => project.id))
  }, [sortedProjects])

  const showSkeletons = isPending || deferredQuery !== searchQuery

  return (
    <section
      className="relative bg-[color:var(--color-bg)] text-[color:var(--color-text)]"
      aria-labelledby="portfolio-title"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="space-y-10">
          <SectionHeader
            title="Portfolio de proyectos"
            subtitle="Casos reales ejecutados con precisión técnica, trazabilidad y resultados medibles en acueducto y alcantarillado."
            align="left"
          />

          <div
            className={cn(
              "sticky top-24 z-30",
              "rounded-[2rem] border border-white/10",
              "bg-zinc-950/50 backdrop-blur-2xl",
              "shadow-[0_20px_50px_-30px_rgba(0,0,0,0.7)]"
            )}
          >
            <div className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex w-fit items-center gap-1 rounded-full border border-white/10 bg-zinc-900/50 p-1">
                  {resolvedFilters.map((filter) => {
                    const isActive = activeFilter === filter.id
                    return (
                      <button
                        key={filter.id}
                        type="button"
                        onClick={() =>
                          startTransition(() => setActiveFilter(filter.id))
                        }
                        className="relative px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em]"
                        aria-pressed={isActive}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="active"
                            className="absolute inset-0 rounded-full bg-orange-600"
                            transition={{ type: "spring", duration: 0.5 }}
                          />
                        )}
                        <span
                          className={cn(
                            "relative z-10",
                            isActive ? "text-white" : "text-zinc-500"
                          )}
                        >
                          {filter.label}
                          <span className="ml-2 text-[10px] font-mono tracking-[0.2em] text-white/70">
                            {filterCounts[filter.id as keyof typeof filterCounts] ?? 0}
                          </span>
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:min-w-[360px]">
                <SearchInput value={searchQuery} onChange={setSearchQuery} />
                <div className="relative">
                  <SlidersHorizontal
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
                    aria-hidden="true"
                  />
                  <select
                    value={sortBy}
                    onChange={(event) =>
                      startTransition(() =>
                        setSortBy(event.target.value as typeof sortBy)
                      )
                    }
                    className={cn(
                      "h-11 rounded-full border border-white/10",
                      "bg-zinc-950/60 px-10 pr-4 text-sm font-semibold",
                      "text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06)]",
                      "focus:outline-none focus:ring-2 focus:ring-orange-500/60"
                    )}
                    aria-label="Ordenar proyectos"
                  >
                    {SORT_OPTIONS.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {sortedProjects.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[1fr]"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.08 },
                },
              }}
              initial="hidden"
              animate="show"
            >
              {showSkeletons
                ? Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={`skeleton-${index}`}
                      className={cn(
                        "relative overflow-hidden rounded-[32px] border border-white/10 bg-zinc-950/40 backdrop-blur-xl p-6",
                        "animate-pulse",
                        index % 5 === 0 ? "md:col-span-2" : "md:col-span-1"
                      )}
                    >
                      <div className="aspect-[4/3] w-full rounded-[28px] bg-white/5" />
                      <div className="mt-6 h-5 w-3/4 rounded-full bg-white/5" />
                      <div className="mt-4 h-4 w-1/2 rounded-full bg-white/5" />
                      <div className="mt-6 h-10 w-10 rounded-full bg-white/5" />
                    </div>
                  ))
                : sortedProjects.map((project, index) => {
                    const category = CATEGORY_MAP[project.servicioId] ?? "otro"
                    const isFeatured =
                      featuredProjectIds.has(project.id) ||
                      index % 5 === 0 ||
                      project.titulo.toLowerCase().includes("bogotá")
                    return (
                      <motion.div
                        key={project.id}
                        variants={{
                          hidden: { opacity: 0, y: 16 },
                          show: { opacity: 1, y: 0 },
                        }}
                        className={isFeatured ? "md:col-span-2" : "md:col-span-1"}
                      >
                        <ProjectCard
                          project={project}
                          category={category}
                          categoryLabel={CATEGORY_LABELS[category]}
                          caseStudy={getProjectCaseStudy(project.id)}
                          displayIndex={index + 1}
                          featured={isFeatured}
                        />
                      </motion.div>
                    )
                  })}
            </motion.div>
          ) : (
            <EmptyState
              title="No hay proyectos con estos filtros"
              description="Ajusta los filtros o prueba con otra búsqueda para ver más casos publicados."
            />
          )}
        </div>
      </div>
    </section>
  )
}
