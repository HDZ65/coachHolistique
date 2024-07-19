'use client'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { CiCalendar } from "react-icons/ci"
import { FaArrowLeft } from "react-icons/fa" // Importer l'icône de flèche vers l'arrière
import CardRDV from "./CardRDV/CardRDV"
import React, { useState } from 'react';
import Paypal from "./Paypal/Paypal";
import { CalendrierRDV } from "./CalendrierRDV/CalendrierRDV"



export function ButtonRendezVous() {
    const [step, setStep] = useState<number>(1); // État pour gérer les étapes
    const [isOpen, setIsOpen] = useState<boolean>(false); // État pour gérer l'ouverture de l'alerte
    const [prestation, setPrestation] = useState<number | null>(null); // État pour la prestation choisie
    const [horaire, setHoraire] = useState<string | null>(null); // État pour la plage horaire choisie
    const [paymentAccepted, setPaymentAccepted] = useState<boolean>(false); // État pour le paiement accepté

    const handleContinue = () => {
        setStep(prevStep => prevStep + 1);
    };

    const handleBack = () => {
        setStep(prevStep => prevStep - 1);
    };

    const handleConfirm = async () => {
        setIsOpen(false); // Fermer l'alerte après confirmation
    };

    const handleCancel = () => {
        setIsOpen(false);
        setStep(1);
        setPrestation(null);
        setHoraire(null);
        setPaymentAccepted(false); // Réinitialiser l'état du paiement
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
                <Button onClick={() => { setIsOpen(true); setStep(1); setPrestation(null); setHoraire(null); setPaymentAccepted(false); }}>
                    <CiCalendar className='mr-2 text-xl stroke-1' />
                    Prendre rendez-vous
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent >
                <AlertDialogHeader className="flex flex-row justify-start items-center  mt-0 gap-4">
                    {step > 1 && (
                        <Button variant="outline" onClick={handleBack} className="h-8">
                            <FaArrowLeft /> {/* Icône de flèche vers l'arrière */}
                        </Button>
                    )}
                    {step === 1 && <AlertDialogTitle className="text-secondary text-2xl">Je choisis mon programme :</AlertDialogTitle>}
                    {step === 2 && <AlertDialogTitle className="text-secondary text-2xl">Je choisis mon horaire :</AlertDialogTitle>}
                    {step === 3 && <AlertDialogTitle className="text-secondary text-2xl">Paiement :</AlertDialogTitle>}

                </AlertDialogHeader>
                <AlertDialogDescription >
                    {step === 1 && <CardRDV setPrestation={(value: number) => setPrestation(value)} />}
                    {step === 2 && <CalendrierRDV setHoraire={(value: string) => setHoraire(value)} />}
                    {step === 3 && <Paypal />}
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={handleCancel}>Annuler</AlertDialogCancel>

                    {step < 3 && (
                        <AlertDialogAction onClick={handleContinue} disabled={(step === 1 && prestation === null) || (step === 2 && !horaire)}>
                            Continue
                        </AlertDialogAction>
                    )}
                    {step === 3 && <AlertDialogAction onClick={handleConfirm} disabled={!paymentAccepted}>Confirmer</AlertDialogAction>}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}