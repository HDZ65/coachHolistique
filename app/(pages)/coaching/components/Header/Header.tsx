import ButtonContact from "@/app/components/ButtonContact/ButtonContact";
import { ButtonRendezVous } from './../../../../components/ButtonRendezVous/ButtonRendezVous';

import { fontEphesis, fontMontaga } from "@/app/fonts";
export default function Header() {
  return (

            <section className="flex flex-col gap-6 md:gap-8 items-start md:items-center justify-center text-secondary mt-10">
                <h1 className={`text-4xl z-30 ${fontEphesis.className}`}>
                    Elisabeth, coach holistique
                </h1>
                <h2 className=" z-30 text-5xl drop-shadow-[0_0_1px_rgba(100,100,100,0.1)]">
                Prenez le contrôle de votre vie
                </h2>
                <p className={` ${fontMontaga.className}`}>
                - Soin holistique
                </p>

                    <ButtonRendezVous className="" />
        </section>
  )
}