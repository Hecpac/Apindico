"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { ArrowRight, Video } from "lucide-react"
import { cn } from "@/lib/utils"
import { PROYECTOS } from "@/lib/constants"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface HeroSectionProps {
  className?: string
}

const HERO_BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMCcgaGVpZ2h0PScxMCc+PHJlY3Qgd2lkdGg9JzEwJyBoZWlnaHQ9JzEwJyBmaWxsPScjMGEyNTQwJy8+PC9zdmc+"


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
function PrimaryCTA() {
  return (
    <Link
      href="/cotizador"
      className="group relative overflow-hidden inline-flex items-center justify-center px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white rounded-full font-bold shadow-[0_0_20px_rgba(234,88,12,0.3)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_28px_rgba(234,88,12,0.4)]"
    >
      <span className="pointer-events-none absolute inset-0 bg-black/25" aria-hidden="true" />
      <span className="relative z-10">Cotizar proyecto</span>
    </Link>
  )
}

// Secondary CTA Button
function SecondaryCTA() {
  return (
    <Link
      href="/contacto"
      className="group inline-flex items-center justify-center px-8 py-4 bg-white/5 backdrop-blur-md text-white border border-white/20 rounded-full font-bold text-lg hover:bg-white/10 transition-all duration-300"
    >
      <span>Agendar una llamada</span>
    </Link>
  )
}

export function HeroSection({ className }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoReady, setIsVideoReady] = React.useState(false)
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

  React.useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const markReady = () => setIsVideoReady(true)
    video.addEventListener("loadeddata", markReady)
    video.addEventListener("canplay", markReady)
    video.addEventListener("canplaythrough", markReady)

    const readyCheck = window.setInterval(() => {
      if (video.readyState >= 2) {
        setIsVideoReady(true)
        window.clearInterval(readyCheck)
      }
    }, 400)

    return () => {
      video.removeEventListener("loadeddata", markReady)
      video.removeEventListener("canplay", markReady)
      video.removeEventListener("canplaythrough", markReady)
      window.clearInterval(readyCheck)
    }
  }, [])

  React.useEffect(() => {
    if (!isVideoReady) return
    const video = videoRef.current
    if (!video) return
    const playPromise = video.play()
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {})
    }
  }, [isVideoReady])

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
          src="/images/hero-poster.jpg"
          alt="Inspección robótica de alcantarillado APINDICO"
          fill
          priority
          placeholder="blur"
          blurDataURL={HERO_BLUR_DATA_URL}
          className={cn(
            "object-cover transition-opacity duration-700",
            isVideoReady ? "opacity-0" : "opacity-80"
          )}
          sizes="100vw"
        />

        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className={cn(
            "absolute inset-0 z-10 h-full w-full object-cover transition-opacity duration-700",
            isVideoReady ? "opacity-60" : "opacity-0"
          )}
          poster="/images/hero-poster.jpg"
        >
          <source src="/videos/Hero.webm" type="video/webm" />
          <source src="/videos/Hero.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Overlay for legibility */}
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-zinc-950 via-transparent to-black/40" />

      {/* Main Container */}
      <div
        className="hero-content max-w-7xl mx-auto relative z-30 flex h-full w-full flex-col items-center justify-start text-center text-white will-change-transform px-6 md:px-12 pt-32 md:pt-40 lg:pt-44 pb-24 md:pb-32 md:items-start md:text-left"
      >
        {/* Headline */}
        <div className="headline-section flex flex-col items-center md:items-start max-w-3xl" style={{ gap: "32px" }}>
          <h1
            data-hero-title
            className="tracking-tighter font-black text-5xl md:text-8xl leading-[0.9]"
          >
            Ingeniería que Transforma
          </h1>

          {/* CTA Wrapper */}
          <div className="hero-cta-wrapper flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <PrimaryCTA />
            <SecondaryCTA />
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
