import { Button } from "@/components/ui/button";
import Image from "next/image";
import { BsInfo } from "react-icons/bs";
import ebook from './../../../../assets/anna-demianenko-CPWhnIkL4Lk-unsplash.jpg';
import Link from "next/link";

export default function Ebook() {
    return (
        <>
            <section className="hidden md:flex gap-24">
                <article className="flex flex-col gap-6 h-full">
                    <div className="flex gap-2 text-muted-foreground h-full">
                        <p className="rounded-full border text-primary-background text-xs px-2 text-nowrap">Créer sa vie</p>
                        <p className="rounded-full border text-primary-background text-xs px-2 text-nowrap">Développement personnel</p>
                        <p className="rounded-full border text-primary-background text-xs px-2 text-nowrap">Pouvoir de la pensée</p>
                    </div>
                    <div className="flex gap-6 h-full">
                        <div className="h-full flex flex-col gap-6">
                            <p><strong>Transformez vos rêves en réalité.</strong> Attirer le <strong>succès</strong> et investissez en vous-même. <strong>Commencez votre voyage vers une vie meilleure dès aujourd&apos;hui.</strong></p>
                            <Button className="w-full text-secondary" variant="outline">
                                <BsInfo className='mr-2 text-lg' aria-hidden="true" />
                                En savoir plus
                            </Button>
                        </div>
                        <div>
                            <Image className="rounded-lg h-full object-cover" src={ebook} alt="Couverture de l'ebook" width={400} height={400} />
                        </div>
                    </div>
                </article>
                <article className="flex flex-col gap-6">
                    <div className="flex flex-col gap-1">
                        <h4 className="text-sm">E-book</h4>
                        <Link href="/e-book">
                            <h2 className="text-2xl text-secondary underline font-semibold">Grâce à la loi de l&apos;attraction</h2>
                        </Link>
                    </div>
                    <p className="h-full">Vous y trouverez des <strong>conseils</strong>, des <strong className="font-semibold">exercices</strong> et des <strong>outils</strong> pour vous aider à mettre en place la <strong>loi de l&apos;attraction</strong> dans votre vie et vous accompagner dans votre démarche.</p>
                </article>
            </section>
        </>
    )
}