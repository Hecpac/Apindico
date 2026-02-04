export const DEFAULT_INCLUDES = [
  "Diagnóstico técnico preliminar",
  "Informe con hallazgos principales",
  "Recomendaciones de intervención",
]

export const SERVICE_INCLUDES: Record<string, string[]> = {
  "inspeccion-cctv": [
    "Inspección en video HD",
    "Codificación PACP",
    "Reporte de anomalías",
  ],
  "servicios-vactor": [
    "Hidrolavado a presión",
    "Extracción de sedimentos",
    "Disposición controlada",
  ],
  "prueba-hermeticidad": [
    "Pruebas de infiltración",
    "Registro de fugas",
    "Informe técnico",
  ],
  "prueba-hidrostatica": [
    "Presurización por tramos",
    "Control de presión",
    "Certificado de prueba",
  ],
  "medicion-caudal-presion": [
    "Mediciones en puntos clave",
    "Análisis de caudal",
    "Reporte de presión",
  ],
  "diseno-acueducto-alcantarillado": [
    "Memorias de cálculo",
    "Planos detallados",
    "Especificaciones técnicas",
  ],
  "catastro-usuarios": [
    "Censo y actualización",
    "Georreferenciación",
    "Base de datos",
  ],
  "levantamientos-topograficos": [
    "Levantamiento planimétrico",
    "Perfiles longitudinales",
    "Entrega en CAD/GIS",
  ],
  "catastro-redes": [
    "Inventario de activos",
    "Georreferenciación",
    "Plano actualizado",
  ],
  "limpieza-redes": [
    "Sondeo preventivo",
    "Limpieza de tramos",
    "Registro de sedimentos",
  ],
  "reparacion-cipp": [
    "Rehabilitación sin zanja",
    "Revestimiento estructural",
    "Registro fotográfico",
  ],
}

export const getServiceIncludes = (slug: string) =>
  SERVICE_INCLUDES[slug] ?? DEFAULT_INCLUDES
