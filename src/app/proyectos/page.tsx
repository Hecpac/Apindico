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
      <section className="relative overflow-hidden bg-[color:var(--color-bg)] text-[color:var(--color-text)]">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -top-32 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[color:var(--color-accent)] opacity-10 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.1] [background-image:radial-gradient(currentColor_1px,transparent_1px)] [background-size:18px_18px] text-[color:var(--color-border)]" />
          <div className="absolute inset-0 bg-[linear-gradient(140deg,_rgba(15,23,42,0.9),_rgba(11,15,23,0.95))]" />
        </div>
        <div className="relative mx-auto max-w-[1440px] px-6 md:px-10 xl:px-[100px] py-16 md:py-24">
          <div className="grid grid-cols-4 md:grid-cols-12 gap-6">
            <div className="col-span-4 md:col-span-1">
              <div className="text-xs uppercase tracking-[0.1em] text-[color:var(--color-muted)]">
                01
              </div>
            </div>

            <div className="col-span-4 md:col-start-2 md:col-span-7">
              <div className="text-xs uppercase tracking-[0.1em] text-[color:var(--color-muted)]">
                Portafolio
              </div>

              <h1 className="mt-3 font-heading font-extrabold tracking-[-0.03em] leading-[1] text-[clamp(40px,8.5vw,52px)] md:text-[clamp(56px,7vw,88px)] lg:text-[clamp(96px,6.5vw,120px)] text-balance">
                {copy.projects.index.title}
              </h1>

              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-start gap-3">
                <Button variant="editorial" size="lg" className="w-full sm:w-auto" asChild>
                  <Link href="/contacto">
                    {copy.projects.index.leadCta}
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="editorial-outline"
                  size="lg"
                  className="w-full sm:w-auto"
                  asChild
                >
                  <Link href="/servicios">Ver servicios</Link>
                </Button>
              </div>
            </div>

            <div className="col-span-4 md:col-start-8 md:col-span-3 md:mt-16">
              <p className="text-base md:text-lg leading-[1.7] text-[color:var(--color-muted)] max-w-[44ch]">
                {copy.projects.index.subtitle}
              </p>
            </div>

            <div className="col-span-4 md:col-start-2 md:col-span-11 mt-10 md:mt-14">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
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
          </div>
        </div>
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
