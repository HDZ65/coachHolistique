'use client'
import { fontEphesis } from "@/app/fonts";
import Image from "next/image";
import { useEffect, useState } from "react";
import { slugify } from '@/utils/slugify'; // Importer la fonction slugify

// Page.tsx - Affiche un article de blog spécifique basé sur le slug
export default function Page({ params }: { params: { slug: string } }) {
    const [article, setArticle] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const res = await fetch(`/api/articles/`);
                if (!res.ok) {
                    throw new Error('Erreur lors de la récupération des articles');
                }
                const data = await res.json();

                // Vérification de la structure des données
                if (!data.articles || !Array.isArray(data.articles)) {
                    throw new Error(`Les données récupérées ne sont pas un tableau: ${JSON.stringify(data)}`);
                }

                // Utilisation de la fonction formatSlug
                const formattedSlug = slugify(params.slug);
                const foundArticle = data.articles.find((article: any) => slugify(article.title) === formattedSlug);
                if (!foundArticle) {
                    throw new Error('Article non trouvé');
                }
                setArticle(foundArticle);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Une erreur inconnue est survenue');
                }
            }
        };
        fetchArticle();
    }, [params.slug]);

    if (error) {
        return <div role="alert">Erreur: {error}</div>;
    }

    return (
        <section className="" role="main">
            <article className="flex flex-col gap-6">
                <header className="flex flex-col gap-4">
                    <h2 className={`text-3xl text-secondary ${fontEphesis.className}`}>Elisabeth coach holistique</h2>
                    <h1 className="text-4xl text-secondary">{article?.title}</h1> 
                </header>
                <div className="w-1/6 h-[1px] bg-secondary my-4"></div>
                <div className="indent-8 break-words text-wrap" dangerouslySetInnerHTML={{ __html: article?.content }} />
                <Image className="aspect-video w-full shadow-sm rounded-lg hover:scale-[1.02] hover:shadow-xl transition-all duration-300" src={article?.image} alt={article?.title} width={300} height={300} />
            </article>
        </section>
    );
}