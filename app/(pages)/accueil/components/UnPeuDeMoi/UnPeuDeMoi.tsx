import Image from 'next/image';
import aboutme from './../../../../../public/about.png';

const UnPeuDeMoi = () => {
    return (
        <>
            <section className='relative w-full'>
                <Image
                    src={aboutme}
                    alt="À propos de moi"  // Description alternative appropriée
                    fill
                    style={{ objectFit: 'cover' }}
                    className="z-0"
                />
                <article className='roundedLg backdrop-blur-xl flex flex-col items-start justify-center gap-4 w-5/6 maxW-7xl md:px-20 max-md:roundedLg bg-card z-10 m-auto my-10 p-8'>
                    <div className='flex justify-between items-center w-full'>
                        <h2 className="text-3xl font-Ephesis text-secondary mb-3">Un peu de moi</h2>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path d="M9.33203 26.666H22.6654" stroke="#AD8181" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M13.332 26.6673C20.6654 23.334 14.3987 18.134 17.332 13.334" stroke="#AD8181" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12.6654 12.5328C14.132 13.5995 15.0654 15.4661 15.732 17.4661C13.0654 17.9995 11.0654 17.9995 9.33203 17.0661C7.73203 16.2661 6.26536 14.5328 5.33203 11.4661C9.06536 10.7995 11.1987 11.4661 12.6654 12.5328Z" stroke="#AD8181" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M18.7997 8.00065C17.7832 9.58939 17.2718 11.4488 17.333 13.334C19.8664 13.2007 21.733 12.534 23.0664 11.4673C24.3997 10.134 25.1997 8.40065 25.333 5.33398C21.733 5.46732 19.9997 6.66732 18.7997 8.00065Z" stroke="#AD8181" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="flex flex-col gap-3">
                        <p>
                            Je suis <strong>Elisabeth</strong>, <strong>coach holistique</strong> et <strong>intuitive</strong>. Dès mon jeune âge, je me suis intéressée à la <strong>cartomancie</strong> et au monde <strong>ésotérique</strong>. En 2018, j&apos;ai approfondi mes connaissances en <strong>soins Reiki</strong> et en <strong>loi de l&apos;attraction</strong>, renforçant mon désir d&apos;aider et de partager.
                        </p>
                        <div className="mx-auto w-short-divider border-b border-secondary"></div>
                        <p>
                            Depuis lors, je n&apos;ai cessé d&apos;approfondir mes connaissances et d&apos;affiner mes compétences au travers de divers <strong>stages</strong>, <strong>formations</strong>, et <strong>Masterclass</strong>, dans le domaine de la <strong>spiritualité</strong> mais aussi de l&apos;<strong>accompagnement</strong>. J&apos;ai également eu le privilège d&apos;étudier les travaux de nombreux <strong>spécialistes</strong> et <strong>mentors renommés</strong>, enrichissant ainsi ma pratique et ma compréhension de ce vaste univers.
                        </p>
                        <div className="left-0 right-0 mx-auto w-short-divider border-b border-secondary"></div>
                        <p>
                            Ayant moi-même mis en pratique les enseignements de ces figures emblématiques, je suis déterminée à vous accompagner dans votre propre voyage de <strong>croissance</strong> et de <strong>transformation</strong>.
                        </p>
                    </div>
                </article>
            </section>
        </>
    );
}

export default UnPeuDeMoi;