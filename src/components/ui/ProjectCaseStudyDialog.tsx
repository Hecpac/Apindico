"use client"

import type { ReactNode } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import Link from "next/link"
import { X, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button"
import type { ProjectCaseStudy } from "@/lib/projectCaseStudy"

export interface ProjectCaseStudyDialogProps {
  project: {
    id: string
    titulo: string
    cliente: string
    ubicacion: string
    descripcion: string
    fecha: string
  }
  caseStudy: ProjectCaseStudy
  trigger: ReactNode
}

export function ProjectCaseStudyDialog({
  project,
  caseStudy,
  trigger,
}: ProjectCaseStudyDialogProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm",
            "motion-safe:animate-[fade-in_0.3s_ease-out] motion-reduce:animate-none"
          )}
        />
        <Dialog.Content
          className={cn(
            "fixed z-50 w-full max-h-[90vh] overflow-y-auto",
            "bottom-0 left-0 right-0 rounded-t-[var(--radius-5)]",
            "border border-[color:var(--color-border)] bg-[color:var(--color-surface)] text-[color:var(--color-text)]",
            "shadow-[var(--shadow-4)]",
            "sm:top-1/2 sm:left-1/2 sm:bottom-auto sm:right-auto sm:max-w-2xl",
            "sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-[var(--radius-5)]"
          )}
        >
          <div className="flex items-start justify-between gap-4 border-b border-[color:var(--color-border)] px-6 py-5">
            <div className="space-y-2">
              <Dialog.Title className="text-xl sm:text-2xl font-semibold text-[color:var(--color-text)]">
                {project.titulo}
              </Dialog.Title>
              <Dialog.Description className="text-sm text-[color:var(--color-muted)] max-w-xl">
                {project.descripcion}
              </Dialog.Description>
              <div className="flex flex-wrap gap-3 text-xs text-[color:var(--color-muted)]">
                <span className="rounded-full border border-[color:var(--color-border)] px-3 py-1">
                  {project.cliente}
                </span>
                <span className="rounded-full border border-[color:var(--color-border)] px-3 py-1">
                  {project.ubicacion}
                </span>
                <span className="rounded-full border border-[color:var(--color-border)] px-3 py-1">
                  {project.fecha}
                </span>
              </div>
            </div>
            <Dialog.Close
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--color-border)] text-[color:var(--color-muted)] transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)]"
              aria-label="Cerrar"
            >
              <X className="h-4 w-4" />
            </Dialog.Close>
          </div>

          <div className="space-y-6 px-6 py-6">
            <section className="space-y-2">
              <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
                Contexto
              </h4>
              <p className="text-sm sm:text-base text-[color:var(--color-text)]">
                {caseStudy.contexto}
              </p>
            </section>

            <div className="grid gap-6 sm:grid-cols-2">
              <section className="space-y-3 rounded-[var(--radius-3)] border border-[color:var(--color-border)] bg-white/5 p-4">
                <h5 className="text-sm font-semibold text-[color:var(--color-text)]">
                  Alcance
                </h5>
                <ul className="space-y-2 text-sm text-[color:var(--color-muted)]">
                  {caseStudy.alcance.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span
                        className="mt-1 h-1.5 w-1.5 rounded-full bg-[color:var(--color-accent)]"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="space-y-3 rounded-[var(--radius-3)] border border-[color:var(--color-border)] bg-white/5 p-4">
                <h5 className="text-sm font-semibold text-[color:var(--color-text)]">
                  Entregables
                </h5>
                <ul className="space-y-2 text-sm text-[color:var(--color-muted)]">
                  {caseStudy.entregables.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span
                        className="mt-1 h-1.5 w-1.5 rounded-full bg-[color:var(--color-accent-2)]"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="space-y-3 rounded-[var(--radius-3)] border border-[color:var(--color-border)] bg-white/5 p-4 sm:col-span-2">
                <h5 className="text-sm font-semibold text-[color:var(--color-text)]">
                  Resultados
                </h5>
                <ul className="space-y-2 text-sm text-[color:var(--color-muted)]">
                  {caseStudy.resultados.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span
                        className="mt-1 h-1.5 w-1.5 rounded-full bg-[color:var(--color-accent)]"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <div className="flex flex-wrap gap-3 border-t border-[color:var(--color-border)] pt-4">
              <Button variant="cta" size="md" asChild>
                <Link href={`/proyectos/${project.id}`}>
                  Ver caso completo
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="md" asChild>
                <Link href="/contacto">Solicitar información</Link>
              </Button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
