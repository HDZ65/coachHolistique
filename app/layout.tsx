// Fichier principal de mise en page pour l'application Next.js
import type { Metadata } from "next";
import "./globals.css";
import dynamic from 'next/dynamic';
import { cn } from "@/lib/utils";
import Script from "next/script";
import { fontInter } from "./fonts";
import Header from './components/Header/Header'; // Importation directe du Header
import { SessionProvider } from 'next-auth/react'; // Importation du SessionProvider
import SessionWrapper from "./components/SessionWrapper/SessionWrapper";

require('dotenv').config();

const DynamicFooter = dynamic(() => import('./components/Footer/Footer'), {
  loading: () => <p>Chargement...</p>,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Elisabeth Coach Holistique",
  description: "Elisabeth Coach Holistique",
};

// Composant de mise en page principal
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
          `flex flex-col items-center justify-between min-h-[100dvh] overflow-x-hidden max-w-[100dvw] bg-background font-sans antialiased ${fontInter.variable}`
        )}
      >
          <Header /> {/* Utilisation directe du Header */}
          <main
            className="container mx-auto flex flex-col justify-center px-6 md:px-8 gap-20"
            role="main"
            aria-label="Contenu principal"
          >
            {children}
          </main>
          <DynamicFooter />
        {/* <Script
          src="https://www.paypal.com/sdk/js?client-id=Adw7IwIU1-apS9PQ_MF1MNiH-gtqv49zfoNLwrzQ9Kt2sH0IybQFMNu4NlxHMw0w1ZbZEf4ry1l6KZ9S"
          strategy="afterInteractive"
        /> */}
      </body>
    </html>
    </SessionWrapper>
  );
}