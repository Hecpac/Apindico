import {
  HeroSection,
  ServicesSection,
  CTASection,
  ProjectsSection,
  ClientsSection,
} from "@/components/sections"
import copy from "@/lib/copy"

export default function Home() {
  return (
    <>
      <HeroSection
        title={copy.home.hero.h1}
        subtitle={copy.home.hero.sub}
        primaryCta={{ label: copy.home.hero.primaryCta, href: "/cotizador" }}
        secondaryCta={{ label: copy.home.hero.secondaryCta, href: "/contacto" }}
        badges={copy.home.hero.badges}
      />
      <ServicesSection
        title={copy.home.services.title}
        subtitle={copy.home.services.subtitle}
        ctaLabel={copy.home.services.cta}
      />
      <CTASection
        variant="secondary"
        title="¿Necesita una solución especializada?"
        subtitle="Nuestro equipo de ingenieros certificados está listo para ayudarle con su proyecto."
        benefits={[
          "Consulta sin compromiso",
          "Cotización en 24 horas",
          "Personal certificado NASSCO / PACP",
        ]}
        buttons={[
          { label: "Solicitar cotización", href: "/cotizador", variant: "cta" },
          { label: "Ver servicios", href: "/servicios", variant: "primary" },
        ]}
      />
      <ProjectsSection
        title={copy.home.projects.title}
        subtitle={copy.home.projects.subtitle}
        ctaLabel={copy.home.projects.cta}
      />
      <ClientsSection />
      <CTASection
        variant="gradient"
        title={copy.home.finalCta.title}
        subtitle={copy.home.finalCta.subtitle}
        benefits={[
          "Tecnología de punta",
          "Garantía de calidad",
          "Soporte continuo",
        ]}
        buttons={[
          { label: copy.home.finalCta.primaryCta, href: "/cotizador", variant: "cta" },
          { label: copy.home.finalCta.secondaryCta, href: "/contacto", variant: "secondary" },
        ]}
      />
    </>
  )
}
