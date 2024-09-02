// Fichier principal de mise en page pour l'application Next.js

import type { Metadata } from "next";
import "./globals.css";
import dynamic from 'next/dynamic';
import { cn } from "@/lib/utils";
import { fontInter } from "./fonts";
import Header from './components/Header/Header';
import SessionWrapper from "./components/SessionWrapper/SessionWrapper";
import Footer from "./components/Footer/Footer";

require('dotenv').config();


export const metadata: Metadata = {

  title: "Elisabeth Coach Holistique - Coaching de Vie et Bien-être",
  description: "Découvrez les services de coaching holistique d'Elisabeth pour améliorer votre bien-être physique, mental et émotionnel. Programmes personnalisés et conseils professionnels.",
  keywords: ["coaching holistique", "bien-être", "développement personnel", "coaching de vie", "Elisabeth Coach", "santé mentale", "santé physique", "programmes de coaching"],
  authors: [{ name: "Elisabeth Coach Holistique" }],

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Elisabeth Coach Holistique - Coaching de Vie et Bien-être",

    description: "Découvrez les services de coaching holistique d'Elisabeth pour améliorer votre bien-être physique, mental et émotionnel. Programmes personnalisés et conseils professionnels.",

    url: "https://www.elisabethcoachholistique.com",

    type: "website",
    images: [
      {
        url: "https://www.elisabethcoachholistique.com/public/logoElisabeth.png",
        width: 1200,
        height: 630,
        alt: "Elisabeth Coach Holistique"
      }
    ]
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <SessionWrapper>
      <html lang="fr">
        <body
          className={cn(
            `flex flex-col items-center justify-between gap-6 md:gap-12 min-h-[100dvh] overflow-x-hidden max-w-[100dvw] bg-background  font-sans antialiased ${fontInter.variable}`
          )}
        >
          <Header />
          <main
            className="container mx-auto flex flex-col justify-center max-[350px]:px-2 px-6 md:px-8 gap-28 "
            role="main"
            aria-label="Contenu principal"
          >
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </SessionWrapper>
  );
}