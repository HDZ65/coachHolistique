import { useState } from 'react';
import { AppointmentData } from '@/app/api/appointment/route';

export const useDeleteAppointment = (appointments: AppointmentData[], setAppointments: (appointments: AppointmentData[]) => void) => {
  const [error, setError] = useState<string | null>(null);

  const deleteAppointment = async (id: string) => {
    try {
      const response = await fetch('/api/appointment', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        setAppointments(appointments.filter(appointment => appointment._id !== id.toString()));
      } else {
        const errorData = await response.json();
        setError(`Erreur: ${errorData.error}`);
      }
    } catch (error: any) { 
      setError("Erreur lors de la suppression du rendez-vous: " + (error as Error).message);
    }
  };

  return { deleteAppointment, error };
};