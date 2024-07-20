import User from "@/lib/models/users";
import connect from "../../../lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

// Titre: Gestion des routes pour les utilisateurs
// Ce fichier gère les requêtes GET, POST, DELETE et PUT pour les utilisateurs.

// Interface pour typer les données des utilisateurs
export interface UserData {
    _id?: string;
    nom?: string;
    prenom: string;
    email: string;
    mobile?: string;
}

// Fonction de validation des données des utilisateurs
function validateUserData(data: UserData): { isValid: boolean, errors: string[] } {
    const errors = [];
    if (!data.prenom) errors.push("Le champ 'prenom' est requis.");
    if (!data.email) errors.push("Le champ 'email' est requis.");
    if (data.email && !/.+\@.+\..+/.test(data.email)) errors.push("Adresse email non valide.");
    if (data.mobile && !/^\d{10,14}$/.test(data.mobile)) errors.push("Le champ 'mobile' doit contenir entre 10 et 14 chiffres.");
    return {
        isValid: errors.length === 0,
        errors
    };
}

// Récupère tous les utilisateurs
export async function GET(req: NextRequest) {
    await connect();
    try {
        const users = await User.find({});
        return NextResponse.json({ users });
    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs:", error);
        return NextResponse.json({ message: "Erreur serveur", error }, { status: 500 });
    }
}

// Création d'un nouvel utilisateur
export async function POST(req: NextRequest) {
    await connect();

    try {
        const userData: UserData = await req.json();
        const { isValid, errors } = validateUserData(userData);

        if (!isValid) {
            return new NextResponse(JSON.stringify({ message: 'Validation des données échouée', details: errors.join(", ") }), { status: 400 });
        }

        const newUser = new User(userData);
        await newUser.save();

        return new NextResponse(JSON.stringify({ message: 'Utilisateur créé avec succès', data: newUser }), { status: 201 });

    } catch (error: unknown) {
        if (error instanceof Error && 'code' in error && (error as any).code === 11000) {
            return new NextResponse(JSON.stringify({ message: 'Cet email est déjà utilisé.' }), { status: 409 });
        } else {
            console.error("Erreur lors de la création de l'utilisateur:", error);
            return new NextResponse(JSON.stringify({ message: "Erreur lors de la création de l'utilisateur", error }), { status: 500 });
        }
    }
}

// Mise à jour d'un utilisateur
export async function PUT(req: NextRequest) {
    await connect();
    try {
        const { id, userData } = await req.json() as { id: string, userData: UserData };
        const { isValid, errors } = validateUserData(userData);

        if (!isValid) {
            return NextResponse.json({
                error: "Validation des données échouée",
                details: errors.join(", ")
            }, { status: 400 });
        }

        const updatedUser = await User.findByIdAndUpdate(id, userData, { new: true });
        if (!updatedUser) {
            return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
        }

        return NextResponse.json({ message: "Utilisateur modifié", updatedUser });
    } catch (error) {
        const typedError = error as Error;
        console.error("PUT Error:", typedError);
        return NextResponse.json({ error: "Erreur lors de la modification de l'utilisateur", details: typedError.message }, { status: 500 });
    }
}

// Suppression d'un utilisateur
export async function DELETE(req: NextRequest) {
    await connect();
    try {
        const { id } = await req.json() as { id: string };
        await User.findByIdAndDelete(id);
        return NextResponse.json({ message: "Utilisateur supprimé" });
    } catch (error) {
        const typedError = error as Error;
        console.error("DELETE Error:", typedError);
        return NextResponse.json({ error: "Erreur lors de la suppression de l'utilisateur", details: typedError.message }, { status: 500 });
    }
}