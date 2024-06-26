// Importations nécessaires
import appointment from "@/lib/models/appointment";
import connect from "../../../lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

// Titre: Gestion des routes pour les rendez-vous
// Ce fichier gère les requêtes GET, POST, DELETE et PUT pour les rendez-vous.

interface AppointmentData {
    name: string;
    firstName: string;
    phone: number;
    email: string;
    date: Date;
    categoryId: string;
}

// Fonction pour valider les données de rendez-vous
function validateAppointmentData(data: AppointmentData): { isValid: boolean, errors: string[] } {
    const errors = [];
    if (!data.name) errors.push("Le champ 'name' est requis.");
    if (!data.firstName) errors.push("Le champ 'firstName' est requis.");
    if (!data.phone) errors.push("Le champ 'phone' est requis.");
    if (!data.email) errors.push("Le champ 'email' est requis.");
    if (!data.date) errors.push("Le champ 'date' est requis.");
    if (!data.categoryId) errors.push("Le champ 'categoryId' est requis.");

    return {
        isValid: errors.length === 0,
        errors
    };
}

// Récupère tous les rendez-vous
export async function GET(req: NextRequest, res: NextResponse) {
    await connect(); // Connexion à la base de données
    try {
        const allAppointments = await appointment.find({});
        return NextResponse.json({ allAppointments });
    } catch (error) {
        const typedError = error as Error;
        console.error("GET Error:", typedError); // Log d'erreur
        return NextResponse.json({ error: "Erreur interne du serveur", details: typedError.message }, { status: 500 });
    }
};

// Crée un nouveau rendez-vous
export async function POST(req: NextRequest, res: NextResponse) {
    await connect(); // Connexion à la base de données
    try {
        const { appointmentData } = await req.json() as { appointmentData: AppointmentData };
        const { isValid, errors } = validateAppointmentData(appointmentData);

        if (!isValid) {
            return NextResponse.json({
                error: "Validation des données échouée",
                details: errors.join(", ")
            }, { status: 400 });
        }

        const newAppointment = new appointment(appointmentData);
        await newAppointment.save();
        return NextResponse.json({ message: "Rendez-vous créé avec succès", newAppointment }, { status: 201 });
    } catch (error) {
        const typedError = error as Error;
        console.error("POST Error:", typedError); // Log d'erreur
        return NextResponse.json({ error: "Erreur lors de la création du rendez-vous", details: typedError.message }, { status: 500 });
    }
};

export async function DELETE(req: NextRequest, res: NextResponse) {
    await connect();
    try {
        const { id } = await req.json() as { id: string };
        await appointment.findByIdAndDelete(id);
        return NextResponse.json({ message: "Rendez-vous supprimé" });
    } catch (error) {
        console.error("Type d'erreur non géré:", error);
        return NextResponse.json({ error: "Erreur inattendue" }, { status: 500 });
    }
};

export async function PUT(req: NextRequest, res: NextResponse) {
    await connect();
    try {
        const { id, appointmentData } = await req.json() as { id: string, appointmentData: AppointmentData };
        const { isValid, errors } = validateAppointmentData(appointmentData);

        if (!isValid) {
            return NextResponse.json({
                error: "Validation des données échouée",
                details: errors.join(", ")
            }, { status: 400 });
        }

        await appointment.findByIdAndUpdate(id, appointmentData);
        return NextResponse.json({ message: "Rendez-vous modifié" });
    } catch (error) {
        console.error("Type d'erreur non géré:", error);
        return NextResponse.json({ error: "Erreur inattendue" }, { status: 500 });
    }
};