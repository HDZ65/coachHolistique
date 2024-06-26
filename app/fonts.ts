// Importation des polices Google depuis next/font
import { Alice, Ephesis, Montaga, Inter } from "next/font/google";

/**
 * Configuration de la police Alice
 */
export const fontAlice = Alice({
  subsets: ["latin"],
  variable: "--font-alice",
  weight: "400",
  style: "normal",
  display: "swap",
  preload: true,
  fallback: ["serif"],
  adjustFontFallback: true,
});

/**
 * Configuration de la police Ephesis
 */
export const fontEphesis = Ephesis({
  subsets: ["latin"],
  variable: "--font-ephesis",
  weight: "400",
  style: "normal",
  display: "swap",
  preload: true,
  fallback: ["serif"],
  adjustFontFallback: true,
});

/**
 * Configuration de la police Montaga
 */
export const fontMontaga = Montaga({
  subsets: ["latin"],
  variable: "--font-montaga",
  weight: "400",
  style: "normal",
  display: "swap",
  preload: true,
  fallback: ["serif"],
  adjustFontFallback: true,
});

/**
 * Configuration de la police Inter
 */
export const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "700"], // Ajout de plusieurs poids si nécessaire
  style: "normal",
  display: "swap",
  preload: true,
  fallback: ["sans-serif"],
  adjustFontFallback: true,
});