'use client'

import React, { useState, useCallback } from 'react';
import { IoIosMenu } from "react-icons/io";
import NavLinks from './NavLinks';
import { usePathname } from 'next/navigation';

// Titre : Composant de navigation pour mobile

const MobileNav: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const pathname = usePathname()?.slice(1) || '';

    // cette fonction permet de gérer l'état de la barre de navigation mobile en ouvrant ou fermant la barre de navigation
    // elle permet de gérer le clic sur le bouton pour ouvrir ou fermer la barre de navigation
    const toggleNavbar = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        setIsOpen(prev => !prev);
    }, []);

    return (
        <div className='lg:hidden relative w-full flex flex-col items-center justify-center'>
            <button
                aria-expanded={isOpen}
                onClick={toggleNavbar}
                className='relative bg-background flex flex-col justify-between items-center px-3 py-1 rounded-lg w-full'
            >
                <div className='w-full flex justify-between items-center'>
                    <p className='text-secondary'>{pathname || 'Accueil'}</p>
                    <IoIosMenu size={24} color={'#AD8581'} />
                </div>
            </button>
            <nav className={`${isOpen ? 'max-h-96' : 'max-h-0'} transition-all duration-1000 ease-in-out origin-top text-start absolute top-14 z-50 w-full bg-secondary overflow-hidden`}>
                <NavLinks isMobile={true} />
            </nav>
        </div>
    );
}

export default MobileNav;