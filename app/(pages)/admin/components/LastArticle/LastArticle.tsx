'use client'

import { useFetchArticlesBlog } from '@/app/hooks/useFetchArticlesBlog';
import { slugify } from '@/utils/slugify';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";


export default function LastArticle() {
  const { articles, error } = useFetchArticlesBlog(1);

  if (error) {
    return <div role="alert" aria-live="assertive">{error}</div>;
  }

  const lastArticle = articles[0];

  if (!lastArticle) {
    return <div>Aucun article trouvé</div>;
  }

  return (
    <Card className="w-fit">
      <CardHeader>
        <CardTitle>Dernier article</CardTitle>
        <CardContent className="px-0 pb-0">
          <Card className="p-4 max-w-sm relative group h-full" key={lastArticle._id}>
            <Link className="flex flex-col gap-4 h-full" href={`/blog/${slugify(lastArticle.title)}`} passHref aria-label={`Lire l'article ${lastArticle.title}`}>
              <div className="overflow-hidden shadow-sm rounded-lg w-fit">
                <Image
                  src={lastArticle.image}
                  alt={lastArticle.title}
                  width={250}
                  height={225}
                  className="aspect-video object-cover rounded-lg duration-300 ease-in-out group-hover:scale-110"
                />
              </div>
              <CardContent className="p-0">
                <div className="flex flex-col gap-4 w-full">
                  <h3 className="text-lg underline">{lastArticle.title}</h3>
                  <p className="text-sm leading-none max-w-[90%] line-clamp-2 overflow-hidden text-ellipsis">
                    {lastArticle.subtitle}
                  </p>
                  <Button variant="outline" className="mt-2" aria-label={`Lire l'article ${lastArticle.title}`}>
                    Lire l&apos;article
                  </Button>
                </div>
              </CardContent>
            </Link>
          </Card>
        </CardContent>
        <CardFooter className="px-0 pb-0">
          <Link href="/admin/blog" className="w-full">
            <Button className="w-full">Gérer les articles</Button>
          </Link>
        </CardFooter>
      </CardHeader>
    </Card>
  );
}