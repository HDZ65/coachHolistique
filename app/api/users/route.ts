import User from "@/lib/models/users";
import connect from "@/lib/mongodb"; // Mise à jour de l'import
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

// Fonction pour convertir la chaîne de tri en SortOrder
const getSortOrder = (order: string): 1 | -1 => order === 'desc' ? -1 : 1;

// Récupère tous les utilisateurs
export async function GET(req: NextRequest) {
    try {
        await connect();
        const { searchParams } = new URL(req.url);
        const sortOrder = searchParams.get('sortOrder') || 'asc';
        const limit = parseInt(searchParams.get('limit') || '0');

        let users = await User.find({}).lean();

        // Tri personnalisé
        users.sort((a, b) => {
            const fullNameA = `${a.nom} ${a.prenom}`.toLowerCase();
            const fullNameB = `${b.nom} ${b.prenom}`.toLowerCase();
            return sortOrder === 'asc' ? 
                fullNameA.localeCompare(fullNameB) : 
                fullNameB.localeCompare(fullNameA);
        });

        // Appliquer la limite si spécifiée
        if (limit > 0) {
            users = users.slice(0, limit);
        }

        return NextResponse.json({ users });
    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs:", error);
        return NextResponse.json({ message: "Erreur serveur", error }, { status: 500 });
    }
}

// Création d'un nouvel utilisateur
export async function POST(req: NextRequest) {
    try {
        await connect(); // Utilisation de la nouvelle fonction connect
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
    try {
        await connect(); // Utilisation de la nouvelle fonction connect
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
    try {
        await connect(); // Utilisation de la nouvelle fonction connect
        const { id } = await req.json() as { id: string };
        await User.findByIdAndDelete(id);
        return NextResponse.json({ message: "Utilisateur supprimé" });
    } catch (error) {
        const typedError = error as Error;
        console.error("DELETE Error:", typedError);
        return NextResponse.json({ error: "Erreur lors de la suppression de l'utilisateur", details: typedError.message }, { status: 500 });
    }
}