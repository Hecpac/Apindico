"use client"

import * as React from "react"
import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

// ============================================
// Framer Motion variants (for compatibility)
// ============================================

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

// ============================================
// GSAP Animation Hooks
// ============================================

interface ScrollAnimationOptions {
  y?: number
  duration?: number
  stagger?: number
  start?: string
  ease?: string
  scope?: React.RefObject<HTMLElement>
}

/**
 * Hook para animar elementos al entrar en viewport
 * @param selector - CSS selector de los elementos a animar
 * @param options - Opciones de animación
 */
export function useScrollAnimation(
  selector: string,
  options?: ScrollAnimationOptions
) {
  useGSAP(() => {
    if (prefersReducedMotion()) return

    const root = options?.scope?.current ?? document
    const elements = root.querySelectorAll(selector)
    if (elements.length === 0) return

    gsap.from(selector, {
      scrollTrigger: {
        trigger: selector,
        start: options?.start || "top 85%",
      },
      y: options?.y || 50,
      opacity: 0,
      duration: options?.duration || 0.6,
      stagger: options?.stagger || 0,
      ease: options?.ease || "power2.out",
    })
  }, {
    scope: options?.scope,
    dependencies: [
      selector,
      options?.y,
      options?.duration,
      options?.stagger,
      options?.start,
      options?.ease,
    ],
  })
}

/**
 * Hook para animar un elemento específico con ref
 */
export function useElementAnimation<T extends HTMLElement>(
  options?: ScrollAnimationOptions
) {
  const ref = useRef<T>(null)

  useGSAP(() => {
    if (prefersReducedMotion()) return

    const element = ref.current
    if (!element) return

    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: options?.start || "top 85%",
      },
      y: options?.y || 50,
      opacity: 0,
      duration: options?.duration || 0.8,
      ease: options?.ease || "power2.out",
    })
  }, {
    dependencies: [
      options?.y,
      options?.duration,
      options?.start,
      options?.ease,
    ],
  })

  return ref
}

// ============================================
// GSAP Animation Functions
// ============================================

/**
 * Animación stagger para grids de servicios
 * Llamar después de que el componente esté montado
 */
export function animateServiceCards() {
  if (prefersReducedMotion()) return

  const cards = document.querySelectorAll(".service-card")
  const grid = document.querySelector(".services-grid")

  if (cards.length === 0 || !grid) return

  gsap.from(".service-card", {
    scrollTrigger: {
      trigger: ".services-grid",
      start: "top 80%",
    },
    y: 60,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: "power2.out",
  })
}

/**
 * Animación para títulos de sección
 */
export function animateSectionTitle(selector: string) {
  if (prefersReducedMotion()) return

  gsap.from(selector, {
    scrollTrigger: {
      trigger: selector,
      start: "top 85%",
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
  })
}

/**
 * Animación de fade in para imágenes
 */
export function animateImages(selector: string) {
  if (prefersReducedMotion()) return

  gsap.from(selector, {
    scrollTrigger: {
      trigger: selector,
      start: "top 85%",
    },
    scale: 0.95,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
  })
}

// ============================================
// Animated Components
// ============================================

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

/**
 * Componente wrapper para secciones animadas
 */
export function AnimatedSection({
  children,
  className,
  delay = 0
}: AnimatedSectionProps) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (prefersReducedMotion()) return
    if (!ref.current) return

    gsap.from(ref.current, {
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      delay,
      ease: "power2.out",
    })
  }, [delay])

  return (
    <section ref={ref} className={className}>
      {children}
    </section>
  )
}

interface AnimatedDivProps {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
}

/**
 * Componente wrapper para divs animados
 */
export function AnimatedDiv({
  children,
  className,
  delay = 0,
  y = 30
}: AnimatedDivProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (prefersReducedMotion()) return
    if (!ref.current) return

    gsap.from(ref.current, {
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
      },
      y,
      opacity: 0,
      duration: 0.6,
      delay,
      ease: "power2.out",
    })
  }, [delay, y])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

// ============================================
// Utility Hooks
// ============================================

/**
 * Hook legacy para compatibilidad con código existente
 */
export function useScrollAnimationLegacy<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useGSAP(() => {
    if (prefersReducedMotion()) return
    const element = ref.current
    if (!element) return

    gsap.fromTo(
      element,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    )
  }, [])

  return ref
}

/**
 * Hook para animación de parallax
 */
export function useParallax<T extends HTMLElement>(speed: number = 0.5) {
  const ref = useRef<T>(null)

  useGSAP(() => {
    if (prefersReducedMotion()) return
    const element = ref.current
    if (!element) return

    gsap.to(element, {
      y: () => window.innerHeight * speed,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    })
  }, [speed])

  return ref
}

/**
 * Hook para animación de counter
 */
export function useCountUp(
  endValue: number,
  duration: number = 2,
  startOnView: boolean = true
) {
  const ref = useRef<HTMLElement>(null)
  const countRef = useRef({ value: 0 })

  useGSAP(() => {
    const element = ref.current
    if (!element) return
    if (prefersReducedMotion()) {
      element.textContent = Math.round(endValue).toString()
      return
    }

    const animation = gsap.to(countRef.current, {
      value: endValue,
      duration,
      ease: "power2.out",
      onUpdate: () => {
        element.textContent = Math.round(countRef.current.value).toString()
      },
      paused: startOnView,
    })

    if (startOnView) {
      ScrollTrigger.create({
        trigger: element,
        start: "top 85%",
        onEnter: () => animation.play(),
      })
    }
  }, [endValue, duration, startOnView])

  return ref
}
