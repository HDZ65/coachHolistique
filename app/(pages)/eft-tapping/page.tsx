import { Metadata } from "next";

// Définition des métadonnées spécifiques pour la page ETF et Tapping
export const metadata: Metadata = {
  title: "Qu'est-ce que l'EFT et le Tapping ? - Elisabeth Coach Holistique",
  description: "Découvrez les techniques de l'EFT (Emotional Freedom Techniques) et du Tapping avec Elisabeth Coach Holistique. Apprenez comment ces pratiques peuvent améliorer votre bien-être émotionnel et physique.",
  keywords: ["EFT", "Tapping", "Emotional Freedom Techniques", "coaching holistique", "bien-être", "développement personnel", "Elisabeth Coach"],
  authors: [{ name: "Elisabeth Coach Holistique" }],
  openGraph: {
    title: "Qu'est-ce que l'EFT et le Tapping ? - Elisabeth Coach Holistique",
    description: "Découvrez les techniques de l'EFT (Emotional Freedom Techniques) et du Tapping avec Elisabeth Coach Holistique. Apprenez comment ces pratiques peuvent améliorer votre bien-être émotionnel et physique.",
    url: "https://www.elisabethcoachholistique.com/eft-tapping",
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
    title: "Qu'est-ce que l'EFT et le Tapping ? - Elisabeth Coach Holistique",
    description: "Découvrez les techniques de l'EFT (Emotional Freedom Techniques) et du Tapping avec Elisabeth Coach Holistique. Apprenez comment ces pratiques peuvent améliorer votre bien-être émotionnel et physique.",
    images: ["https://www.elisabethcoachholistique.com/public/logoElisabeth.png"]
  }
};

// Composant de la page ETF et Tapping
const EftTappingPage: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Qu&apos;est-ce que l&apos;EFT et le Tapping ?</h1>
      <p className="mb-4">
        L&apos;EFT (Emotional Freedom Techniques) et le Tapping sont des techniques de libération émotionnelle qui combinent la psychologie et l&apos;acupression pour aider à réduire le stress et l&apos;anxiété.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Les bienfaits de l&apos;EFT et du Tapping</h2>
      <p className="mb-4">
        Ces techniques peuvent aider à améliorer votre bien-être émotionnel, à réduire les douleurs physiques et à augmenter votre niveau d&apos;énergie.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Comment pratiquer l&apos;ETF et le Tapping</h2>
      <p className="mb-4">
        Pour pratiquer l&apos;EFT et le Tapping, vous pouvez suivre des tutoriels en ligne ou consulter un coach certifié. Elisabeth Coach Holistique propose des séances personnalisées pour vous guider dans cette pratique.
      </p>
    </div>
  );
};

export default EftTappingPage;