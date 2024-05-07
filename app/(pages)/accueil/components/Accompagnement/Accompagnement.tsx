'use client'
import React from "react";
import { Button } from "@/components/ui/button"

import { fontAlice } from './../../../../fonts';
import CardCoaching from '../../../../components/CardCoaching/CardCoaching';
import { CiCalendar } from "react-icons/ci";
import { BsInfo } from "react-icons/bs";
import etape1 from './../../../../assets/etape1.jpg';
import etape2 from './../../../../assets/etape2.jpg';
import etape3 from './../../../../assets/etape3.jpg';
import Link from "next/link";
import { PrendreRendezVous } from "@/app/components/Calendly/Calendly";

const Accompagnement = React.memo(function Accompagnement() {
  return (
    <section className='flex flex-col m-auto  gap-10 text-center max-w-7xl items-center justify-center  text-foor-1000'>
      <article className="flex flex-col items-center  gap-4">
        <h2 className={`text-4xl md:text-5xl ${fontAlice.className}`}>Accompagnement</h2>
        <Link href="/coaching" className='text-2xl underline text-muted-foreground hover:text-primary'>
          Comment se déroule un coaching ?</Link>
        <p className='text-center  text-muted-foreground md:w-4/5 mx-auto'>
          Embarquez pour un <strong>accompagnement</strong> dans votre voyage de <strong>coaching holistique</strong> profond. Ensemble, nous dénouerons les nœuds qui entravent votre <strong>confiance en soi</strong> et aborderons les <strong>défis quotidiens</strong> qui vous empêchent d&rsquo;atteindre vos <strong>objectifs</strong>.
        </p>
      </article>
      <article className="flex max-md:flex-col gap-6 justify-around  w-full">
        <CardCoaching
          titre="Etape 1 : Découverte et Évaluation"
          description="Programmez un appel initial pour évaluer vos besoins et définir les objectifs de votre parcours de coaching personnalisé. (durée 30min )"
          img={etape1.src}
        />
        <CardCoaching
          titre="Etape 2 : Sessions de Coaching Hebdomadaires"
          description="Participez à des séances de coaching hebdomadaires via visioconférence, chaque session d'une durée d'une heure, pour un suivi régulier et approfondi pendant 1 mois."
          img={etape2.src}
        />
        <CardCoaching
          titre="Etape 3 : Accompagnement Continu"
          description="Bénéficiez d'un suivi continu avec des échanges réguliers par messages via WhatsApp pour discuter de vos progrès, célébrer vos réussites et répondre à vos questions spécifiques."
          img={etape3.src}
        />
      </article>
      <div className="flex flex-col md:flex-row gap-4">
        <Button variant="outline">
          <BsInfo
            className='mr-2 text-lg'
          />
          En savoir plus
        </Button>
        <PrendreRendezVous />

      </div>
    </section>
  );
});

export default Accompagnement;