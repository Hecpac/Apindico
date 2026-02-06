"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { AnimatedSection } from "@/components/motion/AnimatedSection"

interface HeroSectionProps {
  className?: string
  title?: string
  subtitle?: string
  subtitleExtended?: string
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

export function HeroSection({
  className,
  title = "Ingeniería que Transforma",
  subtitle,
  subtitleExtended,
  primaryCta = { label: "Cotizar proyecto", href: "/cotizador" },
  secondaryCta = { label: "Agendar una llamada", href: "/contacto" },
  badges,
}: HeroSectionProps) {
  const sectionRef = React.useRef<HTMLElement>(null)
  const [canAnimate, setCanAnimate] = React.useState(false)
  const [shouldUseVideo, setShouldUseVideo] = React.useState(false)
  const [shouldLoadVideo, setShouldLoadVideo] = React.useState(false)

  React.useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const desktopQuery = window.matchMedia("(min-width: 1024px)")

    const update = () => {
      const allowMotion = !motionQuery.matches
      setCanAnimate(allowMotion && desktopQuery.matches)
      setShouldUseVideo(allowMotion && desktopQuery.matches)
    }

    update()
    motionQuery.addEventListener("change", update)
    desktopQuery.addEventListener("change", update)

    return () => {
      motionQuery.removeEventListener("change", update)
      desktopQuery.removeEventListener("change", update)
    }
  }, [])

  React.useEffect(() => {
    if (!shouldUseVideo) {
      setShouldLoadVideo(false)
      return
    }

    let didLoad = false
    let idleHandle: number | null = null
    let timeoutHandle: ReturnType<typeof setTimeout> | null = null

    const activateVideo = () => {
      if (didLoad) return
      didLoad = true
      setShouldLoadVideo(true)
    }

    if ("requestIdleCallback" in window) {
      idleHandle = window.requestIdleCallback(activateVideo, { timeout: 2200 })
    } else {
      timeoutHandle = setTimeout(activateVideo, 1400)
    }

    const onInteraction = () => activateVideo()
    window.addEventListener("pointerdown", onInteraction, { once: true, passive: true })
    window.addEventListener("keydown", onInteraction, { once: true })
    window.addEventListener("scroll", onInteraction, { once: true, passive: true })

    return () => {
      if (idleHandle !== null && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleHandle)
      }
      if (timeoutHandle !== null) {
        clearTimeout(timeoutHandle)
      }
      window.removeEventListener("pointerdown", onInteraction)
      window.removeEventListener("keydown", onInteraction)
      window.removeEventListener("scroll", onInteraction)
    }
  }, [shouldUseVideo])

  React.useEffect(() => {
    if (!canAnimate || !sectionRef.current) return

    let canceled = false
    let cleanup: (() => void) | null = null

    ;(async () => {
      const { gsap } = await import("@/lib/gsap-config")
      if (canceled || !sectionRef.current) return

      const videoTween = gsap.to(".hero-video-container", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.45,
        },
        y: 150,
        scale: 1.06,
      })

      const contentTween = gsap.to(".hero-content", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
        y: -60,
        opacity: 0.3,
      })

      cleanup = () => {
        videoTween.scrollTrigger?.kill()
        videoTween.kill()
        contentTween.scrollTrigger?.kill()
        contentTween.kill()
      }
    })()

    return () => {
      canceled = true
      cleanup?.()
    }
  }, [canAnimate])

  return (
    <header
      ref={sectionRef}
      id="hero"
      className={cn("hero-section relative min-h-[70svh] w-full overflow-hidden md:min-h-[92svh]", className)}
      style={{ background: "var(--hero-bg)" }}
    >
      <div className="hero-video-container absolute inset-0 z-0 will-change-transform">
        {shouldUseVideo && shouldLoadVideo ? (
          <video
            className="h-full w-full object-cover opacity-80"
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
        ) : (
          <Image
            src="/images/hero-clean.webp"
            alt="Infraestructura de acueducto y alcantarillado APINDICO"
            fill
            priority
            className="object-cover opacity-80"
            sizes="100vw"
          />
        )}
      </div>

      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#020a13]/35 via-[#051627]/30 to-[color:var(--color-bg)]" />

      <div className="hero-content relative z-20 mx-auto flex min-h-[70svh] w-full max-w-[1440px] flex-col justify-end px-6 pb-16 pt-28 md:min-h-[92svh] md:px-10 md:pb-20 md:pt-44 xl:px-[100px]">
        <AnimatedSection delay={0.05} className="max-w-4xl">
          <div className="grid grid-cols-4 gap-6 md:grid-cols-12">
            <div className="col-span-4 md:col-span-1">
              <div className="text-xs uppercase tracking-[0.1em] text-[color:var(--hero-text-muted)]">01</div>
            </div>

            <div className="col-span-4 md:col-start-2 md:col-span-9">
              <div className="space-y-7 text-left">
                <h1 className="text-balance font-heading text-[length:var(--fluid-h1)] font-extrabold tracking-[-0.02em] leading-[0.85] text-[color:var(--hero-text-primary)]">
                  {title}
                </h1>

                {subtitle && (
                  <p className="max-w-3xl text-[length:var(--fluid-body)] font-medium leading-[var(--line-height-body)] text-[color:var(--hero-text-secondary)]">
                    {subtitle}
                  </p>
                )}

                {subtitleExtended && (
                  <p className="max-w-3xl text-sm leading-relaxed text-[color:var(--hero-text-muted)] md:text-base">
                    {subtitleExtended}
                  </p>
                )}

                {badges && badges.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {badges.map((badge) => (
                      <Badge key={badge} size="sm" className="border-white/20 bg-white/8 text-white">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                  <Button variant="cta" size="lg" asChild>
                    <Link href={primaryCta.href ?? "/cotizador"}>{primaryCta.label}</Link>
                  </Button>
                  <Button variant="outline" size="lg" className="border-white/35 text-white hover:bg-white/10" asChild>
                    <Link href={secondaryCta.href ?? "/contacto"}>{secondaryCta.label}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-1 opacity-60">
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/70">Scroll</span>
        <ChevronDown className="h-5 w-5 animate-bounce text-white/70" aria-hidden="true" />
      </div>
    </header>
  )
}
