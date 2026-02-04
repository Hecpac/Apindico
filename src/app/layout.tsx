import type { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { QuoteStepProvider } from "@/components/providers/QuoteStepProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "APINDICO S.A.S. | Ingeniería de Acueducto y Alcantarillado",
    template: "%s | APINDICO",
  },
  description:
    "Servicios especializados de ingeniería para sistemas de acueducto y alcantarillado en Colombia. Inspección CCTV, servicios Vactor, prueba hidrostática y más.",
  keywords: [
    "inspección CCTV",
    "servicios vactor",
    "prueba hidrostática",
    "acueducto",
    "alcantarillado",
    "ingeniería sanitaria",
    "Colombia",
    "Bogotá",
  ],
  authors: [{ name: "APINDICO S.A.S." }],
  creator: "APINDICO S.A.S.",
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: "APINDICO S.A.S.",
    title: "APINDICO S.A.S. | Ingeniería de Acueducto y Alcantarillado",
    description:
      "Servicios especializados de ingeniería para sistemas de acueducto y alcantarillado en Colombia.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className="antialiased"
      >
        <SmoothScrollProvider>
          <QuoteStepProvider>
            <Header />
            <main id="main-content" className="min-h-screen">{children}</main>
            <Footer />
          </QuoteStepProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
