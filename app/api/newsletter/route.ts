import { isEmail } from 'validator';
import NewsLetter from "@/lib/models/newsLetter";
import connect from "../../../lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Titre: Gestion des routes pour la newsletter
// Ce fichier gère les requêtes GET et POST pour la newsletter.

// Récupère tous les abonnés à la newsletter
export async function GET(req: NextRequest, res: NextResponse) {
    await connect();  
    try {
        const newsLetter = await NewsLetter.find({}, 'email'); 
        return NextResponse.json({ newsLetter });
    } catch (error) {
        console.error("Erreur lors de la récupération des e-mails:", error);
        return NextResponse.json({ message: "Erreur serveur", error }, { status: 500 });
    }
}

// Inscription à la newsletter
export async function POST(req: NextRequest, res: NextResponse) {
    await connect();  // Connexion à MongoDB

    try {
        const { email } = await req.json();
        if (!email) {
            return new NextResponse(JSON.stringify({ message: 'Email est requis' }), { status: 400 });
        }

        // Validation de l'adresse e-mail
        if (!isEmail(email, { require_tld: true })) {
            return new NextResponse(JSON.stringify({ message: 'Adresse email non valide' }), { status: 400 });
        }

        const newNewsLetter = new NewsLetter({ email });
        await newNewsLetter.save();

        // Configuration de Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Contenu de l'email de confirmation
        const emailContent = `
            <h1>Bienvenue à notre Newsletter sur le Développement Personnel !</h1>
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

        return new NextResponse(JSON.stringify({ message: 'Inscription à la newsletter réussie', data: newNewsLetter }), { status: 201 });

    } catch (error: unknown) {
        if (error instanceof Error && 'code' in error && (error as any).code === 11000) {
            return new NextResponse(JSON.stringify({ message: 'Cet email est déjà inscrit à la newsletter.' }), { status: 409 });
        } else {
            console.error("Erreur lors de l'envoi de l'email:", error);
            return new NextResponse(JSON.stringify({ message: "Erreur lors de l'envoi de l'email", error }), { status: 500 });
        }
    }
}