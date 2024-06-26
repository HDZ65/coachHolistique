import { fontEphesis, fontMontaga } from '@/app/fonts';
import { FormulaireContact } from './components/FormulaireContact';
import contact from './../../assets/carl-newton-iX7WedkjpUY-unsplash.jpg';
import Image from 'next/image';

export default function Contact() {


    return (
        <>
            <section className='flex flex-col items-start justify-center min-w-full gap-3 mt-10'>
                <h1 className={`text-4xl text-secondary ${fontEphesis.className}`}>Contact</h1>
                <p className=''>Des questions sur le coaching holistique ? Contactez moi pour obtenir des réponses claires.</p>
                <FormulaireContact />
            </section>

            <section className='hidden md:block'>
                <Image src={contact} alt="image de contact" />
                <article className='flex flex-col items-start justify-center min-w-full gap-3 mt-10'>
                    <h1 className={`text-4xl text-secondary ${fontEphesis.className}`}>Contact</h1>
                    <p className=''>Des questions sur le coaching holistique ? Contactez moi pour obtenir des réponses claires.</p>
                    <FormulaireContact />
                </article>
            </section>
        </>
    );
}