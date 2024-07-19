// Page d'édition d'un article

'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArticlesData } from '@/app/api/articles/route';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function EditArticle() {
    const { id } = useParams();
    const router = useRouter(); // Ajout du hook useRouter pour la navigation
    const [article, setArticle] = useState<ArticlesData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isMounted, setIsMounted] = useState(false);
    const [success, setSuccess] = useState(false);
    const [image, setImage] = useState<File | null>(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted && id) {
            const fetchArticle = async () => {
                try {
                    const response = await fetch(`/api/articles`);
                    const data = await response.json();
                    if (response.ok) {
                        const foundArticle = data.allArticles.find((article: ArticlesData) => article._id === id);
                        if (foundArticle) {
                            setArticle(foundArticle);
                        } else {
                            setError('Article non trouvé');
                        }
                    } else {
                        setError(data.error || 'Erreur lors de la récupération de l\'article');
                    }
                } catch (err) {
                    setError('Erreur de connexion au serveur');
                }
            };

            fetchArticle();
        }
    }, [isMounted, id]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (article) {
            try {
                const response = await fetch(`/api/articles`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id, articleData: article }),
                });
                if (response.ok) {
                    setSuccess(true);
                    setError(null);
                    router.push('/admin/blog'); // Redirection vers la page admin/blog après succès
                } else {
                    const data = await response.json();
                    setError(data.error || 'Erreur lors de la mise à jour de l\'article');
                }
            } catch (err) {
                setError('Erreur de connexion au serveur');
            }
        }
    };

    if (!article) return <p>Chargement...</p>;

    return (
        <Card role="region" aria-labelledby="blogs-heading">
            <CardHeader>
                <CardTitle className="text-2xl">Modifier l&apos;Article</CardTitle>
            </CardHeader>
            <form onSubmit={handleUpdate}>
                <CardContent className="gap-8">
                    <Input
                        className="bg-transparent border py-6"
                        placeholder="Titre de l'article"
                        aria-label="Titre de l'article"
                        value={article.title}
                        onChange={(e) => setArticle({ ...article, title: e.target.value })}
                    />
                    <Input
                        className="bg-transparent border"
                        placeholder="Sous-titre"
                        aria-label="Sous-titre"
                        value={article.subtitle}
                        onChange={(e) => setArticle({ ...article, subtitle: e.target.value })}
                    />
                    <ReactQuill
                        placeholder="Contenu de l'article"
                        aria-label="Contenu de l'article"
                        className="w-full"
                        value={article.content}
                        onChange={(content) => setArticle({ ...article, content })}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        aria-label="Télécharger une image"
                        onChange={(e) => {
                            if (e.target.files && e.target.files.length > 0) {
                                setImage(e.target.files[0]);
                            }
                        }}
                    />
                </CardContent>
                <CardFooter className="flex gap-4">
                    <Button variant="outline">Annuler</Button>
                    <Button type="submit">Modifier</Button>
                    {error ? <p className="text-red-500" role="alert">{error}</p> : null}
                    {success ? <p className="text-green-500" role="status">Article modifié</p> : null}
                </CardFooter>
            </form>
        </Card>
    );
}