import type { Metadata } from "next"
import Link from "next/link"
import { Award } from "lucide-react"
import { Container } from "@/components/ui/Container"
import { Badge } from "@/components/ui/Badge"
import { MissionVision } from "@/components/about/MissionVision"
import { TechnicalTimeline } from "@/components/about/TechnicalTimeline"
import { ValuesGrid } from "@/components/about/ValuesGrid"
import { ClientsSlider } from "@/components/about/ClientsSlider"
import { CERTIFICACIONES } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Conozca APINDICO S.A.S., empresa líder en servicios de ingeniería de acueducto y alcantarillado en Colombia. Más de 10 años de experiencia.",
}

export default function NosotrosPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-azul-principal via-azul-oscuro to-azul-principal pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10 xl:px-[100px]">
          <div className="grid grid-cols-4 md:grid-cols-12 gap-6 text-white">
            <div className="col-span-4 md:col-span-1">
              <div className="text-xs uppercase tracking-[0.1em] text-white/70">
                01
              </div>
            </div>

            <div className="col-span-4 md:col-start-2 md:col-span-7">
              <div className="space-y-4">
                <div className="text-xs uppercase tracking-[0.1em] text-white/70">
                  Nosotros
                </div>
                <Badge variant="info" size="md" className="bg-white/20 text-white">
                  Desde 2011
                </Badge>
                <h1 className="font-heading font-extrabold tracking-[-0.04em] leading-[0.95] text-[clamp(48px,9vw,56px)] md:text-[clamp(60px,8vw,96px)] lg:text-[clamp(120px,8.5vw,144px)] text-balance">
                  Sobre APINDICO
                </h1>
              </div>
            </div>

            <div className="col-span-4 md:col-start-8 md:col-span-3 md:mt-16">
              <p className="text-lg md:text-xl text-white/90 leading-[1.7] max-w-[44ch]">
                Líderes en soluciones de ingeniería para sistemas de acueducto y
                alcantarillado en Colombia
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-grid-tech text-white">
        <MissionVision />
        <TechnicalTimeline />
        <ValuesGrid />

        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Certificaciones
            </h2>
            <p className="text-zinc-400 mb-10">
              Certificaciones que respaldan nuestra competencia técnica.
            </p>

            <div className="rounded-[2rem] bg-zinc-900/50 border border-white/10 backdrop-blur-md p-8 inline-block">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-orange-400">
                  <Award className="w-10 h-10" strokeWidth={1.5} />
                </div>
                <h3 className="font-heading font-bold text-xl text-white mb-2">
                  {CERTIFICACIONES.nasco.nombre}
                </h3>
                <Badge variant="success" size="md" className="mb-3">
                  {CERTIFICACIONES.nasco.codigo}
                </Badge>
                <p className="text-zinc-400 text-sm max-w-md leading-relaxed">
                  {CERTIFICACIONES.nasco.descripcion}. Certificación internacional
                  que garantiza la calidad de nuestras inspecciones según estándares
                  NASSCO (National Association of Sewer Service Companies).
                </p>
              </div>
            </div>
          </div>
        </section>

        <ClientsSlider />
      </div>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-azul-principal via-azul-oscuro to-azul-principal">
        <Container>
          <div className="text-center text-white">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              ¿Listo para trabajar con nosotros?
            </h2>
            <p className="text-white/90 max-w-xl mx-auto mb-8">
              Contáctenos hoy y descubra cómo podemos ayudarle con su proyecto
              de acueducto y alcantarillado
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/cotizador"
                className="inline-flex items-center justify-center px-8 py-3 bg-coral-energetico text-white font-semibold rounded-full hover:bg-coral-oscuro transition-colors"
	              >
	                Solicitar cotización
	              </Link>
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
              >
                Contáctenos
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
