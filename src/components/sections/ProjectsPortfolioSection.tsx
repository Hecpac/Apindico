"use client"

import * as React from "react"
import { useMemo, useState } from "react"
import { SlidersHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { ProjectCard } from "@/components/ui/ProjectCard"
import { ChipFilter } from "@/components/ui/ChipFilter"
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
    const query = searchQuery.trim().toLowerCase()
    if (!query) return projects

    return projects.filter((project) =>
      [project.titulo, project.cliente, project.ubicacion, project.descripcion]
        .join(" ")
        .toLowerCase()
        .includes(query)
    )
  }, [projects, searchQuery])

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
              "rounded-[var(--radius-4)] border border-[color:var(--color-border)]",
              "bg-[color:var(--color-surface)] backdrop-blur-xl",
              "shadow-[var(--shadow-2)]"
            )}
          >
            <div className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap gap-2">
                {resolvedFilters.map((filter) => (
                  <ChipFilter
                    key={filter.id}
                    label={filter.label}
                    count={filterCounts[filter.id as keyof typeof filterCounts] ?? 0}
                    active={activeFilter === filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                  />
                ))}
              </div>
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:min-w-[360px]">
                <SearchInput value={searchQuery} onChange={setSearchQuery} />
                <div className="relative">
                  <SlidersHorizontal
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--color-muted)]"
                    aria-hidden="true"
                  />
                  <select
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value as typeof sortBy)}
                    className={cn(
                      "h-11 rounded-full border border-[color:var(--color-border)]",
                      "bg-[color:var(--color-surface)] px-10 pr-4 text-sm font-semibold",
                      "text-[color:var(--color-text)] shadow-[var(--shadow-1)]",
                      "focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent)]"
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProjects.map((project) => {
                const category = CATEGORY_MAP[project.servicioId] ?? "otro"
                return (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    category={category}
                    categoryLabel={CATEGORY_LABELS[category]}
                    caseStudy={getProjectCaseStudy(project.id)}
                  />
                )
              })}
            </div>
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
