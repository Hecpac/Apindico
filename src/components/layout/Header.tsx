"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown } from "lucide-react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { cn } from "@/lib/utils"
import { SERVICIOS } from "@/lib/constants"
import { Button } from "@/components/ui/Button"
import { useQuoteStep } from "@/components/providers/QuoteStepProvider"

const NAV_LINKS = [
  { href: "/proyectos", label: "Proyectos" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
]

export function Header() {
  const pathname = usePathname()
  const { currentStep } = useQuoteStep()
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [isServicesOpen, setIsServicesOpen] = React.useState(false)
  const headerRef = React.useRef<HTMLElement>(null)
  const servicesRef = React.useRef<HTMLDivElement>(null)
  const mobileMenuRef = React.useRef<HTMLDivElement>(null)
  const closeButtonRef = React.useRef<HTMLButtonElement>(null)
  const mobileMenuButtonRef = React.useRef<HTMLButtonElement>(null)
  const lastFocusedElementRef = React.useRef<HTMLElement | null>(null)

  // Handle scroll effect
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu on route change
  React.useEffect(() => {
    setIsMobileMenuOpen(false)
    setIsServicesOpen(false)
  }, [pathname])

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        servicesRef.current &&
        !servicesRef.current.contains(event.target as Node)
      ) {
        setIsServicesOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Prevent body scroll when mobile menu is open
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
      lastFocusedElementRef.current = document.activeElement as HTMLElement | null
      closeButtonRef.current?.focus()
    } else {
      document.body.style.overflow = ""
      if (lastFocusedElementRef.current) {
        lastFocusedElementRef.current.focus()
        lastFocusedElementRef.current = null
      }
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobileMenuOpen])

  // Focus trap for mobile menu
  React.useEffect(() => {
    if (!isMobileMenuOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        setIsMobileMenuOpen(false)
        return
      }

      if (event.key !== "Tab") return
      if (!mobileMenuRef.current) return

      const focusableSelectors = [
        "a[href]",
        "button:not([disabled])",
        "input:not([disabled])",
        "select:not([disabled])",
        "textarea:not([disabled])",
        "[tabindex]:not([tabindex='-1'])",
      ]
      const focusable = Array.from(
        mobileMenuRef.current.querySelectorAll<HTMLElement>(
          focusableSelectors.join(",")
        )
      ).filter((el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden"))

      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const isShift = event.shiftKey
      const active = document.activeElement as HTMLElement | null

      if (isShift && active === first) {
        event.preventDefault()
        last.focus()
      } else if (!isShift && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isMobileMenuOpen])

  useGSAP(() => {
    if (!headerRef.current) return
    const tl = gsap.timeline()
    tl.to(headerRef.current, {
      opacity: 0.96,
      duration: 1.2,
      yoyo: true,
      repeat: 1,
      ease: "sine.inOut",
    })
  }, [])

  const ctaBaseClasses = cn(
    "relative overflow-hidden",
    "bg-gradient-to-r from-orange-500 to-orange-600 text-white",
    "shadow-[0_0_20px_rgba(234,88,12,0.3)]",
    "before:absolute before:inset-0 before:rounded-lg before:bg-black/25 before:content-[''] before:z-0",
    "focus-visible:ring-2 focus-visible:ring-orange-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
  )

  return (
    <>
      {/* Skip Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-azul-principal focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none"
      >
        Saltar al contenido
      </a>

      <header
        ref={headerRef}
        className={cn(
          "site-header fixed top-0 w-full z-50 transition-all duration-500",
          isScrolled ? "bg-zinc-950/80 backdrop-blur-md" : "bg-transparent",
          isScrolled ? "pt-6" : "pt-8"
        )}
      >
        <div className="container mx-auto px-6 md:px-12">
          <nav
            role="navigation"
            aria-label="Navegación principal"
            className={cn(
              "flex items-center justify-between transition-all duration-300",
              isScrolled
                ? "h-14 px-6 mx-auto max-w-7xl bg-white/80 backdrop-blur-md border border-azul-principal/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-full"
                : "h-16 md:h-20 bg-transparent"
            )}
          >
            {/* Logo + Mini Label */}
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className={cn(
                  "flex items-center gap-2 font-heading font-extrabold transition-all duration-300",
                  isScrolled ? "text-lg" : "text-xl md:text-2xl"
                )}
              >
                <span className="bg-azul-principal text-white px-2 py-1 rounded-md">
                  AP
                </span>
                <span className={cn(
                  "text-azul-principal",
                  !isScrolled && "text-white md:text-azul-principal"
                )}>
                  INDICO
                </span>
              </Link>
              {pathname?.startsWith("/cotizador") && (
                <span
                  className={cn(
                    "inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full border",
                    isScrolled
                      ? "text-gris-700 border-azul-principal/15 bg-azul-principal/5"
                      : "text-white/90 border-white/15 bg-white/10"
                  )}
                >
                  Paso
                  <span className="font-semibold text-[#FF6B00]">
                    {currentStep}
                  </span>
                  /4
                </span>
              )}
            </div>

            {/* Desktop Navigation */}
            <div className={cn(
              "hidden md:flex items-center transition-all duration-300",
              isScrolled ? "gap-4" : "gap-8"
            )}>
              {/* Services Dropdown */}
              <div ref={servicesRef} className="relative">
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  aria-expanded={isServicesOpen}
                  aria-haspopup="true"
                  aria-label="Menú de servicios"
                  className={cn(
                    "flex items-center gap-1 font-body font-medium transition-all duration-300",
                    isScrolled
                      ? "text-azul-principal hover:text-cyan text-sm"
                      : "text-white hover:text-cyan",
                    isServicesOpen && "text-cyan"
                  )}
                >
                  Servicios
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      isServicesOpen && "rotate-180"
                    )}
                    aria-hidden="true"
                  />
                </button>

                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[600px] bg-white rounded-xl shadow-xl border border-azul-principal/10 p-4"
                    >
                      <div className="grid grid-cols-2 gap-2">
                        {SERVICIOS.map((servicio) => (
                          <Link
                            key={servicio.id}
                            href={`/servicios/${servicio.slug}`}
                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-azul-principal/5 transition-colors group"
                            onClick={() => setIsServicesOpen(false)}
                          >
                            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-azul-principal/10 flex items-center justify-center group-hover:bg-coral-energetico transition-colors">
                              <span className="text-lg">{servicio.icon}</span>
                            </div>
                            <div>
                              <span className="font-heading font-semibold text-sm text-azul-principal group-hover:text-coral-energetico transition-colors">
                                {servicio.nombre}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-4 pt-4 border-t border-azul-principal/10">
                        <Link
                          href="/servicios"
                          className="text-sm font-medium text-coral-energetico hover:text-coral-oscuro transition-colors"
                          onClick={() => setIsServicesOpen(false)}
                        >
                          Ver todos los servicios →
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Other Links */}
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "font-body font-medium transition-all duration-300",
                    pathname === link.href
                      ? "text-coral-energetico"
                      : isScrolled
                        ? "text-azul-principal hover:text-cyan text-sm"
                        : "text-white hover:text-cyan"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <Button
                variant="cta"
                size={isScrolled ? "sm" : "md"}
                asChild
                className={cn("!rounded-lg !border-none", ctaBaseClasses)}
              >
                <Link href="/cotizador">
                  <span className="relative z-10">
                    {isScrolled ? "Cotizar" : "Cotizar Ahora"}
                  </span>
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              ref={mobileMenuButtonRef}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gris-800"
              aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[300px] bg-white z-50 md:hidden shadow-xl"
              role="dialog"
              aria-modal="true"
              aria-label="Menú de navegación móvil"
              ref={mobileMenuRef}
            >
              <div className="flex flex-col h-full">
                {/* Drawer Header */}
                <div className="flex items-center justify-between p-4 border-b border-azul-principal/10">
                  <span className="font-heading font-bold text-lg text-azul-principal">
                    Menú
                  </span>
                  <button
                    ref={closeButtonRef}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-gris-600 hover:text-gris-900"
                    aria-label="Cerrar menú"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Drawer Content */}
                <nav
                  role="navigation"
                  aria-label="Navegación móvil"
                  className="flex-1 overflow-y-auto p-4"
                >
                  {/* Services Accordion */}
                  <div className="mb-4">
                    <button
                      onClick={() => setIsServicesOpen(!isServicesOpen)}
                      aria-expanded={isServicesOpen}
                      aria-label="Menú de servicios"
                      className="flex items-center justify-between w-full py-3 font-body font-medium text-gris-800 hover:text-azul-principal transition-colors"
                    >
                      Servicios
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform duration-200",
                          isServicesOpen && "rotate-180"
                        )}
                        aria-hidden="true"
                      />
                    </button>

                    <AnimatePresence>
                      {isServicesOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 py-2 space-y-1">
                            {SERVICIOS.map((servicio) => (
                              <Link
                                key={servicio.id}
                                href={`/servicios/${servicio.slug}`}
                                className="flex items-center gap-3 py-2 text-sm text-gris-600 hover:text-coral-energetico transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                <span>{servicio.icon}</span>
                                {servicio.nombre}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Other Links */}
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "block py-3 font-body font-medium transition-colors",
                        pathname === link.href
                          ? "text-coral-energetico"
                          : "text-azul-principal hover:text-coral-energetico"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                {/* Drawer Footer */}
                <div className="p-4 border-t border-azul-principal/10">
                  <Link
                    href="/cotizador"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "w-full inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-all duration-300",
                      ctaBaseClasses
                    )}
                  >
                    <span className="relative z-10">Cotizar Ahora</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
