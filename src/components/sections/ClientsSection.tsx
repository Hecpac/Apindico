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
      <span className="text-gris-700 font-medium text-sm md:text-base whitespace-nowrap">
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
      className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
      onError={() => setHasError(true)}
      loading="lazy"
    />
  )
}

interface ClientsSectionProps {
  title?: string
  subtitle?: string
  className?: string
}

export function ClientsSection({
  title = "Clientes que confían en nosotros",
  subtitle = "Empresas líderes que han elegido nuestros servicios de ingeniería",
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
      className={cn("py-16 md:py-20 bg-gris-100 overflow-hidden", className)}
    >
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gris-900 mb-4">
            {title}
          </h2>
          <p className="text-gris-600 text-lg">{subtitle}</p>
        </div>

        <ul
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
          aria-label="Lista de clientes"
        >
          {visibleClients.map((cliente) => (
            <li
              key={cliente.name}
              className="flex items-center justify-center px-6 py-4 bg-white rounded-lg shadow-sm border border-gris-200 hover:shadow-md hover:border-azul-principal/30 transition-all duration-300 min-h-[72px]"
              title={cliente.name}
            >
              <ClientLogo name={cliente.name} logo={cliente.logo} />
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <Button variant="secondary" size="md" asChild>
            <Link href="/nosotros">Ver todos</Link>
          </Button>
        </div>
      </Container>
    </section>
  )
}
