'use client'
import React from "react";
import { Button } from "@/components/ui/button"
import CardCoaching from '../../../../components/CardCoaching/CardCoaching';
import { BsInfo } from "react-icons/bs";
import Link from "next/link";

const Accompagnement = React.memo(function Accompagnement() {
  return (
    <section className='flex flex-col m-auto gap-10 text-center maxW-7xl items-center justify-center  text-foor-1000'>
      <article className="flex flex-col items-center  gap-4">
        <h2 className={`text-4xl md:text-5xl text-secondary`}>Accompagnement</h2>
        <Link href="/coaching" className='textLg text-muted hover:text-primary underline'>
          Comment se déroule le coaching ?</Link>
        <p className='text-center  text-foreground md:w-4/5 mx-auto'>
          Embarquez pour un <strong>accompagnement</strong> dans votre voyage de <strong>coaching holistique</strong> profond. Ensemble, nous dénouerons les nœuds qui entravent votre <strong>confiance en soi</strong> et aborderons les <strong>défis quotidiens</strong> qui vous empêchent d&rsquo;atteindre vos <strong>objectifs</strong>.
        </p>
      </article>
      <article className="flex max-md:flex-col gap-6 justify-around  w-full">
        <CardCoaching
          titre="Découverte et Évaluation"
          description="Programmez un appel initial pour évaluer vos besoins et définir les objectifs de votre parcours de coaching personnalisé. (durée 30min )"
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M13.332 18.3333L16.6654 21.6667L23.332 15" stroke="#AD8181" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M18.3333 31.6667C25.6971 31.6667 31.6667 25.6971 31.6667 18.3333C31.6667 10.9695 25.6971 5 18.3333 5C10.9695 5 5 10.9695 5 18.3333C5 25.6971 10.9695 31.6667 18.3333 31.6667Z" stroke="#AD8181" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M34.9987 35.0006L27.832 27.834" stroke="#AD8181" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </CardCoaching>
        <CardCoaching
          titre="Sessions de Coaching Hebdomadaires"
          description="Participez à des séances de coaching hebdomadaires via visioconférence, chaque session d'une durée d'une heure, pour un suivi régulier et approfondi pendant 1 mois."
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M3.33203 5H36.6654" stroke="#AD8581" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M35 5V23.3333C35 24.2174 34.6488 25.0652 34.0237 25.6904C33.3986 26.3155 32.5507 26.6667 31.6667 26.6667H8.33333C7.44928 26.6667 6.60143 26.3155 5.97631 25.6904C5.35119 25.0652 5 24.2174 5 23.3333V5" stroke="#AD8581" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11.668 35.0003L20.0013 26.667L28.3346 35.0003" stroke="#AD8581" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </CardCoaching>
        <CardCoaching
          titre="Accompagnement Continu"
          description="Bénéficiez d'un suivi continu avec des échanges réguliers par messages via WhatsApp pour discuter de vos progrès, célébrer vos réussites et répondre à vos questions spécifiques."
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M31.6654 23.3333C34.1487 20.9 36.6654 17.9833 36.6654 14.1667C36.6654 11.7355 35.6996 9.40394 33.9805 7.68485C32.2614 5.96577 29.9298 5 27.4987 5C24.5654 5 22.4987 5.83333 19.9987 8.33333C17.4987 5.83333 15.432 5 12.4987 5C10.0675 5 7.73597 5.96577 6.01689 7.68485C4.2978 9.40394 3.33203 11.7355 3.33203 14.1667C3.33203 18 5.83203 20.9167 8.33203 23.3333L19.9987 35L31.6654 23.3333Z" stroke="#AD8181" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M19.9981 8.33301L15.0647 13.2663C14.7261 13.6025 14.4573 14.0024 14.2739 14.4429C14.0905 14.8834 13.9961 15.3558 13.9961 15.833C13.9961 16.3102 14.0905 16.7826 14.2739 17.2231C14.4573 17.6636 14.7261 18.0635 15.0647 18.3997C16.4314 19.7663 18.6147 19.8163 20.0647 18.5163L23.5147 15.3497C24.3795 14.565 25.5054 14.1303 26.6731 14.1303C27.8407 14.1303 28.9666 14.565 29.8314 15.3497L34.7647 19.783" stroke="#AD8181" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M30.0013 25.0003L26.668 21.667" stroke="#AD8181" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M25.0013 30.0003L21.668 26.667" stroke="#AD8181" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </CardCoaching>
      </article>
      <div className="grid grid-cols-2 md:flex-row gap-4 w-full">
        <Button variant="outline">
          <BsInfo className='mr-2 textLg' aria-hidden="true" />
          En savoir plus
        </Button>
      </div>
    </section>
  );
});

export default Accompagnement;