// Page d'administration pour gérer les produits

"use client";
import { useSession } from "next-auth/react";
import Menu from "./components/Menu/Menu";
import LoginForm from "./components/LoginForm/LoginForm";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import Link from "next/link";
import Prestations from "./components/Prestations/Prestations";
import Feedback from "./components/Feedback/Feedback";
import LastArticle from "./components/LastArticle/LastArticle";
import Users from "./components/Users/Users";
import { AppointmentData } from "@/app/api/appointment/route";

export default function Page() {
  const { data: session } = useSession();
  const [nextAppointment, setNextAppointment] = useState<AppointmentData[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/appointment");
      const data = await res.json();
      const now = new Date();
      const nextAppointment = data.appointments
        .filter((appointment: AppointmentData) => new Date(appointment.date) > now)
        .sort((a: AppointmentData, b: AppointmentData) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];
      setNextAppointment(nextAppointment ? [nextAppointment] : []);
    };
    fetchUsers();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/Paris',
      hour12: false,
    };
    return date.toLocaleDateString('fr-FR', options).replace(':', 'h');
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/Paris',
      hour12: false,
    };
    return date.toLocaleTimeString('fr-FR', options).replace(':', 'h');
  };

  if (session) {
    return (
      <div className="flex flex-col gap-6">
        <Menu />
        <h2 className="text-2xl text-secondary">Bienvenue {session.user?.name}.</h2>
        <div className="flex gap-6 items-start">
          <div className="flex flex-col gap-6">
            <Card className="w-fit h-fit">
              <CardHeader>
                <CardTitle className="pb-6">Prochain rendez-vous</CardTitle>
                <CardDescription>
                  {nextAppointment.length > 0 ? (
                    <p className="max-w-sm">
                      Votre prochain rendez-vous est le <strong>{formatDate(nextAppointment[0].date)}</strong>  avec <strong>{nextAppointment[0].user_id.prenom} {nextAppointment[0].user_id.nom}</strong> pour la prestation <strong>{nextAppointment[0].prestation_id.name}</strong>.
                    </p>
                  ) : (
                    "Vous n'avez pas de rendez-vous à venir."
                  )}
                </CardDescription>
                <CardFooter className="px-0 pb-0">
                  <Link href="/agenda">
                    <Button className="w-full">Voir mon agenda</Button>
                  </Link>
                </CardFooter>
              </CardHeader>
            </Card>
            <Feedback />
          </div>
          <LastArticle />
        </div>
        <Prestations />
        <Users />
      </div>
    );
  }

  return (
    <div className="h-[80dvh] w-full flex justify-center items-center">
      <LoginForm />
    </div>
  );
}