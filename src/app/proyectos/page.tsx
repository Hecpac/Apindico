import type { Metadata } from "next"
import Link from "next/link"
import { FolderOpen, ArrowUpRight } from "lucide-react"
import { Container } from "@/components/ui/Container"
import { Button } from "@/components/ui/Button"
import { ProjectsPortfolioSection } from "@/components/sections/ProjectsPortfolioSection"
import { PROYECTOS } from "@/lib/constants"
import copy from "@/lib/copy"

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Portafolio de proyectos realizados en inspección CCTV, servicios vactor, pruebas hidrostáticas y más. Vea nuestro trabajo en acueducto y alcantarillado.",
}

interface Proyecto {
  id: string
  titulo: string
  cliente: string
  ubicacion: string
  servicioId: string
  descripcion: string
  imagen?: string
  fecha: string
}

const proyectosEjemplo: Proyecto[] = [
  {
    id: "1",
    titulo: "Inspección CCTV Red Principal Bogotá",
    cliente: "EAAB",
    ubicacion: "Bogotá, Cundinamarca",
    servicioId: "inspeccion-cctv",
    descripcion: "Inspección de 15 km de red de alcantarillado con identificación de anomalías según PACP.",
    fecha: "2024",
  },
  {
    id: "2",
    titulo: "Limpieza Vactor Colector Principal",
    cliente: "ESACOR ESP",
    ubicacion: "Zipaquirá, Cundinamarca",
    servicioId: "servicios-vactor",
    descripcion: "Desazolve y limpieza de colector de 600mm de diámetro con equipo vactor.",
    fecha: "2024",
  },
  {
    id: "3",
    titulo: "Prueba Hidrostática Urbanización",
    cliente: "Constructora Bolívar",
    ubicacion: "Bogotá, Cundinamarca",
    servicioId: "prueba-hidrostatica",
    descripcion: "Verificación de estanqueidad en 3 km de red de acueducto nueva.",
    fecha: "2023",
  },
  {
    id: "4",
    titulo: "Catastro de Redes Municipio",
    cliente: "EAAV",
    ubicacion: "Villavicencio, Meta",
    servicioId: "catastro-redes",
    descripcion: "Georreferenciación y levantamiento de 50 km de redes de acueducto y alcantarillado.",
    fecha: "2023",
  },
  {
    id: "5",
    titulo: "Reparación CIPP Tubería Dañada",
    cliente: "WSP",
    ubicacion: "Medellín, Antioquia",
    servicioId: "reparacion-cipp",
    descripcion: "Rehabilitación sin excavación de 200m de tubería de alcantarillado.",
    fecha: "2023",
  },
  {
    id: "6",
    titulo: "Levantamiento Topográfico Red",
    cliente: "Consorcio Biopolis",
    ubicacion: "Bogotá, Cundinamarca",
    servicioId: "topografia",
    descripcion: "Levantamiento topográfico según NS-030 para proyecto de renovación de redes.",
    fecha: "2022",
  },
]

export default function ProyectosPage() {
  const proyectos = PROYECTOS.length > 0 ? PROYECTOS : proyectosEjemplo

  return (
    <main className="min-h-screen theme-editorial bg-[color:var(--color-bg)] text-[color:var(--color-text)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,_rgba(249,115,22,0.2),_transparent_45%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(140deg,_rgba(15,23,42,0.9),_rgba(11,15,23,0.95))]" />
          <div className="absolute -top-32 right-0 h-72 w-72 rounded-full bg-[color:var(--color-accent)] opacity-20 blur-3xl" />
        </div>
        <Container>
          <div className="relative z-10 grid gap-10 lg:grid-cols-[1.1fr,0.9fr] items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border)] bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-muted)]">
                Portafolio
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.05]">
                {copy.projects.index.title}
              </h1>
              <p className="text-base sm:text-lg text-[color:var(--color-muted)] max-w-2xl">
                {copy.projects.index.subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="editorial" size="lg" asChild>
                  <Link href="/contacto">
                    {copy.projects.index.leadCta}
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="editorial-outline" size="lg" asChild>
                  <Link href="/servicios">Ver servicios</Link>
                </Button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {[
                { value: "500+", label: "Proyectos ejecutados" },
                { value: "<24h", label: "Respuesta técnica" },
                { value: "Nacional", label: "Presencia en Colombia" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[var(--radius-3)] border border-[color:var(--color-border)] bg-white/5 px-6 py-4 shadow-[var(--shadow-1)]"
                >
                  <p className="text-2xl font-semibold text-[color:var(--color-text)]">
                    {stat.value}
                  </p>
                  <p className="text-sm text-[color:var(--color-muted)]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Projects Grid */}
      {proyectos.length > 0 ? (
        <>
          <ProjectsPortfolioSection
            projects={proyectos}
            filters={copy.projects.index.filters}
          />
          <section className="pb-16 md:pb-24 bg-[color:var(--color-bg)]">
            <Container>
              <div className="text-center mt-6">
                <p className="text-[color:var(--color-muted)] text-lg mb-6">
                  ¿Desea conocer más sobre nuestros proyectos?
                </p>
                <Button variant="editorial" size="lg" asChild>
                  <Link href="/contacto">{copy.projects.index.leadCta}</Link>
                </Button>
              </div>
            </Container>
          </section>
        </>
      ) : (
        /* Empty State */
        <section className="py-16 md:py-24 bg-[color:var(--color-bg)]">
          <Container>
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
                <FolderOpen className="w-12 h-12 text-[color:var(--color-accent)]" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-[color:var(--color-text)] mb-4">
                Próximamente
              </h2>
              <p className="text-[color:var(--color-muted)] text-lg max-w-md mx-auto mb-8">
                Estamos preparando nuestro portafolio de proyectos. Mientras
                tanto, contáctenos para conocer más sobre nuestro trabajo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="editorial" size="lg" asChild>
                  <Link href="/contacto">Contáctenos</Link>
                </Button>
                <Button variant="editorial-outline" size="lg" asChild>
                  <Link href="/servicios">Ver servicios</Link>
                </Button>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#121826] via-[#0F172A] to-[#0B0F17]">
        <Container>
          <div className="text-center">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[color:var(--color-text)] mb-4">
              {copy.projects.index.finalCtaTitle}
            </h2>
            <p className="text-[color:var(--color-muted)] max-w-xl mx-auto mb-8">
              {copy.projects.index.finalCtaSubtitle}
            </p>
            <Button variant="editorial" size="lg" asChild>
              <Link href="/cotizador">{copy.projects.index.finalCtaButton}</Link>
            </Button>
          </div>
        </Container>
      </section>
    </main>
  )
}
