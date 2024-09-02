import { Metadata } from "next";
import LoiAttraction from './components/CardEbook/LoiAttraction/LoiAttraction';
import FirstEbook from './components/FirstEbook/FirstEbook';

// Définition des métadonnées spécifiques pour la page e-book
export const metadata: Metadata = {
  title: "E-book sur la Loi de l'Attraction - Elisabeth Coach Holistique",
  description: "Découvrez notre e-book sur la loi de l'attraction par Elisabeth Coach Holistique. Apprenez comment attirer le positif dans votre vie grâce à des techniques éprouvées.",
  keywords: ["e-book", "loi de l'attraction", "développement personnel", "bien-être", "Elisabeth Coach"],
  authors: [{ name: "Elisabeth Coach Holistique" }],
  openGraph: {
    title: "E-book sur la Loi de l'Attraction - Elisabeth Coach Holistique",
    description: "Découvrez notre e-book sur la loi de l'attraction par Elisabeth Coach Holistique. Apprenez comment attirer le positif dans votre vie grâce à des techniques éprouvées.",
    url: "https://www.elisabethcoachholistique.com/e-book",
    type: "website",
    images: [
      {
        url: "https://www.elisabethcoachholistique.com/public/logoElisabeth.png",
        width: 1200,
        height: 630,
        alt: "Elisabeth Coach Holistique"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    site: "@ElisabethCoach",
    title: "E-book sur la Loi de l'Attraction - Elisabeth Coach Holistique",
    description: "Découvrez notre e-book sur la loi de l'attraction par Elisabeth Coach Holistique. Apprenez comment attirer le positif dans votre vie grâce à des techniques éprouvées.",
    images: ["https://www.elisabethcoachholistique.com/public/logoElisabeth.png"]
  }
};

// Composant de la page e-book
export default function page() {
  return (
    <div className='flex flex-col items-center justify-center mx-auto gap-20'>
      <FirstEbook />
      <LoiAttraction />
    </div>
  );
}