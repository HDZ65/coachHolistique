import { useState, useEffect } from 'react';
import { AppointmentData } from '@/app/api/appointment/route';

export const useFetchAppointments = () => {
    const [appointments, setAppointments] = useState<AppointmentData[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch('/api/appointment', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Erreur lors de la récupération des rendez-vous');
                }

                const responseData = await response.json();
                setAppointments(responseData.appointments);
            } catch (error: any) {
                setError(error.message);
                console.error("Erreur lors de la récupération des rendez-vous:", error);
            }
        };

        fetchAppointments();
    }, []);

    return { appointments, setAppointments, error };
};