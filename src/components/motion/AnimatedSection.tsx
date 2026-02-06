"use client"

import * as React from "react"
import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
}: AnimatedSectionProps) {
  const reduceMotion = useReducedMotion()
  const [canAnimate, setCanAnimate] = React.useState(false)

  React.useEffect(() => {
    if (reduceMotion) {
      setCanAnimate(false)
      return
    }

    const desktopQuery = window.matchMedia("(min-width: 768px)")
    const update = () => setCanAnimate(desktopQuery.matches)
    update()
    desktopQuery.addEventListener("change", update)

    return () => {
      desktopQuery.removeEventListener("change", update)
    }
  }, [reduceMotion])

  if (!canAnimate) {
    return <section className={className}>{children}</section>
  }

  return (
    <motion.section
      initial={{ opacity: 1, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(className)}
    >
      {children}
    </motion.section>
  )
}
