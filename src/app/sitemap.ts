import type { MetadataRoute } from "next"
import { SERVICIOS } from "@/lib/constants"

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.apindico.com").replace(
  /\/$/,
  ""
)

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/servicios`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/proyectos`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/nosotros`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/contacto`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/cotizador`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/privacidad`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/terminos`, changeFrequency: "yearly", priority: 0.2 },
  ]

  const serviceRoutes: MetadataRoute.Sitemap = SERVICIOS.map((s) => ({
    url: `${SITE_URL}/servicios/${s.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  return [...staticRoutes, ...serviceRoutes]
}
