'use client'
import React from "react";
import { Button } from "@/components/ui/button"
import CardCoaching from '../../../../components/CardCoaching/CardCoaching';
import { BsInfo } from "react-icons/bs";
import Link from "next/link";
import { ButtonRendezVous } from '../../../../components/ButtonRendezVous/ButtonRendezVous';

const EFT = React.memo(function EFT() {
  return (
    <section className='flex flex-col m-auto gap-10 text-center maxW-7xl items-center justify-center  text-foor-1000'>
      <article className="flex flex-col items-star  gap-4">
        <h2 className={`text-4xl text-secondary`}>Séance d&rsquo;EFT</h2>
        <Link href="/eft-tapping" className='textLg text-muted hover:text-primary underline'>
          Qu&rsquo;est ce que l&rsquo;EFT ?</Link>
        <p className='text-center  text-foreground md:w-4/5 mx-auto'>
        L&rsquo;EFT, ou Emotional Freedom Techniques (Techniques de Libération Émotionnelle), est une méthode de gestion des émotions et des douleurs physiques qui combine la psychologie cognitive et les points d&rsquo;acupuncture.
        </p>
      </article>
      <article className="flex max-md:items-center max-md:flex-col gap-6 justify-center  w-full">
        <CardCoaching
          titre="Évaluation"
          description="Programmez un appel initial pour évaluer vos besoins et définir les objectifs pour votre séance d&rsquo;EFT. ( Durée de 15 à 30 minutes. )"
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M13.332 18.3333L16.6654 21.6667L23.332 15" stroke="#AD8181" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M18.3333 31.6667C25.6971 31.6667 31.6667 25.6971 31.6667 18.3333C31.6667 10.9695 25.6971 5 18.3333 5C10.9695 5 5 10.9695 5 18.3333C5 25.6971 10.9695 31.6667 18.3333 31.6667Z" stroke="#AD8181" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M34.9987 35.0006L27.832 27.834" stroke="#AD8181" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </CardCoaching>
        <CardCoaching
          titre="Séance d&rsquo;EFT"
          description="Participez à une ou plusieurs séances d&rsquo;EFT ( selon vos besoins ). La durée de chaque séance est de 1h environ en visio."
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M13.332 18.3333L16.6654 21.6667L23.332 15" stroke="#AD8181" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M18.3333 31.6667C25.6971 31.6667 31.6667 25.6971 31.6667 18.3333C31.6667 10.9695 25.6971 5 18.3333 5C10.9695 5 5 10.9695 5 18.3333C5 25.6971 10.9695 31.6667 18.3333 31.6667Z" stroke="#AD8181" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M34.9987 35.0006L27.832 27.834" stroke="#AD8181" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </CardCoaching>
      </article>
    </section>
  );
});

export default EFT;