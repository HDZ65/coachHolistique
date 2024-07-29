import { useState, useEffect } from 'react';
import { PrestationsData } from '@/app/api/prestations/route';

export const useFetchPrestations = () => {
  const [prestations, setPrestations] = useState<PrestationsData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrestations = async () => {
      try {
        const response = await fetch('/api/prestations');
        const data = await response.json();
        if (Array.isArray(data.prestations)) {
          setPrestations(data.prestations);
        } else {
          setError("Les données récupérées ne sont pas un tableau de prestations");
        }
      } catch (error) {
        setError("Erreur lors de la récupération des prestations");
      }
    };

    fetchPrestations();
  }, []);

  return { prestations, error };
};