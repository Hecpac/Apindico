import type { Metadata } from "next"
import Link from "next/link"
import { FolderOpen } from "lucide-react"
import { Container } from "@/components/ui/Container"
import { Button } from "@/components/ui/Button"
import { ProjectsPortfolioSection } from "@/components/sections/ProjectsPortfolioSection"
import { PROYECTOS } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Portafolio de proyectos realizados en inspección CCTV, servicios vactor, pruebas hidrostáticas y más. Vea nuestro trabajo en acueducto y alcantarillado.",
}

interface Proyecto {
  id: string
  titulo: string
  cliente: string
  ubicacion: string
  servicioId: string
  descripcion: string
  imagen?: string
  fecha: string
}

const proyectosEjemplo: Proyecto[] = [
  {
    id: "1",
    titulo: "Inspección CCTV Red Principal Bogotá",
    cliente: "EAAB",
    ubicacion: "Bogotá, Cundinamarca",
    servicioId: "inspeccion-cctv",
    descripcion: "Inspección de 15 km de red de alcantarillado con identificación de anomalías según PACP.",
    fecha: "2024",
  },
  {
    id: "2",
    titulo: "Limpieza Vactor Colector Principal",
    cliente: "ESACOR ESP",
    ubicacion: "Zipaquirá, Cundinamarca",
    servicioId: "servicios-vactor",
    descripcion: "Desazolve y limpieza de colector de 600mm de diámetro con equipo vactor.",
    fecha: "2024",
  },
  {
    id: "3",
    titulo: "Prueba Hidrostática Urbanización",
    cliente: "Constructora Bolívar",
    ubicacion: "Bogotá, Cundinamarca",
    servicioId: "prueba-hidrostatica",
    descripcion: "Verificación de estanqueidad en 3 km de red de acueducto nueva.",
    fecha: "2023",
  },
  {
    id: "4",
    titulo: "Catastro de Redes Municipio",
    cliente: "EAAV",
    ubicacion: "Villavicencio, Meta",
    servicioId: "catastro-redes",
    descripcion: "Georreferenciación y levantamiento de 50 km de redes de acueducto y alcantarillado.",
    fecha: "2023",
  },
  {
    id: "5",
    titulo: "Reparación CIPP Tubería Dañada",
    cliente: "WSP",
    ubicacion: "Medellín, Antioquia",
    servicioId: "reparacion-cipp",
    descripcion: "Rehabilitación sin excavación de 200m de tubería de alcantarillado.",
    fecha: "2023",
  },
  {
    id: "6",
    titulo: "Levantamiento Topográfico Red",
    cliente: "Consorcio Biopolis",
    ubicacion: "Bogotá, Cundinamarca",
    servicioId: "topografia",
    descripcion: "Levantamiento topográfico según NS-030 para proyecto de renovación de redes.",
    fecha: "2022",
  },
]

export default function ProyectosPage() {
  const proyectos = PROYECTOS.length > 0 ? PROYECTOS : proyectosEjemplo

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-azul-oscuro via-azul-principal to-azul-oscuro pt-32 pb-16 md:pt-40 md:pb-20">
        <Container>
          <div className="text-center text-white">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              Nuestros proyectos
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Conozca algunos de los proyectos que hemos realizado para nuestros
              clientes en todo el país
            </p>
          </div>
        </Container>
      </section>

      {/* Projects Grid */}
      {proyectos.length > 0 ? (
        <>
          <ProjectsPortfolioSection projects={proyectos} />
          <section className="pb-16 md:pb-24 bg-gris-100">
            <Container>
              <div className="text-center mt-6">
                <p className="text-gris-800 text-lg mb-6">
                  ¿Desea conocer más sobre nuestros proyectos?
                </p>
                <Button variant="primary" size="lg" asChild>
                  <Link href="/contacto">Solicitar información</Link>
                </Button>
              </div>
            </Container>
          </section>
        </>
      ) : (
        /* Empty State */
        <section className="py-16 md:py-24 bg-gris-100">
          <Container>
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-azul-bg flex items-center justify-center mx-auto mb-6">
                <FolderOpen className="w-12 h-12 text-azul-principal" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-azul-principal mb-4">
                Próximamente
              </h2>
              <p className="text-gris-800 text-lg max-w-md mx-auto mb-8">
                Estamos preparando nuestro portafolio de proyectos. Mientras
                tanto, contáctenos para conocer más sobre nuestro trabajo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" size="lg" asChild>
                  <Link href="/contacto">Contáctenos</Link>
                </Button>
                <Button variant="secondary" size="lg" asChild>
                  <Link href="/servicios">Ver servicios</Link>
                </Button>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-azul-principal to-azul-oscuro">
        <Container>
          <div className="text-center">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              ¿Tiene un proyecto en mente?
            </h2>
            <p className="text-white/90 max-w-xl mx-auto mb-8">
              Permítanos ayudarle a llevarlo a cabo. Solicite una cotización
              personalizada sin compromiso.
            </p>
            <Button variant="accent" size="lg" asChild>
              <Link href="/cotizador">Cotizar proyecto</Link>
            </Button>
          </div>
        </Container>
      </section>
    </main>
  )
}
