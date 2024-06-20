import React, { useEffect, useState } from 'react';
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { CiCalendar } from "react-icons/ci";

export function PrendreRendezVous({className}: {className: string}) {
    const [key, setKey] = useState(0); // Clé pour forcer le rechargement du composant

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://assets.calendly.com/assets/external/widget.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            // Nettoyage en supprimant le script pour éviter les doublons
            document.body.removeChild(script);
        };
    }, [key]); // Dépendance sur la clé pour recharger le script

    return (
        <AlertDialog  >
            <AlertDialogTrigger asChild>
                <Button className={className} onClick={() => setKey(prevKey => prevKey + 1)}> {/* Incrémenter la clé pour recharger */}
                    <CiCalendar className='mr-2 text-xl stroke-1' />
                    Prendre rendez-vous
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className='w-full'>
                <AlertDialogHeader>
                    <AlertDialogTitle className='text-center'>Je planifie mon rendez-vous</AlertDialogTitle>
                    <AlertDialogDescription>
                        <div className="calendly-inline-widget" data-url="https://calendly.com/elisabethcoachholistique" style={{ minWidth: '100%', height: '700px' }}></div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Retour</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}