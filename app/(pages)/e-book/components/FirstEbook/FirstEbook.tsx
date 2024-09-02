import { Button } from "@/components/ui/button";
import { fontMontaga, fontEphesis } from './../../../../fonts';
import { PiShoppingCartSimple } from "react-icons/pi";


import { CarouselEbook } from "../Carrousel/Caroussel";
import { IoIosArrowRoundForward } from "react-icons/io";
import Link from "next/link";
export default function FirstEbook() {
  return (
      <section className="flex items-start max-md:flex-col max-md:gap-20">
        <article className="flex m-auto flex-col justify-between gap-4 ">
          <div className="flex flex-col  gap-6">
            <h1 className={` text-4xl text-secondary ${fontEphesis.className}`}>Créer sa vie</h1>
            <h3 className=" text-5xl text-secondary " >Grâce à la loi de l&apos;attraction</h3>
            <p className="text-xl max-sm:text-md">Dans mon e-book sur la loi de l’attraction Vous y trouverez des conseils, des exercices et des outils pour vous accompagner dans votre démarche.</p>
            <p className="text-xl max-sm:text-md">N&apos;attendez plus, téléchargez dès maintenant mon e-book pour seulement <strong>7.90€</strong> et commencez votre voyage vers le bien-être et l&apos;épanouissement !</p>
          </div>
          <div className="flex  gap-4 mt-4">
            <Link href="/e-book/acheter" className="w-full">
            <Button className="flex items-center justify-center gap-2  w-full ">
            <PiShoppingCartSimple className="text-xl" />
              Acheter
            </Button >
            </Link>
          </div>
        </article>
        <article className="w-full ">
          <CarouselEbook />
        </article>
    </section>
  )
}