import type { Metadata } from "next"
import { Container } from "@/components/ui/Container"
import { Card } from "@/components/ui/Card"

export const metadata: Metadata = {
  title: "Certificaciones",
  description: "Certificaciones técnicas y estándares de calidad de APINDICO S.A.S.",
}

export default function CertificacionesPage() {
  return (
    <main className="min-h-screen bg-gris-100">
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
                Certificaciones
              </div>
              <h1 className="mt-3 font-heading font-extrabold tracking-[-0.04em] leading-[0.95] text-[clamp(48px,9vw,56px)] md:text-[clamp(60px,8vw,96px)] lg:text-[clamp(120px,8.5vw,144px)] text-balance">
                Certificaciones
              </h1>
            </div>

            <div className="col-span-4 md:col-start-8 md:col-span-3 md:mt-16">
              <p className="text-lg md:text-xl text-white/90 leading-[1.7] max-w-[44ch]">
                Formación y estándares que respaldan la calidad de nuestros servicios.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <Container size="md">
          <Card className="p-6 md:p-10">
            <div className="space-y-4 text-gris-800 leading-relaxed">
              <p>
                Nuestro equipo cuenta con formación técnica especializada y procesos
                certificados que garantizan la trazabilidad, seguridad y calidad en
                cada proyecto de acueducto y alcantarillado.
              </p>
              <p>
                Si necesita soporte documental específico o certificados asociados a
                un proyecto, contáctenos para entregarlos de manera formal.
              </p>
            </div>
          </Card>
        </Container>
      </section>
    </main>
  )
}
