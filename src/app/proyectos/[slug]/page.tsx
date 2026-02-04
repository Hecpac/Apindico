import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Calendar, MapPin, Briefcase, ArrowRight } from "lucide-react"
import { PROYECTOS, SERVICIOS } from "@/lib/constants"
import { getProjectCaseStudy } from "@/lib/projectCaseStudy"
import { Container } from "@/components/ui/Container"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import copy from "@/lib/copy"


export function generateStaticParams() {
  return PROYECTOS.map((proyecto) => ({ slug: proyecto.id }))
}

export function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Metadata {
  const proyecto = PROYECTOS.find((item) => item.id === params.slug)

  if (!proyecto) {
    return {
      title: "Proyecto no encontrado",
    }
  }

  return {
    title: `${proyecto.titulo} | Proyectos APINDICO`,
    description: proyecto.descripcion,
  }
}

export default function ProyectoDetallePage({
  params,
}: {
  params: { slug: string }
}) {
  const proyecto = PROYECTOS.find((item) => item.id === params.slug)

  if (!proyecto) {
    notFound()
  }

  const servicio = SERVICIOS.find((s) => s.id === proyecto.servicioId)
  const detalle = getProjectCaseStudy(proyecto.id)
  const proyectosRelacionados = PROYECTOS.filter(
    (item) => item.id !== proyecto.id
  ).slice(0, 3)

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-azul-oscuro via-azul-principal to-azul-oscuro pt-28 pb-14 md:pt-36 md:pb-20">
        <Container>
          <div className="text-white max-w-3xl">
            <Badge variant="info" size="md" className="mb-4 bg-white/20 text-white">
              Proyecto destacado
            </Badge>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              {proyecto.titulo}
            </h1>
            <p className="text-lg md:text-xl text-white/90">
              {proyecto.descripcion}
            </p>
          </div>
        </Container>
      </section>

      {/* Detail */}
      <section className="py-12 md:py-16 bg-gris-100">
        <Container>
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-10">
              <div>
                <h2 className="font-heading text-2xl font-bold text-gris-900 mb-4">
                  Resumen del proyecto
                </h2>
                <p className="text-gris-700 text-lg leading-relaxed">
                  {detalle.contexto}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h3 className="font-heading text-lg font-semibold text-gris-900 mb-3">
                    Alcance
                  </h3>
                  <ul className="space-y-2 text-gris-700 text-sm">
                    {detalle.alcance.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1 h-2 w-2 rounded-full bg-azul-principal" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h3 className="font-heading text-lg font-semibold text-gris-900 mb-3">
                    Resultados
                  </h3>
                  <ul className="space-y-2 text-gris-700 text-sm">
                    {detalle.resultados.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1 h-2 w-2 rounded-full bg-coral-energetico" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-heading text-lg font-semibold text-gris-900 mb-4">
                  Ficha técnica
                </h3>
                <div className="space-y-4 text-sm text-gris-700">
                  <div className="flex items-center gap-3">
                    <Briefcase className="h-5 w-5 text-azul-principal" aria-hidden="true" />
                    <span className="font-medium">Cliente:</span>
                    <span>{proyecto.cliente}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-azul-principal" aria-hidden="true" />
                    <span className="font-medium">Ubicación:</span>
                    <span>{proyecto.ubicacion}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-azul-principal" aria-hidden="true" />
                    <span className="font-medium">Año:</span>
                    <span>{proyecto.fecha}</span>
                  </div>
                  {servicio ? (
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-5 w-5 rounded-full bg-azul-bg" aria-hidden="true" />
                      <span className="font-medium">Servicio:</span>
                      <Link
                        href={`/servicios/${servicio.slug}`}
                        className="text-azul-principal hover:underline"
                      >
                        {servicio.nombre}
                      </Link>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-heading text-lg font-semibold text-gris-900 mb-3">
                  {copy.projects.index.finalCtaTitle}
                </h3>
                <p className="text-sm text-gris-700 mb-5">
                  {copy.projects.index.finalCtaSubtitle}
                </p>
                <div className="flex flex-col gap-3">
                  <Button variant="cta" size="md" asChild>
                    <Link href="/cotizador">
                      {copy.projects.index.finalCtaButton}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="secondary" size="md" asChild>
                    <Link href="/contacto">{copy.services.detail.talkCta}</Link>
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {proyectosRelacionados.length > 0 && (
        <section className="py-12 md:py-16 bg-white">
          <Container>
            <h2 className="font-heading text-2xl font-bold text-gris-900 mb-6">
              Otros proyectos
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {proyectosRelacionados.map((item) => (
                <Link
                  key={item.id}
                  href={`/proyectos/${item.id}`}
                  className="rounded-xl border border-gris-200 p-4 hover:border-azul-principal/40 hover:shadow-sm transition-all"
                >
                  <p className="text-xs text-gris-500 mb-2">{item.cliente}</p>
                  <p className="font-heading text-base text-gris-900 font-semibold">
                    {item.titulo}
                  </p>
                  <p className="text-sm text-gris-600 mt-1">{item.ubicacion}</p>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}
    </main>
  )
}
