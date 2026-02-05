"use client"

import * as React from "react"
import Link from "next/link"
import { useRef } from "react"
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
      className="group relative overflow-hidden inline-flex w-full sm:w-auto items-center justify-center px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white rounded-md font-bold shadow-[0_0_20px_rgba(234,88,12,0.3)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_28px_rgba(234,88,12,0.4)]"
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
      className="group inline-flex w-full sm:w-auto items-center justify-center px-8 py-4 bg-white/5 backdrop-blur-md text-white border border-white/20 rounded-md font-bold text-lg hover:bg-white/10 transition-all duration-300"
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
        {prefersReducedMotion ? (
          <div className="absolute inset-0">
            <img
              src="/images/hero-clean.webp"
              alt="Infraestructura de acueducto y alcantarillado APINDICO"
              className="h-full w-full object-cover opacity-90"
            />
          </div>
        ) : (
          <video
            className="h-full w-full object-cover opacity-90"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/images/hero-clean.webp"
            aria-hidden="true"
          >
            <source src="/videos/Hero.webm" type="video/webm" />
            <source src="/videos/Hero.mp4" type="video/mp4" />
          </video>
        )}
      </div>

      {/* Overlay for legibility */}
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-zinc-950 via-transparent to-black/40" />

      {/* Main Container */}
      <div className="hero-content mx-auto max-w-[1440px] px-6 md:px-10 xl:px-[100px] relative z-30 flex h-full w-full flex-col justify-start text-white will-change-transform pt-28 md:pt-36 lg:pt-40 pb-24 md:pb-32">
        <div className="grid grid-cols-4 md:grid-cols-12 gap-6 w-full">
          <div className="col-span-4 md:col-span-1">
            <div className="text-xs uppercase tracking-[0.1em] text-white/70">
              01
            </div>
          </div>

          <div className="col-span-4 md:col-start-2 md:col-span-7">
            <div className="space-y-8 text-left">
              <div className="space-y-6">
                <h1
                  data-hero-title
                  className="font-extrabold tracking-[-0.04em] leading-[0.95] text-[clamp(48px,9vw,56px)] md:text-[clamp(60px,8vw,96px)] lg:text-[clamp(120px,8.5vw,144px)] text-balance"
                >
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-white/90 text-lg md:text-xl leading-[1.7] max-w-2xl font-medium">
                    {subtitle}
                  </p>
                )}
                {badges && badges.length > 0 && (
                  <div className="flex flex-wrap gap-2">
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
              <div className="hero-cta-wrapper flex flex-col sm:flex-row items-stretch sm:items-start gap-4 w-full">
                <PrimaryCTA label={primaryCta.label} href={primaryCta.href} />
                <SecondaryCTA label={secondaryCta.label} href={secondaryCta.href} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
