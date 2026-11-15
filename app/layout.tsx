import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-fraunces",
  display: "swap",
});

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bilan — Le bilan mensuel envoyé sans y penser",
  description:
    "Saisis les chiffres du mois en une minute. Bilan met en page le rapport à tes couleurs et l'envoie à ton client le 1er de chaque mois.",
  openGraph: {
    title: "Bilan — Le bilan mensuel envoyé sans y penser",
    description:
      "Le rapport mensuel de tes clients, prêt en une minute et envoyé automatiquement.",
    locale: "fr_FR",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${plex.variable}`}>
      <body>{children}</body>
    </html>
  );
}
