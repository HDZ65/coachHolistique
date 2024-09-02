// Composant PourQui : Décrit pour qui cet accompagnement est destiné et ses bienfaits

export default function PourQui() {
    return (
        <section aria-labelledby="loi-attraction-title" className='flex flex-col md:flex-row gap-12 '>
            <article className="flex flex-col gap-6">
                <h2 id="loi-attraction-title" className='text-2xl md:text-3xl text-secondary'>Cet accompagnement est-il fait pour vous ?</h2>
                <p>
                    Cet <strong>accompagnement</strong> est destiné à tous ceux qui cherchent <strong>l&apos;épanouissement personnel</strong>, traversent des <strong>blocages</strong>, du <strong>stress</strong>, de l&apos;anxiété, ou ont des problèmes de <strong>confiance en soi</strong>.
                </p>
                <p>
                    Il s&apos;adresse également aux <strong>professionnels</strong> en période de doute et de stress, ainsi qu&apos;à ceux qui sont en quête de sens ou traversent une période de <strong>transition</strong> et de <strong>changement</strong> dans leur vie.
                </p>
                <p>
                    Le <strong>changement</strong> est possible. Ensemble, nous travaillerons sur des méthodes et des outils concrets pour transformer vos défis en opportunités et vous permettre de vivre une vie plus alignée et épanouissante. Votre chemin vers la <strong>transformation</strong> commence ici.
                </p>
            </article>
            <article className="flex flex-col gap-6">
                <h2 id="loi-attraction-title" className='text-2xl md:text-3xl text-secondary'>Quels en sont les bienfaits ?</h2>
                <p>
                    L&apos;approche <strong>holistique</strong> offre de nombreux bienfaits, en améliorant la <strong>santé physique</strong>, le <strong>bien-être mental</strong> et émotionnel, et en favorisant la <strong>croissance spirituelle</strong>.
                </p>
                <p>
                    Elle aide à renforcer les <strong>relations</strong>, à augmenter la <strong>performance</strong> et la <strong>productivité</strong>, et à atteindre un <strong>équilibre harmonieux</strong> dans la vie quotidienne.
                </p>
            </article>
        </section>
    )
}