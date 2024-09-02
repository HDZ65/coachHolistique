import Image from "next/image";
import parfois from './../../../../../public/parfois.png';
import programme from './../../../../../public/programme.png';
import vivez from './../../../../../public/vivez.png';

export default function Explain() {
    return (

        <section className="flex flex-col  gap-6">
            <article className="flex flex-col md:flex-row gap-6 items-center justify-center">
                <div className="flex flex-col gap-6" >
                    <h2 className="text-2xl text-secondary font-semibold">Parois, il y a des moments dans notre vie où tout est flou.</h2>
                    <p>Vous êtes-vous déjà senti bloqué dans votre quotidien sans savoir pourquoi ?
                    Ressentez-vous un manque de confiance en vous dans certaintes situations ?
                    Ou, tout simplement, souhaitez-vous améliorer votre bien-être général et retrouver un équilibre ?</p>
                </div>
                <Image src={parfois} alt="parfois" width={500} height={500} className="md:size-1/3" />
            </article>
            <article className="flex flex-col md:flex-row-reverse gap-6 items-center justify-center">
                <div className="flex flex-col gap-6" >
                    <h2 className="text-2xl text-secondary  font-semibold">Et si suivre un programme de coaching vous permettait de retrouver votre équilibre ?</h2>
                    <p>Le programme de coaching holistique vous offre un accompagnement personnalisé pour lever les obstacles.
                Ensemble, nous définirons des objectifs clairs et mettrons en place des stratégies efficaces pour les atteindre. Le soutien continu vous aidera à rester motivé et concentré.</p>
                </div>
                <Image src={programme} alt="programme" width={500} height={500} className="md:size-1/3" />
            </article>
            <article className="flex flex-col md:flex-row gap-6 items-center justify-center">
                <div className="flex flex-col gap-6" >
                    <h2 className="text-2xl text-secondary  font-semibold">Vivez la vie que vous méritez</h2>
                    <p>Grâce au coaching holistique, vos objectifs sont atteints, vos blocages surmontés et votre confiance en vous renforcée. Vous découvrez vos capacités et exploitez pleinement votre potentiel.
                    Vous vivez enfin la vie que vous méritez.</p>
                </div>
                <Image src={vivez} alt="vivez" width={500} height={500} className="md:size-1/3" />
            </article>
        </section>
    )
}