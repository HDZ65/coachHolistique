import { NextResponse, NextRequest } from "next/server";
import Appointment from "@/lib/models/appointment";
import User from "@/lib/models/users";
import connect from "@/lib/mongodb"; // Mise à jour de l'import
import Prestation from "@/lib/models/prestations"; // Correction de l'import

// Ce fichier gère les requêtes GET, POST, DELETE et PUT pour les rendez-vous.

// Interface pour les données du rendez-vous
export interface AppointmentData {
    _id: string;
    nom: string;
    prenom: string;
    email: string;
    mobile: string;
    prestationId: string;
    prestation_id: {
        name: string;
        price: string;
        duration: string;
    }
    date: string; 
    time: string;
    user_id: {
        nom: string;
        prenom: string;
        email: string;
        mobile: string;
    }
}

// Validation des données du rendez-vous
function validateAppointmentData(data: AppointmentData): { isValid: boolean, errors: string[] } {
    const errors = [];
    if (!data.nom) errors.push("Le champ 'nom' est requis.");
    if (!data.prenom) errors.push("Le champ 'prenom' est requis.");
    if (!data.email) errors.push("Le champ 'email' est requis.");
    if (!data.mobile) errors.push("Le champ 'mobile' est requis.");
    if (!data.prestationId) errors.push("Le champ 'prestationId' est requis.");
    if (!data.date) errors.push("Le champ 'date' est requis.");
    if (!data.time) errors.push("Le champ 'heure' est requis."); 
    return {
        isValid: errors.length === 0,
        errors
    };
}

// Récupère tous les rendez-vous
export async function GET(req: NextRequest) {
    try {
        await connect(); // Utilisation de la nouvelle fonction connect
        const appointments = await Appointment.find({})
            .populate('prestation_id', 'name') 
            .populate('user_id', 'nom prenom email mobile');

        // Transformation des données pour séparer la date et l'heure
        const transformedAppointments = appointments.map(appointment => ({
            ...appointment.toObject(),
            date: appointment.date.toISOString().split('T')[0], // Extraction de la date
            time: appointment.time // Heure déjà séparée
        }));

        return NextResponse.json({ appointments: transformedAppointments });
    } catch (error) {
        console.error("Erreur lors de la récupération des rendez-vous:", error as Error);
        return NextResponse.json({ message: "Oups! Quelque chose s'est mal passé. Essayez de nouveau plus tard.", error: (error as Error).message }, { status: 500 });
    }
}

// Création d'un nouveau rendez-vous
export async function POST(req: NextRequest) {
    try {
        await connect(); // Utilisation de la nouvelle fonction connect
        const appointmentData: AppointmentData = await req.json();

        // Journalisation des données reçues
        console.log("Données reçues pour le rendez-vous:", appointmentData);

        const { isValid, errors } = validateAppointmentData(appointmentData);

        if (!isValid) {
            return NextResponse.json({
                error: "Validation des données échouée",
                details: errors.join(", ")
            }, { status: 400 });
        }

        // Vérification de l'existence de l'utilisateur par email ou mobile
        let user = await User.findOne({ $or: [{ email: appointmentData.email }, { mobile: appointmentData.mobile }] });
        if (!user) {
            // Créer un nouvel utilisateur avec les informations fournies
            user = new User({
                nom: appointmentData.nom,
                prenom: appointmentData.prenom,
                email: appointmentData.email,
                mobile: appointmentData.mobile
            });
            await user.save();
        } else {
            // Mettre à jour les informations de l'utilisateur existant
            user.nom = appointmentData.nom;
            user.prenom = appointmentData.prenom;
            user.email = appointmentData.email;
            user.mobile = appointmentData.mobile;
            await user.save();
        }

        // Vérification de l'unicité du rendez-vous pour l'utilisateur à la même date et heure
        const existingAppointment = await Appointment.findOne({
            user_id: user._id,
            date: new Date(appointmentData.date),
            time: appointmentData.time // Ajout de la vérification de l'heure
        });

        if (existingAppointment) {
            return NextResponse.json({
                error: "Un rendez-vous existe déjà pour cet utilisateur à cette date et heure. Essayez une autre date!"
            }, { status: 409 });
        }

        // Créer le rendez-vous
        const newAppointment = new Appointment({
            prestation_id: appointmentData.prestationId,
            date: new Date(appointmentData.date),
            time: appointmentData.time, // Ajout de l'heure
            user_id: user._id
        });

        // Journalisation avant la sauvegarde
        console.log("Nouveau rendez-vous à sauvegarder:", newAppointment);

        await newAppointment.save();

        return NextResponse.json({ message: "Votre rendez-vous a bien été pris en compte ! Préparez-vous pour une expérience incroyable!", newAppointment }, { status: 201 });
    } catch (error: any) {
        const typedError = error ; // Utilisation de 'any' pour contourner le problème de typage
        console.error("Erreur lors de la création du rendez-vous:", typedError);
        if (typedError.name === 'MongoError' && typedError.code === 11000) {
            return NextResponse.json({ error: "Un rendez-vous existe déjà à cette date et heure. Essayez une autre date!" }, { status: 409 });
        }
        return NextResponse.json({ error: "Oups! Quelque chose s'est mal passé. Essayez de nouveau plus tard.", details: typedError.message }, { status: 500 });
    }
}

// Suppression d'un rendez-vous
export async function DELETE(req: NextRequest) {
    try {
        await connect(); // Utilisation de la nouvelle fonction connect
        const { id } = await req.json() as { id: string };
        await Appointment.findByIdAndDelete(id);
        return NextResponse.json({ message: "Rendez-vous supprimé avec succès! Espérons que ce n'était pas trop important." });
    } catch (error) {
        const typedError = error as Error;
        console.error("DELETE Error:", typedError);
        return NextResponse.json({ error: "Oups! Quelque chose s'est mal passé. Essayez de nouveau plus tard.", details: typedError.message }, { status: 500 });
    }
}

// Mise à jour d'un rendez-vous
export async function PUT(req: NextRequest) {
    try {
        await connect(); // Utilisation de la nouvelle fonction connect
        const { id, appointmentData } = await req.json() as { id: string, appointmentData: AppointmentData };
        const { isValid, errors } = validateAppointmentData(appointmentData);

        if (!isValid) {
            return NextResponse.json({
                error: "Validation des données échouée",
                details: errors.join(", ")
            }, { status: 400 });
        }

        const updatedAppointment = await Appointment.findByIdAndUpdate(id, {
            prestation_id: appointmentData.prestationId,
            date: new Date(appointmentData.date),
            time: appointmentData.time, // Ajout de l'heure
            user_id: appointmentData.user_id
        }, { new: true });

        if (!updatedAppointment) {
            return NextResponse.json({ error: "Rendez-vous non trouvé. Essayez avec un autre ID!" }, { status: 404 });
        }

        return NextResponse.json({ message: "Rendez-vous modifié avec succès! Tout est prêt pour votre prochaine visite!", updatedAppointment });
    } catch (error) {
        const typedError = error as any; // Utilisation de 'any' pour contourner le problème de typage
        if (typedError.name === 'MongoError' && typedError.code === 11000) {
            return NextResponse.json({ error: "Un rendez-vous existe déjà à cette date et heure. Essayez une autre date!" }, { status: 409 });
        }
        console.error("PUT Error:", typedError);
        return NextResponse.json({ error: "Oups! Quelque chose s'est mal passé. Essayez de nouveau plus tard.", details: typedError.message }, { status: 500 });
    }
}