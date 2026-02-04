"use client"

import * as React from "react"
import { useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

function TargetIcon({ irisRef }: { irisRef: React.RefObject<SVGCircleElement | null> }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="1.5" />
      <circle
        ref={irisRef}
        cx="16"
        cy="16"
        r="5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <line x1="16" y1="3" x2="16" y2="8" stroke="currentColor" strokeWidth="1.5" />
      <line x1="16" y1="24" x2="16" y2="29" stroke="currentColor" strokeWidth="1.5" />
      <line x1="3" y1="16" x2="8" y2="16" stroke="currentColor" strokeWidth="1.5" />
      <line x1="24" y1="16" x2="29" y2="16" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function EyeIcon({ irisRef }: { irisRef: React.RefObject<SVGCircleElement | null> }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2.5 16C5.5 9.5 10.3 6 16 6C21.7 6 26.5 9.5 29.5 16C26.5 22.5 21.7 26 16 26C10.3 26 5.5 22.5 2.5 16Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle
        ref={irisRef}
        cx="16"
        cy="16"
        r="4.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  )
}

export function MissionVision() {
  const sectionRef = useRef<HTMLElement>(null)
  const targetRef = useRef<SVGCircleElement | null>(null)
  const eyeIrisRef = useRef<SVGCircleElement | null>(null)
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
      if (prefersReducedMotion) return

      if (eyeIrisRef.current) {
        gsap.to(eyeIrisRef.current, {
          x: 6,
          y: -2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
          },
          ease: "sine.inOut",
        })
      }

      if (targetRef.current) {
        gsap.to(targetRef.current, {
          attr: { r: 7 },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
          },
          ease: "sine.inOut",
        })
      }
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  )

  return (
    <section ref={sectionRef} className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 group relative overflow-hidden rounded-[2.5rem] bg-zinc-900/50 border border-white/10 backdrop-blur-md p-10 transition-all hover:border-orange-500/30">
            <div className="flex items-start gap-6">
              <div className="p-4 rounded-2xl bg-orange-600/10 border border-orange-500/20 text-orange-400">
                <TargetIcon irisRef={targetRef} />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">
                  Misión
                </h2>
                <p className="text-zinc-400 text-lg leading-relaxed">
                  Proveer soluciones integrales de ingeniería en sistemas de
                  acueducto y alcantarillado, utilizando tecnología de punta y
                  personal altamente calificado, para garantizar la satisfacción
                  de nuestros clientes y contribuir al desarrollo sostenible de la
                  infraestructura hídrica del país.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 group relative overflow-hidden rounded-[2.5rem] bg-zinc-900/50 border border-white/10 backdrop-blur-md p-10 transition-all hover:border-orange-500/20">
            <div className="absolute -bottom-12 -right-10 opacity-5 group-hover:opacity-10 transition-opacity text-orange-400">
              <svg width="200" height="200" viewBox="0 0 200 200" fill="none" aria-hidden="true">
                <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="2" />
                <circle cx="100" cy="100" r="35" stroke="currentColor" strokeWidth="2" />
                <line x1="100" y1="15" x2="100" y2="45" stroke="currentColor" strokeWidth="2" />
                <line x1="100" y1="155" x2="100" y2="185" stroke="currentColor" strokeWidth="2" />
                <line x1="15" y1="100" x2="45" y2="100" stroke="currentColor" strokeWidth="2" />
                <line x1="155" y1="100" x2="185" y2="100" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>

            <div className="flex items-start gap-6">
              <div className="p-4 rounded-2xl bg-orange-600/10 border border-orange-500/20 text-orange-400">
                <EyeIcon irisRef={eyeIrisRef} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-4 tracking-tight">
                  Visión
                </h2>
                <p className="text-zinc-400 text-base leading-relaxed">
                  Ser la empresa líder a nivel nacional en servicios especializados
                  de diagnóstico, mantenimiento y rehabilitación de redes de
                  acueducto y alcantarillado, reconocida por nuestra excelencia
                  técnica, innovación constante y compromiso con la sostenibilidad.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
