"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  Check,
  ArrowLeft,
  ArrowRight,
  Send,
  AlertCircle,
  Info,
  Ruler,
  Droplet,
  PenTool,
  ClipboardList,
  Map,
  Search,
  Lock,
  Trash2,
  Video,
  Wrench,
  Truck,
  LucideIcon,
} from "lucide-react"
import { cn, formatCurrency } from "@/lib/utils"
import { SERVICIOS } from "@/lib/constants"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Select } from "@/components/ui/Select"
import { Textarea } from "@/components/ui/Textarea"
import { useQuoteStep } from "@/components/providers/QuoteStepProvider"

// Schemas de validación por paso
const step1Schema = z.object({
  services: z.array(z.string()).min(1, "Seleccione al menos un servicio"),
})

const step2Schema = z.object({
  metrosLineales: z.number().min(1, "Ingrese los metros lineales").optional(),
  diametroTuberia: z.string().optional(),
  material: z.string().optional(),
  ciudad: z.string().min(2, "Ingrese la ciudad o municipio"),
  urgencia: z.string().min(1, "Seleccione la urgencia"),
  detallesServicio: z.record(z.string().min(10, "Agregue un detalle mínimo"))
    .optional(),
})

const step4Schema = z.object({
  nombre: z.string().min(3, "Nombre muy corto"),
  empresa: z.string().min(2, "Ingrese la empresa"),
  email: z.string().email("Correo electrónico inválido"),
  telefono: z
    .string()
    .regex(/^(\+57)?[3][0-9]{9}$/, "Teléfono celular inválido (ej.: 3134068858)"),
  mensaje: z.string().optional(),
  aceptaTerminos: z.literal(true, "Debe aceptar la política de privacidad"),
})

// Schema completo combinado
const fullSchema = z
  .object({
    ...step1Schema.shape,
    ...step2Schema.shape,
    ...step4Schema.shape,
  })
  .superRefine((data, ctx) => {
    const requiresTechnicalFields = data.services.some((serviceId) =>
      SERVICIOS_TECNICOS.includes(serviceId)
    )

    if (requiresTechnicalFields) {
      if (!data.metrosLineales || data.metrosLineales < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["metrosLineales"],
          message: "Ingrese los metros lineales",
        })
      }
      if (!data.diametroTuberia) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["diametroTuberia"],
          message: "Seleccione el diámetro de tubería",
        })
      }
      if (!data.material) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["material"],
          message: "Seleccione el material",
        })
      }
    }

    data.services.forEach((serviceId) => {
      const detalle = data.detallesServicio?.[serviceId]?.trim()
      if (!detalle || detalle.length < 10) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["detallesServicio", serviceId],
          message: "Ingrese un detalle mínimo para este servicio",
        })
      }
    })
  })

type FormData = z.infer<typeof fullSchema>

// IDs de servicios que requieren campos técnicos adicionales
const SERVICIOS_TECNICOS = [
  "inspeccion-cctv",
  "servicios-vactor",
  "limpieza-redes",
  "prueba-hermeticidad",
  "reparacion-cipp",
]

// Opciones de select
const DIAMETROS = [
  { value: "4-6", label: '4" - 6"' },
  { value: "8-12", label: '8" - 12"' },
  { value: "mayor-12", label: '> 12"' },
]

const MATERIALES = [
  { value: "pvc", label: "PVC" },
  { value: "concreto", label: "Concreto" },
  { value: "gres", label: "Gres" },
  { value: "otro", label: "Otro" },
]

const URGENCIAS = [
  { value: "normal", label: "Normal (5-10 días)" },
  { value: "prioritario", label: "Prioritario (3-5 días)" },
  { value: "urgente", label: "Urgente (24-48 horas)" },
]

// Precios base estimados por servicio (en COP)
const PRECIOS_BASE: Record<string, { min: number; max: number }> = {
  "medicion-caudal": { min: 800000, max: 2500000 },
  "prueba-hidrostatica": { min: 1200000, max: 3500000 },
  "diseno-redes": { min: 5000000, max: 25000000 },
  "catastro-usuarios": { min: 2000000, max: 8000000 },
  "topografia": { min: 1500000, max: 6000000 },
  "catastro-redes": { min: 3000000, max: 12000000 },
  "hermeticidad": { min: 1000000, max: 4000000 },
  "limpieza-redes": { min: 500000, max: 3000000 },
  "inspeccion-cctv": { min: 800000, max: 5000000 },
  "reparacion-cipp": { min: 3000000, max: 15000000 },
  "servicios-vactor": { min: 600000, max: 4000000 },
}

const SERVICE_CATEGORIES: Record<string, string> = {
  "medicion-caudal": "medicion",
  "prueba-hidrostatica": "pruebas",
  "diseno-redes": "diseno",
  "catastro-usuarios": "catastro",
  "topografia": "topografia",
  "catastro-redes": "catastro",
  "hermeticidad": "pruebas",
  "limpieza-redes": "limpieza",
  "inspeccion-cctv": "inspeccion",
  "reparacion-cipp": "rehabilitacion",
  "servicios-vactor": "limpieza",
}

const ICON_MAP: Record<string, LucideIcon> = {
  "Ruler": Ruler,
  "Droplet": Droplet,
  "PenTool": PenTool,
  "ClipboardList": ClipboardList,
  "Map": Map,
  "Search": Search,
  "Lock": Lock,
  "Trash2": Trash2,
  "Video": Video,
  "Wrench": Wrench,
  "Truck": Truck,
}

interface QuoteWizardProps {
  initialService?: string
}

export function QuoteWizard({ initialService }: QuoteWizardProps) {
  const [currentStep, setCurrentStep] = React.useState(1)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [submitSuccess, setSubmitSuccess] = React.useState(false)
  const [submitError, setSubmitError] = React.useState<string | null>(null)
  const { setCurrentStep: setHeaderStep } = useQuoteStep()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(fullSchema),
    defaultValues: {
      services: initialService ? [initialService] : [],
      urgencia: "normal",
      aceptaTerminos: undefined,
      detallesServicio: {},
    },
    mode: "onChange",
  })

  const selectedServices = watch("services") || []
  const metrosLineales = watch("metrosLineales")
  const diametroTuberia = watch("diametroTuberia")
  const material = watch("material")
  const ciudad = watch("ciudad")
  const urgencia = watch("urgencia")
  const detallesServicio = watch("detallesServicio") || {}
  const hasSelectedServices = selectedServices.length > 0

  // Verificar si se requieren campos técnicos
  const requiresTechnicalFields = selectedServices.some((s) =>
    SERVICIOS_TECNICOS.includes(s)
  )

  // Calcular estimado de precio
  const calculateEstimate = (): { min: number; max: number } => {
    let totalMin = 0
    let totalMax = 0

    selectedServices.forEach((serviceId) => {
      const precio = PRECIOS_BASE[serviceId]
      if (precio) {
        totalMin += precio.min
        totalMax += precio.max
      }
    })

    // Multiplicador por metros lineales si aplica
    if (requiresTechnicalFields && metrosLineales && metrosLineales > 100) {
      const factor = metrosLineales / 100
      totalMin = totalMin * factor * 0.7
      totalMax = totalMax * factor
    }

    // Multiplicador por urgencia
    if (urgencia === "prioritario") {
      totalMin *= 1.2
      totalMax *= 1.3
    } else if (urgencia === "urgente") {
      totalMin *= 1.5
      totalMax *= 1.8
    }

    return { min: Math.round(totalMin), max: Math.round(totalMax) }
  }

  // Manejar selección de servicio
  const handleServiceToggle = (serviceId: string) => {
    const current = selectedServices
    const updated = current.includes(serviceId)
      ? current.filter((s) => s !== serviceId)
      : [...current, serviceId]
    setValue("services", updated, { shouldValidate: true })
  }

  const getServiceCategory = (serviceId: string) =>
    SERVICE_CATEGORIES[serviceId] ?? "general"

  const getServiceTooltip = (service: (typeof SERVICIOS)[number]) => {
    if (service.normativa) {
      return `Normativa ${service.normativa}`
    }
    if (service.nombre.toLowerCase().includes("cipp")) {
      return "CIPP (Cured-In-Place Pipe): rehabilitación sin zanja"
    }
    return null
  }

  // Validar paso actual antes de avanzar
  const validateCurrentStep = async (): Promise<boolean> => {
    switch (currentStep) {
      case 1:
        return trigger("services")
      case 2:
        const fields: (keyof FormData)[] = ["ciudad", "urgencia"]
        if (requiresTechnicalFields) {
          fields.push("metrosLineales", "diametroTuberia", "material")
        }
        const detalleFields = selectedServices.map(
          (serviceId) => `detallesServicio.${serviceId}` as const
        )
        return trigger([...fields, ...detalleFields])
      case 3:
        return true // Paso de estimado no requiere validación
      case 4:
        return trigger(["nombre", "empresa", "email", "telefono", "aceptaTerminos"])
      default:
        return true
    }
  }

  // Navegación
  const goNext = async () => {
    const isValid = await validateCurrentStep()
    if (isValid && currentStep < 4) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  React.useEffect(() => {
    setHeaderStep(currentStep)
  }, [currentStep, setHeaderStep])

  const goPrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  // Enviar formulario
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const response = await fetch("/api/cotizacion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          estimado: calculateEstimate(),
          serviciosNombres: selectedServices.map(
            (id) => SERVICIOS.find((s) => s.id === id)?.nombre
          ),
        }),
      })

      if (!response.ok) {
        throw new Error("Error al enviar la cotización")
      }

      setSubmitSuccess(true)
    } catch {
      setSubmitError(
        "Hubo un error al enviar su solicitud. Por favor intente nuevamente o contáctenos directamente."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  // Si ya se envió exitosamente
  if (submitSuccess) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-verde-exito/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 text-verde-exito" />
        </div>
        <h2 className="font-heading text-2xl font-bold text-gris-900 mb-4">
          ¡Solicitud enviada!
        </h2>
        <p className="text-gris-600 mb-6">
          Hemos recibido su solicitud de cotización. Nuestro equipo técnico se
          pondrá en contacto con usted en menos de 24 horas hábiles.
        </p>
        <Button
          onClick={() => {
            setSubmitSuccess(false)
            setCurrentStep(1)
            setValue("services", [])
          }}
          variant="secondary"
        >
          Nueva cotización
        </Button>
      </div>
    )
  }

  const estimate = calculateEstimate()
  const urgenciaLabel =
    URGENCIAS.find((option) => option.value === urgencia)?.label ?? "No especificada"

  return (
    <div className="quote-wizard bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Step Indicator */}
      <div className="bg-gris-100 px-6 py-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          {[1, 2, 3, 4].map((step, index) => (
            <React.Fragment key={step}>
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300",
                    currentStep > step
                      ? "bg-verde-exito text-white"
                      : currentStep === step
                        ? "bg-azul-principal text-white"
                        : "bg-gris-200 text-gris-500"
                  )}
                >
                  {currentStep > step ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    step
                  )}
                </div>
                <span
                  className={cn(
                    "text-xs mt-1 hidden sm:block font-medium",
                    currentStep === step
                      ? "text-azul-principal"
                      : currentStep > step
                        ? "text-gris-900"
                        : "text-gris-700"
                  )}
                >
                  {step === 1 && "Servicios"}
                  {step === 2 && "Detalles"}
                  {step === 3 && "Estimado"}
                  {step === 4 && "Contacto"}
                </span>
              </div>
              {index < 3 && (
                <div
                  className={cn(
                    "flex-1 h-1 mx-2 rounded-full transition-all duration-300",
                    currentStep > step ? "bg-verde-exito" : "bg-gris-200"
                  )}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-6 lg:p-8">
        {/* PASO 1: Selección de servicios */}
        {currentStep === 1 && (
          <div className="space-y-6 quote-step">
            <div>
              <h2 className="font-heading text-xl font-semibold text-gris-900 mb-2">
                Seleccione los servicios que necesita
              </h2>
              <p className="text-gris-600 text-sm">
                Puede seleccionar uno o más servicios para su cotización
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 items-stretch auto-rows-fr md:[grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]">
              {SERVICIOS.map((servicio, index) => {
                const isSelected = selectedServices.includes(servicio.id)
                const tooltip = getServiceTooltip(servicio)
                const IconComponent = ICON_MAP[servicio.icon]
                return (
                  <button
                    key={servicio.id}
                    type="button"
                    data-category={getServiceCategory(servicio.id)}
                    onClick={() => handleServiceToggle(servicio.id)}
                    className={cn(
                      "quote-service-card group relative rounded-xl text-left transition-all duration-300 ease-in-out h-full min-h-[180px] flex flex-col p-5",
                      "border border-slate-200 bg-white",
                      "hover:-translate-y-[5px] hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)] active:scale-[0.98]",
                      "focus:outline-none focus:ring-2 focus:ring-azul-principal focus:ring-offset-2",
                      isSelected
                        ? "border-2 border-azul-principal bg-[#f0f7ff] shadow-[0_12px_24px_-12px_rgba(10,37,64,0.5)]"
                        : "hover:border-slate-300"
                    )}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {isSelected && (
                      <span
                        className="absolute top-3 right-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-azul-principal shadow-sm animate-check-in"
                        aria-hidden="true"
                      >
                        <Check className="h-4 w-4 text-white" />
                      </span>
                    )}
                    <div className="flex items-start justify-between gap-3">
                      {IconComponent && (
                        <IconComponent
                          className="h-6 w-6 text-azul-principal"
                          strokeWidth={1.75}
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    <div className="mt-3 space-y-1">
                      <div className="flex items-start gap-2">
                        <h3
                          className={cn(
                            "font-heading font-semibold text-sm sm:text-base leading-[1.2] whitespace-normal break-words",
                            isSelected ? "text-azul-oscuro" : "text-gris-900"
                          )}
                        >
                          {servicio.nombre}
                        </h3>
                        {tooltip && (
                          <span className="relative inline-flex items-center group/tooltip">
                            <Info className="h-4 w-4 text-gris-500" aria-hidden="true" />
                            <span className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 w-56 -translate-x-1/2 rounded-lg bg-gris-900 px-3 py-2 text-xs text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover/tooltip:opacity-100">
                              {tooltip}
                            </span>
                          </span>
                        )}
                      </div>
                      <p className="text-base text-gris-600 leading-relaxed">
                        {servicio.descripcion}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>

            {errors.services && (
              <p className="text-sm text-rojo-error flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {errors.services.message}
              </p>
            )}
          </div>
        )}

        {/* PASO 2: Especificaciones técnicas */}
        {currentStep === 2 && (
          <div className="space-y-6 quote-step">
            <div>
              <h2 className="font-heading text-xl font-semibold text-gris-900 mb-2">
                Especificaciones del proyecto
              </h2>
              <p className="text-gris-600 text-sm">
                Complete los detalles técnicos para una cotización más precisa
              </p>
            </div>

            {/* Campos técnicos condicionales */}
            {requiresTechnicalFields && (
              <div className="bg-azul-bg/50 rounded-xl p-4 space-y-4">
                <h3 className="font-heading font-semibold text-gris-900 text-sm">
                  Especificaciones de tubería
                </h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <Input
                    label="Metros lineales *"
                    type="number"
                    placeholder="Ej: 150"
                    error={!!errors.metrosLineales}
                    errorMessage={errors.metrosLineales?.message}
                    {...register("metrosLineales", { valueAsNumber: true })}
                  />
                  <Select
                    label="Diámetro de tubería *"
                    options={DIAMETROS}
                    error={!!errors.diametroTuberia}
                    errorMessage={errors.diametroTuberia?.message}
                    {...register("diametroTuberia")}
                  />
                  <Select
                    label="Material *"
                    options={MATERIALES}
                    error={!!errors.material}
                    errorMessage={errors.material?.message}
                    {...register("material")}
                  />
                </div>
              </div>
            )}

            {/* Campos mínimos por servicio */}
            {hasSelectedServices && (
              <div className="bg-white rounded-xl border border-gris-200 p-4 space-y-4">
                <div>
                  <h3 className="font-heading font-semibold text-gris-900 text-sm">
                    Detalles mínimos por servicio
                  </h3>
                  <p className="text-gris-600 text-xs">
                    Un breve detalle ayuda a preparar una cotización precisa.
                  </p>
                </div>
                <div className="grid gap-4">
                  {selectedServices.map((serviceId) => {
                    const servicio = SERVICIOS.find((s) => s.id === serviceId)
                    const detalleError = (
                      errors.detallesServicio as Record<string, { message?: string }> | undefined
                    )?.[serviceId]

                    return (
                      <Textarea
                        key={serviceId}
                        label={`Detalle para ${servicio?.nombre ?? "este servicio"} *`}
                        placeholder="Ej: longitud aproximada, condición de la red, ubicación o requerimientos clave."
                        rows={3}
                        error={!!detalleError}
                        errorMessage={detalleError?.message}
                        {...register(`detallesServicio.${serviceId}` as const)}
                      />
                    )
                  })}
                </div>
              </div>
            )}

            {/* Campos comunes */}
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Ciudad / Municipio *"
                placeholder="Ej: Bogotá"
                error={!!errors.ciudad}
                errorMessage={errors.ciudad?.message}
                {...register("ciudad")}
              />
              <Select
                label="Urgencia *"
                options={URGENCIAS}
                error={!!errors.urgencia}
                errorMessage={errors.urgencia?.message}
                {...register("urgencia")}
              />
            </div>
          </div>
        )}

        {/* PASO 3: Estimado */}
        {currentStep === 3 && (
          <div className="space-y-6 quote-step">
            <div>
              <h2 className="font-heading text-xl font-semibold text-gris-900 mb-2">
                Estimado de su proyecto
              </h2>
              <p className="text-gris-600 text-sm">
                Basado en la información proporcionada
              </p>
            </div>

            {/* Card con estimado */}
            <div className="bg-gradient-to-br from-azul-oscuro to-azul-principal rounded-2xl p-6 lg:p-8 text-white">
              <p className="text-azul-claro text-sm uppercase tracking-wide mb-2">
                Estimado para su proyecto
              </p>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="font-heading text-3xl lg:text-4xl font-bold">
                  {formatCurrency(estimate.min)}
                </span>
                <span className="text-azul-claro">-</span>
                <span className="font-heading text-3xl lg:text-4xl font-bold">
                  {formatCurrency(estimate.max)}
                </span>
              </div>

              {/* Servicios seleccionados */}
              <div className="border-t border-white/20 pt-4">
                <p className="text-sm text-azul-claro mb-3">
                  Servicios incluidos:
                </p>
                <ul className="space-y-2">
                  {selectedServices.map((serviceId) => {
                    const servicio = SERVICIOS.find((s) => s.id === serviceId)
                    return servicio ? (
                      <li
                        key={serviceId}
                        className="flex items-center gap-2 text-sm"
                      >
                        <Check className="w-4 h-4 text-verde-exito" />
                        {servicio.nombre}
                      </li>
                    ) : null
                  })}
                </ul>
              </div>
            </div>

            {/* Resumen de solicitud */}
            <div className="bg-white border border-gris-200 rounded-2xl p-6">
              <div className="flex items-center justify-between gap-2 mb-4">
                <h3 className="font-heading text-lg font-semibold text-gris-900">
                  Resumen de la solicitud
                </h3>
                <span className="text-xs text-gris-500">Revise antes de enviar</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 text-sm text-gris-700">
                <div>
                  <p className="text-xs uppercase tracking-wide text-gris-500 mb-1">
                    Ciudad / Municipio
                  </p>
                  <p className="font-semibold text-gris-900">
                    {ciudad?.trim() || "Pendiente"}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gris-500 mb-1">
                    Urgencia
                  </p>
                  <p className="font-semibold text-gris-900">{urgenciaLabel}</p>
                </div>
                {requiresTechnicalFields && (
                  <>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gris-500 mb-1">
                        Metros lineales
                      </p>
                      <p className="font-semibold text-gris-900">
                        {metrosLineales ? `${metrosLineales} m` : "Pendiente"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gris-500 mb-1">
                        Diámetro / Material
                      </p>
                      <p className="font-semibold text-gris-900">
                        {[diametroTuberia, material].filter(Boolean).join(" · ") ||
                          "Pendiente"}
                      </p>
                    </div>
                  </>
                )}
              </div>

              <div className="mt-6 border-t border-gris-200 pt-4">
                <p className="text-xs uppercase tracking-wide text-gris-500 mb-3">
                  Detalles por servicio
                </p>
                <div className="space-y-3">
                  {selectedServices.map((serviceId) => {
                    const servicio = SERVICIOS.find((s) => s.id === serviceId)
                    const detalle = (detallesServicio as Record<string, string>)[serviceId]
                    return (
                      <div key={serviceId} className="rounded-lg bg-gris-100 px-4 py-3">
                        <p className="font-semibold text-gris-900 text-sm">
                          {servicio?.nombre ?? "Servicio"}
                        </p>
                        <p className="text-sm text-gris-700 mt-1">
                          {detalle?.trim() || "Pendiente"}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-naranja-warning/10 border border-naranja-warning/30 rounded-xl p-4">
              <p className="text-sm text-gris-700">
                <strong className="text-naranja-warning">Nota:</strong> Este es
                un estimado preliminar basado en la información proporcionada.
                El precio final puede variar según las condiciones específicas
                del proyecto, accesibilidad del sitio y otros factores técnicos
                que se evaluarán durante la visita técnica.
              </p>
            </div>
          </div>
        )}

        {/* PASO 4: Contacto */}
        {currentStep === 4 && (
          <div className="space-y-6 quote-step">
            <div>
              <h2 className="font-heading text-xl font-semibold text-gris-900 mb-2">
                Datos de contacto
              </h2>
              <p className="text-gris-600 text-sm">
                Complete sus datos para recibir la cotización formal
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Nombre completo *"
                placeholder="Juan Pérez"
                error={!!errors.nombre}
                errorMessage={errors.nombre?.message}
                {...register("nombre")}
              />
              <Input
                label="Empresa *"
                placeholder="Nombre de la empresa"
                error={!!errors.empresa}
                errorMessage={errors.empresa?.message}
                {...register("empresa")}
              />
              <Input
                label="Correo electrónico *"
                type="email"
                placeholder="correo@empresa.com"
                error={!!errors.email}
                errorMessage={errors.email?.message}
                {...register("email")}
              />
              <Input
                label="Teléfono celular *"
                type="tel"
                placeholder="3134068858"
                helperText="Formato: 10 dígitos sin espacios"
                error={!!errors.telefono}
                errorMessage={errors.telefono?.message}
                {...register("telefono")}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gris-800 font-body mb-1.5">
                Mensaje adicional (opcional)
              </label>
              <textarea
                className={cn(
                  "flex w-full rounded-lg min-h-[100px]",
                  "border-2 border-gris-200 bg-white",
                  "px-4 py-3 text-base font-body text-gris-900",
                  "placeholder:text-gris-400",
                  "transition-all duration-200 ease-out",
                  "focus:outline-none focus:border-azul-principal focus:ring-2 focus:ring-azul-bg",
                  "resize-none"
                )}
                placeholder="Describa cualquier detalle adicional sobre su proyecto..."
                {...register("mensaje")}
              />
            </div>

            {/* Checkbox términos */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="aceptaTerminos"
                className={cn(
                  "w-5 h-5 rounded border-2 border-gris-300 mt-0.5",
                  "text-azul-principal focus:ring-azul-principal focus:ring-offset-2",
                  "transition-colors cursor-pointer"
                )}
                {...register("aceptaTerminos")}
              />
              <label
                htmlFor="aceptaTerminos"
                className="text-sm text-gris-700 cursor-pointer"
              >
                Acepto la{" "}
                <a
                  href="/privacidad"
                  className="text-azul-principal hover:underline"
                  target="_blank"
                >
                  política de privacidad
                </a>{" "}
                y autorizo el tratamiento de mis datos personales para recibir
                la cotización solicitada.
              </label>
            </div>
            {errors.aceptaTerminos && (
              <p className="text-sm text-rojo-error flex items-center gap-2 -mt-3">
                <AlertCircle className="w-4 h-4" />
                {errors.aceptaTerminos.message}
              </p>
            )}

            {/* Error de envío */}
            {submitError && (
              <div className="bg-rojo-error/10 border border-rojo-error/30 rounded-xl p-4">
                <p className="text-sm text-rojo-error">{submitError}</p>
              </div>
            )}
          </div>
        )}

        {/* Navegación */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-8 pt-6 border-t border-gris-200 sticky bottom-0 bg-white/95 backdrop-blur-sm -mx-6 px-6 py-4 sm:static sm:bg-transparent sm:backdrop-blur-0 sm:mx-0 sm:px-0 sm:py-0">
          <Button
            type="button"
            variant="ghost"
            onClick={goPrev}
            disabled={currentStep === 1}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
            className="w-full sm:w-auto"
          >
            Anterior
          </Button>

          {currentStep < 4 ? (
            <Button
              type="button"
              onClick={goNext}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className={cn(
                "bg-[#FF6B00] text-white hover:bg-[#E65F00]",
                currentStep === 1 && hasSelectedServices && "animate-cta-pulse",
                "w-full sm:w-auto"
              )}
            >
              Siguiente
            </Button>
          ) : (
            <Button
              type="submit"
              variant="accent"
              isLoading={isSubmitting}
              rightIcon={!isSubmitting && <Send className="w-4 h-4" />}
              className="w-full sm:w-auto"
            >
              Solicitar cotización
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
