"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { COMPANY_STATS } from "@/lib/constants"
import { StatCard } from "@/components/stats/StatCounter"

interface StatsSectionProps {
  metrics?: Array<{
    value: number
    suffix?: string
    label: string
  }>
  className?: string
}

export function StatsSection({
  metrics = COMPANY_STATS.map((item) => ({
    value: item.value,
    suffix: item.suffix,
    label: item.label,
  })),
  className,
}: StatsSectionProps) {
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

    let canceled = false
    let cleanup: (() => void) | null = null

    ;(async () => {
      const { gsap } = await import("@/lib/gsap-config")
      if (canceled || !statsContainer) return

      const tween = gsap.to(statsContainer, {
        y: -20,
        scrollTrigger: {
          trigger: heroSection,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })

      cleanup = () => {
        tween.scrollTrigger?.kill()
        tween.kill()
      }
    })()

    return () => {
      canceled = true
      cleanup?.()
    }
  }, [prefersReducedMotion])

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative z-30 -mt-12 bg-transparent pb-10 pt-6 md:-mt-16 md:pb-14 md:pt-0",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div
          ref={statsContainerRef}
          className="stats-container rounded-[24px] border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/80 p-3 shadow-[var(--shadow-2)] backdrop-blur-xl md:rounded-[30px] md:p-4"
        >
          <div className="grid w-full grid-cols-2 gap-3 lg:grid-cols-4">
            {metrics.map((stat, index) => (
              <StatCard
                key={index}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                reducedMotion={prefersReducedMotion}
                highlight={index === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
