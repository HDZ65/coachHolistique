import CardCoaching from "@/app/components/CardCoaching/CardCoaching";
import etape1 from './../../../../assets/etape1.jpg';
import croire from './../../../../assets/croire.jpg';
import recevez from './../../../../assets/recevez.jpg';
import demandez from './../../../../assets/demandez.jpg';

interface CardCoachingProps {
  titre: string;
  description: string;
  img: string; // Added this line
}

export default function CardEbook() {
  return (
    <article className="flex max-md:flex-col gap-6 justify-around w-full" role="list">
      <CardCoaching
        image={demandez}
        titre="Demandez"
        description="Cela signifie que vous devez exprimer clairement ce que vous voulez et non ce que vous ne voulez pas ou ne voulez plus. Vous devez être très précis pour que la loi de l'attraction fonctionne."
      />
      <CardCoaching
        image={croire}
        titre="Croyez"
        description="Comme pour la commande sur catalogue, vous devez être certain que vous allez le recevoir. Mieux encore, vous devez être dans l'état émotionnel que vous seriez si vous étiez déjà en possession de votre désir."
      />
      <CardCoaching
        image={recevez}
        titre="Recevez"
        description="Pour recevoir, il suffit de se sentir bien. Vous serez ainsi en harmonie avec les bonnes vibrations de l'univers. Vous émettrez des vibrations qui feront venir à vous ce que vous avez demandé."
      />
    </article>
  )
}