import { NextResponse, NextRequest } from "next/server";
import Prestation from "@/lib/models/prestations";
import connect from "../../../lib/mongodb";

// Ce fichier gère les requêtes GET, POST, PUT et DELETE pour les prestations.

export interface PrestationsData {
    _id: string;
    name: string;
    description: string;
    duration: string;
    price: number;
}

function validatePrestationsData(data: PrestationsData) {
    const errors: string[] = [];

    if (!data.name) {
        errors.push('Le nom est requis');
    }
    if (!data.description) {
        errors.push('La description est requise');
    }
    if (!data.duration) {
        errors.push('La durée est requise');
    } else if (isNaN(parseInt(data.duration))) { 
        errors.push('La durée doit être un nombre');
    }
    if (!data.price) {
        errors.push('Le prix est requis');
    } else if (data.price < 0) {
        errors.push('Le prix ne peut pas être négatif');
    } else if (data.price > 10000) {
        errors.push('Le prix ne peut pas dépasser 10000€');
    } else if (data.price === 0) {
        errors.push('Le prix ne peut pas être de 0€');
    } 
    return errors;
}

// Récupère toutes les prestations
export async function GET(req: NextRequest) {
    await connect();
    try {
        const prestations = await Prestation.find({});
        return NextResponse.json({ prestations });
    } catch (error) {
        console.error("Erreur lors de la récupération des prestations:", error as Error);
        return NextResponse.json({ message: "Oups! Quelque chose s'est mal passé. Essayez de nouveau plus tard.", error: (error as Error).message }, { status: 500 });
    }
}

// Création d'une nouvelle prestation
export async function POST(req: NextRequest) {
    await connect();
    try {
        const prestationData = await req.json();
        const newPrestation = new Prestation(prestationData);
        const errors = validatePrestationsData(newPrestation);
        if (errors.length > 0) {
            return NextResponse.json({ message: "Erreurs dans les données envoyées", errors }, { status: 400 });
        }
        await newPrestation.save();
        return NextResponse.json({ message: "Prestation créée avec succès! Vous allez adorer cette nouvelle addition!", newPrestation }, { status: 201 });
    } catch (error) {
        console.error("Erreur lors de la création de la prestation:", error as Error);
        return NextResponse.json({ message: "Oups! Quelque chose s'est mal passé. Essayez de nouveau plus tard.", error: (error as Error).message }, { status: 500 });
    }
}

// Mise à jour d'une prestation
export async function PUT(req: NextRequest) {
    await connect();
    try {
        const { id, prestationData } = await req.json();
        const updatedPrestation = await Prestation.findByIdAndUpdate(id, prestationData, { new: true });
        if (!updatedPrestation) {
            return NextResponse.json({ message: "Hmm, on dirait que cette prestation n'existe pas. Essayez avec une autre!" }, { status: 404 });
        }
        return NextResponse.json({ message: "Prestation mise à jour avec succès! C'est encore mieux maintenant!", updatedPrestation });
    } catch (error) {
        console.error("Erreur lors de la mise à jour de la prestation:", error as Error);
        return NextResponse.json({ message: "Oups! Quelque chose s'est mal passé. Essayez de nouveau plus tard.", error: (error as Error).message }, { status: 500 });
    }
}

// Suppression d'une prestation
export async function DELETE(req: NextRequest) {
    await connect();
    try {
        const { id } = await req.json();
        const deletedPrestation = await Prestation.findByIdAndDelete(id);
        if (!deletedPrestation) {
            return NextResponse.json({ message: "Hmm, on dirait que cette prestation n'existe pas. Essayez avec une autre!" }, { status: 404 });
        }
        return NextResponse.json({ message: "Prestation supprimée avec succès! Elle ne nous manquera pas trop." });
    } catch (error) {
        console.error("Erreur lors de la suppression de la prestation:", error as Error);
        return NextResponse.json({ message: "Oups! Quelque chose s'est mal passé. Essayez de nouveau plus tard.", error: (error as Error).message }, { status: 500 });
    }
}