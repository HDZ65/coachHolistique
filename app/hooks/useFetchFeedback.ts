import { useState, useEffect } from 'react';
import { FeedbackData } from '@/app/api/feedback/route';

/**
 * @file useFetchFeedback.ts
 * @description Hook personnalisé pour récupérer les avis clients
 */

/**
 * useFetchFeedback
 * @description Hook pour récupérer et gérer les avis clients
 * @param {number} limit - Nombre maximum d'avis à récupérer (optionnel)
 * @returns {Object} Objet contenant les avis, l'état de chargement et les erreurs éventuelles
 */
export function useFetchFeedback(limit?: number) {
  const [feedback, setFeedback] = useState<FeedbackData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/feedback');
        const data = await response.json();

        if (response.ok) {
          let fetchedFeedback = data.feedback || [];
          if (limit && limit > 0) {
            fetchedFeedback = fetchedFeedback.slice(0, limit);
          }
          setFeedback(fetchedFeedback);
          setError(null);
        } else {
          setError(data.error || 'Erreur lors de la récupération des avis');
        }
      } catch (err) {
        setError('Erreur de connexion au serveur');
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [limit]);

  return { feedback, loading, error };
}