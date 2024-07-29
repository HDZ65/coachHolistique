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
import { format, parseISO, compareAsc } from 'date-fns';
import { fr } from 'date-fns/locale';
import { FaPhone, FaEnvelope } from 'react-icons/fa';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function Page() {
  const { data: session } = useSession();
  const [nextAppointment, setNextAppointment] = useState<AppointmentData[]>([]);

  useEffect(() => {
    async function fetchNextAppointment() {
      try {
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
          console.error("La réponse de l'API n'est pas un tableau de rendez-vous:", data);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du prochain rendez-vous:", error);
      }
    }
    fetchNextAppointment();
  }, []);

  if (session) {
    return (
      <TooltipProvider>
        <div className="flex flex-col gap-6">
          <Menu />
          <h2 className="text-2xl text-secondary">Bienvenue {session.user?.name}.</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="grid gap-6 col-span-1 ">
              <Card className=" h-fit">
                <CardHeader>
                  <CardTitle className="pb-6">Prochain rendez-vous</CardTitle>
                  <CardDescription>
                    {nextAppointment.length > 0 ? (
                      <div className="max-w-sm">
                        <p>
                          Votre prochain rendez-vous est le <strong>{format(parseISO(nextAppointment[0].date), 'dd MMMM yyyy', { locale: fr })}</strong> à <strong>{nextAppointment[0].time}</strong> avec <strong>{nextAppointment[0].user_id.prenom} {nextAppointment[0].user_id.nom}</strong> pour la prestation <strong>{nextAppointment[0].prestation_id.name}</strong>.
                        </p>
                        <p className="flex items-center mt-2">
                          <FaPhone className="mr-2" />
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Link href={`https://wa.me/${nextAppointment[0].user_id.mobile}`} target="_blank" rel="noopener noreferrer">
                                {nextAppointment[0].user_id.mobile}
                              </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Envoyer un message WhatsApp</TooltipContent>
                          </Tooltip>
                        </p>
                        <p className="flex items-center mt-2">
                          <FaEnvelope className="mr-2" />
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Link href={`mailto:${nextAppointment[0].user_id.email}`}>{nextAppointment[0].user_id.email}</Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Envoyer un email</TooltipContent>
                          </Tooltip>
                        </p>
                      </div>
                    ) : (
                      "Vous n'avez pas de rendez-vous à venir."
                    )}
                  </CardDescription>
                  <CardFooter className="px-0 pb-0">
                    <Link href="/admin/rendez-vous">
                      <Button className="w-full">Voir mon agenda</Button>
                    </Link>
                  </CardFooter>
                </CardHeader>
              </Card>
              <Feedback />
            </div>
            <div className="col-span-3">
              <Users />
            </div>
              <div className="col-span-3">
              <Prestations />
              </div>
              <div className="col-span-1">
              <LastArticle />
              </div>
          </div>
        </div>
      </TooltipProvider>
    );
  }

  return (
    <div className="h-[80dvh] w-full flex justify-center items-center">
      <LoginForm />
    </div>
  );
}