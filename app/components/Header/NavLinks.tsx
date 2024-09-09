'use client'

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Titre : Composant des liens de navigation
const NavLinks: React.FC<{ isMobile?: boolean }> = ({ isMobile = false }) => {
    const pathname = usePathname()?.slice(1) || '';

    const navLinks = [
        { href: "/", label: "Accueil" },
        { href: "/coaching", label: "Coaching" },
        // { href: "/eft-tapping", label: "EFT ou Tapping" },
        { href: "/e-book", label: "E-book" },
        // { href: "/blog", label: "Blog" },
        { href: "/contact", label: "Contact" }
    ];

    return (
        <ul className={isMobile ? "" : "items-center text-second-1000"}>
            {navLinks.map(link => (
                <TooltipProvider key={link.href}>
                    <Tooltip>
                        <TooltipTrigger>
                            <Link
                                href={link.href}
                                className={`${isMobile ? 'block text-secondary-foreground px-4 py-2 border-b border-primary-foreground z-50' : `text-lg xl:px-6 px-4 max-lg:px-3 hover:underline ${pathname === link.href.slice(1) ? 'text-primary' : 'text-secondary'}`}`}
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
    );
}

export default NavLinks;