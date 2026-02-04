"use client"

import * as React from "react"
import { Shield, Users, Award, CheckCircle } from "lucide-react"

const valores = [
  {
    icon: Shield,
    titulo: "Calidad",
    descripcion:
      "Comprometidos con los más altos estándares en cada proyecto, cumpliendo normativas nacionales e internacionales.",
  },
  {
    icon: Users,
    titulo: "Profesionalismo",
    descripcion:
      "Equipo altamente capacitado y certificado, con formación continua en tecnologías del sector.",
  },
  {
    icon: Award,
    titulo: "Innovación",
    descripcion:
      "Implementamos tecnología de punta como inspección CCTV, CIPP y equipos vactor.",
  },
  {
    icon: CheckCircle,
    titulo: "Responsabilidad",
    descripcion:
      "Cumplimos con los tiempos y compromisos acordados, superando expectativas.",
  },
]

export function ValuesGrid() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Nuestros valores
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed mt-3">
            Los principios que guían nuestro trabajo y definen la cultura técnica
            de APINDICO.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {valores.map((valor) => (
            <div
              key={valor.titulo}
              className="group rounded-3xl bg-zinc-900/50 border border-white/10 backdrop-blur-md p-6 transition-all hover:border-orange-500/30"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-orange-500 transition-colors">
                <valor.icon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-semibold text-white mt-4 mb-2">
                {valor.titulo}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {valor.descripcion}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

