import { useState, useEffect } from 'react';
import { UserData } from '@/app/api/users/route';
 

interface UseFetchUsersOptions {
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

 
export function useFetchUsers(options: UseFetchUsersOptions = {}) {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        let url = '/api/users';
        const queryParams = new URLSearchParams();

        // Toujours trier par nom et prénom
        queryParams.append('sortOrder', options.sortOrder || 'asc');

        if (options.limit) {
          queryParams.append('limit', options.limit.toString());
        }

        if (queryParams.toString()) {
          url += `?${queryParams.toString()}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
          setUsers(data.users || []);
          setError(null);
        } else {
          setError(data.error || 'Erreur lors de la récupération des utilisateurs');
        }
      } catch (err) {
        setError('Erreur de connexion au serveur');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [options.limit, options.sortOrder]);

  return { users, loading, error };
}