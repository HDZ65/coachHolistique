// Titre principal : Hook pour ajouter une heure bloquée

import { useState } from 'react';
import { BlockedHourData } from '@/app/api/BlockedHour/route';


export const useAddBlockHour = () => {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean | null>(null);
    const [loading, setLoading] = useState<boolean>(false);


    const addBlockHour = async (blockedHourData: BlockedHourData) => {
        setError(null);
        setSuccess(null);
        setLoading(true);

        try {
            const response = await fetch('/api/BlockedHour', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(blockedHourData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erreur lors du blocage de l\'heure');
            }

            const responseData = await response.json();
            setSuccess(true);
            console.log("Heure bloquée avec succès:", responseData);
        } catch (error: any) {
            setError(error.message);
            setSuccess(false);
            console.error("Erreur lors du blocage de l'heure:", error);
        } finally {
            setLoading(false);
        }
    };

    return { addBlockHour, loading, error, success };
};