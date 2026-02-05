import type { Metadata } from "next"
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react"
import { Container } from "@/components/ui/Container"
import { Card, CardContent } from "@/components/ui/Card"
import { ContactForm } from "@/components/forms/ContactForm"
import { Button } from "@/components/ui/Button"
import { COMPANY_INFO } from "@/lib/constants"
import copy from "@/lib/copy"

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contáctenos para cotizaciones y consultas sobre servicios de acueducto y alcantarillado. Ubicados en Bogotá, Colombia.",
}

const formatPhoneLink = (value: string) => value.replace(/[^\d+]/g, "")
const formatWhatsappLink = (value: string) =>
  `https://wa.me/${value.replace(/\D/g, "")}`

const contactInfo = [
  {
    icon: MapPin,
    label: "Dirección Principal",
    value: COMPANY_INFO.address.principal,
    href: `https://maps.google.com/?q=${encodeURIComponent(COMPANY_INFO.address.principal)}`,
  },
  {
    icon: Phone,
    label: "Teléfono Fijo",
    value: COMPANY_INFO.phones.fijo,
    href: `tel:${formatPhoneLink(COMPANY_INFO.phones.fijo)}`,
  },
  {
    icon: Phone,
    label: "Celular Principal",
    value: COMPANY_INFO.phones.celulares[0],
    href: `tel:${formatPhoneLink(COMPANY_INFO.phones.celulares[0])}`,
  },
  {
    icon: Mail,
    label: "Correo Electrónico",
    value: COMPANY_INFO.emails.info,
    href: `mailto:${COMPANY_INFO.emails.info}`,
  },
]

export default function ContactoPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
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
                Contacto
              </div>
              <h1 className="mt-3 font-heading font-extrabold tracking-[-0.02em] leading-[var(--line-height-tight-display)] text-[length:var(--fluid-h1)] text-balance">
                {copy.contact.title}
              </h1>
            </div>

            <div className="col-span-4 md:col-start-8 md:col-span-3 md:mt-16">
              <p className="text-[length:var(--fluid-body)] text-white/90 leading-[var(--line-height-body)] max-w-[44ch]">
                {copy.contact.subtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-gris-100">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <div>
              <Card className="p-6 md:p-8">
                <h2 className="font-heading text-2xl font-bold text-azul-principal mb-6">
                  Envíenos un mensaje
                </h2>
                <ContactForm />
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="font-heading text-2xl font-bold text-azul-principal mb-6">
                  Información de Contacto
                </h2>
                <div className="space-y-4">
                  {contactInfo.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      target={item.icon === MapPin ? "_blank" : undefined}
                      rel={item.icon === MapPin ? "noopener noreferrer" : undefined}
                      className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow group"
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-azul-principal/10 ring-1 ring-azul-principal/10 flex items-center justify-center group-hover:bg-azul-principal/20 transition-colors">
                        <item.icon className="w-5 h-5 text-azul-principal group-hover:text-azul-oscuro transition-colors" />
                      </div>
                      <div>
                        <p className="text-sm text-gris-800 font-medium mb-1">{item.label}</p>
                        <p className="font-semibold text-azul-principal group-hover:text-azul-oscuro transition-colors">
                          {item.value}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
                <div className="mt-6">
                  <Button variant="cta" size="md" asChild>
                    <a
                      href={formatWhatsappLink(COMPANY_INFO.phones.celulares[0])}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      Escribir por WhatsApp
                    </a>
                  </Button>
                </div>
              </div>

              {/* Business Hours */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-azul-principal/10 ring-1 ring-azul-principal/10 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-azul-principal" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg text-gris-900">
                      Horario de Atención
                    </h3>
                  </div>
                  <div className="space-y-2 text-gris-800">
                    <p className="flex justify-between">
                      <span>Lunes - Viernes:</span>
                      <span className="font-semibold text-azul-principal">
                        8:00 AM - 6:00 PM
                      </span>
                    </p>
                    <p className="flex justify-between">
                      <span>Sábado:</span>
                      <span className="font-semibold text-azul-principal">
                        8:00 AM - 1:00 PM
                      </span>
                    </p>
                    <p className="flex justify-between">
                      <span>Domingo:</span>
                      <span className="font-medium text-gris-800">Cerrado</span>
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Map */}
              <Card className="overflow-hidden">
                <div className="h-64 bg-white flex items-center justify-center border-b border-gris-200">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.6899889697516!2d-74.1237!3d4.6694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwNDAnMDkuOCJOIDc0wrAwNyczMy4zIlc!5e0!3m2!1ses!2sco!4v1700000000000!5m2!1ses!2sco"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación de APINDICO"
                    className="w-full h-full"
                  />
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-gris-800">
                    <span className="font-semibold text-azul-principal">Oficina Técnica:</span>{" "}
                    {COMPANY_INFO.address.oficinaTecnica}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
