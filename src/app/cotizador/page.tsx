import { Suspense } from "react"
import { Metadata } from "next"
import { Container } from "@/components/ui/Container"
import { QuoteWizard } from "@/components/forms/QuoteWizard"
import { Clock3, ClipboardList, Phone } from "lucide-react"

export const metadata: Metadata = {
  title: "Cotizador de servicios",
  description:
    "Solicite una cotización para servicios de inspección CCTV, prueba hidrostática, servicios vactor y más. Respuesta en menos de 24 horas.",
}

interface CotizadorPageProps {
  searchParams: Promise<{ servicio?: string }>
}

export default async function CotizadorPage({ searchParams }: CotizadorPageProps) {
  const { servicio } = await searchParams

  return (
    <main className="min-h-screen bg-gris-100">
      {/* Hero pequeño */}
      <section className="bg-azul-oscuro text-white py-12 lg:py-16">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="font-heading text-3xl lg:text-4xl font-bold mb-4">
              Cotizador de servicios
            </h1>
            <p className="text-white/90 text-lg">
              Complete el formulario y reciba una cotización personalizada en
              menos de 24 horas hábiles
            </p>
          </div>
        </Container>
      </section>

      {/* Formulario */}
      <section className="py-12 lg:py-16">
        <Container size="md">
          <Suspense
            fallback={
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-gris-200 rounded w-3/4 mx-auto"></div>
                  <div className="h-4 bg-gris-200 rounded w-1/2 mx-auto"></div>
                </div>
              </div>
            }
          >
            <QuoteWizard initialService={servicio} />
          </Suspense>

          {/* Información adicional */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-azul-principal rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock3 className="h-6 w-6 text-white" strokeWidth={1.75} />
              </div>
              <h3 className="font-heading font-semibold text-azul-principal mb-2">
                Respuesta rápida
              </h3>
              <p className="text-sm text-gris-800 leading-relaxed">
                Cotización en menos de 24 horas hábiles.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-azul-principal rounded-full flex items-center justify-center mx-auto mb-3">
                <ClipboardList className="h-6 w-6 text-white" strokeWidth={1.75} />
              </div>
              <h3 className="font-heading font-semibold text-azul-principal mb-2">
                Sin compromiso
              </h3>
              <p className="text-sm text-gris-800 leading-relaxed">
                Cotización 100% gratuita y sin obligación.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-azul-principal rounded-full flex items-center justify-center mx-auto mb-3">
                <Phone className="h-6 w-6 text-white" strokeWidth={1.75} />
              </div>
              <h3 className="font-heading font-semibold text-azul-principal mb-2">
                Asesoría personalizada
              </h3>
              <p className="text-sm text-gris-800 leading-relaxed">
                Un ingeniero especialista revisará su solicitud.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
