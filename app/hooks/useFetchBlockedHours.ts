// Titre principal : Hook pour récupérer les heures bloquées

import { useState, useEffect } from 'react';

/**
 * Interface pour représenter une heure bloquée
 */
interface BlockedHour {
  date: string;
  time: string;
}

/**
 * Hook pour récupérer les heures bloquées
 * @returns {Object} Heures bloquées, état de chargement, erreur et fonction de récupération
 */
export const useFetchBlockedHours = () => {
  const [blockedHours, setBlockedHours] = useState<BlockedHour[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fonction pour récupérer les heures bloquées depuis l'API
   */
  const fetchBlockedHours = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/BlockedHour');
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des heures bloquées');
      }
      const data = await response.json();
      setBlockedHours(data.blockedHours);
    } catch (err) {
      setError('Erreur lors de la récupération des heures bloquées.');
      console.error('Erreur lors de la récupération des heures bloquées:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlockedHours();
  }, []);

  return { blockedHours, loading, error, fetchBlockedHours };
};