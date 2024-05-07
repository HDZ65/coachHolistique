import { fontEphesis, fontMontaga } from './../../../../fonts';

import React from 'react';
import Image from 'next/image';
import dune from './../../../../assets/dune.jpg';
const FirstAccueil = React.memo(function FirstAccueil() {
    return (
        <section className='relative  flex m-auto text-foor-1000 mt-10'>
            <div className=' shape-custom rounded-full block absolute left-[-10%] top-[-10%] size-80 sm:size-96 bg-secondary-25 z-0'>
            </div>
            <article className='flex flex-col items-start justify-center gap-8 md:w-1/2 z-10 md:p-5'>
                <h1 className={`text-4xl ${fontEphesis.className}`}>Elisabeth, coach holistique</h1>
                <h2 className='md:text-5xl text-4xl drop-shadow-[0_0_1px_rgba(250,250,250,1)]'>
                    Éveillez votre confiance intérieure, cultivez la positivité et explorez votre chemin de vie spirituel.
                </h2>
                <p className={`text-xl md:text-2xl ${fontMontaga.className}`}>- Soin holistique</p>
            </article>
            <article className='relative hidden md:block w-1/2'>
                <div className='overflow-hidden h-full w-full rounded-xl'>
                    <Image 
                    className='kenburns-top h-full w-full object-cover rounded-xl' 
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