import type { Metadata } from "next"
import Link from "next/link"
import { Container } from "@/components/ui/Container"
import { ServiceCard } from "@/components/ui/ServiceCard"
import { Button } from "@/components/ui/Button"
import { SERVICIOS, SERVICIOS_ADICIONALES } from "@/lib/constants"
import copy from "@/lib/copy"

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Servicios especializados en inspección CCTV, pruebas hidrostáticas, servicios vactor, catastro de redes y más. Soluciones integrales para acueducto y alcantarillado.",
  keywords: [
    "inspección CCTV",
    "servicios vactor",
    "prueba hidrostática",
    "catastro de redes",
    "acueducto alcantarillado",
  ],
}

export default function ServiciosPage() {
  return (
    <main className="min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-text)]">
      <section className="bg-[linear-gradient(130deg,#071a2d_0%,#0b2746_55%,#0f3556_100%)] pb-16 pt-36 md:pb-20 md:pt-44">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10 xl:px-[100px]">
          <div className="grid grid-cols-4 gap-6 text-white md:grid-cols-12">
            <div className="col-span-4 md:col-span-1">
              <div className="text-xs uppercase tracking-[0.1em] text-[color:var(--color-muted)]">02</div>
            </div>

            <div className="col-span-4 md:col-start-2 md:col-span-7">
              <div className="text-xs uppercase tracking-[0.1em] text-[color:var(--color-muted)]">Servicios</div>
              <h1 className="mt-3 text-balance font-heading text-[length:var(--fluid-h1)] font-extrabold tracking-[-0.02em] leading-[var(--line-height-tight-display)]">
                {copy.services.index.title}
              </h1>
            </div>

            <div className="col-span-4 md:col-start-8 md:col-span-3 md:mt-16">
              <p className="max-w-[44ch] text-[length:var(--fluid-body)] leading-[var(--line-height-body)] text-[color:var(--color-muted)]">
                {copy.services.index.subtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[color:var(--color-bg)] py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 opacity-65" aria-hidden="true">
          <div className="absolute -left-8 top-16 h-64 w-64 rounded-full bg-[color:var(--color-accent)]/14 blur-3xl" />
          <div className="absolute bottom-12 right-8 h-72 w-72 rounded-full bg-[color:var(--color-accent-2)]/12 blur-3xl" />
        </div>

        <Container className="relative">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4 xl:auto-rows-fr">
            {SERVICIOS.map((servicio, index) => {
              const isHero = index === 0
              const isTall = index === 1 || index === 2

              return (
                <div
                  key={servicio.id}
                  className={[
                    "h-full",
                    isHero ? "md:col-span-2 xl:col-span-2 xl:row-span-2" : "",
                    isTall ? "xl:row-span-2" : "",
                  ].join(" ")}
                >
                  <ServiceCard
                    icon={servicio.icon}
                    nombre={servicio.nombre}
                    descripcion={servicio.descripcion}
                    slug={servicio.slug}
                    normativa={servicio.normativa}
                    displayIndex={index + 1}
                    featured={isHero}
                    className="h-full"
                  />
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      <section className="bg-[color:var(--color-surface)] py-16 md:py-24">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-heading text-2xl font-bold text-[color:var(--color-text)] sm:text-3xl md:text-4xl">
              {copy.services.index.extraTitle}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-[color:var(--color-muted)]">
              Complementamos nuestra oferta con servicios especializados para cubrir todas las necesidades de su proyecto.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {SERVICIOS_ADICIONALES.map((servicio, index) => (
              <div key={index} className="flex items-start gap-3 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg)]/45 p-4">
                <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[color:var(--color-accent)]/20 text-[color:var(--color-accent)]">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="font-body text-[color:var(--color-muted)]">{servicio}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[linear-gradient(130deg,#081c33_0%,#0c2a47_45%,#0f3556_100%)] py-16 md:py-24">
        <Container>
          <div className="text-center">
            <h2 className="mb-4 font-heading text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              {copy.services.index.quoteBlockTitle}
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-[color:var(--color-muted)]">{copy.services.index.quoteBlockSubtitle}</p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button variant="cta" size="lg" asChild>
                <Link href="/cotizador">{copy.services.index.quoteCta}</Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white/35 text-white hover:bg-white/10" asChild>
                <Link href="/contacto">Hablar con un asesor</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
