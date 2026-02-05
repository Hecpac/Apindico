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
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-azul-oscuro via-azul-principal to-azul-oscuro pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10 xl:px-[100px]">
          <div className="grid grid-cols-4 md:grid-cols-12 gap-6 text-white">
            <div className="col-span-4 md:col-span-1">
              <div className="text-xs uppercase tracking-[0.1em] text-white/70">
                01
              </div>
            </div>

            <div className="col-span-4 md:col-start-2 md:col-span-7">
              <div className="text-xs uppercase tracking-[0.1em] text-white/70">
                Servicios
              </div>
              <h1 className="mt-3 font-heading font-extrabold tracking-[-0.04em] leading-[0.95] text-[clamp(48px,9vw,56px)] md:text-[clamp(60px,8vw,96px)] lg:text-[clamp(120px,8.5vw,144px)] text-balance">
                {copy.services.index.title}
              </h1>
            </div>

            <div className="col-span-4 md:col-start-8 md:col-span-3 md:mt-16">
              <p className="text-lg md:text-xl text-white/90 leading-[1.7] max-w-[44ch]">
                {copy.services.index.subtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24 bg-gris-100">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {SERVICIOS.map((servicio) => (
              <ServiceCard
                key={servicio.id}
                icon={servicio.icon}
                nombre={servicio.nombre}
                descripcion={servicio.descripcion}
                slug={servicio.slug}
                normativa={servicio.normativa}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Additional Services */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-gris-900 mb-4">
              {copy.services.index.extraTitle}
            </h2>
            <p className="text-gris-800 text-lg max-w-2xl mx-auto">
              Complementamos nuestra oferta con servicios especializados para
              cubrir todas las necesidades de su proyecto
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICIOS_ADICIONALES.map((servicio, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 bg-gris-100 rounded-lg"
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-azul-principal flex items-center justify-center mt-0.5">
                  <svg
                    className="w-3.5 h-3.5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-gris-800 font-body">{servicio}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-azul-principal to-azul-oscuro">
        <Container>
          <div className="text-center">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              {copy.services.index.quoteBlockTitle}
            </h2>
            <p className="text-white max-w-xl mx-auto mb-8">
              {copy.services.index.quoteBlockSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="cta" size="lg" asChild>
                <Link href="/cotizador">{copy.services.index.quoteCta}</Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/contacto">{copy.services.index.contactCta}</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
