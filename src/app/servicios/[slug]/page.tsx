import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRight, Check, FileText, ArrowRight } from "lucide-react"
import { SERVICIOS } from "@/lib/constants"
import { SERVICE_ICON_MAP } from "@/lib/serviceIcons"
import { Container } from "@/components/ui/Container"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { ServiceCard } from "@/components/ui/ServiceCard"
import copy from "@/lib/copy"

// Contenido extendido de cada servicio
const SERVICIOS_DETALLE: Record<
  string,
  {
    descripcionLarga: string[]
    beneficios: string[]
    aplicaciones?: string[]
  }
> = {
  "medicion-caudal-presion": {
    descripcionLarga: [
      "La medición de caudal y presión es fundamental para el diagnóstico y optimización de redes hidráulicas. Utilizamos equipos de última tecnología como caudalímetros ultrasónicos, electromagnéticos y manómetros digitales de alta precisión para obtener datos confiables en tiempo real.",
      "Nuestros especialistas realizan mediciones en puntos estratégicos de la red, permitiendo identificar pérdidas de presión, cuellos de botella y zonas de bajo rendimiento. Los datos recopilados son esenciales para la toma de decisiones en proyectos de ampliación, rehabilitación o mantenimiento de sistemas de acueducto.",
      "Entregamos informes detallados con gráficas de comportamiento, análisis de variaciones temporales y recomendaciones técnicas para mejorar la eficiencia operativa de su red.",
    ],
    beneficios: [
      "Identificación precisa de pérdidas en la red",
      "Optimización del consumo energético en bombeo",
      "Datos para diseño de proyectos de mejora",
      "Detección de conexiones fraudulentas",
      "Cumplimiento de parámetros de calidad del servicio",
      "Informes técnicos avalados por ingenieros especialistas",
    ],
    aplicaciones: [
      "Redes de distribución de agua potable",
      "Sistemas de riego",
      "Plantas de tratamiento",
      "Industrias con procesos hidráulicos",
    ],
  },
  "prueba-hidrostatica": {
    descripcionLarga: [
      "La prueba hidrostática es el método estándar para verificar la estanqueidad e integridad estructural de tuberías antes de su puesta en servicio. Sometemos las tuberías a presiones superiores a las de operación normal para garantizar que no existan fugas ni puntos débiles.",
      "Contamos con equipos de bombeo de alta presión, manómetros certificados y personal capacitado para ejecutar pruebas según las especificaciones técnicas de la EAAB-ESP y normas internacionales. Cada prueba incluye el monitoreo continuo de presión durante el tiempo establecido.",
      "Al finalizar, emitimos un certificado de prueba hidrostática que documenta las condiciones del ensayo, los resultados obtenidos y la conformidad con los requisitos técnicos exigidos.",
    ],
    beneficios: [
      "Certificación de calidad de instalación",
      "Detección temprana de defectos de soldadura o uniones",
      "Prevención de fugas futuras y daños mayores",
      "Cumplimiento de requisitos para recibo de obra",
      "Documentación técnica para auditorías",
      "Personal certificado y equipos calibrados",
    ],
  },
  "diseno-acueducto-alcantarillado": {
    descripcionLarga: [
      "Desarrollamos proyectos de ingeniería para redes de acueducto y alcantarillado con el más alto estándar técnico. Nuestros diseños incluyen memorias de cálculo hidráulico, planos detallados, especificaciones técnicas y presupuestos de obra que cumplen con la normativa vigente.",
      "Utilizamos software especializado de modelación hidráulica para simular el comportamiento de las redes bajo diferentes escenarios de demanda. Esto nos permite optimizar diámetros, pendientes y configuraciones para garantizar un funcionamiento eficiente y económico.",
      "Acompañamos a nuestros clientes durante todo el proceso: desde los estudios previos y diseños hasta la supervisión de obra, asegurando que la construcción se realice conforme a las especificaciones aprobadas.",
    ],
    beneficios: [
      "Diseños optimizados técnica y económicamente",
      "Cumplimiento del RAS y normas EAAB-ESP",
      "Modelación hidráulica con software especializado",
      "Planos en formato CAD y GIS",
      "Memorias de cálculo detalladas",
      "Acompañamiento en trámites ante entidades",
    ],
    aplicaciones: [
      "Urbanizaciones y proyectos inmobiliarios",
      "Ampliación de redes existentes",
      "Renovación de infraestructura obsoleta",
      "Conexiones a redes matrices",
    ],
  },
  "catastro-usuarios": {
    descripcionLarga: [
      "El catastro de usuarios es una herramienta fundamental para la gestión comercial de empresas de servicios públicos. Realizamos el censo completo de suscriptores, actualizando la información predial, de medidores y condiciones del servicio en cada punto de conexión.",
      "Nuestro equipo de técnicos en campo utiliza dispositivos móviles con GPS para georreferenciar cada usuario, capturar fotografías y registrar datos en tiempo real. Esta información se integra a sistemas de información geográfica (SIG) para facilitar su consulta y análisis.",
      "Entregamos bases de datos estructuradas, mapas temáticos y reportes estadísticos que permiten identificar usuarios no registrados, conexiones irregulares y oportunidades de mejora en la facturación.",
    ],
    beneficios: [
      "Actualización de la base de datos comercial",
      "Detección de usuarios no registrados",
      "Identificación de conexiones fraudulentas",
      "Información georreferenciada de alta precisión",
      "Integración con sistemas SIG existentes",
      "Mejora en índices de recaudo",
    ],
  },
  "levantamientos-topograficos": {
    descripcionLarga: [
      "Ejecutamos levantamientos topográficos para proyectos de acueducto y alcantarillado siguiendo estrictamente la Norma NS-030 de la EAB-ESP. Utilizamos equipos de estación total, GPS diferencial de alta precisión y niveles digitales para garantizar la exactitud de los datos.",
      "Nuestros levantamientos incluyen planimetría, altimetría, perfiles longitudinales y secciones transversales, con la densidad de puntos requerida según el tipo de proyecto. Toda la información se procesa y entrega en formatos compatibles con los sistemas de la EAAB-ESP.",
      "Contamos con personal topógrafo titulado y auxiliares capacitados que trabajan bajo estrictos protocolos de calidad para asegurar que los productos cumplan con las tolerancias y especificaciones exigidas.",
    ],
    beneficios: [
      "Cumplimiento estricto de la NS-030 EAB-ESP",
      "Equipos de última generación y calibrados",
      "Entrega en formatos oficiales requeridos",
      "Personal titulado y con experiencia",
      "Perfiles y secciones de alta precisión",
      "Georreferenciación en sistema MAGNA-SIRGAS",
    ],
  },
  "catastro-redes": {
    descripcionLarga: [
      "El catastro de redes consiste en el inventario y georreferenciación de toda la infraestructura de acueducto y alcantarillado: tuberías, válvulas, hidrantes, cámaras, sumideros y demás elementos que componen el sistema. Este trabajo es esencial para una gestión eficiente de los activos.",
      "Empleamos técnicas de inspección directa, revisión de planos récord y equipos de localización electromagnética para identificar y ubicar con precisión cada componente de la red. Los datos se registran con coordenadas GPS y se organizan en bases de datos estructuradas.",
      "El producto final incluye planos actualizados, fichas técnicas de cada elemento y un sistema de información geográfica que permite visualizar, consultar y analizar toda la infraestructura de manera integrada.",
    ],
    beneficios: [
      "Inventario completo de activos de la red",
      "Información georreferenciada y actualizada",
      "Identificación de elementos no registrados",
      "Base para programas de mantenimiento",
      "Integración con sistemas SIG corporativos",
      "Planos as-built de alta calidad",
    ],
  },
  "prueba-hermeticidad": {
    descripcionLarga: [
      "La prueba de hermeticidad permite detectar fugas e infiltraciones en redes de alcantarillado mediante la aplicación controlada de aire o agua a baja presión en tramos sellados de tubería. Este ensayo es fundamental para garantizar la integridad del sistema y prevenir contaminación del subsuelo.",
      "Utilizamos equipos neumáticos especializados, tapones inflables y manómetros de precisión para ejecutar las pruebas según los protocolos técnicos establecidos. Cada tramo se evalúa de forma independiente para localizar con exactitud los puntos defectuosos.",
      "Los resultados se documentan en formatos técnicos que incluyen la identificación del tramo, condiciones de prueba, pérdida de presión registrada y dictamen de aprobación o rechazo según los criterios normativos.",
    ],
    beneficios: [
      "Detección precisa de fugas en alcantarillado",
      "Prevención de infiltración de aguas lluvias",
      "Evita contaminación del nivel freático",
      "Certificación para recibo de obras nuevas",
      "Identificación de tramos para rehabilitación",
      "Cumplimiento de normativa ambiental",
    ],
  },
  "limpieza-redes": {
    descripcionLarga: [
      "El sondeo y limpieza de redes de alcantarillado es un servicio de mantenimiento preventivo y correctivo esencial para garantizar el correcto funcionamiento del sistema. Utilizamos equipos mecánicos de varillas flexibles, brocas especializadas y sistemas de hidrolavado según las condiciones de cada tramo.",
      "Nuestro servicio incluye la inspección inicial para determinar el grado de obstrucción, la limpieza propiamente dicha con el equipo más adecuado, y la verificación final del flujo libre en la tubería. En caso de raíces intrusivas, aplicamos tratamientos específicos.",
      "Atendemos desde mantenimientos programados en grandes redes hasta emergencias por taponamientos críticos, con disponibilidad de equipos y personal las 24 horas para situaciones urgentes.",
    ],
    beneficios: [
      "Prevención de taponamientos y reboses",
      "Eliminación de sedimentos y depósitos",
      "Remoción de raíces intrusivas",
      "Mejora de la capacidad hidráulica",
      "Servicio disponible 24/7 para emergencias",
      "Equipos para diferentes diámetros de tubería",
    ],
  },
  "inspeccion-cctv": {
    descripcionLarga: [
      "La inspección CCTV (Circuito Cerrado de Televisión) es la técnica más avanzada para el diagnóstico interno de tuberías sin necesidad de excavación. Utilizamos cámaras robóticas de alta definición que recorren el interior de las redes capturando video continuo de las condiciones estructurales y operativas.",
      "Nuestras inspecciones se realizan siguiendo la Norma NS-058 de la EAB-ESP, que establece la codificación estandarizada de defectos para alcantarillados. Cada anomalía encontrada se clasifica y georeferencia, permitiendo priorizar las intervenciones de mantenimiento o rehabilitación.",
      "Entregamos videos completos de la inspección, informes técnicos con la codificación de defectos, planos de ubicación de anomalías y recomendaciones de intervención. Esta información es fundamental para la planificación de inversiones en renovación de redes.",
    ],
    beneficios: [
      "Diagnóstico sin excavación ni demoliciones",
      "Codificación de defectos según NS-058 EAB-ESP",
      "Videos HD para archivo y análisis",
      "Identificación de conexiones ilícitas",
      "Detección de fisuras, raíces y deformaciones",
      "Base técnica para decisiones de inversión",
    ],
    aplicaciones: [
      "Evaluación de estado de redes existentes",
      "Recibo de obras nuevas",
      "Investigación de problemas recurrentes",
      "Planeación de rehabilitación",
    ],
  },
  "reparacion-cipp": {
    descripcionLarga: [
      "La reparación CIPP (Cured-In-Place Pipe) es una tecnología de rehabilitación sin zanja que permite renovar tuberías deterioradas instalando un revestimiento interno de resina que se cura in situ. Este método evita las excavaciones extensas, reduce costos y minimiza el impacto en el entorno urbano.",
      "El proceso consiste en insertar una manga flexible impregnada de resina epóxica o de poliéster a través de la tubería existente. Una vez posicionada, la manga se expande contra las paredes de la tubería y se cura mediante calor, vapor o luz UV, creando una nueva tubería estructural dentro de la antigua.",
      "Esta técnica es ideal para tuberías con múltiples defectos puntuales, fisuras longitudinales, infiltraciones o pérdida de capacidad estructural. El resultado es una tubería renovada con vida útil de más de 50 años.",
    ],
    beneficios: [
      "Rehabilitación sin excavación",
      "Mínima interrupción del tráfico y actividades",
      "Reducción significativa de costos vs. reemplazo",
      "Vida útil superior a 50 años",
      "Mejora de la capacidad hidráulica",
      "Proceso rápido: metros de tubería por día",
    ],
  },
  "servicios-vactor": {
    descripcionLarga: [
      "Los servicios Vactor combinan la potencia de succión industrial con hidrolavado a alta presión para realizar las limpiezas más exigentes en redes de alcantarillado. Nuestros camiones Vactor son capaces de extraer grandes volúmenes de sedimentos, lodos y residuos sólidos de cámaras, pozos y tuberías.",
      "El sistema de hidrolavado proyecta agua a presiones superiores a 2000 PSI, capaz de remover incrustaciones, grasas solidificadas y obstrucciones severas. El material desprendido es succionado simultáneamente al tanque del vehículo para su disposición final en sitios autorizados.",
      "Contamos con una flota de camiones Vactor de diferentes capacidades para atender desde mantenimientos rutinarios en redes urbanas hasta trabajos especiales en colectores de gran diámetro o plantas de tratamiento.",
    ],
    beneficios: [
      "Limpieza de alta potencia para obstrucciones severas",
      "Succión de grandes volúmenes de lodos",
      "Hidrolavado a presiones superiores a 2000 PSI",
      "Disposición final de residuos incluida",
      "Equipos para diferentes diámetros",
      "Servicio de emergencia disponible",
    ],
    aplicaciones: [
      "Limpieza de colectores y emisarios",
      "Desazolve de cámaras y pozos de inspección",
      "Mantenimiento de separadores de grasas",
      "Limpieza de tanques y estructuras industriales",
    ],
  },
}

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return SERVICIOS.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const servicio = SERVICIOS.find((s) => s.slug === slug)

  if (!servicio) {
    return {
      title: "Servicio no encontrado",
    }
  }

  return {
    title: servicio.nombre,
    description: servicio.descripcion,
    openGraph: {
      title: `${servicio.nombre} | APINDICO`,
      description: servicio.descripcion,
      type: "website",
    },
  }
}

export default async function ServicioPage({ params }: Props) {
  const { slug } = await params
  const servicio = SERVICIOS.find((s) => s.slug === slug)

  if (!servicio) {
    notFound()
  }

  const detalle = SERVICIOS_DETALLE[slug]
  const IconComponent = SERVICE_ICON_MAP[servicio.icon]

  // Obtener 3 servicios relacionados (excluyendo el actual)
  const serviciosRelacionados = SERVICIOS.filter((s) => s.slug !== slug).slice(
    0,
    3
  )

  return (
    <main className="min-h-screen">
      {/* Hero pequeño */}
      <section className="bg-azul-oscuro text-white py-16 lg:py-20">
        <Container>
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-sm text-white mb-6"
          >
            <Link
              href="/"
              className="hover:text-white transition-colors"
            >
              Inicio
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link
              href="/servicios"
              className="hover:text-white transition-colors"
            >
              {copy.nav.services}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{servicio.nombre}</span>
          </nav>

          {/* Título e icono */}
          <div className="flex items-center gap-4">
            {IconComponent ? (
              <IconComponent
                className="h-12 w-12 text-orange-400"
                strokeWidth={1.6}
                aria-hidden="true"
                focusable="false"
              />
            ) : (
              <FileText
                className="h-12 w-12 text-orange-400"
                strokeWidth={1.6}
                aria-hidden="true"
                focusable="false"
              />
            )}
            <div>
              <h1 className="font-heading text-3xl lg:text-4xl font-bold">
                {servicio.nombre}
              </h1>
              {servicio.normativa && (
                <Badge variant="info" size="md" className="mt-2">
                  <FileText className="w-3 h-3 mr-1" />
                  {servicio.normativa}
                </Badge>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Contenido principal */}
      <section className="py-16 lg:py-24 bg-azul-oscuro text-white">
        <Container>
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Columna principal */}
            <div className="lg:col-span-2 space-y-8">
              {/* Descripción detallada */}
              <div className="prose prose-lg prose-invert max-w-none">
                <h2 className="font-heading text-2xl font-semibold text-white mb-6">
                  Descripción del servicio
                </h2>
                {detalle?.descripcionLarga ? (
                  detalle.descripcionLarga.map((parrafo, idx) => (
                    <p
                      key={idx}
                      className="text-white/90 leading-relaxed mb-4"
                    >
                      {parrafo}
                    </p>
                  ))
                ) : (
                  <p className="text-white/90 leading-relaxed">
                    {servicio.descripcion}
                  </p>
                )}
              </div>

              {/* Beneficios */}
              {detalle?.beneficios && (
                <div>
                  <h2 className="font-heading text-2xl font-semibold text-white mb-6">
                    Beneficios
                  </h2>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {detalle.beneficios.map((beneficio, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3"
                      >
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-verde-exito/10 flex items-center justify-center mt-0.5">
                          <Check className="w-4 h-4 text-verde-exito" />
                        </span>
                        <span className="text-white/90">{beneficio}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Aplicaciones */}
              {detalle?.aplicaciones && (
                <div>
                  <h2 className="font-heading text-2xl font-semibold text-white mb-6">
                    Aplicaciones
                  </h2>
                  <ul className="space-y-2">
                    {detalle.aplicaciones.map((aplicacion, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-3 text-white/90"
                      >
                        <ArrowRight className="w-4 h-4 text-cyan" />
                        {aplicacion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Normativa aplicable */}
              {servicio.normativa && (
                <div className="bg-gradient-to-br from-azul-principal to-azul-oscuro rounded-xl p-6">
                  <h2 className="font-heading text-xl font-semibold text-white mb-3">
                    Normativa aplicable
                  </h2>
                  <p className="text-white leading-relaxed">
                    Este servicio se ejecuta cumpliendo los lineamientos de la
                    norma{" "}
                    <strong className="text-cyan">
                      {servicio.normativa}
                    </strong>
                    , garantizando los estándares de calidad requeridos por la
                    Empresa de Acueducto y Alcantarillado de Bogotá ESP.
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar - CTA */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 bg-white rounded-xl shadow-lg p-6 border border-gris-200">
                <h3 className="font-heading text-xl font-semibold text-azul-principal mb-4">
                  {copy.services.detail.needsThisServiceTitle}
                </h3>
                <p className="text-gris-800 mb-6 leading-relaxed">
                  {copy.services.detail.needsThisServiceSubtitle}
                </p>
                <div className="space-y-3">
                  <Button asChild className="w-full">
                    <Link href={`/cotizador?servicio=${servicio.id}`}>
                      {copy.services.detail.quoteCta}
                    </Link>
                  </Button>
                  <Button asChild variant="secondary" className="w-full">
                    <Link href="/contacto">{copy.services.detail.talkCta}</Link>
                  </Button>
                </div>

                {/* Info de contacto rápido */}
                <div className="mt-6 pt-6 border-t border-gris-200">
                  <p className="text-sm text-gris-800 mb-2">
                    {copy.services.detail.callPrefix}
                  </p>
                  <a
                    href="tel:+5713134068858"
                    className="text-azul-principal font-semibold hover:text-azul-oscuro transition-colors"
                  >
                    +57 313 406 8858
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* CTA grande */}
      <section className="bg-azul-principal py-16">
        <Container>
          <div className="text-center text-white">
            <h2 className="font-heading text-2xl lg:text-3xl font-bold mb-4">
              Solicitar cotización de {servicio.nombre}
            </h2>
            <p className="text-white mb-8 max-w-2xl mx-auto">
              Complete nuestro formulario de cotización y reciba una propuesta
              personalizada en menos de 24 horas hábiles.
            </p>
            <Button asChild variant="cta" size="lg">
              <Link href={`/cotizador?servicio=${servicio.id}`}>
                {copy.services.detail.quoteCta}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Servicios relacionados */}
      <section className="py-16 lg:py-24 bg-gris-100">
        <Container>
          <h2 className="font-heading text-2xl lg:text-3xl font-bold text-azul-principal text-center mb-12">
            Servicios relacionados
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {serviciosRelacionados.map((s) => (
              <ServiceCard
                key={s.id}
                icon={s.icon}
                nombre={s.nombre}
                descripcion={s.descripcion}
                slug={s.slug}
                normativa={s.normativa}
              />
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="secondary">
              <Link href="/servicios">{copy.home.services.cta}</Link>
            </Button>
          </div>
        </Container>
      </section>
    </main>
  )
}
