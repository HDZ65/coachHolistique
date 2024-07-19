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
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { MdMoreVert } from 'react-icons/md';

// Composant MesArticles
export default function MesArticles() {
    const [articles, setArticles] = useState<ArticlesData[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 8; // 2 lignes de 4 articles

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

    const handleDelete = async (articleId: string) => {
        try {
            const response = await fetch('/api/articles', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: articleId }),
            });
            if (response.ok) {
                setArticles(articles.filter(article => article._id !== articleId));
            } else {
                const data = await response.json();
                setError(data.error || 'Erreur lors de la suppression de l\'article');
            }
        } catch (err) {
            setError('Erreur de connexion au serveur');
        }
    };

    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);
    const totalPages = Math.ceil(articles.length / articlesPerPage);

    return (
        <Card className='mt-16'>
            <CardHeader>
                <CardTitle className="text-2xl">Mes Articles</CardTitle>
            </CardHeader>
            <CardContent>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16' >
                    {currentArticles.map((article) => (
                        <Card className="bg-transparent border-none shadow-none max-w-sm relative" key={article._id}>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="absolute top-2 right-2" aria-label="Options">
                                        <MdMoreVert />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem className='cursor-pointer' onClick={() => handleDelete(article._id!)}>
                                        Supprimer
                                    </DropdownMenuItem>
                                    <Link className='cursor-pointer' href={`/admin/articles/edit/${article._id}`}>
                                        <DropdownMenuItem className='cursor-pointer'>
                                            Modifier
                                        </DropdownMenuItem>
                                    </Link>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Link className="flex flex-col gap-4" href={`/admin/articles/${article.title}`} passHref>
                                <div className="overflow-hidden shadow-sm">
                                    <Image src={article.image} alt={article.title} width={400} height={225} className="aspect-video object-cover rounded-lg" />
                                </div>
                                <CardContent className="p-0">
                                    <div className="flex flex-col gap-4 w-full">
                                        <h3 className="text-2xl underline">{article.title}</h3>
                                        <p className="text-sm leading-none max-w-[90%] line-clamp-2 overflow-hidden text-ellipsis">
                                            {article.subtitle}
                                        </p>
                                    </div>
                                </CardContent>
                            </Link>
                        </Card>
                    ))}
                </div>
            </CardContent>
            <CardFooter>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} />
                        </PaginationItem>
                        {[...Array(totalPages)].map((_, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink href="#" onClick={() => setCurrentPage(index + 1)}>
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext href="#" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </CardFooter>
        </Card>
    );
}