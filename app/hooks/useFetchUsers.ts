import { useState, useEffect } from 'react';

interface UserData {
  _id: string;
  nom: string;
  prenom: string;
  email: string;
  mobile: string;
}

export const useFetchUsers = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Erreur lors de la récupération des utilisateurs');
        }

        const responseData = await response.json();
        setUsers(responseData.users);
      } catch (error: any) {
        setError(error.message);
        console.error("Erreur lors de la récupération des utilisateurs:", error);
      }
    };

    fetchUsers();
  }, []);

  return { users, error };
};