"use client"

import * as React from "react"
import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { cn } from "@/lib/utils"
import { CLIENTES_DATA } from "@/lib/constants"
import { Container } from "@/components/ui/Container"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const DUPLICATED_CLIENTES = [...CLIENTES_DATA, ...CLIENTES_DATA]

interface ClientLogoProps {
  name: string
  logo: string | null
}

function ClientLogo({ name, logo }: ClientLogoProps) {
  const [hasError, setHasError] = useState(false)

  // If no logo provided or image failed to load, show text
  if (!logo || hasError) {
    return (
      <span className="text-gris-700 font-medium text-sm md:text-base whitespace-nowrap">
        {name}
      </span>
    )
  }

  return (
    <Image
      src={logo}
      alt={`Logo de ${name}`}
      width={120}
      height={60}
      className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
      onError={() => setHasError(true)}
      loading="lazy"
    />
  )
}

interface ClientsSectionProps {
  title?: string
  subtitle?: string
  className?: string
}

export function ClientsSection({
  title = "Clientes que confían en nosotros",
  subtitle = "Empresas líderes que han elegido nuestros servicios de ingeniería",
  className,
}: ClientsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set(".clients-header, .clients-track", { opacity: 1, y: 0 })
        return
      }

      const section = sectionRef.current
      if (!section) return

      gsap.from(".clients-header", {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })

      gsap.from(".clients-track", {
        scrollTrigger: {
          trigger: ".clients-track",
          start: "top 90%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  )

  return (
    <section
      ref={sectionRef}
      className={cn("py-16 md:py-20 bg-gris-100 overflow-hidden", className)}
    >
      <Container>
        <div className="clients-header text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gris-900 mb-4">
            {title}
          </h2>
          <p className="text-gris-600 text-lg">{subtitle}</p>
        </div>
      </Container>

      <div className="relative">
        {/* Fade gradients on sides */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-gris-100 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-gris-100 to-transparent z-10 pointer-events-none" />

        <ul
          className={cn(
            "clients-track flex gap-8 md:gap-12 list-none p-0 m-0",
            !prefersReducedMotion && "animate-scroll-clients"
          )}
          style={{
            width: "max-content",
          }}
          aria-label="Lista de clientes"
        >
          {DUPLICATED_CLIENTES.map((cliente, index) => (
            <li
              key={`${cliente.name}-${index}`}
              className="flex-shrink-0 flex items-center justify-center px-6 py-4 bg-white rounded-lg shadow-sm border border-gris-200 hover:shadow-md hover:border-azul-principal/30 transition-all duration-300 min-w-[140px]"
              title={cliente.name}
            >
              <ClientLogo name={cliente.name} logo={cliente.logo} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
