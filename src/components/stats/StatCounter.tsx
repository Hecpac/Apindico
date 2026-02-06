"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface StatCardProps {
  value: number
  label: string
  suffix?: string
  reducedMotion?: boolean
  highlight?: boolean
}

export function StatCard({
  value,
  label,
  suffix = "",
  reducedMotion = false,
  highlight = false,
}: StatCardProps) {
  const countRef = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    const element = countRef.current
    if (!element) return

    const targetValue = Number(value)
    const precision = targetValue % 1 !== 0 ? 1 : 0
    const formatValue = (val: number) =>
      precision > 0 ? val.toFixed(precision) : Math.round(val).toString()

    if (reducedMotion) {
      element.innerText = formatValue(targetValue)
      return
    }

    const counter = { value: 0 }
    const tween = gsap.to(counter, {
      value: targetValue,
      duration: 2,
      ease: "power4.out",
      onUpdate: () => {
        if (!countRef.current) return
        countRef.current.innerText = formatValue(counter.value)
      },
      scrollTrigger: {
        trigger: element,
        start: "top 95%",
        toggleActions: "play none none none",
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [value, reducedMotion])

  return (
    <div className="stat-card relative flex h-full flex-col items-center justify-center rounded-[18px] border border-[color:var(--color-border)] bg-[color:var(--color-bg)]/70 px-4 py-6 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-[color:var(--color-accent)]/45">
      {highlight ? (
        <div className="pointer-events-none absolute -left-8 -top-8 h-16 w-16 rounded-full bg-[color:var(--color-accent)]/18 blur-2xl" />
      ) : null}
      <div className="flex items-baseline text-[color:var(--color-text)]">
        <span ref={countRef} className="text-3xl font-black tracking-tight md:text-4xl">
          0
        </span>
        {suffix ? (
          <span className="ml-1 text-2xl font-black text-[color:var(--color-accent)] md:text-3xl">{suffix}</span>
        ) : null}
      </div>
      <p className="mt-2 text-[10px] font-mono font-semibold uppercase tracking-[0.18em] text-[color:var(--color-muted)] md:text-[11px]">
        {label}
      </p>
    </div>
  )
}
