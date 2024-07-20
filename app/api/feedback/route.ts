// Titre: Gestion des routes pour les avis
// Ce fichier gère les requêtes GET et POST pour les avis.

import Feedback from "@/lib/models/feedback";
import connect from "../../../lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export interface FeedbackData {
    _id: string;
    message: string;
}

// Cette fonction gère les requêtes GET pour récupérer les avis.
export async function GET(req: NextRequest, res: NextResponse) {
    await connect();
    try {
        const feedback = await Feedback.find();
        return NextResponse.json({ feedback });
    } catch (error) {
        console.error("Erreur lors de la récupération des avis:", error);
        return NextResponse.json({ message: "Erreur lors de la récupération des avis" }, { status: 500 });
    }
}

// Cette fonction gère les requêtes POST pour créer un nouvel avis.
export async function POST(req: NextRequest, res: NextResponse) {
    await connect();
    try {
        const { message }: FeedbackData = await req.json();

        if (!message || typeof message !== 'string') {
            return NextResponse.json({ message: "Données invalides" }, { status: 400 });
        }
        const feedback = new Feedback({ message });
        await feedback.save();
        return NextResponse.json(feedback);
    } catch (error) {
        console.error("Erreur lors de la création de l'avis:", error);
        return NextResponse.json({ message: "Erreur lors de la création de l'avis" }, { status: 500 });
    }
}