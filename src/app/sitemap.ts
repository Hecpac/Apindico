import type { MetadataRoute } from "next"
import { SERVICIOS, PROYECTOS } from "@/lib/constants"

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.apindico.com").replace(
  /\/$/,
  ""
)

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1, lastModified: now },
    { url: `${SITE_URL}/servicios`, changeFrequency: "weekly", priority: 0.9, lastModified: now },
    { url: `${SITE_URL}/proyectos`, changeFrequency: "monthly", priority: 0.8, lastModified: now },
    { url: `${SITE_URL}/nosotros`, changeFrequency: "monthly", priority: 0.7, lastModified: now },
    { url: `${SITE_URL}/contacto`, changeFrequency: "monthly", priority: 0.7, lastModified: now },
    { url: `${SITE_URL}/cotizador`, changeFrequency: "monthly", priority: 0.8, lastModified: now },
    { url: `${SITE_URL}/certificaciones`, changeFrequency: "yearly", priority: 0.3, lastModified: now },
    { url: `${SITE_URL}/trabaja-con-nosotros`, changeFrequency: "yearly", priority: 0.3, lastModified: now },
    { url: `${SITE_URL}/privacidad`, changeFrequency: "yearly", priority: 0.2, lastModified: now },
    { url: `${SITE_URL}/terminos`, changeFrequency: "yearly", priority: 0.2, lastModified: now },
  ]

  const serviceRoutes: MetadataRoute.Sitemap = SERVICIOS.map((s) => ({
    url: `${SITE_URL}/servicios/${s.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
    lastModified: now,
  }))

  const projectRoutes: MetadataRoute.Sitemap = PROYECTOS.map((p) => ({
    url: `${SITE_URL}/proyectos/${p.id}`,
    changeFrequency: "monthly",
    priority: 0.6,
    lastModified: now,
  }))

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes]
}
