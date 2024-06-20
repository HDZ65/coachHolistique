'use client'
import { fontEphesis, fontMontaga } from './../../../../fonts';

import React from 'react';
import Image from 'next/image';
import dune from './../../../../assets/dune.jpg';
import { Button } from '@/components/ui/button';
import { PrendreRendezVous } from "@/app/components/Calendly/Calendly";
import ButtonContact from '@/app/components/ButtonContact/ButtonContact';

const FirstAccueil = React.memo(function FirstAccueil() {
    return (
        <section className='relative flex gap-6 m-auto text-secondary mt-10'>
            <div className='shape-custom rounded-full absolute left-[-18%] top-[-5%] size-80 sm:size-96 bg-accent-25 z-10'>
            </div>
            <article className='relative flex flex-col items-start justify-center gap-8 md:w-1/2 z-30 '>
                <h1 className={`text-4xl z-30 ${fontEphesis.className}`}>Elisabeth, coach holistique</h1>
                <h2 className='md:text-5xl z-30 text-5xl drop-shadow-[0_0_1px_rgba(100,100,100,0.1)]'>
                    Atteignez l&apos;Équilibre et la Sérénité intérieure
                </h2>
                <p className={`rounded-full text-border bg-background px-2 z-30 ${fontMontaga.className}`}>- Soin holistique</p>
                <div className='flex flex-col gap-3 w-full'>
                    <ButtonContact />
                    <PrendreRendezVous className=' z-30' />
                </div>
            </article>
            <article className='relative hidden md:block w-1/2 z-30'>
                <div className='overflow-hidden h-full w-full rounded-xl z-30'>
                    <Image
                        className='kenburns-top h-full w-full object-cover rounded-xl z-10'
                        src={dune}
                        alt="Image d'accueil Elisabeth coach holistique"
                        priority
                    />
                </div>
            </article>

        </section>
    );
});

export default FirstAccueil;