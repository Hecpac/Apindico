"use client"

import * as React from "react"
import Link from "next/link"
import {
  MapPin,
  Phone,
  Smartphone,
  Mail,
  Linkedin,
  Instagram,
  Facebook,
  ChevronDown,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { COMPANY_INFO } from "@/lib/constants"
import { Container } from "@/components/ui/Container"

const FOOTER_SERVICES = [
  { href: "/servicios/inspeccion-cctv", label: "Inspección CCTV" },
  { href: "/servicios/servicios-vactor", label: "Servicios Vactor" },
  { href: "/servicios/prueba-hermeticidad", label: "Prueba de Hermeticidad" },
  { href: "/servicios/prueba-hidrostatica", label: "Prueba Hidrostática" },
]

const FOOTER_COMPANY = [
  { href: "/nosotros", label: "Sobre Nosotros" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/nosotros#certificaciones", label: "Certificaciones" },
  { href: "/contacto#trabaja-con-nosotros", label: "Trabaja con Nosotros" },
]

const SOCIAL_LINKS = [
  { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
  { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
  { href: "https://facebook.com", icon: Facebook, label: "Facebook" },
]

interface FooterSectionProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

function FooterSection({ title, children, defaultOpen = false }: FooterSectionProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen)

  return (
    <div className="border-b border-gris-800 md:border-0">
      {/* Mobile Accordion Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={`${isOpen ? 'Cerrar' : 'Abrir'} sección ${title}`}
        className="flex items-center justify-between w-full py-4 md:hidden hover:opacity-80 transition-opacity"
      >
        <h3 className="font-heading font-semibold text-white">{title}</h3>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-gris-400 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>

      {/* Desktop Title */}
      <h3 className="hidden md:block font-heading font-semibold text-white mb-4">
        {title}
      </h3>

      {/* Content - Responsive: Collapsible on mobile, always visible on desktop */}
      <div className="hidden md:block">
        {children}
      </div>

      {/* Mobile only: Animated collapsible */}
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
    <footer className="bg-[#2D3748]">
      {/* Main Footer Content */}
      <Container>
        <div className="pt-16 pb-8 md:pt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 md:gap-8 lg:gap-12">
            {/* Column 1 - Company Info */}
            <div className="pb-8 md:pb-0">
              {/* Logo */}
              <Link
                href="/"
                className="inline-flex items-center gap-2 font-heading font-extrabold text-xl text-white mb-4"
              >
                <span className="bg-azul-principal text-white px-2 py-1 rounded-md">
                  AP
                </span>
                <span>INDICO</span>
              </Link>

              <p className="text-gris-200 text-sm leading-relaxed mb-6 max-w-xs">
                Soluciones integrales en acueducto y alcantarillado con
                profesionalismo e innovación.
              </p>

              {/* Social Links */}
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
                      className="w-10 h-10 rounded-lg bg-gris-800 flex items-center justify-center text-gris-400 hover:bg-azul-principal hover:text-white transition-colors duration-200"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Column 2 - Services */}
            <FooterSection title="Servicios">
              <ul className="space-y-3">
                {FOOTER_SERVICES.map((service) => (
                  <li key={service.href}>
                    <Link
                      href={service.href}
                      className="text-gris-200 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {service.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/servicios"
                    className="inline-flex items-center text-amarillo hover:text-white transition-colors duration-200 text-sm font-medium"
                  >
                    Ver todos →
                  </Link>
                </li>
              </ul>
            </FooterSection>

            {/* Column 3 - Company Links */}
            <FooterSection title="Empresa">
              <ul className="space-y-3">
                {FOOTER_COMPANY.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gris-200 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterSection>

            {/* Column 4 - Contact */}
            <FooterSection title="Contacto">
              <ul className="space-y-4">
                <li>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(COMPANY_INFO.address.principal)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 text-gris-200 hover:text-white transition-colors duration-200 group"
                  >
                    <MapPin className="h-5 w-5 text-amarillo shrink-0 mt-0.5" />
                    <span className="text-sm">{COMPANY_INFO.address.principal}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${COMPANY_INFO.phones.fijo.replace(/\s/g, "")}`}
                    className="flex items-center gap-3 text-gris-200 hover:text-white transition-colors duration-200"
                  >
                    <Phone className="h-5 w-5 text-amarillo shrink-0" />
                    <span className="text-sm">{COMPANY_INFO.phones.fijo}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${COMPANY_INFO.phones.celulares[0].replace(/\s/g, "")}`}
                    className="flex items-center gap-3 text-gris-200 hover:text-white transition-colors duration-200"
                  >
                    <Smartphone className="h-5 w-5 text-amarillo shrink-0" />
                    <span className="text-sm">{COMPANY_INFO.phones.celulares[0]}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${COMPANY_INFO.emails.info}`}
                    className="flex items-center gap-3 text-gris-200 hover:text-white transition-colors duration-200"
                  >
                    <Mail className="h-5 w-5 text-amarillo shrink-0" />
                    <span className="text-sm">{COMPANY_INFO.emails.info}</span>
                  </a>
                </li>
              </ul>
            </FooterSection>
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-gris-800">
        <Container>
          <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gris-200 text-sm text-center md:text-left">
              © {currentYear} {COMPANY_INFO.name} Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacidad"
                className="text-gris-200 hover:text-white text-sm transition-colors duration-200"
              >
                Política de Privacidad
              </Link>
              <Link
                href="/terminos"
                className="text-gris-200 hover:text-white text-sm transition-colors duration-200"
              >
                Términos de Uso
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  )
}
