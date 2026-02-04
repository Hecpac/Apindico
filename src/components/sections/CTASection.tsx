"use client"

import * as React from "react"
import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Container } from "@/components/ui/Container"
import { Button } from "@/components/ui/Button"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface CTAButton {
  label: string
  href: string
  variant?: "primary" | "secondary" | "accent" | "cta"
}

interface CTASectionProps {
  variant?: "secondary" | "gradient"
  title: string
  subtitle?: string
  benefits?: string[]
  buttons?: CTAButton[]
  className?: string
}

export function CTASection({
  variant = "secondary",
  title,
  subtitle,
  benefits,
  buttons = [
    { label: "Cotizar proyecto", href: "/cotizador", variant: "accent" },
    { label: "Contáctenos", href: "/contacto", variant: "secondary" },
  ],
  className,
}: CTASectionProps) {
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
        gsap.set(".cta-content, .cta-benefits, .cta-buttons", { opacity: 1, y: 0 })
        return
      }

      const section = sectionRef.current
      if (!section) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })

      tl.from(".cta-content", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          ".cta-benefit",
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          ".cta-buttons",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.3"
        )
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  )

  const isGradient = variant === "gradient"

  return (
    <section
      ref={sectionRef}
      className={cn(
        "py-16 md:py-24",
        isGradient
          ? "bg-gradient-to-br from-azul-oscuro via-azul-principal to-azul-oscuro text-white"
          : "bg-white text-gris-900",
        className
      )}
    >
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <div className="cta-content">
            <h2
              className={cn(
                "font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4",
                isGradient ? "text-white" : "text-gris-900"
              )}
            >
              {title}
            </h2>
            {subtitle && (
              <p
                className={cn(
                  "text-lg md:text-xl mb-8",
                  isGradient ? "text-white/90" : "text-gris-600"
                )}
              >
                {subtitle}
              </p>
            )}
          </div>

          {benefits && benefits.length > 0 && (
            <div className="cta-benefits flex flex-wrap justify-center gap-4 md:gap-6 mb-10">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className={cn(
                    "cta-benefit flex items-center gap-2 text-sm md:text-base",
                    isGradient ? "text-white/90" : "text-gris-700"
                  )}
                >
                  <Check
                    className={cn(
                      "h-5 w-5 flex-shrink-0",
                      isGradient ? "text-amarillo" : "text-verde-exito"
                    )}
                  />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          )}

          <div className="cta-buttons flex flex-col sm:flex-row gap-4 justify-center">
            {buttons.map((button, index) => (
              <Button
                key={index}
                variant={button.variant || "primary"}
                size="lg"
                asChild
                className={
                  isGradient && button.variant === "secondary"
                    ? "border-white text-white hover:bg-white/10 hover:text-white"
                    : undefined
                }
              >
                <Link href={button.href}>{button.label}</Link>
              </Button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
