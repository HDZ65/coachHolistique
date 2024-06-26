"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

export function CalendrierRDV({ setHoraire }: { setHoraire: (time: string) => void }) {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
        setHoraire(time);
    };

    const timeSlots = ["09:00", "10:30", "12:00", "13:30", "15:00"];

    return (
        <div className="flex justify-center gap-16 py-8">
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-lg"
            />
            <div className="flex flex-col gap-3 justify-between w-full text-center min-h-full">
                {timeSlots.map((time) => (
                    <div
                        key={time}
                        onClick={() => handleTimeSelect(time)}
                        className={cn("rounded-lg text-md font-semibold flex-grow flex items-center border border-accent gap-2 justify-center px-4 md:min-w-40 cursor-pointer", selectedTime === time ? "text-white bg-primary" : "bg-transparent")}
                    >
                        {time}
                    </div>
                ))}
            </div>
        </div>
    );
}