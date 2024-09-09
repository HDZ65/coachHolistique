import React from 'react';
import Link from 'next/link';
import { GiEyeOfHorus } from "react-icons/gi";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { fontMontaga } from './../../fonts';

// Titre : Composant Logo
const Logo: React.FC = () => {
    return (
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
    );
}

export default Logo;