"use client"

import * as React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { CLIENTES_DATA } from "@/lib/constants"
import { Container } from "@/components/ui/Container"
import { Button } from "@/components/ui/Button"

interface ClientLogoProps {
  name: string
  logo: string | null
}

function ClientLogo({ name, logo }: ClientLogoProps) {
  const [hasError, setHasError] = useState(false)

  // If no logo provided or image failed to load, show text
  if (!logo || hasError) {
    return (
      <span className="whitespace-nowrap text-sm font-medium text-[color:var(--color-muted)] md:text-base">
        {name}
      </span>
    )
  }

  return (
    <Image
      src={logo}
      alt={`Logo de ${name}`}
      width={120}
      height={60}
      className="h-12 w-auto object-contain grayscale transition-all duration-300 hover:grayscale-0"
      onError={() => setHasError(true)}
      loading="lazy"
    />
  )
}

interface ClientsSectionProps {
  title?: string
  subtitle?: string
  ctaLabel?: string
  className?: string
}

export function ClientsSection({
  title = "Clientes que confían en nosotros",
  subtitle = "Empresas líderes en servicios públicos e infraestructura",
  ctaLabel = "Ver todos",
  className,
}: ClientsSectionProps) {
  const uniqueClients = React.useMemo(() => {
    const seen = new Set<string>()
    return CLIENTES_DATA.filter((cliente) => {
      if (seen.has(cliente.name)) return false
      seen.add(cliente.name)
      return true
    })
  }, [])

  const visibleClients = uniqueClients.slice(0, 12)

  return (
    <section
      className={cn("relative overflow-hidden bg-[color:var(--color-bg)] py-16 md:py-20", className)}
    >
      <div className="pointer-events-none absolute inset-0 opacity-60" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,29,47,0.75),rgba(7,26,45,1))]" />
        <div className="absolute -left-20 top-10 h-56 w-56 rounded-full bg-[color:var(--color-accent)]/16 blur-3xl" />
        <div className="absolute -right-16 bottom-8 h-56 w-56 rounded-full bg-[color:var(--color-accent-2)]/14 blur-3xl" />
      </div>

      <Container>
        <div className="relative mx-auto mb-12 max-w-3xl text-center">
          <h2 className="mb-4 font-heading text-3xl font-bold text-[color:var(--color-text)] md:text-4xl">
            {title}
          </h2>
          <p className="text-lg text-[color:var(--color-muted)]">{subtitle}</p>
        </div>

        <ul
          className="relative grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4"
          aria-label="Lista de clientes"
        >
          {visibleClients.map((cliente) => (
            <li
              key={cliente.name}
              className="flex min-h-[72px] items-center justify-center rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/80 px-6 py-4 shadow-[var(--shadow-1)] transition-all duration-300 hover:border-[color:var(--color-accent)]/35 hover:shadow-[var(--shadow-2)]"
              title={cliente.name}
            >
              <ClientLogo name={cliente.name} logo={cliente.logo} />
            </li>
          ))}
        </ul>

        <div className="relative mt-10 text-center">
          <Button variant="secondary" size="md" asChild>
            <Link href="/nosotros">{ctaLabel}</Link>
          </Button>
        </div>
      </Container>
    </section>
  )
}
