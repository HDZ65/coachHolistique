// Importations nécessaires
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CiCircleInfo } from "react-icons/ci";
import ebook from './../../../../assets/anna-demianenko-CPWhnIkL4Lk-unsplash.jpg';

// Fonction principale Ebook
export default function Ebook() {
    return (
        <article className="relative w-full h-full">
            {/* Image de l'ebook */}
            <Image src={ebook} alt="ebook" objectFit="cover" className="rounded-lg" fill  />
            
            {/* Contenu de l'ebook */}
            <div className="absolute inset-0 flex flex-col justify-start gap-6 items-start p-6 bg-neutral-900 rounded-lg text-white my-auto mx-6 h-fit">
                <p>E-book</p>
                <h3 className="text-xl underline">Grâce à la loi de l&apos;attraction</h3>
                <p className="text-sm">Vous y trouverez des conseils, des exercices et des outils pour vous accompagner dans votre démarche.</p>
                <Button className="flex items-center gap-2 bg-foreground bg-neutral-900 text-white border-white" variant="outline">
                    <CiCircleInfo className="text-2xl" />
                    En savoir plus
                </Button>
            </div>
        </article>
    )
}