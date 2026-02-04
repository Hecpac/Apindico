import type { Metadata } from "next"
import Link from "next/link"
import { Container } from "@/components/ui/Container"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"

export const metadata: Metadata = {
  title: "Trabaja con Nosotros",
  description: "Oportunidades de colaboración y talento en APINDICO S.A.S.",
}

export default function TrabajaConNosotrosPage() {
  return (
    <main className="min-h-screen bg-gris-100">
      <section className="bg-gradient-to-br from-azul-oscuro via-azul-principal to-azul-oscuro pt-32 pb-16 md:pt-40 md:pb-20">
        <Container>
          <div className="text-center text-white">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              Trabaja con Nosotros
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Buscamos talento técnico comprometido con la excelencia en ingeniería.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container size="md">
          <Card className="p-6 md:p-10">
            <div className="space-y-4 text-gris-800 leading-relaxed">
              <p>
                Si deseas sumarte a nuestros proyectos, comparte tu perfil y
                experiencia. Evaluamos perfiles técnicos y operativos para
                acompañar la expansión de nuestros servicios.
              </p>
              <p>
                Envíanos tu hoja de vida y datos de contacto. Nuestro equipo de
                talento se comunicará si existe una vacante acorde a tu perfil.
              </p>
              <div className="pt-4">
                <Button variant="primary" size="md" asChild>
                  <Link href="/contacto">Enviar información</Link>
                </Button>
              </div>
            </div>
          </Card>
        </Container>
      </section>
    </main>
  )
}
