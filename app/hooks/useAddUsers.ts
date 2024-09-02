// Titre : Hook personnalisé pour ajouter un utilisateur

import { useState } from "react";
import { UserData } from "../api/users/route";

export const useAddUsers = () => {

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean | null>(null);


    const addUser = async (userData: UserData) => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Une erreur est survenue lors de l\'ajout de l\'utilisateur');
            }

            const result = await response.json();
            setLoading(false);
            setSuccess(true);
            return result.data;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Une erreur inconnue est survenue');
            setLoading(false);
            setSuccess(false);
        }
    };

    return { addUser, isLoading: loading, error };
}
