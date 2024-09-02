// Fonctions des données des articles

import { NextResponse, NextRequest } from "next/server";
import articles from "@/lib/models/articles";
import connect from "@/lib/mongodb"; // Mise à jour de l'import

// Titre: Gestion des routes pour les articles
// Ce fichier gère les requêtes GET, POST, DELETE et PUT pour les articles.

export interface ArticlesData {
    _id?: string;
    title: string;
    subtitle: string;
    content: string;
    image: string;
}

// Fonction de validation des données des articles
function validateArticlesData(data: ArticlesData): { isValid: boolean, errors: string[] } {
    const errors = [];
    
    if (!data.title) {
        errors.push("Le champ 'titre' est requis.");
    } else if (data.title.length > 100) {
        errors.push("Le champ 'titre' ne peut pas dépasser 100 caractères.");
    }
    
    if (!data.subtitle) {
        errors.push("Le champ 'sous-titre' est requis.");
    } else if (data.subtitle.length > 200) {
        errors.push("Le champ 'sous-titre' ne peut pas dépasser 200 caractères.");
    }
    
    if (!data.content) {
        errors.push("Le champ 'contenu' est requis.");
    }
    
    if (!data.image) {
        errors.push("Le champ 'image' est requis.");
    } else if (!/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(data.image)) {
        errors.push("Le champ 'image' doit être une URL valide.");
    }
    
    return {
        isValid: errors.length === 0,
        errors
    };
}

// Fonction GET pour récupérer tous les articles
export async function GET(req: NextRequest) {
    try {
        await connect(); // Utilisation de la nouvelle fonction connect
        const articlesList = await articles.find({});
        console.log("Articles récupérés:", articlesList); // Ajout de log
        return NextResponse.json({ articles: articlesList });
    } catch (error) {
        console.error("Erreur lors de la récupération des articles:", error);
        return NextResponse.json({ message: "Oups! Quelque chose s'est mal passé. Essayez de nouveau plus tard.", error }, { status: 500 });
    }
}

// Fonction POST pour créer un nouvel article
export async function POST(req: NextRequest) {
    try {
        await connect(); // Utilisation de la nouvelle fonction connect
        const articleData: ArticlesData = await req.json();
        const { isValid, errors } = validateArticlesData(articleData);

        if (!isValid) {
            return NextResponse.json({
                error: "Validation des données échouée",
                details: errors.join(", ")
            }, { status: 400 });
        }

        // Vérification de l'unicité du titre de l'article
        const existingArticle = await articles.findOne({ title: articleData.title });
        if (existingArticle) {
            return NextResponse.json({
                error: "Un article avec ce titre existe déjà. Essayez un autre titre!"
            }, { status: 400 });
        }

        const newArticle = new articles(articleData);
        await newArticle.save();
        return NextResponse.json({ message: "Article créé avec succès! Préparez-vous pour une lecture passionnante!", newArticle }, { status: 201 });
    } catch (error) {
        const typedError = error as Error;
        console.error("POST Error:", typedError);
        return NextResponse.json({ error: "Oups! Quelque chose s'est mal passé. Essayez de nouveau plus tard.", details: typedError.message }, { status: 500 });
    }
}

// Fonction DELETE pour supprimer un article
export async function DELETE(req: NextRequest) {
    try {
        await connect(); // Utilisation de la nouvelle fonction connect
        const { id } = await req.json() as { id: string };
        await articles.findByIdAndDelete(id);
        return NextResponse.json({ message: "Article supprimé avec succès! Espérons que ce n'était pas votre préféré." });
    } catch (error) {
        const typedError = error as Error;
        console.error("DELETE Error:", typedError);
        return NextResponse.json({ error: "Oups! Quelque chose s'est mal passé. Essayez de nouveau plus tard.", details: typedError.message }, { status: 500 });
    }
}

// Fonction PUT pour mettre à jour un article
export async function PUT(req: NextRequest) {
    try {
        await connect(); // Utilisation de la nouvelle fonction connect
        const { id, articleData } = await req.json() as { id: string, articleData: ArticlesData };
        const { isValid, errors } = validateArticlesData(articleData);

        if (!isValid) {
            return NextResponse.json({
                error: "Validation des données échouée",
                details: errors.join(", ")
            }, { status: 400 });
        }

        const updatedArticle = await articles.findByIdAndUpdate(id, articleData, { new: true });
        if (!updatedArticle) {
            return NextResponse.json({ error: "Article non trouvé. Essayez avec un autre ID!" }, { status: 404 });
        }

        return NextResponse.json({ message: "Article modifié avec succès! C'est encore mieux maintenant!", updatedArticle });
    } catch (error) {
        const typedError = error as Error;
        console.error("PUT Error:", typedError);
        return NextResponse.json({ error: "Oups! Quelque chose s'est mal passé. Essayez de nouveau plus tard.", details: typedError.message }, { status: 500 });
    }
}