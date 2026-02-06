"use client"

import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const hasRegisteredScrollTrigger = Boolean(
  (gsap as unknown as { core?: { globals?: () => Record<string, unknown> } }).core
    ?.globals?.()
    .ScrollTrigger
)

if (typeof window !== "undefined" && !hasRegisteredScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger)
}

export { gsap, ScrollTrigger }
