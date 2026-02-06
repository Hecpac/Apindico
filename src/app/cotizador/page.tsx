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
    <main className="min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-text)]">
      <section className="bg-[linear-gradient(130deg,#071a2d_0%,#0b2746_55%,#0f3556_100%)] pb-14 pt-36 md:pb-16 md:pt-44">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 font-heading text-3xl font-bold text-[length:var(--font-size-5xl)]">Cotizador de servicios</h1>
            <p className="text-[length:var(--fluid-body)] text-[color:var(--color-muted)]">
              Complete el formulario y reciba una cotización personalizada en menos de 24 horas hábiles.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-[color:var(--color-bg)] py-12 lg:py-16">
        <Container size="md">
          <Suspense
            fallback={
              <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-8 text-center shadow-[var(--shadow-2)]">
                <div className="animate-pulse space-y-4">
                  <div className="mx-auto h-4 w-3/4 rounded bg-[color:var(--color-surface-2)]" />
                  <div className="mx-auto h-4 w-1/2 rounded bg-[color:var(--color-surface-2)]" />
                </div>
              </div>
            }
          >
            <QuoteWizard initialService={servicio} />
          </Suspense>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--color-accent)]/18 text-[color:var(--color-accent)]">
                <Clock3 className="h-6 w-6" strokeWidth={1.75} />
              </div>
              <h3 className="mb-2 font-heading font-semibold text-[color:var(--color-text)]">Respuesta rápida</h3>
              <p className="text-sm leading-relaxed text-[color:var(--color-muted)]">Cotización en menos de 24 horas hábiles.</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--color-accent)]/18 text-[color:var(--color-accent)]">
                <ClipboardList className="h-6 w-6" strokeWidth={1.75} />
              </div>
              <h3 className="mb-2 font-heading font-semibold text-[color:var(--color-text)]">Sin compromiso</h3>
              <p className="text-sm leading-relaxed text-[color:var(--color-muted)]">Cotización 100% gratuita y sin obligación.</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--color-accent)]/18 text-[color:var(--color-accent)]">
                <Phone className="h-6 w-6" strokeWidth={1.75} />
              </div>
              <h3 className="mb-2 font-heading font-semibold text-[color:var(--color-text)]">Asesoría personalizada</h3>
              <p className="text-sm leading-relaxed text-[color:var(--color-muted)]">Un ingeniero especialista revisará su solicitud.</p>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
