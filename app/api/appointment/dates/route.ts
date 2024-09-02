import { NextResponse, NextRequest } from "next/server";
import Appointment from "@/lib/models/appointment";
import connect from "@/lib/mongodb"; // Mise à jour de l'import

// Titre : Gestion des requêtes pour les dates et heures des rendez-vous
// Ce fichier gère les requêtes GET pour récupérer les dates et heures des rendez-vous.

/**
 * Récupère les dates et heures des rendez-vous
 * @param req - La requête entrante
 * @returns Une réponse JSON contenant les dates et heures des rendez-vous ou un message d'erreur
 */
export async function GET(req: NextRequest) {
    try {
        await connect(); // Utilisation de la nouvelle fonction connect
        const appointments = await Appointment.find({}).select('date time'); // Sélectionne la date et l'heure
        return NextResponse.json({ 
            appointments: appointments.map(app => ({
                date: app.date,
                time: app.time // Ajout de l'heure
            }))
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des dates et heures des rendez-vous:", error as Error);
        return NextResponse.json({ 
            message: "Oups! Quelque chose s'est mal passé. Essayez de nouveau plus tard.", 
            error: (error as Error).message 
        }, { status: 500 });
    }
}