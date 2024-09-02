"use client";

import React from 'react';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { FaPhone, FaEnvelope } from 'react-icons/fa';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useNextAppointment } from '@/app/hooks/useNextAppointment';


const NextAppointmentCard: React.FC = () => {
  const { nextAppointment, error } = useNextAppointment();

  if (error) return <Card className="h-fit"><CardHeader>Erreur: {error}</CardHeader></Card>;

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="">Prochain rendez-vous</CardTitle>
      </CardHeader>
      <CardContent>
        {nextAppointment && nextAppointment.length > 0 ? (
          <div className="max-w-sm">
            <p>
              Votre prochain rendez-vous est le <strong>{format(parseISO(nextAppointment[0].date), 'dd MMMM yyyy', { locale: fr })}</strong> à <strong>{nextAppointment[0].time}</strong> avec <strong>{nextAppointment[0].user_id.prenom} {nextAppointment[0].user_id.nom}</strong> pour la prestation <strong>{nextAppointment[0].prestation_id.name}</strong>.
            </p>
            <p className="flex items-center mt-2">
              <FaPhone className="mr-2" aria-hidden="true" />
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
              <FaEnvelope className="mr-2" aria-hidden="true" />
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={`mailto:${nextAppointment[0].user_id.email}`}>{nextAppointment[0].user_id.email}</Link>
                </TooltipTrigger>
                <TooltipContent side="right">Envoyer un email</TooltipContent>
              </Tooltip>
            </p>
          </div>
        ) : (
          <p>Vous n&apos;avez pas de rendez-vous à venir.</p>
        )}
      </CardContent>
      <CardFooter className=" ">
        <Link className="w-full" href="/admin/planning">
          <Button className="w-full">Voir mon agenda</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default NextAppointmentCard;