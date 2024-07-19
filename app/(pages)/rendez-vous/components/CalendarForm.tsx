"use client";

import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useSalesFunnel } from '../context/SalesFunnelContext';

// Fonction principale pour le formulaire de calendrier
// Fonction principale pour le formulaire de calendrier
export function CalendarForm({ currentStep, nextStep, prevStep }: { currentStep: number, nextStep: () => void, prevStep: () => void }) {
    const { setDateTime } = useSalesFunnel();
    const [date, setDateState] = useState<Date | undefined>(new Date()); // État pour la date sélectionnée
    const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined); // État pour l'heure sélectionnée
    const [bookedSlots, setBookedSlots] = useState<string[]>([]); // État pour les créneaux horaires pris

    // Fonction pour gérer la sélection de l'heure
    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
    };

    // Créneaux horaires disponibles
    const timeSlots = ["09:00", "10:30", "12:00", "13:30", "15:00"];

    const handleNextStep = () => {
        if (date && selectedTime) {
            // Ajuster la date en fonction du fuseau horaire local
            const localDate = new Date(date);
            const [hours, minutes] = selectedTime.split(':').map(Number);
            localDate.setHours(hours, minutes, 0, 0);

            // Ajuster la date pour le fuseau horaire local
            const offset = localDate.getTimezoneOffset();
            localDate.setMinutes(localDate.getMinutes() - offset);

            // Convertir en format ISO 8601
            const dateTime = localDate.toISOString();
            setDateTime(dateTime);
            nextStep();
        }
    };

    return (
        <Card className=" flex flex-col lg:w-fit m-auto lg:px-6">
            <CardHeader>
                <CardTitle className="text-2xl">Choisir une date et une heure</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-12 justify-center sm:flex-row sm:h-[23rem] ">
                <div className="flex flex-col h-full w-full">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDateState}
                        className="rounded-lg w-full flex-grow"
                    />
                </div>
                <div className="flex flex-col gap-6  justify-between text-center w-full h-full ">
                    {timeSlots.map((time) => (
                        <button
                            key={time}
                            onClick={() => !bookedSlots.includes(time) && handleTimeSelect(time)} // Désactiver le clic si le créneau est pris
                            className={cn(
                                "lg:w-96 rounded-lg text-md font-semibold flex items-center shadow justify-center px-4 h-full md:min-w-40 cursor-pointer md:hover:scale-[1.02] transition-all duration-150 md:hover:shadow-md md:hover:bg-gray-100 md:hover:text-black max-sm:py-3",
                                selectedTime === time ? "bg-accent text-white" : "bg-transparent"
                            )}
                            aria-disabled={bookedSlots.includes(time)} // Indiquer aux technologies d'assistance que le créneau est désactivé
                            disabled={bookedSlots.includes(time)} // Désactiver le bouton si le créneau est pris
                        >
                            {time}
                        </button>
                    ))}
                </div>
            </CardContent>
            <CardFooter>
                <div className="flex justify-between gap-6 w-full">
                    {currentStep > 1 && (
                        <Button onClick={prevStep} variant="outline">
                            Précédent
                        </Button>
                    )}
                    {currentStep < 4 && (
                        <Button onClick={handleNextStep} disabled={!selectedTime}>
                            Suivant
                        </Button>
                    )}
                </div>
            </CardFooter>
        </Card>
    );
}