import {
  HeroSection,
  ServicesSection,
  CTASection,
  ProjectsSection,
  StatsSection,
  ClientsSection,
} from "@/components/sections"
import copy from "@/lib/copy"

export default function Home() {
  return (
    <>
      <HeroSection
        title={copy.home.hero.h1}
        subtitle={copy.home.hero.sub}
        subtitleExtended={copy.home.hero.subExtended}
        primaryCta={{ label: copy.home.hero.primaryCta, href: "/cotizador" }}
        secondaryCta={{ label: copy.home.hero.secondaryCta, href: "/contacto" }}
        badges={copy.home.hero.badges}
      />
      <StatsSection metrics={copy.home.metrics} />
      <ServicesSection
        title={copy.home.services.title}
        subtitle={copy.home.services.subtitle}
        limit={6}
        ctaLabel={copy.home.services.cta}
      />
      <CTASection
        variant="secondary"
        title={copy.home.midCta.title}
        subtitle={copy.home.midCta.subtitle}
        benefits={copy.home.midCta.bullets}
        buttons={[
          { label: copy.home.midCta.primaryCta, href: "/cotizador", variant: "cta" },
          { label: copy.home.midCta.secondaryCta, href: "/servicios", variant: "outline" },
        ]}
      />
      <ProjectsSection
        title={copy.home.projects.title}
        subtitle={copy.home.projects.subtitle}
        ctaLabel={copy.home.projects.cta}
      />
      <ClientsSection
        title={copy.home.clients.title}
        subtitle={copy.home.clients.subtitle}
        ctaLabel={copy.home.clients.cta}
      />
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
          { label: copy.home.finalCta.secondaryCta, href: "/contacto", variant: "outline" },
        ]}
      />
    </>
  )
}
