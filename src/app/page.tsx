import {
  HeroSection,
  StatsSection,
  ServicesSection,
  CTASection,
  ProjectsSection,
  ClientsSection,
} from "@/components/sections"

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection variant="dark" />
      <ServicesSection />
      <CTASection
        variant="secondary"
        title="¿Necesita una solución especializada?"
        subtitle="Nuestro equipo de ingenieros certificados está listo para ayudarle con su proyecto."
        benefits={[
          "Consulta sin compromiso",
          "Cotización en 24 horas",
          "Personal certificado NASCO-PACP",
        ]}
        buttons={[
          { label: "Solicitar cotización", href: "/cotizador", variant: "cta" },
          { label: "Ver servicios", href: "/servicios", variant: "primary" },
        ]}
      />
      <ProjectsSection />
      <ClientsSection />
      <CTASection
        variant="gradient"
        title="Comience su proyecto hoy"
        subtitle="Más de 500 proyectos exitosos respaldan nuestra experiencia en ingeniería de acueducto y alcantarillado"
        benefits={[
          "Tecnología de punta",
          "Garantía de calidad",
          "Soporte continuo",
        ]}
        buttons={[
          { label: "Cotizar proyecto", href: "/cotizador", variant: "cta" },
          { label: "Contáctenos", href: "/contacto", variant: "secondary" },
        ]}
      />
    </>
  )
}
