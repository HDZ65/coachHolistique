import { fontEphesis, fontMontaga } from '@/app/fonts';
import { FormulaireContact } from './components/FormulaireContact';
import contact from './../../assets/carl-newton-iX7WedkjpUY-unsplash.jpg';
import Image from 'next/image';
import { Metadata } from 'next';


export const metadata: Metadata = {
    title: "Contact - Elisabeth Coach Holistique",
    description: "Contactez Elisabeth Coach Holistique pour en savoir plus sur nos services de coaching et pour toute autre question.",
    keywords: ["contact", "coaching holistique", "Elisabeth Coach", "bien-être", "développement personnel"],
    authors: [{ name: "Elisabeth Coach Holistique" }],
    openGraph: {
      title: "Contact - Elisabeth Coach Holistique",
      description: "Contactez Elisabeth Coach Holistique pour en savoir plus sur nos services de coaching et pour toute autre question.",
      url: "https://www.elisabethcoachholistique.com/contact",
      type: "website",
      images: [
        {
          url: "https://www.elisabethcoachholistique.com/public/logoElisabeth.png",
          width: 1200,
          height: 630,
          alt: "Elisabeth Coach Holistique"
        }
      ]
    }
  };

export default function Contact() {


    return (
        <>
            <section className='flex flex-col items-start justify-center min-w-full gap-6 lg:hidden'>
                <h1 className={`text-4xl text-secondary ${fontEphesis.className}`}>Contact</h1>
                <p className=''>Des questions sur le coaching holistique ? Contactez moi pour obtenir des réponses claires.</p>
                <FormulaireContact />
            </section>

            <section className='hidden lg:flex justify-around items-center gap-6'>
                <Image src={contact} alt="image de contact" height={500} width={500} className='md:w-1/3 rounded-lg' />
                <article className='flex flex-col items-start justify-center  gap-6'>
                    <h1 className={`text-4xl text-secondary ${fontEphesis.className}`}>Contact</h1>
                    <p className=''>Des questions sur le coaching holistique ? Contactez moi pour obtenir des réponses claires.</p>
                    <FormulaireContact />
                </article>
            </section>
        </>
    );
}