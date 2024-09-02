import ButtonContact from "@/app/components/ButtonContact/ButtonContact";
import { ButtonRendezVous } from './../../../../components/ButtonRendezVous/ButtonRendezVous';

import { fontEphesis, fontMontaga } from "@/app/fonts";
export default function Header() {
  return (

            <section className="flex flex-col gap-6 md:gap-8 items-start md:items-center justify-center text-secondary mt-10">
                <h1 className={`text-4xl z-30 ${fontEphesis.className}`}>
                    Elisabeth, coach holistique
                </h1>
                <h2 className="md:text-5xl z-30 text-5xl drop-shadow-[0_0_1px_rgba(100,100,100,0.1)]">
                Le blog de la Guidance Holistique
                </h2>
                <p className={` ${fontMontaga.className}`}>
                &quot;Les maux du corps sont les mauw de l&apos;âme, ainsi on ne doit pas chercher à guerir le corps sans chercher à guerir l&apos;âme&quot; -Platon
                </p>
                <section className="flex flex-col gap-3 w-full">
                    <ButtonContact />
                    <ButtonRendezVous className="w-full" />
                </section>
        </section>
  )
}