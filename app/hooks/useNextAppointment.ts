
import { useState, useEffect } from 'react';
import { compareAsc } from 'date-fns';
import { AppointmentData } from '@/app/api/appointment/route'; // Assurez-vous d'avoir ce type défini

export const useNextAppointment = () => {
  const [nextAppointment, setNextAppointment] = useState<AppointmentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNextAppointment() {
      try {
        setLoading(true);
        const response = await fetch('/api/appointment');
        const data = await response.json();

        if (Array.isArray(data.appointments)) {
          const now = new Date();

          const upcomingAppointments = data.appointments.filter((appointment: AppointmentData) => {
            const appointmentDateTime = new Date(`${appointment.date}T${appointment.time}`);
            return appointmentDateTime >= now;
          });

          upcomingAppointments.sort((a: AppointmentData, b: AppointmentData) => {
            const dateA = new Date(`${a.date}T${a.time}`);
            const dateB = new Date(`${b.date}T${b.time}`);
            return compareAsc(dateA, dateB);
          });

          setNextAppointment(upcomingAppointments);
        } else {
          setError("La réponse de l'API n'est pas un tableau de rendez-vous");
        }
      } catch (error) {
        setError("Erreur lors de la récupération du prochain rendez-vous");
        console.error("Erreur lors de la récupération du prochain rendez-vous:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchNextAppointment();
  }, []);

  return { nextAppointment, loading, error };
};