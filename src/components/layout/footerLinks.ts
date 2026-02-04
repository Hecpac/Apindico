import { Linkedin, Instagram, Facebook } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export interface FooterLink {
  href: string
  label: string
}

export interface SocialLink {
  href: string
  label: string
  icon: LucideIcon
}

export const FOOTER_SERVICES: FooterLink[] = [
  { href: "/servicios/inspeccion-cctv", label: "Inspección CCTV" },
  { href: "/servicios/servicios-vactor", label: "Servicios Vactor" },
  { href: "/servicios/prueba-hermeticidad", label: "Prueba de Hermeticidad" },
  { href: "/servicios/prueba-hidrostatica", label: "Prueba Hidrostática" },
]

export const FOOTER_COMPANY: FooterLink[] = [
  { href: "/nosotros", label: "Sobre Nosotros" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/certificaciones", label: "Certificaciones" },
  { href: "/trabaja-con-nosotros", label: "Trabaja con Nosotros" },
]

export const SOCIAL_LINKS: SocialLink[] = [
  { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
  { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
  { href: "https://facebook.com", icon: Facebook, label: "Facebook" },
]
