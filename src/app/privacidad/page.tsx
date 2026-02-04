import type { Metadata } from "next"
import { Container } from "@/components/ui/Container"
import { Card } from "@/components/ui/Card"

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Política de privacidad de APINDICO S.A.S. para solicitudes de contacto y cotización.",
}

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen bg-gris-100">
      <section className="bg-gradient-to-br from-azul-oscuro via-azul-principal to-azul-oscuro pt-32 pb-16 md:pt-40 md:pb-20">
        <Container>
          <div className="text-center text-white">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              Política de privacidad
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Información sobre el tratamiento de datos personales en APINDICO S.A.S.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container size="md">
          <Card className="p-6 md:p-10">
            <div className="space-y-4 text-gris-800 leading-relaxed">
              <p>
                Esta página describe, de manera general, cómo APINDICO S.A.S. trata
                los datos personales suministrados a través de formularios de contacto
                y cotización.
              </p>
              <p>
                Los datos se utilizan para responder solicitudes, enviar cotizaciones
                y realizar seguimiento comercial y técnico relacionado con el servicio
                solicitado.
              </p>
              <p>
                Si desea actualizar, corregir o solicitar la eliminación de su
                información, por favor escríbanos al correo de contacto publicado en
                el sitio.
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
