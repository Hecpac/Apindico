import type { Metadata } from "next"
import { Container } from "@/components/ui/Container"
import { Card } from "@/components/ui/Card"

export const metadata: Metadata = {
  title: "Términos de uso",
  description: "Términos de uso del sitio web de APINDICO S.A.S.",
}

export default function TerminosPage() {
  return (
    <main className="min-h-screen bg-gris-100">
      <section className="bg-gradient-to-br from-azul-oscuro via-azul-principal to-azul-oscuro pt-32 pb-16 md:pt-40 md:pb-20">
        <Container>
          <div className="text-center text-white">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              Términos de uso
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Condiciones generales para el uso de este sitio web.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container size="md">
          <Card className="p-6 md:p-10">
            <div className="space-y-4 text-gris-800 leading-relaxed">
              <p>
                El contenido de este sitio es de carácter informativo. Las
                cotizaciones y propuestas formales se entregan por los canales de
                contacto definidos por APINDICO S.A.S.
              </p>
              <p>
                Al utilizar este sitio, usted acepta que la información publicada
                puede actualizarse sin previo aviso y que el uso del contenido se
                realiza bajo su responsabilidad.
              </p>
              <p className="text-sm text-gris-600">
                Nota: este contenido es informativo y puede ajustarse según
                requerimientos legales y operativos.
              </p>
            </div>
          </Card>
        </Container>
      </section>
    </main>
  )
}
