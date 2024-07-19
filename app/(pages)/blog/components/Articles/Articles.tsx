'use client'

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ArticlesData } from '@/app/api/articles/route';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from '@/components/ui/button';


// Composant MesArticles
export default function Articles() {
    const [articles, setArticles] = useState<ArticlesData[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 4;
    
    useEffect(() => {
        // Fonction pour récupérer les articles
        const fetchArticles = async () => {
            try {
                const response = await fetch('/api/articles');
                const data = await response.json();
                if (response.ok) {
                    // Inverser l'ordre des articles
                    const reversedArticles = data.articles.reverse();
                    setArticles(reversedArticles);
                }
                else if (data.articles.length === 0) {
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


    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);
    const totalPages = Math.ceil(articles.length / articlesPerPage);

    return (
        <section className='flex flex-col gap-6'>
            <h1 className="text-3xl text-secondary">Les Articles</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6' >
                {currentArticles.map((article) => (
                    <Card className="p-4 max-w-sm relative group" key={article._id}>
                        <Link className="flex flex-col gap-4" href={`/blog/${article.title}`} passHref>
                            <div className="overflow-hidden shadow-sm rounded-lg">
                                <Image 
                                    src={article.image} 
                                    alt={article.title} 
                                    width={400} 
                                    height={225} 
                                    className="aspect-video object-cover rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-110" 
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
                ))}
            </div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(prev => Math.max(prev - 1, 1));
                        }} />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink 
                                href="#" 
                                onClick={(e) => {
                                    e.preventDefault();
                                    setCurrentPage(index + 1);
                                }}
                                className={currentPage === index + 1 ? 'bg-accent text-white' : ''}
                            >
                                {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationNext href="#" onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(prev => Math.min(prev + 1, totalPages));
                        }} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </section>
    );
}