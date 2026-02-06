"use client"

import Link from "next/link"
import { MessageCircle } from "lucide-react"
import copy from "@/lib/copy"
import { COMPANY_INFO } from "@/lib/constants"

function buildWhatsAppHref(phone: string, message: string) {
  const cleanPhone = phone.replace(/\D/g, "")
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`
}

export function WhatsAppCTA() {
  const href = buildWhatsAppHref(COMPANY_INFO.phones.celulares[0], copy.whatsapp.prefilled)

  return (
    <div className="fixed bottom-6 right-5 z-[80] max-sm:bottom-20">
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-3 rounded-full border border-[color:var(--color-accent)]/45 bg-[color:var(--color-surface)] px-4 py-3 text-[color:var(--color-text)] shadow-[var(--shadow-2)] transition-colors hover:bg-[color:var(--color-surface-2)]"
        aria-label={`${copy.whatsapp.label}. ${copy.whatsapp.badge}`}
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--color-accent)]/20 text-[color:var(--color-accent)]">
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
        </span>
        <span className="hidden text-left sm:block">
          <span className="block text-sm font-semibold">{copy.whatsapp.label}</span>
          <span className="block text-[10px] uppercase tracking-[0.14em] text-[color:var(--color-muted)]">
            {copy.whatsapp.badge}
          </span>
        </span>
      </Link>
    </div>
  )
}
