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
const formatWhatsappLink = (value: string) => `https://wa.me/${value.replace(/\D/g, "")}`

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
    <main className="min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-text)]">
      <section className="bg-[linear-gradient(130deg,#071a2d_0%,#0b2746_55%,#0f3556_100%)] pb-16 pt-36 md:pb-20 md:pt-44">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10 xl:px-[100px]">
          <div className="grid grid-cols-4 gap-6 text-white md:grid-cols-12">
            <div className="col-span-4 md:col-span-1">
              <div className="text-xs uppercase tracking-[0.1em] text-[color:var(--color-muted)]">05</div>
            </div>

            <div className="col-span-4 md:col-start-2 md:col-span-7">
              <div className="text-xs uppercase tracking-[0.1em] text-[color:var(--color-muted)]">Contacto</div>
              <h1 className="mt-3 text-balance font-heading text-[length:var(--fluid-h1)] font-extrabold tracking-[-0.02em] leading-[var(--line-height-tight-display)]">
                {copy.contact.title}
              </h1>
            </div>

            <div className="col-span-4 md:col-start-8 md:col-span-3 md:mt-16">
              <p className="max-w-[44ch] text-[length:var(--fluid-body)] leading-[var(--line-height-body)] text-[color:var(--color-muted)]">
                {copy.contact.subtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--color-bg)] py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Card className="border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6 text-[color:var(--color-text)] md:p-8">
                <h2 className="mb-6 font-heading text-2xl font-bold text-[color:var(--color-text)]">Envíenos un mensaje</h2>
                <ContactForm />
              </Card>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="mb-6 font-heading text-2xl font-bold text-[color:var(--color-text)]">Información de Contacto</h2>
                <div className="space-y-4">
                  {contactInfo.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      target={item.icon === MapPin ? "_blank" : undefined}
                      rel={item.icon === MapPin ? "noopener noreferrer" : undefined}
                      className="group flex items-start gap-4 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-4 shadow-[var(--shadow-1)] transition-shadow hover:shadow-[var(--shadow-2)]"
                    >
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-[color:var(--color-accent)]/12 ring-1 ring-[color:var(--color-accent)]/20 transition-colors group-hover:bg-[color:var(--color-accent)]/18">
                        <item.icon className="h-5 w-5 text-[color:var(--color-accent)]" />
                      </div>
                      <div>
                        <p className="mb-1 text-sm font-medium text-[color:var(--color-muted)]">{item.label}</p>
                        <p className="font-semibold text-[color:var(--color-text)]">{item.value}</p>
                      </div>
                    </a>
                  ))}
                </div>
                <div className="mt-6">
                  <Button variant="cta" size="md" asChild>
                    <a href={formatWhatsappLink(COMPANY_INFO.phones.celulares[0])} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="h-4 w-4" aria-hidden="true" />
                      Escribir por WhatsApp
                    </a>
                  </Button>
                </div>
              </div>

              <Card className="border-[color:var(--color-border)] bg-[color:var(--color-surface)] text-[color:var(--color-text)]">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[color:var(--color-accent)]/12 ring-1 ring-[color:var(--color-accent)]/20">
                      <Clock className="h-5 w-5 text-[color:var(--color-accent)]" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-[color:var(--color-text)]">Horario de Atención</h3>
                  </div>
                  <div className="space-y-2 text-[color:var(--color-muted)]">
                    <p className="flex justify-between">
                      <span>Lunes - Viernes:</span>
                      <span className="font-semibold text-[color:var(--color-text)]">8:00 AM - 6:00 PM</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Sábado:</span>
                      <span className="font-semibold text-[color:var(--color-text)]">8:00 AM - 1:00 PM</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Domingo:</span>
                      <span className="font-medium text-[color:var(--color-muted)]">Cerrado</span>
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-[color:var(--color-border)] bg-[color:var(--color-surface)] text-[color:var(--color-text)]">
                <div className="h-64 border-b border-[color:var(--color-border)] bg-white">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.6899889697516!2d-74.1237!3d4.6694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwNDAnMDkuOCJOIDc0wrAwNyczMy4zIlc!5e0!3m2!1ses!2sco!4v1700000000000!5m2!1ses!2sco"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación de APINDICO"
                    className="h-full w-full"
                  />
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-[color:var(--color-muted)]">
                    <span className="font-semibold text-[color:var(--color-text)]">Oficina Técnica:</span>{" "}
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
