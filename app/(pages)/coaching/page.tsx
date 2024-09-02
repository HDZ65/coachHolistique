import { Metadata } from "next";
import Explain from "./components/Explain/Explain";
import Header from "./components/Header/Header";
import Presentation from "./components/Presentation/Presentation";
import PourQui from "./components/PourQui/PourQui";
import Bienfaits from "./components/Bienfaits/Bienfaits";
import LeCoachingComprend from "./components/LeCoachingComprend/LeCoachingComprend";



export const metadata: Metadata = {
  title: "Coaching - Elisabeth Coach Holistique",
  description: "Découvrez nos services de coaching holistique pour améliorer votre bien-être physique, mental et émotionnel. Programmes personnalisés et conseils professionnels.",
  keywords: ["coaching", "coaching holistique", "bien-être", "développement personnel", "Elisabeth Coach"],
  authors: [{ name: "Elisabeth Coach Holistique" }],
  openGraph: {
    title: "Coaching - Elisabeth Coach Holistique",
    description: "Découvrez nos services de coaching holistique pour améliorer votre bien-être physique, mental et émotionnel. Programmes personnalisés et conseils professionnels.",
    url: "https://www.elisabethcoachholistique.com/coaching",
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

export default function page() {
  return (
    <div className="flex flex-col gap-20 w-11/12 md:w-4/5 max-w-7xl mx-auto">
      <Header />
      <Presentation />
      <PourQui />
      <LeCoachingComprend />
      <Explain />
    </div>
  )
}