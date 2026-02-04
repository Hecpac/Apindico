export type ProjectCaseStudy = {
  contexto: string
  alcance: string[]
  entregables: string[]
  resultados: string[]
}

const DEFAULT_ENTREGABLES = [
  "Informe técnico ejecutivo",
  "Registro de hallazgos priorizados",
  "Recomendaciones de intervención",
]

export const PROJECT_CASE_STUDIES: Record<string, ProjectCaseStudy> = {
  "1": {
    contexto:
      "Inspección CCTV de red principal de alcantarillado con enfoque en diagnóstico preventivo y trazabilidad de hallazgos críticos.",
    alcance: [
      "Levantamiento de tramos prioritarios y puntos críticos",
      "Registro en video HD y codificación de anomalías",
      "Informe PACP con prioridades de intervención",
    ],
    entregables: DEFAULT_ENTREGABLES,
    resultados: [
      "Mapa de riesgos por tramo",
      "Plan de intervención por fases",
      "Recomendaciones técnicas para rehabilitación",
    ],
  },
  "2": {
    contexto:
      "Limpieza con equipo Vactor para recuperar capacidad hidráulica en colector principal con alto nivel de sedimentos.",
    alcance: [
      "Hidrolavado a alta presión",
      "Extracción de sólidos y lodos",
      "Disposición controlada de residuos",
    ],
    entregables: DEFAULT_ENTREGABLES,
    resultados: [
      "Mejora de flujo y reducción de obstrucciones",
      "Registro de sedimentos y puntos críticos",
      "Recomendaciones de mantenimiento preventivo",
    ],
  },
  "3": {
    contexto:
      "Pruebas hidrostáticas para validación de estanqueidad y cumplimiento normativo en redes nuevas de acueducto.",
    alcance: [
      "Presurización y control por sectores",
      "Monitoreo de presión y fugas",
      "Certificación de pruebas conforme a especificaciones",
    ],
    entregables: DEFAULT_ENTREGABLES,
    resultados: [
      "Certificados de cumplimiento por tramo",
      "Registro de parámetros de prueba",
      "Recomendaciones para ajustes finales",
    ],
  },
}

const DEFAULT_CASE_STUDY: ProjectCaseStudy = {
  contexto:
    "Proyecto ejecutado con enfoque en calidad, cumplimiento normativo y trazabilidad técnica para la toma de decisiones.",
  alcance: [
    "Planeación y levantamiento de información en campo",
    "Ejecución técnica con personal certificado",
    "Entrega de reportes y recomendaciones",
  ],
  entregables: DEFAULT_ENTREGABLES,
  resultados: [
    "Documentación técnica completa",
    "Hallazgos priorizados para intervención",
    "Mejores prácticas operativas",
  ],
}

export const getProjectCaseStudy = (id: string) =>
  PROJECT_CASE_STUDIES[id] ?? DEFAULT_CASE_STUDY
