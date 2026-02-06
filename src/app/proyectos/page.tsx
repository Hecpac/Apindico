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
    <main className="min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-text)]">
      <section className="relative overflow-hidden bg-[linear-gradient(130deg,#071a2d_0%,#0b2746_55%,#0f3556_100%)] text-[color:var(--color-text)]">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -top-32 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[color:var(--color-accent)] opacity-10 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.1] [background-image:radial-gradient(currentColor_1px,transparent_1px)] [background-size:18px_18px] text-[color:var(--color-border)]" />
        </div>

        <div className="relative mx-auto max-w-[1440px] px-6 pb-16 pt-36 md:px-10 md:pb-24 md:pt-44 xl:px-[100px]">
          <div className="grid grid-cols-4 gap-6 md:grid-cols-12">
            <div className="col-span-4 md:col-span-1">
              <div className="text-xs uppercase tracking-[0.1em] text-[color:var(--color-muted)]">03</div>
            </div>

            <div className="col-span-4 md:col-start-2 md:col-span-7">
              <div className="text-xs uppercase tracking-[0.1em] text-[color:var(--color-muted)]">Portafolio</div>

              <h1 className="mt-3 text-balance font-heading text-[length:var(--fluid-h1)] font-extrabold tracking-[-0.02em] leading-[var(--line-height-tight-display)]">
                {copy.projects.index.title}
              </h1>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-start">
                <Button variant="cta" size="lg" className="w-full sm:w-auto" asChild>
                  <Link href="/contacto">
                    {copy.projects.index.leadCta}
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-white/35 text-white hover:bg-white/10" asChild>
                  <Link href="/servicios">Ver servicios</Link>
                </Button>
              </div>
            </div>

            <div className="col-span-4 md:col-start-8 md:col-span-3 md:mt-16">
              <p className="max-w-[44ch] text-[length:var(--fluid-body)] leading-[var(--line-height-body)] text-[color:var(--color-muted)]">
                {copy.projects.index.subtitle}
              </p>
            </div>

            <div className="col-span-4 mt-10 md:col-span-11 md:col-start-2 md:mt-14">
              <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
                {[
                  { value: "500+", label: "Proyectos ejecutados" },
                  { value: "<24h", label: "Respuesta técnica" },
                  { value: "Nacional", label: "Presencia en Colombia" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[var(--radius-3)] border border-[color:var(--color-border)] bg-white/8 px-6 py-4 shadow-[var(--shadow-1)]"
                  >
                    <p className="text-2xl font-semibold text-[color:var(--color-text)]">{stat.value}</p>
                    <p className="text-sm text-[color:var(--color-muted)]">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {proyectos.length > 0 ? (
        <>
          <ProjectsPortfolioSection projects={proyectos} filters={copy.projects.index.filters} />
          <section className="bg-[color:var(--color-bg)] pb-16 md:pb-24">
            <Container>
              <div className="mt-6 text-center">
                <p className="mb-6 text-lg text-[color:var(--color-muted)]">¿Desea conocer más sobre nuestros proyectos?</p>
                <Button variant="cta" size="lg" asChild>
                  <Link href="/contacto">{copy.projects.index.leadCta}</Link>
                </Button>
              </div>
            </Container>
          </section>
        </>
      ) : (
        <section className="bg-[color:var(--color-bg)] py-16 md:py-24">
          <Container>
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white/6">
                <FolderOpen className="h-12 w-12 text-[color:var(--color-accent)]" />
              </div>
              <h2 className="mb-4 font-heading text-2xl font-bold text-[color:var(--color-text)]">Próximamente</h2>
              <p className="mx-auto mb-8 max-w-md text-lg text-[color:var(--color-muted)]">
                Estamos preparando nuestro portafolio de proyectos. Mientras tanto, contáctenos para conocer más sobre nuestro trabajo.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button variant="cta" size="lg" asChild>
                  <Link href="/contacto">Contáctenos</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/servicios">Ver servicios</Link>
                </Button>
              </div>
            </div>
          </Container>
        </section>
      )}

      <section className="bg-[linear-gradient(130deg,#081c33_0%,#0c2a47_45%,#0f3556_100%)] py-16 md:py-24">
        <Container>
          <div className="text-center">
            <h2 className="mb-4 font-heading text-2xl font-bold text-[color:var(--color-text)] sm:text-3xl md:text-4xl">
              {copy.projects.index.finalCtaTitle}
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-[color:var(--color-muted)]">{copy.projects.index.finalCtaSubtitle}</p>
            <Button variant="cta" size="lg" asChild>
              <Link href="/cotizador">{copy.projects.index.finalCtaButton}</Link>
            </Button>
          </div>
        </Container>
      </section>
    </main>
  )
}
