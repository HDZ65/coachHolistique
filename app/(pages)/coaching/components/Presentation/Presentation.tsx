import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { CiCalendar } from "react-icons/ci";
import { FaRegSmile, FaWhatsapp } from "react-icons/fa";
import { FiMail, FiPhoneCall } from "react-icons/fi";
import { LiaHandshake } from "react-icons/lia";
import { GoQuestion } from "react-icons/go";
import { MdOutlineFace, MdOutlineFavoriteBorder, MdOutlinePsychology, MdOutlineNature, MdOutlineChangeCircle, MdOutlineHealing } from "react-icons/md";
import { GiMuscleUp } from "react-icons/gi";
export default function Presentation() {
    return (
        <section className="flex flex-col gap-6">
            <Card className="">
                <CardHeader>
                    <CardTitle className=" text-2xl flex items-center gap-2">
                        <GoQuestion className="text-3xl" />
                        Qu&rsquo;est ce que le coaching holistique ?
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                    <p>Le <strong>coaching holistique</strong> est une approche <strong>puissante</strong> pour améliorer tous les aspects de votre vie, y compris votre <strong>bien-être physique</strong>, <strong>mental</strong> et <strong>émotionnel</strong>. Cette méthode de coaching vise à établir un <strong>équilibre harmonieux</strong> entre le corps, l&rsquo;esprit et l&rsquo;âme, en prenant en compte votre être dans sa globalité. Alors bénéficiez d&rsquo;un <strong>accompagnement profond et personnalisé</strong> qui vous permettra de :</p>
                    <ul className="flex flex-col gap-2">
                        <li className="flex items-center gap-2">
                            💪
                            <strong>Dépasser vos peurs</strong> et vos limitations
                        </li>
                        <li className="flex items-center gap-2">
                            😎
                            <strong>Retrouver confiance en vous</strong>
                        </li>
                        <li className="flex items-center gap-2">
                            😌
                            <strong>Gérer votre stress</strong> et vos émotions de manière plus sereine
                        </li>
                        <li className="flex items-center gap-2">
                            🌿
                            <strong>Vous reconnecter à votre essence véritable</strong> et à vos aspirations profondes
                        </li>
                        <li className="flex items-center gap-2">
                            🔄
                            <strong>Gérer les transitions</strong> et les changements dans votre vie
                        </li>
                        <li className="flex items-center gap-2">
                            💆‍♂️
                            <strong>Vous libérer du stress</strong> et des traumas
                        </li>
                    </ul>
                </CardContent>
            </Card>
            <div className="flex flex-col md:flex-row gap-6">
                <Card className="">
                    <CardHeader>
                        <CardTitle className=" text-2xl flex items-center gap-2">
                            <FiPhoneCall className="text-3xl" />
                            Évaluer vos besoins
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="py-0">
                        <p>Commencez par un <strong>appel gratuit</strong> pour <strong>évaluer</strong> <strong>vos besoins</strong> et <strong>vos objectifs</strong>. <br /> <br />
                            Veillez me contacter avec le bouton ci-dessous pour mettre en place cet <strong>appel d&apos;évaluation</strong>.</p>
                    </CardContent>
                    <CardFooter >
                        <Link className="w-full" href="/contact">
                            <Button variant="outline" className="w-full flex justify-center items-center gap-2">
                                <FiMail />
                                Contactez-moi
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>

                <Card >
                    <CardHeader>
                        <CardTitle className=" text-2xl flex items-center gap-2">
                            <LiaHandshake className="text-4xl" />
                            Accompagnement
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="flex items-start gap-2 font-semibold">
                            <CiCalendar className="stroke-1 text-secondary text-2xl" />
                            Rendez-vous hebdomadaire privés :
                        </div>
                        <ul className="list-disc pl-6">
                            <li>Une fois par semaine, un appel en visio ou par téléphone de 1h pour approfondir votre développement personnel et vous accompagner.</li>
                        </ul>
                        <div className="flex items-start gap-2 font-semibold">
                            <FaWhatsapp className="text-green-500 text-2xl" />
                            Suivi Quotidien :
                        </div>
                        <ul className="list-disc pl-6">
                            <li>Un suivi quotidien par Whatsapp pour vous encourager et vous motiver.</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}