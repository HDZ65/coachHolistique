'use client'

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ArticlesData } from '@/app/api/articles/route';
import { CiCircleInfo } from "react-icons/ci";
import ebook from './../../../../assets/anna-demianenko-CPWhnIkL4Lk-unsplash.jpg';
import { LuInfo } from "react-icons/lu";
import { slugify } from '@/utils/slugify'; // Importer la fonction slugify

// Fonction principale pour afficher le dernier article
export default function NewArticle() {
  const [article, setArticle] = useState<ArticlesData | null>(null); // Changer le type à ArticlesData ou null
  const [error, setError] = useState('');

  useEffect(() => {
    // Fonction pour récupérer les articles
    const fetchArticles = async () => {
      try {
        const response = await fetch('/api/articles');
        const data = await response.json();
        if (response.ok) {
          // Prendre seulement le dernier article
          const lastArticle = data.articles.reverse()[0];
          setArticle(lastArticle);
        } else if (data.articles.length === 0) {
          setError('Aucun article trouvé');
        } else {
          setError(data.error || 'Erreur lors de la récupération des articles');
        }
      } catch (err) {
        setError('Erreur de connexion au serveur');
      }
    };

    fetchArticles();
  }, []);

  if (error) {
    return <div role="alert" aria-live="assertive">{error}</div>;
  }

  if (!article) {
    return <div className="text-secondary" role="status" aria-live="polite">Chargement...</div>;
  }

  return (
    <section className="flex flex-col sm:flex-row gap-4 md:gap-8 ">

      <article className="flex flex-col gap-4 ">
        <h2 className="text-3xl text-secondary">Dernier article</h2>
        <Card className="p-4 max-w-sm relative group h-full" key={article._id}>
          <Link className="flex flex-col gap-4 h-full" href={`/blog/${slugify(article.title)}`} passHref aria-label={`Lire l'article ${article.title}`}>
            <div className="overflow-hidden shadow-sm rounded-lg">
              <Image
                src={article.image}
                alt={article.title}
                width={400}
                height={225}
                className="aspect-video object-cover rounded-lg  duration-300 ease-in-out group-hover:scale-110"
              />
            </div>
            <CardContent className="p-0">
              <div className="flex flex-col gap-4 w-full">
                <h3 className="text-2xl underline">{article.title}</h3>
                <p className="text-sm leading-none max-w-[90%] line-clamp-2 overflow-hidden text-ellipsis">
                  {article.subtitle}
                </p>
                <Button variant="outline" className="mt-2" aria-label={`Lire l'article ${article.title}`}>
                  Lire l&apos;article
                </Button>
              </div>
            </CardContent>
          </Link>
        </Card>
      </article>

      {/* Deuxième article */}
        <article className="overflow-hidden hidden rounded-lg sm:flex relative flex-grow group">
      <Link href="/blog/ebook">
          <Image
            src={ebook}
            alt="ebook"
            fill
            className=" object-cover rounded-lg group-hover:scale-105 duration-300 ease-in-out"
          />

          <div className=" absolute inset-0 m-auto text-white flex flex-col gap-4 h-fit rounded-lg flex-grow bg-neutral-900 p-4 w-[80%]">
            <p className="text-sm">E-book</p>
            <h3 className="text-3xl underline">Grâce à la loi de l&apos;attraction</h3>
            <p>Vous y trouverez des conseils, des exercices et des outils pour vous accompagner dans votre démarche.</p>
            <Button variant="outline" className="flex items-center gap-2 border-white bg-neutral-900 text-white" aria-label={`En savoir plus sur le e-book`}>
              <LuInfo className="text-xl" />
              En savoir plus
            </Button>
          </div>
      </Link>
        </article>

    </section>
  );
}