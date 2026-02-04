"use client"

import * as React from "react"
import Link from "next/link"
import { useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { cn } from "@/lib/utils"
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
        gsap.set("[data-hero-title], .hero-cta-wrapper", {
          opacity: 1,
          y: 0,
        })
        return
      }

      const section = sectionRef.current
      if (!section) return

      // Entrance animation timeline
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      })

      tl.from("[data-hero-title]", {
        y: 60,
        opacity: 0,
        duration: 1,
        delay: 0.2,
      }).from(
        ".hero-cta-wrapper",
        {
          y: 20,
          opacity: 0,
          duration: 0.6,
        },
        "-=0.3"
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

      </div>
    </header>
  )
}
