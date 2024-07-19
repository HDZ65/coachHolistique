import NewsLetter from "@/lib/models/newsLetter";
import User from "@/lib/models/users";
import connect from "../../../lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Titre: Gestion des routes pour la newsletter
// Ce fichier gère les requêtes GET et POST pour la newsletter.

// Interface pour typer les données de la newsletter
interface NewsletterData {
    email: string;
    prenom: string;
}

// Fonction de validation des données de la newsletter
function validateNewsletterData(data: NewsletterData): { isValid: boolean, errors: string[] } {
    const errors = [];
    if (!data.email) errors.push("Le champ 'email' est requis.");
    if (!data.prenom) errors.push("Le champ 'prenom' est requis.");
    if (data.email && !/.+\@.+\..+/.test(data.email)) errors.push("Adresse email non valide.");
    return {
        isValid: errors.length === 0,
        errors
    };
}

// Récupère tous les abonnés à la newsletter
export async function GET(req: NextRequest) {
    await connect();
    try {
        const newsLetter = await NewsLetter.find({}).populate('user_id', 'email prenom');
        return NextResponse.json({ newsLetter });
    } catch (error) {
        console.error("Erreur lors de la récupération des e-mails:", error);
        return NextResponse.json({ message: "Oups! Quelque chose s'est mal passé. Essayez de nouveau plus tard.", error }, { status: 500 });
    }
}

// Inscription à la newsletter
export async function POST(req: NextRequest) {
    await connect();  // Connexion à MongoDB

    try {
        const { email, prenom }: NewsletterData = await req.json();
        const { isValid, errors } = validateNewsletterData({ email, prenom });

        if (!isValid) {
            return new NextResponse(JSON.stringify({ message: 'Validation des données échouée', details: errors.join(", ") }), { status: 400 });
        }

        // Vérification de l'existence de l'utilisateur
        let user = await User.findOne({ email });
        if (!user) {
            // Créer un nouvel utilisateur avec les informations minimales nécessaires
            user = new User({ email, prenom });
            await user.save();
        }

        // Vérifier si l'utilisateur est déjà inscrit à la newsletter
        const alreadySubscribed = await NewsLetter.exists({ user_id: user._id });
        if (alreadySubscribed) {
            return new NextResponse(JSON.stringify({ message: 'Cet utilisateur est déjà inscrit à la newsletter.' }), { status: 409 });
        }

        const newNewsLetter = new NewsLetter({ user_id: user._id });
        await newNewsLetter.save();

        // Configuration de Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const emailContent = `
            <h1>Bonjour ${prenom} !</h1>
            <h2>Bienvenue à notre Newsletter sur le Développement Personnel !</h2>
            <p>Merci de vous être inscrit à notre newsletter. Vous êtes sur le point de commencer un voyage passionnant vers la croissance personnelle et le bien-être.</p>
            <p>Nous vous apporterons des conseils, des astuces et des histoires inspirantes pour vous aider à devenir la meilleure version de vous-même.</p>
            <p><strong>Élisabeth Coach holistique</strong></p>
            <hr>
            <p>Suivez-nous sur : <a href="https://www.instagram.com/elisabethcoachholistique/" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram" style="width: 40px; height: 40px; margin: 5px;"></a></p>
        `;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Bienvenue à notre Newsletter!',
            html: emailContent
        });

        return new NextResponse(JSON.stringify({ message: 'Inscription à la newsletter réussie! Préparez-vous pour des nouvelles passionnantes!', data: newNewsLetter }), { status: 201 });

    } catch (error: unknown) {
        if (error instanceof Error && 'code' in error && (error as any).code === 11000) {
            return new NextResponse(JSON.stringify({ message: 'Cet utilisateur est déjà inscrit à la newsletter.' }), { status: 409 });
        } else {
            console.error("Erreur lors de l'envoi de l'email:", error);
            return new NextResponse(JSON.stringify({ message: "Oups! Quelque chose s'est mal passé. Essayez de nouveau plus tard.", error }), { status: 500 });
        }
    }
}