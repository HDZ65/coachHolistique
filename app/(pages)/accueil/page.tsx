// PAGE D'ACCUEIL 

// Import des composants
import Accompagnement from "./components/Accompagnement/Accompagnement"
import UnPeuDeMoi from "./components/UnPeuDeMoi/UnPeuDeMoi"
import FirstAccueil from "./components/FirstAccueil/FirstAccueil"
import { Newsletter } from "./components/Newsletter/Newsletter"
import Ebook from "./components/E-book/E-book"
import { Metadata } from "next"
import EFT from "./components/EFT/EFT"
import TherapieHolistique from "./components/TherapieHolistique/TherapieHolistique"

// metaData pour le SEO
export const metadata: Metadata = {
  title: "Accueil - Elisabeth Coach Holistique",
  description: "Bienvenue sur la page d'accueil d'Elisabeth Coach Holistique. Découvrez nos services de coaching pour améliorer votre bien-être physique, mental et émotionnel.",
  keywords: ["accueil", "coaching holistique", "bien-être", "développement personnel", "Elisabeth Coach"],
  authors: [{ name: "Elisabeth Coach Holistique" }],
  openGraph: {
    title: "Accueil - Elisabeth Coach Holistique",
    description: "Bienvenue sur la page d'accueil d'Elisabeth Coach Holistique. Découvrez nos services de coaching pour améliorer votre bien-être physique, mental et émotionnel.",
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

// Retourne la page d'accueil
export default function Accueil() {
  return (
    <>
      <FirstAccueil />
      <Accompagnement />
      <EFT />
      <TherapieHolistique />
      <UnPeuDeMoi />
      <Ebook />
      <Newsletter />
    </>
  )
}

