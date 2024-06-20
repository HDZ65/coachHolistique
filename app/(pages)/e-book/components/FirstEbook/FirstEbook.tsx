import { Button } from "@/components/ui/button";
import { fontMontaga, fontEphesis } from './../../../../fonts';


import { CarouselEbook } from "../Carrousel/Caroussel";
import { IoIosArrowRoundForward } from "react-icons/io";
export default function FirstEbook() {
  return (
    <div className=" flex  flex-col gap-20 items-center justify-around bg-secondary-25 w-screen py-6 sm:py-14 sm:px-4">
      <section className="flex items-start max-md:flex-col max-md:gap-20   justify-between m-auto w-11/12 md:w-4/5 max-w-7xl">
        <article className="flex m-auto flex-col min-h-full justify-between gap-4 w-1/2 max-md:w-full">
          <div className="flex flex-col  gap-6">
            <h1 className={`max-sm:text-6xl text-7xl ${fontEphesis.className}`}>Créer sa vie</h1>
            <h3 className={`max-sm:text-6xl text-7xl ${fontMontaga.className}`}>Grâce à la loi de l&apos;attraction</h3>
            <p className="text-xl max-sm:text-md">Vous y trouverez des conseils, des exercices et des outils pour vous accompagner dans votre démarche.</p>
            <p className="text-xl max-sm:text-md">N&apos;attendez plus, téléchargez dès maintenant mon e-book pour seulement <strong>7.90€</strong> et commencez votre voyage vers le bien-être et l&apos;épanouissement !</p>
          </div>
          <div className="flex  gap-4 mt-4">
            <Button className="flex items-center justify-center gap-1 text-2xl">
              <IoIosArrowRoundForward
              className="text-2xl mr-1 text-center"
              />
              Acheter
            </Button >
          </div>
        </article>
        <article className="relative max-md:w-full ">
          <CarouselEbook />

        </article>
      </section>
    </div>
  )
}