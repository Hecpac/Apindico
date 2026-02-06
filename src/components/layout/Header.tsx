"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { SERVICIOS } from "@/lib/constants"
import { SERVICE_ICON_MAP } from "@/lib/serviceIcons"
import copy from "@/lib/copy"
import { Button } from "@/components/ui/Button"
import { useQuoteStep } from "@/components/providers/QuoteStepProvider"

const NAV_LINKS = [
  { href: "/proyectos", label: copy.nav.projects },
  { href: "/nosotros", label: copy.nav.about },
  { href: "/contacto", label: copy.nav.contact },
]

export function Header() {
  const pathname = usePathname()
  const { currentStep } = useQuoteStep()
  const quoteCta = copy.nav.quoteCta
  const quoteCtaCompact = quoteCta.split(" ")[0] ?? quoteCta
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [isServicesOpen, setIsServicesOpen] = React.useState(false)
  const servicesRef = React.useRef<HTMLDivElement>(null)
  const mobileMenuRef = React.useRef<HTMLDivElement>(null)
  const closeButtonRef = React.useRef<HTMLButtonElement>(null)
  const lastFocusedElementRef = React.useRef<HTMLElement | null>(null)

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  React.useEffect(() => {
    setIsMobileMenuOpen(false)
    setIsServicesOpen(false)
  }, [pathname])

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

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

  React.useEffect(() => {
    if (!isMobileMenuOpen || !mobileMenuRef.current) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        setIsMobileMenuOpen(false)
        return
      }

      if (event.key !== "Tab") return

      const focusable = Array.from(
        mobileMenuRef.current?.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])"
        ) ?? []
      )

      if (!focusable.length) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement as HTMLElement | null

      if (event.shiftKey && active === first) {
        event.preventDefault()
        last.focus()
      }

      if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isMobileMenuOpen])

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[80] focus:px-4 focus:py-2 focus:rounded-[var(--radius-md)] focus:bg-[color:var(--color-surface-2)] focus:text-[color:var(--color-text)]"
      >
        Saltar al contenido
      </a>

      <header className="site-header fixed inset-x-0 top-0 z-50 pointer-events-none">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-3">
          <nav
            role="navigation"
            aria-label="Navegación principal"
            className={cn(
              "pointer-events-auto flex items-center justify-between rounded-full border pl-6 pr-4 sm:pl-8 sm:pr-5 lg:pl-10 lg:pr-6 xl:pr-8 transition-all duration-300",
              "backdrop-blur-[32px]",
              isScrolled
                ? "h-14 border-[color:var(--color-border)] bg-[color:var(--color-bg)]/90 shadow-[var(--shadow-2)]"
                : "h-16 lg:h-[72px] border-white/15 bg-[color:var(--color-bg)]/60 shadow-[var(--shadow-1)]"
            )}
          >
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2 font-heading font-extrabold leading-none text-white">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[color:var(--color-accent)] text-[10px] font-bold text-white ring-1 ring-white/10">
                  AP
                </span>
                <span>INDICO</span>
              </Link>
              {pathname?.startsWith("/cotizador") && (
                <span className="hidden xl:inline-flex items-center gap-1 rounded-full border border-[color:var(--color-border)] bg-white/5 px-2 py-1 text-xs text-[color:var(--color-muted)]">
                  Paso <span className="font-semibold text-[color:var(--color-accent)]">{currentStep}</span>/4
                </span>
              )}
            </div>

            <div className="hidden lg:flex min-w-0 flex-1 items-center justify-center px-3 xl:px-6">
              <div
                className={cn(
                  "flex w-full max-w-[clamp(30rem,50vw,42rem)] items-center justify-center",
                  isScrolled
                    ? "gap-[clamp(0.65rem,1.4vw,1.1rem)]"
                    : "gap-[clamp(0.85rem,1.8vw,1.5rem)]"
                )}
              >
                <div ref={servicesRef} className="relative shrink-0">
                  <div className="flex items-center gap-1 font-body text-sm font-medium text-white xl:text-base">
                    <Link href="/servicios" className="transition-colors hover:text-[color:var(--color-accent-2)]">
                      {copy.nav.services}
                    </Link>
                    <button
                      type="button"
                      onClick={() => setIsServicesOpen((prev) => !prev)}
                      aria-expanded={isServicesOpen}
                      aria-haspopup="true"
                      aria-label="Abrir menú de servicios"
                      className="rounded-full p-1 transition-colors hover:bg-white/10"
                    >
                      <ChevronDown className={cn("h-4 w-4 transition-transform", isServicesOpen && "rotate-180")} />
                    </button>
                  </div>

                  <AnimatePresence>
                    {isServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-1/2 top-full z-50 mt-4 w-[640px] -translate-x-1/2 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-4 shadow-[var(--shadow-3)]"
                      >
                        <div className="grid grid-cols-2 gap-2">
                          {SERVICIOS.map((servicio) => {
                            const IconComponent = SERVICE_ICON_MAP[servicio.icon]
                            return (
                              <Link
                                key={servicio.id}
                                href={`/servicios/${servicio.slug}`}
                                className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-white/6"
                                onClick={() => setIsServicesOpen(false)}
                              >
                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg)]/70 text-[color:var(--color-accent)] transition-colors group-hover:bg-[color:var(--color-accent)]/15">
                                  {IconComponent ? <IconComponent className="h-5 w-5" strokeWidth={1.75} /> : null}
                                </div>
                                <span className="text-sm font-semibold text-[color:var(--color-text)] group-hover:text-[color:var(--color-accent-2)]">
                                  {servicio.nombre}
                                </span>
                              </Link>
                            )
                          })}
                        </div>
                        <div className="mt-4 border-t border-[color:var(--color-border)] pt-4">
                          <Link
                            href="/servicios"
                            className="text-sm font-medium text-[color:var(--color-accent)] transition-colors hover:text-[color:var(--color-accent-2)]"
                            onClick={() => setIsServicesOpen(false)}
                          >
                            {copy.home.services.cta} →
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "shrink-0 font-body text-sm font-medium transition-colors xl:text-base",
                      pathname === link.href
                        ? "text-[color:var(--color-accent)]"
                        : "text-white hover:text-[color:var(--color-accent-2)]"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="hidden lg:block">
              <Button variant="cta" size={isScrolled ? "sm" : "md"} asChild>
                <Link href="/cotizador">
                  <span className="hidden 2xl:inline">{isScrolled ? quoteCtaCompact : quoteCta}</span>
                  <span className="inline 2xl:hidden">{quoteCtaCompact}</span>
                </Link>
              </Button>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="lg:hidden p-2 text-white"
              aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 280 }}
              className="fixed bottom-0 right-0 top-0 z-50 w-[320px] border-l border-[color:var(--color-border)] bg-[color:var(--color-surface)] shadow-[var(--shadow-3)] lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Menú de navegación móvil"
              ref={mobileMenuRef}
            >
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b border-[color:var(--color-border)] p-4">
                  <span className="font-heading text-lg font-bold text-[color:var(--color-text)]">Menú</span>
                  <button
                    ref={closeButtonRef}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="rounded-md p-2 text-[color:var(--color-muted)] hover:text-[color:var(--color-text)]"
                    aria-label="Cerrar menú"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <nav role="navigation" aria-label="Navegación móvil" className="flex-1 overflow-y-auto p-4">
                  <div className="mb-4">
                    <div className="flex items-center justify-between py-3 text-[color:var(--color-text)]">
                      <Link href="/servicios" onClick={() => setIsMobileMenuOpen(false)}>
                        {copy.nav.services}
                      </Link>
                      <button
                        type="button"
                        onClick={() => setIsServicesOpen((prev) => !prev)}
                        aria-expanded={isServicesOpen}
                        aria-label="Abrir menú de servicios"
                        className="rounded-full p-1"
                      >
                        <ChevronDown className={cn("h-4 w-4 transition-transform", isServicesOpen && "rotate-180")} />
                      </button>
                    </div>

                    <AnimatePresence>
                      {isServicesOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-1 pb-2 pl-4">
                            {SERVICIOS.map((servicio) => {
                              const IconComponent = SERVICE_ICON_MAP[servicio.icon]
                              return (
                                <Link
                                  key={servicio.id}
                                  href={`/servicios/${servicio.slug}`}
                                  className="flex items-center gap-3 py-2 text-sm text-[color:var(--color-muted)] hover:text-[color:var(--color-accent)]"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  {IconComponent ? <IconComponent className="h-4 w-4" strokeWidth={1.75} /> : null}
                                  {servicio.nombre}
                                </Link>
                              )
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "block py-3 transition-colors",
                        pathname === link.href ? "text-[color:var(--color-accent)]" : "text-[color:var(--color-text)] hover:text-[color:var(--color-accent-2)]"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                <div className="border-t border-[color:var(--color-border)] p-4">
                  <Button variant="cta" className="w-full" asChild>
                    <Link href="/cotizador" onClick={() => setIsMobileMenuOpen(false)}>
                      {quoteCta}
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
