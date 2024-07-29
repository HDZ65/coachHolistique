'use client'

import { useState, useEffect } from "react";
import { ArticlesData } from '@/app/api/articles/route';
import { slugify } from '@/utils/slugify';
import { Card, CardHeader, CardTitle, CardContent, CardFooter} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";




export default function LastArticle() {

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
    <Card className="w-fit">
    <CardHeader>
      <CardTitle >
        Dernier article
      </CardTitle>
      <CardContent className="px-0 pb-0">
        <Card className="p-4 max-w-sm relative group h-full" key={article._id}>
          <Link className="flex flex-col gap-4 h-full" href={`/blog/${slugify(article.title)}`} passHref aria-label={`Lire l'article ${article.title}`}>
            <div className="overflow-hidden shadow-sm rounded-lg w-fit">
              <Image
                src={article.image}
                alt={article.title}
                width={250}
                height={225}
                className="aspect-video object-cover rounded-lg  duration-300 ease-in-out group-hover:scale-110"
              />
            </div>
            <CardContent className="p-0">
              <div className="flex flex-col gap-4 w-full">
                <h3 className="text-lg underline">{article.title}</h3>
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
      </CardContent>
      <CardFooter className="px-0 pb-0">
        <Link href="/admin/blog" className="w-full">
        <Button className="w-full">
          Gérer les articles
        </Button>
        </Link>
      </CardFooter>
    </CardHeader>
  </Card>
  )
}