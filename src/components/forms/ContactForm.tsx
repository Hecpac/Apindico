"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"
import { Button } from "@/components/ui/Button"
import copy from "@/lib/copy"

const contactSchema = z.object({
  nombre: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres"),
  email: z
    .string()
    .email("Ingrese un correo electrónico válido"),
  telefono: z
    .string()
    .regex(
      /^(\+57\s?)?[3][0-9]{9}$/,
      "Ingrese un número de celular válido (ej: 313 406 8858)"
    )
    .optional()
    .or(z.literal("")),
  mensaje: z
    .string()
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .max(1000, "El mensaje no puede exceder 1000 caracteres"),
})

type ContactFormData = z.infer<typeof contactSchema>

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [submitStatus, setSubmitStatus] = React.useState<"success" | "error" | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch("/api/contacto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitStatus("success")
        reset()
      } else {
        setSubmitStatus("error")
      }
    } catch {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label={`${copy.contact.form.name} *`}
        placeholder="Ej: Juan Pérez"
        error={!!errors.nombre}
        errorMessage={errors.nombre?.message}
        {...register("nombre")}
      />

      <Input
        label={`${copy.contact.form.email} *`}
        type="email"
        placeholder="Ej: juan@empresa.com"
        error={!!errors.email}
        errorMessage={errors.email?.message}
        {...register("email")}
      />

      <Input
        label={copy.contact.form.phone}
        type="tel"
        placeholder="Ej: 313 406 8858"
        helperText={copy.contact.form.phoneHelp}
        error={!!errors.telefono}
        errorMessage={errors.telefono?.message}
        {...register("telefono")}
      />

      <Textarea
        label={`${copy.contact.form.message} *`}
        placeholder="Cuéntenos sobre su proyecto o consulta..."
        rows={5}
        error={!!errors.mensaje}
        errorMessage={errors.mensaje?.message}
        {...register("mensaje")}
      />

      {submitStatus === "success" && (
        <div
          className="p-4 bg-green-100 border border-verde-exito rounded-lg"
          role="status"
          aria-live="polite"
        >
          <p className="text-verde-exito font-medium">
            {copy.contact.form.success}
          </p>
        </div>
      )}

      {submitStatus === "error" && (
        <div
          className="p-4 bg-red-100 border border-rojo-error rounded-lg"
          role="status"
          aria-live="polite"
        >
          <p className="text-rojo-error font-medium">
            {copy.contact.form.error}
          </p>
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isSubmitting}
        loadingLabel={copy.contact.form.submitting}
        className="w-full"
      >
        {copy.contact.form.submit}
      </Button>
    </form>
  )
}
