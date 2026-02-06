"use client"

import * as React from "react"
import { useMemo, useState, useDeferredValue, useTransition } from "react"
import { SlidersHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { ProjectCard } from "@/components/ui/ProjectCard"
import { SearchInput } from "@/components/ui/SearchInput"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { EmptyState } from "@/components/ui/EmptyState"
import { ChipFilter } from "@/components/ui/ChipFilter"
import { StaggerContainer } from "@/components/motion/StaggerContainer"
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

export function ProjectsPortfolioSection({ projects, filters }: ProjectsPortfolioSectionProps) {
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const deferredQuery = useDeferredValue(searchQuery)
  const [isPending, startTransition] = useTransition()
  const [sortBy, setSortBy] = useState<(typeof SORT_OPTIONS)[number]["id"]>("recent")

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
      [project.titulo, project.cliente, project.ubicacion, project.descripcion].join(" ").toLowerCase().includes(query)
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
    return searchFiltered.filter((project) => CATEGORY_MAP[project.servicioId] === activeFilter)
  }, [searchFiltered, activeFilter])

  const sortedProjects = useMemo(() => {
    const sorted = [...filteredProjects]

    sorted.sort((a, b) => {
      if (sortBy === "az") {
        return a.titulo.localeCompare(b.titulo, "es", { sensitivity: "base" })
      }

      const yearA = Number.parseInt(a.fecha, 10) || 0
      const yearB = Number.parseInt(b.fecha, 10) || 0
      if (sortBy === "oldest") return yearA - yearB
      return yearB - yearA
    })

    return sorted
  }, [filteredProjects, sortBy])

  const featuredProjectIds = useMemo(() => {
    const ranked = [...sortedProjects].filter((project) => project.titulo.toLowerCase().includes("cctv"))
    return new Set(ranked.slice(0, 2).map((project) => project.id))
  }, [sortedProjects])

  const showSkeletons = isPending || deferredQuery !== searchQuery

  return (
    <section className="relative bg-[color:var(--color-bg)] text-[color:var(--color-text)]" aria-labelledby="portfolio-title">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="space-y-10">
          <SectionHeader
            title="Portfolio de proyectos"
            subtitle="Casos reales ejecutados con precisión técnica, trazabilidad y resultados medibles en acueducto y alcantarillado."
            align="left"
          />

          <div className="sticky top-20 z-30 rounded-[2rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/90 p-4 shadow-[var(--shadow-2)] backdrop-blur-2xl">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                {resolvedFilters.map((filter) => (
                  <ChipFilter
                    key={filter.id}
                    label={filter.label}
                    count={filterCounts[filter.id as keyof typeof filterCounts] ?? 0}
                    active={activeFilter === filter.id}
                    onClick={() => startTransition(() => setActiveFilter(filter.id))}
                  />
                ))}
              </div>

              <div className="flex flex-col gap-3 md:flex-row md:items-center md:min-w-[360px]">
                <SearchInput value={searchQuery} onChange={setSearchQuery} />
                <div className="relative">
                  <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--color-dim)]" />
                  <select
                    value={sortBy}
                    onChange={(event) => startTransition(() => setSortBy(event.target.value as typeof sortBy))}
                    className={cn(
                      "h-11 rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface-2)] px-10 pr-4 text-sm font-semibold text-[color:var(--color-text)]",
                      "focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent-2)]"
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
            showSkeletons ? (
              <div className="grid auto-rows-[1fr] grid-cols-1 gap-6 md:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={`skeleton-${index}`}
                    className={cn(
                      "relative overflow-hidden rounded-[32px] border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/70 p-6 animate-pulse",
                      index % 5 === 0 ? "md:col-span-2" : "md:col-span-1"
                    )}
                  >
                    <div className="aspect-[4/3] w-full rounded-[28px] bg-white/7" />
                    <div className="mt-6 h-5 w-3/4 rounded-full bg-white/7" />
                    <div className="mt-4 h-4 w-1/2 rounded-full bg-white/7" />
                    <div className="mt-6 h-10 w-10 rounded-full bg-white/7" />
                  </div>
                ))}
              </div>
            ) : (
              <StaggerContainer className="grid auto-rows-[1fr] grid-cols-1 gap-6 md:grid-cols-3">
                {sortedProjects.map((project, index) => {
                  const category = CATEGORY_MAP[project.servicioId] ?? "otro"
                  const isFeatured =
                    featuredProjectIds.has(project.id) ||
                    index % 5 === 0 ||
                    project.titulo.toLowerCase().includes("bogotá")

                  return (
                    <div key={project.id} className={isFeatured ? "md:col-span-2" : "md:col-span-1"}>
                      <ProjectCard
                        project={project}
                        category={category}
                        categoryLabel={CATEGORY_LABELS[category]}
                        caseStudy={getProjectCaseStudy(project.id)}
                        displayIndex={index + 1}
                        featured={isFeatured}
                      />
                    </div>
                  )
                })}
              </StaggerContainer>
            )
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
