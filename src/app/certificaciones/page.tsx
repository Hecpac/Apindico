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
        <Container>
          <div className="text-center text-white">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              Certificaciones
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Formación y estándares que respaldan la calidad de nuestros servicios.
            </p>
          </div>
        </Container>
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
