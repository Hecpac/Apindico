"use client"

import * as React from "react"
import Link from "next/link"
import { useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { ArrowRight, Video } from "lucide-react"
import { cn } from "@/lib/utils"
import { PROYECTOS } from "@/lib/constants"
import { Badge } from "@/components/ui/Badge"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface HeroSectionProps {
  className?: string
  title?: string
  subtitle?: string
  primaryCta?: {
    label: string
    href?: string
  }
  secondaryCta?: {
    label: string
    href?: string
  }
  badges?: string[]
}

// Case Study Card Component with Glassmorphism
function CaseStudyCard() {
  const proyecto = PROYECTOS[0]

  return (
    <Link
      href={`/proyectos/${proyecto.id}`}
      className={cn(
        "hero-card hero-card-fresnel group relative flex w-full max-w-md md:w-[361px] md:max-w-[361px]",
        "overflow-hidden rounded-3xl border border-white/20 bg-zinc-900/40 p-1",
        "backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-300 hover:border-orange-500/50",
        "opacity-100 translate-y-0"
      )}
    >
      <div className="flex items-center gap-4 p-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500">
          <Video className="h-6 w-6" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-medium text-zinc-400 uppercase">
            Nuevo
          </p>
          <h4 className="text-sm font-semibold text-white">
            Inspección de 15 km de red
          </h4>
          <p className="mt-1 text-xs text-zinc-400 line-clamp-2">
            {proyecto.descripcion || proyecto.titulo}
          </p>
        </div>
        <ArrowRight className="ml-auto h-4 w-4 text-orange-400 transition-transform duration-300 group-hover:translate-x-1" />
      </div>

      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-orange-500/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </Link>
  )
}

// Primary CTA Button
function PrimaryCTA({
  label,
  href = "/cotizador",
}: {
  label: string
  href?: string
}) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden inline-flex items-center justify-center px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white rounded-full font-bold shadow-[0_0_20px_rgba(234,88,12,0.3)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_28px_rgba(234,88,12,0.4)]"
    >
      <span className="pointer-events-none absolute inset-0 bg-black/25" aria-hidden="true" />
      <span className="relative z-10">{label}</span>
    </Link>
  )
}

// Secondary CTA Button
function SecondaryCTA({
  label,
  href = "/contacto",
}: {
  label: string
  href?: string
}) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center justify-center px-8 py-4 bg-white/5 backdrop-blur-md text-white border border-white/20 rounded-full font-bold text-lg hover:bg-white/10 transition-all duration-300"
    >
      <span>{label}</span>
    </Link>
  )
}

export function HeroSection({
  className,
  title = "Ingeniería que Transforma",
  subtitle,
  primaryCta = { label: "Cotizar proyecto", href: "/cotizador" },
  secondaryCta = { label: "Agendar una llamada", href: "/contacto" },
  badges,
}: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false)

  // Check for reduced motion preference
  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  // GSAP Animations
  useGSAP(
    () => {
      // Skip animations if reduced motion is preferred
      if (prefersReducedMotion) {
        gsap.set("[data-hero-title], .hero-cta-wrapper, .hero-card", {
          opacity: 1,
          y: 0,
        })
        return
      }

      const section = sectionRef.current
      if (!section) return

      // Ensure the case study card is always visible
      gsap.set(".hero-card", { opacity: 1, x: 0, y: 0 })

      // Entrance animation timeline
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      })

      tl.from("[data-hero-title]", {
        y: 60,
        opacity: 0,
        duration: 1,
        delay: 0.2,
      })

      tl.from(
        ".hero-cta-wrapper",
        {
          y: 20,
          opacity: 0,
          duration: 0.6,
        },
        "-=0.3"
      ).from(
        ".hero-card",
        {
          x: 80,
          opacity: 0,
          duration: 0.9,
          ease: "expo.out",
        },
        "-=0.4"
      )

      // Parallax effect on video/background (desktop only)
      ScrollTrigger.matchMedia({
        "(min-width: 768px)": () => {
          gsap.to(".hero-video-container", {
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: 0.5,
            },
            y: 200,
            scale: 1.1,
          })
        },
      })

      // Keep the case study card fixed (no scroll animation)
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  )

  return (
    <header
      ref={sectionRef}
      id="hero"
      className={cn(
        "hero-section relative h-screen w-full flex items-center overflow-hidden bg-black",
        className
      )}
      style={{
        background: "var(--hero-bg)",
        WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
        maskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
      }}
    >
      {/* Poster + Video Layer */}
      <div className="hero-video-container absolute inset-0 z-0 will-change-transform">
        <Image
          src="/images/hero-clean.webp"
          alt="Infraestructura de acueducto y alcantarillado APINDICO"
          fill
          priority
          className="object-cover opacity-90"
          sizes="100vw"
        />
      </div>

      {/* Overlay for legibility */}
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-zinc-950 via-transparent to-black/40" />

      {/* Main Container */}
      <div
        className="hero-content container mx-auto max-w-7xl px-6 md:px-12 relative z-30 flex h-full w-full flex-col items-center justify-start text-center text-white will-change-transform pt-32 md:pt-40 lg:pt-44 pb-24 md:pb-32 md:items-start md:text-left"
      >
        {/* Headline */}
        <div className="headline-section flex flex-col items-center md:items-start max-w-3xl gap-8">
          <div className="space-y-6 text-center md:text-left">
            <h1
              data-hero-title
              className="tracking-tighter font-black text-6xl md:text-8xl leading-[0.9]"
            >
              {title}
            </h1>
            {subtitle && (
              <p className="text-white/90 text-lg md:text-xl leading-relaxed max-w-2xl font-medium">
                {subtitle}
              </p>
            )}
            {badges && badges.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {badges.map((badge) => (
                  <Badge
                    key={badge}
                    size="sm"
                    className="bg-white/10 text-white border border-white/15"
                  >
                    {badge}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* CTA Wrapper */}
          <div className="hero-cta-wrapper flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <PrimaryCTA label={primaryCta.label} href={primaryCta.href} />
            <SecondaryCTA label={secondaryCta.label} href={secondaryCta.href} />
          </div>
        </div>

        {/* Bento Card - Static on mobile, floating on desktop */}
        <div className="mt-10 w-full max-w-md md:mt-0 md:absolute md:bottom-12 md:right-12 md:w-[361px]">
          <CaseStudyCard />
        </div>
      </div>
    </header>
  )
}
