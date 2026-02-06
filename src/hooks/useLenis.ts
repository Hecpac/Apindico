'use client'

import { useEffect } from 'react'

export function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    if (!window.matchMedia('(min-width: 1024px)').matches) {
      return
    }

    let canceled = false
    let lenisInstance: { raf: (time: number) => void; destroy: () => void } | null = null
    let gsapRef: { ticker: { add: (cb: (time: number) => void) => void; remove: (cb: (time: number) => void) => void; lagSmoothing: (value: number) => void } } | null = null
    let rafCallback: ((time: number) => void) | null = null
    let idleHandle: number | null = null
    let timeoutHandle: ReturnType<typeof setTimeout> | null = null

    const init = async () => {
      const [{ default: Lenis }, { gsap, ScrollTrigger }] = await Promise.all([
        import('lenis'),
        import('@/lib/gsap-config'),
      ])

      if (canceled) return

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      })

      lenis.on('scroll', ScrollTrigger.update)

      const update = (time: number) => {
        lenis.raf(time * 1000)
      }

      gsap.ticker.add(update)
      gsap.ticker.lagSmoothing(0)

      lenisInstance = lenis
      gsapRef = gsap
      rafCallback = update
    }

    if ('requestIdleCallback' in window) {
      idleHandle = window.requestIdleCallback(() => init(), { timeout: 1500 })
    } else {
      timeoutHandle = setTimeout(() => init(), 1000)
    }

    return () => {
      canceled = true
      if (idleHandle !== null && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleHandle)
      }
      if (timeoutHandle !== null) {
        clearTimeout(timeoutHandle)
      }
      if (gsapRef && rafCallback) {
        gsapRef.ticker.remove(rafCallback)
      }
      lenisInstance?.destroy()
    }
  }, [])
}
