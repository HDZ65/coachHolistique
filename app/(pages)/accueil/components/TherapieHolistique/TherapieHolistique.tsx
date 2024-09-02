import React from 'react';

interface ArticleProps {
  title: string;
  subtitle: string;
  content: React.ReactNode;
}

const Article: React.FC<ArticleProps> = ({ title, subtitle, content }) => (
  <article className="flex flex-col gap-4 max-w-[600px]">
    <div>
      <h2 className="text-base font-semibold text-primary">{title}</h2>
      <h3 className="text-2xl font-semibold">{subtitle}</h3>
    </div>
    <p>{content}</p>
  </article>
);

const TherapieHolistique: React.FC = () => {
  return (
    <section className="flex justify-center gap-8 bg-accent-25 p-8">
      <Article
        title="Thérapie Holistique"
        subtitle="Une Approche pour le Bonheur"
        content={
          <>
            <strong>La thérapie holistique</strong> améliore la qualité de vie en considérant tous les aspects de l&apos;individu. Elle se concentre sur le <strong>bien-être physique</strong>, <strong>mental</strong> et <strong>émotionnel</strong> pour retrouver son <strong>équilibre</strong>. Les sessions aident à mieux comprendre ses aspirations et à améliorer son <strong>quotidien</strong>. Par la <strong>relaxation</strong> et la <a href="https://fr.wikipedia.org/wiki/M%C3%A9ditation" target="_blank" rel="noopener noreferrer"><strong>méditation</strong></a>, elle réduit le <strong>stress</strong> et favorise un état de <strong>bien-être général</strong>.
          </>
        }
      />
      <Article
        title="Les Bienfaits de la Médecine Holistique"
        subtitle="Personnalisée pour Chaque Personne"
        content={
          <>
            <strong>La thérapie holistique</strong> vise à promouvoir <strong>la santé et le bonheur</strong> en aidant à <strong>gérer son energie</strong> et à <strong>prendre soin de son corps</strong>. Par la <a href="https://fr.wikipedia.org/wiki/M%C3%A9ditation" target="_blank" rel="noopener noreferrer"><strong>méditation</strong></a>, la <strong>relaxation</strong> et la <strong>pleine conscience</strong>, elle <strong>renforce la confiance en soi</strong> et aide à <strong>atteindre ses objectifs</strong>, tout en <strong>favorisant le bien-être physique</strong>, <strong>réduisant le stress</strong> et <strong>améliorant la résilience</strong> face au quotidien.
          </>
        }
      />
    </section>
  );
};

export default TherapieHolistique;