"use client"

import * as React from "react"
import { useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const TIMELINE_ITEMS = [
  {
    year: "2011",
    title: "Fundación y propósito",
    description:
      "Nace APINDICO con el objetivo de ofrecer servicios especializados para redes de acueducto y alcantarillado en Colombia.",
  },
  {
    year: "2016",
    title: "Especialización técnica",
    description:
      "Consolidamos capacidades en inspección CCTV y diagnóstico avanzado con personal certificado.",
  },
  {
    year: "2020",
    title: "Tecnología y expansión",
    description:
      "Integramos equipos vactor y soluciones CIPP para rehabilitación sin excavación.",
  },
  {
    year: "2024",
    title: "Presencia nacional",
    description:
      "Más de 500 proyectos respaldan nuestra experiencia con clientes públicos y privados.",
  },
]

export function TechnicalTimeline() {
  const sectionRef = useRef<HTMLElement>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-timeline-item]")
      if (items.length === 0) return

      items.forEach((item) => {
        const scan = item.querySelector<HTMLElement>("[data-scan]")

        if (prefersReducedMotion) {
          gsap.set(item, { opacity: 1, y: 0 })
          if (scan) gsap.set(scan, { opacity: 0 })
          return
        }

        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          y: 32,
          opacity: 0,
          duration: 0.8,
          ease: "expo.out",
        })

        if (scan) {
          gsap.fromTo(
            scan,
            { x: "-120%", opacity: 0 },
            {
              x: "120%",
              opacity: 0.7,
              duration: 1.1,
              ease: "expo.out",
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
              },
            }
          )
        }
      })
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  )

  return (
    <section ref={sectionRef} className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Nuestra historia
          </h2>
          <p className="text-zinc-400 mt-3 max-w-2xl mx-auto leading-relaxed">
            Una evolución técnica sostenida por innovación, certificaciones y
            resultados verificables en campo.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 h-full w-px bg-gradient-to-b from-orange-500/80 via-orange-500/40 to-transparent" />

          <div className="space-y-10">
            {TIMELINE_ITEMS.map((item, index) => (
              <div
                key={item.year}
                data-timeline-item
                className="relative grid md:grid-cols-2 gap-6 items-start"
              >
                <div
                  className={
                    index % 2 === 0
                      ? "md:col-start-1 md:pr-10"
                      : "md:col-start-2 md:pl-10"
                  }
                >
                  <div className="relative overflow-hidden rounded-[2rem] bg-zinc-900/50 border border-white/10 backdrop-blur-md p-6">
                    <div className="inline-flex items-center gap-3">
                      <span className="font-mono text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        {item.year}
                      </span>
                      <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                        Hito
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mt-3 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-zinc-400 leading-relaxed">
                      {item.description}
                    </p>
                    <span
                      data-scan
                      className="pointer-events-none absolute inset-0 rounded-[2rem] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                <span
                  className="absolute left-4 md:left-1/2 -translate-x-1/2 top-4 h-4 w-4 rounded-full bg-orange-500 shadow-[0_0_16px_rgba(255,107,53,0.6)]"
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
