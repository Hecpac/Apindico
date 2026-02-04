"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils"
import { COMPANY_STATS } from "@/lib/constants"
import { StatCard } from "@/components/stats/StatCounter"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface StatsSectionProps {
  variant?: "light" | "dark"
  className?: string
}

export function StatsSection({ variant = "light", className }: StatsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const statsContainerRef = useRef<HTMLDivElement>(null)
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

  useEffect(() => {
    if (prefersReducedMotion) return

    const statsContainer = statsContainerRef.current
    const heroSection = document.querySelector(".hero-section")
    if (!statsContainer || !heroSection) return

    const tween = gsap.to(statsContainer, {
      y: -20,
      scrollTrigger: {
        trigger: heroSection,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [prefersReducedMotion])

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative z-40 -mt-20 md:-mt-24 pt-8 md:pt-0 pb-12",
        variant === "dark" ? "bg-transparent text-white" : "bg-white text-gris-900",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div
          ref={statsContainerRef}
          className="stats-container group rounded-[32px] border border-white/10 bg-zinc-900/60 p-4 backdrop-blur-2xl transition-all duration-500 hover:border-orange-500/40 hover:shadow-[0_0_0_1px_rgba(249,115,22,0.25),0_30px_80px_-50px_rgba(249,115,22,0.6)] md:p-6"
        >
          <div className="grid w-full grid-cols-2 gap-4 lg:grid-cols-4">
            {COMPANY_STATS.map((stat, index) => (
              <StatCard
                key={index}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                reducedMotion={prefersReducedMotion}
                highlight={index === 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
