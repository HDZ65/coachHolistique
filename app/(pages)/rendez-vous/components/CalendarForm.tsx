"use client";

import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useSalesFunnel } from '../context/SalesFunnelContext';

// Fonction principale pour le formulaire de calendrier
export function CalendarForm({ currentStep, nextStep, prevStep }: { currentStep: number, nextStep: () => void, prevStep: () => void }) {
    const { setDate, setTime } = useSalesFunnel();
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);

    // Créneaux horaires disponibles
    const timeSlots = ["09:00", "10:30", "12:00", "13:30", "15:00"];

    const handleDateSelect = (date: Date | undefined) => {
        if (date) {
            setSelectedDate(date);
            setDate(date);
        }
    };

    const handleNextStep = () => {
        nextStep();
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
                        selected={selectedDate}
                        onSelect={handleDateSelect}
                        className="rounded-lg w-full flex-grow"
                        aria-label="Sélectionner une date"
                    />
                </div>
                <div className="flex flex-col gap-6 justify-between text-center w-full h-full ">
                    {timeSlots.map((time) => (
                        <button
                            key={time}
                            onClick={() => {
                                setTime(time);
                                setSelectedTime(time);
                            }}
                            className={cn(
                                "lg:w-96 rounded-lg text-md font-semibold flex items-center shadow justify-center px-4 h-full md:min-w-40 cursor-pointer md:hover:scale-[1.02] transition-all duration-150 md:hover:shadow-md md:hover:bg-gray-100 md:hover:text-black max-sm:py-3",
                                selectedTime === time ? "bg-accent text-white" : "bg-transparent"
                            )}
                            aria-pressed={selectedTime === time}
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