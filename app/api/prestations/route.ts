import { NextResponse, NextRequest } from "next/server";
import prestation from "./../../../lib/models/prestations";
import connect from "../../../lib/mongodb";

// Ce fichier gère les requêtes GET, DELETE, POST pour les prestations.

interface prestationData {
    name: string;
    description: string;
    duration: number;
    price: number;
}

// Récupère la liste des prestations
export async function GET(req: NextRequest, res: NextResponse) {
    await connect();
    try {
        const prestations = await prestation.find();
        return NextResponse.json(prestations);
    } catch (error) {
        console.error("Type d'erreur non géré:", error);
        return NextResponse.json({ error: "Erreur inattendue" }, { status: 500 });
    }
};

function validatePrestationData(data: any): { isValid: boolean, errors: string[] } {
    const errors = [];
    if (!data.name) errors.push("Le champ 'name' est requis.");
    if (!data.duration) errors.push("Le champ 'duration' est requis.");
    if (!data.price) errors.push("Le champ 'price' est requis.");

    return {
        isValid: errors.length === 0,
        errors
    };
}

export async function POST(req: NextRequest, res: NextResponse) {
    await connect();
    try {
        const data = await req.json();
        const prestationData = data.prestationData as prestationData | undefined;

        const { isValid, errors } = validatePrestationData(prestationData);

        if (!isValid) {
            return NextResponse.json({
                error: "Données manquantes",
                details: errors.join(" ")
            }, { status: 400 });
        }

        const newPrestation = new prestation(prestationData);
        await newPrestation.save();
        return NextResponse.json(newPrestation);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Erreur lors de la création de la prestation:", error);
            return NextResponse.json({ error: "Erreur inattendue", details: error.message }, { status: 500 });
        } else {
            console.error("Erreur de type inconnu lors de la création de la prestation");
            return NextResponse.json({ error: "Erreur inattendue" }, { status: 500 });
        }
    }
};

export async function DELETE(req: NextRequest, res: NextResponse) {
    await connect();
    try {
        const { id } = await req.json() as { id: string };
        await prestation.findByIdAndDelete(id);
        return NextResponse.json({ message: "Prestation supprimée" });
    } catch (error) {
        console.error("Type d'erreur non géré:", error);
        return NextResponse.json({ error: "Erreur inattendue" }, { status: 500 });
    }
};

export async function PUT(req: NextRequest, res: NextResponse) {
    await connect();
    try {
        const { id, prestationData } = await req.json() as { id: string, prestationData: prestationData };
        await prestation.findByIdAndUpdate(id, prestationData);
        return NextResponse.json({ message: "Prestation modifiée" });
    } catch (error) {
        console.error("Type d'erreur non géré:", error);
        return NextResponse.json({ error: "Erreur inattendue" }, { status: 500 });
    }
};