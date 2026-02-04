"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  // Generate schema.org BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": typeof window !== "undefined" ? window.location.origin : "https://apindico.com"
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.label,
        ...(item.href && {
          "item": typeof window !== "undefined"
            ? `${window.location.origin}${item.href}`
            : `https://apindico.com${item.href}`
        })
      }))
    ]
  }

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb"
        className={cn("py-4", className)}
      >
        <ol className="flex items-center gap-2 text-sm">
          {/* Home Link */}
          <li>
            <Link
              href="/"
              className="flex items-center gap-1 text-gris-600 hover:text-azul-principal transition-colors"
              aria-label="Volver al inicio"
            >
              <Home className="h-4 w-4" />
              <span className="sr-only sm:not-sr-only">Inicio</span>
            </Link>
          </li>

          {/* Breadcrumb Items */}
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <li aria-hidden="true">
                <ChevronRight className="h-4 w-4 text-gris-400" />
              </li>
              <li>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="text-gris-600 hover:text-azul-principal transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className="text-gris-900 font-medium"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                )}
              </li>
            </React.Fragment>
          ))}
        </ol>
      </nav>
    </>
  )
}
