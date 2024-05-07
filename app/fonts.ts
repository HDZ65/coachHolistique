import exp from "constants"
import { Alice, Ephesis, Montaga } from "next/font/google"

export const fontAlice = Alice({
    subsets: ["latin"],
    variable: "--font-alice",
    weight: "400",
    style: "normal",
    display: "swap",
    preload: true,
    fallback: ["serif"],
    adjustFontFallback: true,
  })
  
export const fontEphesis = Ephesis({
    subsets: ["latin"],
    variable: "--font-ephesis",
    weight: "400",
    style: "normal",
    display: "swap",
    preload: true,
    fallback: ["serif"],
    adjustFontFallback: true,
  })
  
export const fontMontaga = Montaga({
    subsets: ["latin"],
    variable: "--font-montaga",
    weight: "400",
    style: "normal",
    display: "swap",
    preload: true,
    fallback: ["serif"],
    adjustFontFallback: true,
  })
