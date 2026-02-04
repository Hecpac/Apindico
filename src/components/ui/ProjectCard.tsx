"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import gsap from "gsap"
import { cn } from "@/lib/utils"

const CARD_BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTAnIGhlaWdodD0nMTAnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHJlY3Qgd2lkdGg9JzEwJyBoZWlnaHQ9JzEwJyBmaWxsPScjMDgxNjI2Jy8+PC9zdmc+"

interface ProjectCardProps {
  title: string
  client: string
  location: string
  year: string
  href: string
  image?: string
  className?: string
}

export function ProjectCard({
  title,
  client,
  location,
  year,
  href,
  image,
  className,
}: ProjectCardProps) {
  const cardRef = React.useRef<HTMLAnchorElement>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false)
  const [canHover, setCanHover] = React.useState(false)

  React.useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)")

    setPrefersReducedMotion(motionQuery.matches)
    setCanHover(hoverQuery.matches)

    const handleMotionChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }
    const handleHoverChange = (event: MediaQueryListEvent) => {
      setCanHover(event.matches)
    }

    motionQuery.addEventListener("change", handleMotionChange)
    hoverQuery.addEventListener("change", handleHoverChange)

    return () => {
      motionQuery.removeEventListener("change", handleMotionChange)
      hoverQuery.removeEventListener("change", handleHoverChange)
    }
  }, [])

  const handleMouseMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (prefersReducedMotion || !canHover) return
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -6
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 6

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 900,
      transformOrigin: "center",
    })
  }

  const handleMouseLeave = () => {
    if (prefersReducedMotion || !canHover) return
    const card = cardRef.current
    if (!card) return
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power3.out",
    })
  }

  return (
    <Link
      ref={cardRef}
      href={href}
      className={cn(
        "project-card group relative flex h-full flex-col overflow-hidden rounded-[32px]",
        "border border-white/10 bg-zinc-950/40 backdrop-blur-2xl p-3",
        "shadow-[0_12px_30px_rgba(0,0,0,0.28)] md:shadow-none",
        "transition-all duration-500 hover:border-orange-500/30",
        "hover:shadow-[0_0_50px_-12px_rgba(234,88,12,0.25)]",
        "will-change-transform",
        className
      )}
      style={{ transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-gradient-to-br from-white/10 via-white/5 to-transparent opacity-80" />

      <div
        className="relative aspect-video w-full overflow-hidden rounded-[24px] bg-zinc-800"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, black 80%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
        }}
      >
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            placeholder="blur"
            blurDataURL={CARD_BLUR_DATA_URL}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-azul-principal to-azul-oscuro" />
        )}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
        <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full border border-orange-500/50 bg-orange-500/10 backdrop-blur-md">
          <span className="text-[10px] font-mono font-bold text-[#EA580C]">
            {year}
          </span>
        </div>
      </div>

      <div className="relative flex h-full flex-col p-5">
        <h3 className="text-xl font-bold text-white tracking-tight leading-snug transition-colors group-hover:text-orange-500">
          {title}
        </h3>

        <div className="mt-auto flex flex-col gap-3 border-t border-white/5 pt-5">
          <div className="flex items-end justify-between">
            <div className="flex flex-col">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/50 mb-1">
                Cliente
              </span>
              <span className="text-sm font-medium text-zinc-100">
                {client}
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/50 mb-1">
                Ubicación
              </span>
              <span className="text-sm font-medium text-zinc-100 italic">
                {location}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
