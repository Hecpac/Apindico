"use client"

import * as React from "react"
import Link from "next/link"
import { MapPin, Phone, Smartphone, Mail, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { COMPANY_INFO } from "@/lib/constants"
import copy from "@/lib/copy"
import { Container } from "@/components/ui/Container"
import { FOOTER_SERVICES, FOOTER_COMPANY, SOCIAL_LINKS } from "@/components/layout/footerLinks"

interface FooterSectionProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

function FooterSection({ title, children, defaultOpen = false }: FooterSectionProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen)
  const [isDesktop, setIsDesktop] = React.useState(false)

  React.useEffect(() => {
    if (typeof window === "undefined") return

    const mediaQuery = window.matchMedia("(min-width: 768px)")
    const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
      const matches = "matches" in event ? event.matches : mediaQuery.matches
      setIsDesktop(matches)
      setIsOpen(matches ? true : defaultOpen)
    }

    handleChange(mediaQuery)
    mediaQuery.addEventListener("change", handleChange)

    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [defaultOpen])

  return (
    <div className="border-b border-[color:var(--color-border)] md:border-0">
      <button
        type="button"
        onClick={() => !isDesktop && setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label={`${isOpen ? "Cerrar" : "Abrir"} sección ${title}`}
        className="flex w-full items-center justify-between py-4 text-left md:cursor-default"
      >
        <span className="font-heading text-[color:var(--color-text)] font-semibold">{title}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-[color:var(--color-dim)] transition-transform duration-200 md:hidden",
            isOpen && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>

      <div className="hidden md:block">{children}</div>

      <div className="md:hidden">
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="pb-4">{children}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-[color:var(--color-text)]">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-28 left-1/4 h-64 w-64 rounded-full bg-[color:var(--color-accent)]/15 blur-3xl" />
        <div className="absolute -bottom-20 right-1/4 h-64 w-64 rounded-full bg-[color:var(--color-accent-2)]/14 blur-3xl" />
      </div>

      <Container className="relative">
        <div className="pb-8 pt-16 md:pt-20">
          <div className="grid grid-cols-1 gap-0 md:grid-cols-2 md:gap-8 lg:grid-cols-4 lg:gap-12">
            <div className="pb-8 md:pb-0">
              <Link href="/" className="mb-4 inline-flex items-center gap-2 text-xl font-heading font-extrabold text-[color:var(--color-text)]">
                <span className="rounded-md bg-[color:var(--color-accent)] px-2 py-1 text-white">AP</span>
                <span>INDICO</span>
              </Link>

              <p className="mb-6 max-w-xs text-sm leading-relaxed text-[color:var(--color-muted)]">
                {copy.global.tagline}
              </p>

              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface)] text-[color:var(--color-muted)] transition-colors duration-200 hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent-2)]"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  )
                })}
              </div>
            </div>

            <FooterSection title="Servicios">
              <ul className="space-y-3">
                {FOOTER_SERVICES.map((service) => (
                  <li key={service.href}>
                    <Link
                      href={service.href}
                      className="text-sm text-[color:var(--color-muted)] transition-colors duration-200 hover:text-[color:var(--color-accent-2)]"
                    >
                      {service.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/servicios"
                    className="inline-flex items-center text-sm font-medium text-[color:var(--color-accent)] transition-colors duration-200 hover:text-[color:var(--color-accent-2)]"
                  >
                    Ver todos →
                  </Link>
                </li>
              </ul>
            </FooterSection>

            <FooterSection title="Empresa">
              <ul className="space-y-3">
                {FOOTER_COMPANY.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[color:var(--color-muted)] transition-colors duration-200 hover:text-[color:var(--color-accent-2)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterSection>

            <FooterSection title="Contacto">
              <ul className="space-y-4">
                <li>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(COMPANY_INFO.address.principal)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-3 text-[color:var(--color-muted)] transition-colors duration-200 hover:text-[color:var(--color-text)]"
                  >
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--color-accent)]" />
                    <span className="text-sm">{COMPANY_INFO.address.principal}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${COMPANY_INFO.phones.fijo.replace(/\s/g, "")}`}
                    className="flex items-center gap-3 text-[color:var(--color-muted)] transition-colors duration-200 hover:text-[color:var(--color-text)]"
                  >
                    <Phone className="h-5 w-5 shrink-0 text-[color:var(--color-accent)]" />
                    <span className="text-sm">{COMPANY_INFO.phones.fijo}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${COMPANY_INFO.phones.celulares[0].replace(/\s/g, "")}`}
                    className="flex items-center gap-3 text-[color:var(--color-muted)] transition-colors duration-200 hover:text-[color:var(--color-text)]"
                  >
                    <Smartphone className="h-5 w-5 shrink-0 text-[color:var(--color-accent)]" />
                    <span className="text-sm">{COMPANY_INFO.phones.celulares[0]}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${COMPANY_INFO.emails.info}`}
                    className="flex items-center gap-3 text-[color:var(--color-muted)] transition-colors duration-200 hover:text-[color:var(--color-text)]"
                  >
                    <Mail className="h-5 w-5 shrink-0 text-[color:var(--color-accent)]" />
                    <span className="text-sm">{COMPANY_INFO.emails.info}</span>
                  </a>
                </li>
              </ul>
            </FooterSection>
          </div>
        </div>
      </Container>

      <div className="relative border-t border-[color:var(--color-border)]">
        <Container>
          <div className="flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
            <p className="text-center text-sm text-[color:var(--color-muted)] md:text-left">
              © {currentYear} {COMPANY_INFO.name} Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacidad" className="text-sm text-[color:var(--color-muted)] transition-colors hover:text-[color:var(--color-accent-2)]">
                Política de Privacidad
              </Link>
              <Link href="/terminos" className="text-sm text-[color:var(--color-muted)] transition-colors hover:text-[color:var(--color-accent-2)]">
                Términos de Uso
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  )
}
