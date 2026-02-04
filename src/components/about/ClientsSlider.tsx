"use client"

import * as React from "react"
import Image from "next/image"
import { CLIENTES_DATA } from "@/lib/constants"

const duplicated = [...CLIENTES_DATA, ...CLIENTES_DATA]

function ClientMark({ name, logo }: { name: string; logo: string | null }) {
  if (!logo) {
    return (
      <span className="text-xs font-semibold tracking-[0.25em] text-zinc-500 group-hover:text-white transition-colors">
        {name}
      </span>
    )
  }

  return (
    <Image
      src={logo}
      alt={`Logo de ${name}`}
      width={140}
      height={60}
      className="h-10 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
      loading="lazy"
    />
  )
}

export function ClientsSlider() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Clientes que confían en nosotros
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto mt-3">
            Empresas del sector público y privado que han elegido nuestro enfoque
            técnico.
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-zinc-950 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-zinc-950 to-transparent z-10" />

        <ul className="animate-scroll-clients flex gap-8 md:gap-12 list-none p-0 m-0 w-max">
          {duplicated.map((cliente, index) => (
            <li
              key={`${cliente.name}-${index}`}
              className="group flex items-center justify-center px-6 py-4 rounded-2xl border border-white/10 bg-zinc-900/40 backdrop-blur-md min-w-[160px] text-center"
              title={cliente.name}
            >
              <ClientMark name={cliente.name} logo={cliente.logo} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

