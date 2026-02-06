"use client"

import * as React from "react"
import Link from "next/link"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Container } from "@/components/ui/Container"
import { Button } from "@/components/ui/Button"
import { AnimatedSection } from "@/components/motion/AnimatedSection"
import { StaggerContainer } from "@/components/motion/StaggerContainer"

interface CTAButton {
  label: string
  href: string
  variant?: "primary" | "secondary" | "cta" | "outline"
}

interface CTASectionProps {
  variant?: "secondary" | "gradient"
  title: string
  subtitle?: string
  benefits?: string[]
  buttons?: CTAButton[]
  className?: string
}

export function CTASection({
  variant = "secondary",
  title,
  subtitle,
  benefits,
  buttons = [
    { label: "Cotizar proyecto", href: "/cotizador", variant: "cta" },
    { label: "Contáctenos", href: "/contacto", variant: "outline" },
  ],
  className,
}: CTASectionProps) {
  const isGradient = variant === "gradient"

  return (
    <section
      className={cn(
        "py-16 md:py-24",
        isGradient
          ? "bg-[linear-gradient(130deg,#081c33_0%,#0c2a47_45%,#0f3556_100%)] text-[color:var(--color-text)]"
          : "bg-[color:var(--color-surface)] text-[color:var(--color-text)]",
        className
      )}
    >
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <AnimatedSection>
            <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl lg:text-5xl">{title}</h2>
            {subtitle && <p className="mb-8 text-lg text-[color:var(--color-muted)] md:text-xl">{subtitle}</p>}
          </AnimatedSection>

          {benefits && benefits.length > 0 && (
            <AnimatedSection delay={0.05}>
              <ul className="mb-10 flex flex-wrap justify-center gap-3 md:gap-4">
                {benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border)] bg-white/5 px-4 py-2 text-sm text-[color:var(--color-muted)] md:text-base"
                  >
                    <Check className={cn("h-5 w-5 flex-shrink-0", isGradient ? "text-[color:var(--color-accent)]" : "text-[color:var(--color-success)]")} />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          )}

          <StaggerContainer className="cta-buttons flex flex-col justify-center gap-4 sm:flex-row">
            {buttons.map((button, index) => (
              <Button
                key={index}
                variant={button.variant || "primary"}
                size="lg"
                asChild
                className={cn(
                  isGradient && button.variant === "outline" && "border-white/35 text-white hover:bg-white/10"
                )}
              >
                <Link href={button.href}>{button.label}</Link>
              </Button>
            ))}
          </StaggerContainer>
        </div>
      </Container>
    </section>
  )
}
