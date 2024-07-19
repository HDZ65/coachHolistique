'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { IoIosMenu } from "react-icons/io";
import Link from 'next/link';
import { GiEyeOfHorus } from "react-icons/gi";
import { usePathname } from 'next/navigation'
import { fontMontaga } from './../../fonts';


import { ButtonRendezVous } from '../RendezVous/ButtonRendezVous';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const NavBar: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const pathname = usePathname()?.slice(1) || ''; // Ajout de l'opérateur de coalescence nulle pour gérer les valeurs nulles

    const navLinks = [
        { href: "/", label: "Accueil" },
        { href: "/coaching", label: "Coaching" },
        { href: "/e-book", label: "E-book" },
        { href: "/guidance", label: "Guidance" },
        { href: "/blog", label: "Blog" },
        { href: "/contact", label: "Contact" }
    ];

    useEffect(() => {
        const closeNavbar = (e: Event) => {
            if (!(e.target as HTMLElement).closest('.navbar')) {
                setIsOpen(false);
            }
        };

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        if (isOpen) {
            window.addEventListener('click', closeNavbar);
            window.addEventListener('scroll', closeNavbar);
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('click', closeNavbar);
            window.removeEventListener('scroll', closeNavbar);
        };
    }, [isOpen]);

    const toggleNavbar = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        setIsOpen(prev => !prev);
    }, []);

    return (
        <header onClick={(e: React.MouseEvent) => e.stopPropagation()}
            className={` max-w-[88rem] mx-auto bg-secondary lg:bg-background top-0 flex flex-col items-center justify-center gap-2 w-full max-lg:p-6 md:px-8 z-150'}`}
        >
            <nav className='lg:flex lg:justify-between lg:bg-background items-center w-full '>
                <Link
                    href="/"
                    className='flex flex-col items-center lg:text-first-1000 text-white-1000'
                    aria-label="Accueil"
                >
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <GiEyeOfHorus
                                    className='fill-primary max-lg:fill-primary-foreground'
                                    size={36}
                                />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Retour à l&apos;accueil</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <h2 className={`max-lg:text-primary-foreground text-secondary text-3xl ${fontMontaga.className}`}>
                        Élisabeth
                    </h2>
                </Link>
                <div className='hidden lg:flex items-center gap-4'>
                    <ul className="items-center text-second-1000">
                        {navLinks.map(link => (
                            <TooltipProvider key={link.href}>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Link 
                                            href={link.href} 
                                            className={`text-lg xl:px-6 px-4 max-lg:px-3 hover:underline ${pathname === link.href.slice(1) ? 'text-primary' : 'text-secondary'}`}
                                        >
                                            {link.label}
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Aller à la page {link.label}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        ))}
                    </ul>
                    <ButtonRendezVous />
                    <Link className='hover:scale-105' href="https://www.instagram.com/elisabeth.coach.holistique/">
                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="26" height="26" fill="url(#pattern0_59_13)" />
                            <defs>
                                <pattern id="pattern0_59_13" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use href="#image0_59_13" transform="scale(0.00390625)" />
                                </pattern>
                                    <image id="image0_59_13" width="256" height="256" href="data:image/png;base64,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" />
                                </defs>
                            </svg>
                        </Link>
                </div>
            </nav>
            <div className='hidden relative w-full max-lg:flex flex-col items-center justify-center'>
                <button
                    aria-expanded={isOpen}
                    onClick={toggleNavbar}
                    className='relative bg-background flex flex-col justify-between items-center px-3 py-1 rounded-lg w-full'
                >
                    <div className=' w-full flex justify-between items-center'>
                        <p className='text-secondary'>{pathname || 'Accueil'}</p>
                        <IoIosMenu size={24} color={'#AD8581'} />
                    </div>
                    <nav className={`${isOpen ? 'max-h-96' : 'max-h-0'} transition-all duration-1000 ease-in-out origin-top text-start absolute top-14 z-50 w-full bg-secondary overflow-hidden `}>
                        {navLinks.map(link => (
                            <Link key={link.href} href={link.href} className="block text-secondary-foreground px-4 py-2 border-b border-primary-foreground z-50">{link.label}</Link>
                        ))}
                    </nav>
                </button>
            </div>
        </header>
    )
}

export default NavBar;