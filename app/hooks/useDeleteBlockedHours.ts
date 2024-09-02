import { useState } from 'react';
import axios from 'axios';

interface BlockedHourData {
  date: string;
  time: string;
}

export const useDeleteBlockedHours = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteBlockedHours = async (data: BlockedHourData) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete('/api/BlockedHour', { data });
    } catch (err) {
      setError('Erreur lors du déblocage de l\'heure.');
    } finally {
      setLoading(false);
    }
  };

  return { deleteBlockedHours, loading, error };
};