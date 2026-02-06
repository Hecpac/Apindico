export const SERVICIOS = [
  {
    id: "medicion-caudal",
    icon: "Ruler",
    nombre: "Medición de Caudal y Presión",
    descripcion: "Medición precisa para optimización de redes hidráulicas",
    slug: "medicion-caudal-presion",
    normativa: null,
  },
  {
    id: "prueba-hidrostatica",
    icon: "Droplet",
    nombre: "Prueba Hidrostática",
    descripcion: "Verificación de estanqueidad en tuberías de agua potable",
    slug: "prueba-hidrostatica",
    normativa: null,
  },
  {
    id: "diseno-redes",
    icon: "PenTool",
    nombre: "Diseño de Acueducto y Alcantarillado",
    descripcion: "Ingeniería de redes hidráulicas con memorias de cálculo",
    slug: "diseno-acueducto-alcantarillado",
    normativa: null,
  },
  {
    id: "catastro-usuarios",
    icon: "ClipboardList",
    nombre: "Catastro de Usuarios",
    descripcion: "Censo y actualización de suscriptores",
    slug: "catastro-usuarios",
    normativa: null,
  },
  {
    id: "topografia",
    icon: "Map",
    nombre: "Levantamientos Topográficos",
    descripcion: "Según normativa NS-030 EAB-ESP",
    slug: "levantamientos-topograficos",
    normativa: "NS-030 EAB-ESP",
  },
  {
    id: "catastro-redes",
    icon: "Search",
    nombre: "Catastro de Redes",
    descripcion: "Inventario y georreferenciación de infraestructura",
    slug: "catastro-redes",
    normativa: null,
  },
  {
    id: "hermeticidad",
    icon: "Lock",
    nombre: "Prueba de Hermeticidad",
    descripcion: "Detección de fugas e infiltraciones en alcantarillado",
    slug: "prueba-hermeticidad",
    normativa: null,
  },
  {
    id: "limpieza-redes",
    icon: "Trash2",
    nombre: "Sondeo y Limpieza de Redes",
    descripcion: "Mantenimiento preventivo y correctivo",
    slug: "limpieza-redes",
    normativa: null,
  },
  {
    id: "inspeccion-cctv",
    icon: "Video",
    nombre: "Inspección CCTV",
    descripcion: "Diagnóstico visual según NS-058 EAB-ESP",
    slug: "inspeccion-cctv",
    normativa: "NS-058 EAB-ESP",
  },
  {
    id: "reparacion-cipp",
    icon: "Wrench",
    nombre: "Reparación CIPP",
    descripcion: "Rehabilitación de tuberías sin excavación",
    slug: "reparacion-cipp",
    normativa: null,
  },
  {
    id: "servicios-vactor",
    icon: "Truck",
    nombre: "Servicios Vactor",
    descripcion: "Succión e hidrolavado a alta presión para desazolve",
    slug: "servicios-vactor",
    normativa: null,
  },
] as const

export type Servicio = (typeof SERVICIOS)[number]

export const SERVICIOS_ADICIONALES = [
  "Asesorías técnicas en acueductos y alcantarillados",
  "Implementación de sistemas de información geográfica (SIG)",
  "Modelación hidráulica de redes de acueducto y alcantarillado",
  "Desinfección de tubería",
  "Programas de optimización operacional de redes",
  "Lavado de tubería con hidrolavadora",
] as const

export interface Proyecto {
  id: string
  titulo: string
  cliente: string
  ubicacion: string
  servicioId: string
  descripcion: string
  imagen?: string
  fecha: string
}

export const PROYECTOS: Proyecto[] = [
  {
    id: "1",
    titulo: "Inspección CCTV Red Principal Bogotá",
    cliente: "EAAB",
    ubicacion: "Bogotá, Cundinamarca",
    servicioId: "inspeccion-cctv",
    descripcion: "Inspección de 15 km de red de alcantarillado con identificación de anomalías según PACP.",
    fecha: "2024",
  },
  {
    id: "2",
    titulo: "Limpieza Vactor Colector Principal",
    cliente: "ESACOR ESP",
    ubicacion: "Zipaquirá, Cundinamarca",
    servicioId: "servicios-vactor",
    descripcion: "Desazolve y limpieza de colector de 600mm de diámetro con equipo vactor.",
    fecha: "2024",
  },
  {
    id: "3",
    titulo: "Prueba Hidrostática Urbanización",
    cliente: "Constructora Bolívar",
    ubicacion: "Bogotá, Cundinamarca",
    servicioId: "prueba-hidrostatica",
    descripcion: "Verificación de estanqueidad en 3 km de red de acueducto nueva.",
    fecha: "2023",
  },
  {
    id: "4",
    titulo: "Catastro de Redes Municipio",
    cliente: "EAAV",
    ubicacion: "Villavicencio, Meta",
    servicioId: "catastro-redes",
    descripcion: "Georreferenciación y levantamiento de 50 km de redes de acueducto y alcantarillado.",
    fecha: "2023",
  },
  {
    id: "5",
    titulo: "Reparación CIPP Tubería Dañada",
    cliente: "WSP",
    ubicacion: "Medellín, Antioquia",
    servicioId: "reparacion-cipp",
    descripcion: "Rehabilitación sin excavación de 200m de tubería de alcantarillado.",
    fecha: "2023",
  },
  {
    id: "6",
    titulo: "Levantamiento Topográfico Red",
    cliente: "Consorcio Biopolis",
    ubicacion: "Bogotá, Cundinamarca",
    servicioId: "topografia",
    descripcion: "Levantamiento topográfico según NS-030 para proyecto de renovación de redes.",
    fecha: "2022",
  },
]

export const COMPANY_INFO = {
  name: "APINDICO S.A.S.",
  fullName: "AP Ingenio, Diseño y Construcción S.A.S.",
  nit: "900.440.161-1",
  representanteLegal: "Javier Alfonso Alvarado Torres",
  address: {
    principal: "Calle 22F # 83-03, Barrio Modelia, Bogotá, Colombia",
    oficinaTecnica: "Av. Calle 17 No 83-31, Bogotá, Colombia",
  },
  phones: {
    fijo: "+57 (1) 487 6571",
    fijoAlternativo: "+57 (1) 704 7956",
    celulares: ["+57 313 406 8858", "+57 314 484 5525", "+57 312 358 0963", "+57 311 276 5448"],
  },
  emails: {
    info: "info@apindico.com",
    administrativo: "administrativo@apindico.com",
    gerencia: "gerencia@apindico.com",
  },
  website: "www.apindico.com",
  // Formato simplificado para uso común
  phone: "+57 (1) 487 6571",
  mobile: "+57 313 406 8858",
  email: "info@apindico.com",
} as const

export interface ClientLogo {
  name: string
  logo: string | null
  alt?: string
}

// The first 12 clients are shown on Home and include logo files.
export const CLIENTES_DATA: readonly ClientLogo[] = [
  { name: "EAAB", logo: "/logos/clients/eaab.svg", alt: "Logo de EAAB" },
  { name: "EAAV", logo: "/logos/clients/eaav.svg", alt: "Logo de EAAV" },
  { name: "ESACOR ESP", logo: "/logos/clients/esacor-esp.svg", alt: "Logo de ESACOR ESP" },
  { name: "WSP", logo: "/logos/clients/wsp.svg", alt: "Logo de WSP" },
  { name: "CICO Construcciones", logo: "/logos/clients/cico.svg", alt: "Logo de CICO Construcciones" },
  { name: "Inversiones Racuellar", logo: "/logos/clients/inversiones-racuellar.svg", alt: "Logo de Inversiones Racuellar" },
  { name: "Consucasa S.A.S.", logo: "/logos/clients/consucasa.svg", alt: "Logo de Consucasa S.A.S." },
  { name: "Multifamiliares Pepe 8", logo: "/logos/clients/multifamiliares-pepe8.svg", alt: "Logo de Multifamiliares Pepe 8" },
  { name: "Detergentes Ltda.", logo: "/logos/clients/detergentes.svg", alt: "Logo de Detergentes Ltda." },
  { name: "Coinsa S.A.S.", logo: "/logos/clients/coinsa.svg", alt: "Logo de Coinsa S.A.S." },
  { name: "Consorcio Eurocivil", logo: "/logos/clients/consorcio-eurocivil.svg", alt: "Logo de Consorcio Eurocivil" },
  { name: "Melos y Melos", logo: "/logos/clients/melos-melos.svg", alt: "Logo de Melos y Melos" },
  { name: "CNOC", logo: null },
  { name: "COCO Ltda.", logo: null },
  { name: "Multidrive / Cumbrera", logo: null },
  { name: "IDC Consultores", logo: null },
  { name: "Leck 93", logo: null },
  { name: "Castro Silva S.A.S.", logo: null },
  { name: "Promotora Entorno 2000", logo: null },
  { name: "Consorcio Biopolis", logo: null },
  { name: "Incotop S.A.S.", logo: null },
  { name: "Claro", logo: null },
  { name: "Constructora Bolívar", logo: null },
  { name: "EAAU", logo: null },
  { name: "Acueducto Caudales", logo: null },
  { name: "Cumare S.A. E.S.P.", logo: null },
] as const

// Legacy array for backwards compatibility
export const CLIENTES = CLIENTES_DATA.map(c => c.name)

export const CERTIFICACIONES = {
  nasco: {
    nombre: "NASSCO / PACP",
    codigo: "U-0221-06S212",
    descripcion: "Certificación en inspección de redes",
  },
} as const

export const COMPANY_STATS = [
  { value: 10, suffix: "+", label: "Años de experiencia" },
  { value: 500, suffix: "+", label: "Proyectos completados" },
  { value: 25, suffix: "+", label: "Profesionales certificados" },
  { value: 4.9, suffix: "/5", label: "Calificación promedio" },
] as const

export type CompanyStat = (typeof COMPANY_STATS)[number]
