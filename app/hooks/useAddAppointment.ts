import { useState } from 'react';
import { AppointmentData } from '@/app/api/appointment/route';

export const useAddAppointment = () => {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean | null>(null);

    const addAppointment = async (appointmentData: AppointmentData) => {
        setError(null);
        setSuccess(null);

        try {
            const response = await fetch('/api/appointment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(appointmentData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erreur lors de la création du rendez-vous');
            }

            const responseData = await response.json();
            setSuccess(true);
            console.log("Rendez-vous créé avec succès:", responseData);
        } catch (error: any) {
            setError(error.message);
            console.error("Erreur lors de la création du rendez-vous:", error);
        }
    };

    return { addAppointment, error, success };
};