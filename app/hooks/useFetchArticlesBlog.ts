import { useState, useEffect } from 'react';
import { ArticlesData } from '@/app/api/articles/route';


export function useFetchArticlesBlog(limit?: number) {
  const [articles, setArticles] = useState<ArticlesData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/articles');
        const data = await response.json();

        if (response.ok) {
          let fetchedArticles = data.articles;
          if (limit && limit > 0) {
            fetchedArticles = fetchedArticles.slice(0, limit);
          }
          setArticles(fetchedArticles);
          setError(null);
        } else {
          setError(data.error || 'Erreur lors de la récupération des articles');
        }
      } catch (err) {
        setError('Erreur de connexion au serveur');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [limit]);

  return { articles, loading, error };
}