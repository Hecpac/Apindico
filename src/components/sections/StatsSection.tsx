"use client"

import * as React from "react"
import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { cn } from "@/lib/utils"
import { COMPANY_STATS } from "@/lib/constants"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface StatsSectionProps {
  variant?: "light" | "dark"
  className?: string
}

export function StatsSection({ variant = "light", className }: StatsSectionProps) {
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
      const section = sectionRef.current
      if (!section) return

      const statValues = gsap.utils.toArray<HTMLElement>(".stat-value", section)

      if (prefersReducedMotion) {
        gsap.set(".stat-item", { opacity: 1, y: 0 })
        statValues.forEach((el) => {
          const raw = Number(el.dataset.value || 0)
          el.innerText = raw.toString()
        })
        return
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      })

      tl.from(".stat-item", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "expo.out",
      })

      statValues.forEach((el) => {
        const raw = Number(el.dataset.value || 0)
        const decimals = raw % 1 !== 0 ? 0.1 : 1
        tl.to(
          el,
          {
            innerText: raw,
            duration: 1.8,
            ease: "power3.out",
            snap: { innerText: decimals },
          },
          0
        )
      })
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  )

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative z-40 -mt-12 md:-mt-16 pb-12",
        variant === "dark" ? "bg-transparent text-white" : "bg-white text-gris-900",
        className
      )}
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="stats-grid grid w-full grid-cols-2 md:grid-cols-4 gap-6 items-stretch justify-items-stretch">
          {COMPANY_STATS.map((stat, index) => (
            <div
              key={index}
              className={cn(
                "stat-item group h-full min-w-0 w-full text-center rounded-3xl border px-6 py-8 backdrop-blur-xl transition-all flex flex-col items-center justify-center",
                "border-white/10 bg-zinc-900/80 hover:border-orange-500/30",
                "shadow-[0_8px_30px_rgba(0,0,0,0.18)]"
              )}
            >
              <div className="text-4xl font-black text-white tracking-tighter transition-colors group-hover:text-orange-500">
                <span className="stat-value" data-value={stat.value}>
                  0
                </span>
                <span className="stat-suffix">{stat.suffix}</span>
              </div>
              <div className="text-[11px] uppercase tracking-widest text-white/60 mt-2 font-mono">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
