"use client"

import * as React from "react"
import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

interface StaggerContainerProps {
  children: React.ReactNode
  className?: string
  stagger?: number
  delayChildren?: number
}

export function StaggerContainer({
  children,
  className,
  stagger = 0.08,
  delayChildren = 0.04,
}: StaggerContainerProps) {
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
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={cn(className)}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-8%" }}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 24 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.42, ease: "easeOut" },
            },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}
