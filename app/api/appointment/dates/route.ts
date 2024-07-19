import { NextResponse, NextRequest } from "next/server";
import Appointment from "@/lib/models/appointment";
import connect from "@/lib/mongodb";

// Ce fichier gère les requêtes GET pour récupérer les dates des rendez-vous.

export async function GET(req: NextRequest) {
    await connect();
    try {
        const appointments = await Appointment.find({}).select('date');
        return NextResponse.json({ dates: appointments.map(app => app.date) });
    } catch (error) {
        console.error("Erreur lors de la récupération des dates des rendez-vous:", error as Error);
        return NextResponse.json({ message: "Oups! Quelque chose s'est mal passé. Essayez de nouveau plus tard.", error: (error as Error).message }, { status: 500 });
    }
}