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
    <div className="stat-card relative z-40 flex h-full flex-col items-center justify-center rounded-[2.5rem] border border-white/10 bg-zinc-900/70 p-10 shadow-[0_4px_24px_rgba(0,0,0,0.5)] backdrop-blur-3xl transition-all duration-500 hover:-translate-y-1 hover:border-orange-500/40">
      {highlight ? (
        <div className="pointer-events-none absolute -top-10 -left-10 h-20 w-20 rounded-full bg-orange-500/10 blur-[50px]" />
      ) : null}
      <div className="flex items-baseline text-white">
        <span ref={countRef} className="text-4xl md:text-5xl font-black tracking-tighter">
          0
        </span>
        {suffix ? (
          <span className="ml-1 text-3xl font-black text-orange-500">{suffix}</span>
        ) : null}
      </div>
      <p className="mt-3 text-[10px] font-mono font-medium uppercase tracking-widest text-white/60">
        {label}
      </p>
    </div>
  )
}
