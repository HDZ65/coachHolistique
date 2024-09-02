import connect from "@/lib/mongodb"; // Mise à jour de l'import
import BlockedHour from "@/lib/models/BlockedHour";
import { NextRequest, NextResponse } from 'next/server';

// Titre: Gestion des heures bloquées
// Ce fichier gère les requêtes GET, POST et DELETE pour les heures bloquées.

// Interface pour typer les données des heures bloquées
export interface BlockedHourData {
    dateTime: string;
}

// Fonction de validation des données des heures bloquées
function validateBlockedHourData(data: BlockedHourData): { isValid: boolean, errors: string[] } {
    const errors = [];
    if (!data.dateTime) errors.push("Le champ 'dateTime' est requis.");
    return {
        isValid: errors.length === 0,
        errors
    };
}

// Récupère toutes les heures bloquées
export async function GET(req: NextRequest) {
    try {
        await connect(); // Utilisation de la nouvelle fonction connect
        const blockedHours = await BlockedHour.find({});
        return NextResponse.json({ blockedHours });
    } catch (error) {
        console.error("Erreur lors de la récupération des heures bloquées:", error);
        return NextResponse.json({ message: "Oups! Quelque chose s'est mal passé. Essayez de nouveau plus tard.", error }, { status: 500 });
    }
}

// Ajoute de nouvelles heures bloquées
export async function POST(req: NextRequest) {
    try {
        await connect(); // Utilisation de la nouvelle fonction connect
        const hoursToBlock = await req.json();
        console.log("Données reçues:", JSON.stringify(hoursToBlock, null, 2));  // Log des données reçues

        const errors: string[] = [];
        const blockedHours = [];

        for (const { dateTime } of hoursToBlock) {
            console.log("Traitement de la dateTime:", dateTime);

            const { isValid, errors: validationErrors } = validateBlockedHourData({ dateTime });
            console.log("Validation des données:", { isValid, errors: validationErrors });

            if (!isValid) {
                errors.push(...validationErrors);
                continue;
            }

            // Vérifier si l'heure est déjà bloquée
            const alreadyBlocked = await BlockedHour.exists({ dateTime });
            console.log("Heure déjà bloquée:", alreadyBlocked);

            if (alreadyBlocked) {
                errors.push(`L'heure ${dateTime} est déjà bloquée.`);
                continue;
            }

            const newBlockedHour = new BlockedHour({ dateTime });
            await newBlockedHour.save();
            console.log("Nouvelle heure bloquée sauvegardée:", newBlockedHour);

            blockedHours.push(newBlockedHour);
        }

        if (errors.length > 0) {
            console.log("Erreurs de validation:", errors);  // Log des erreurs de validation
            return new NextResponse(JSON.stringify({ message: 'Certaines heures n\'ont pas pu être bloquées', details: errors.join(", ") }), { status: 400 });
        }

        console.log("Heures bloquées avec succès:", blockedHours);
        return new NextResponse(JSON.stringify({ message: 'Heures bloquées avec succès!', data: blockedHours }), { status: 201 });

    } catch (error: unknown) {
        console.error("Erreur lors du blocage de l'heure:", error);
        return new NextResponse(JSON.stringify({ message: "Oups! Quelque chose s'est mal passé. Essayez de nouveau plus tard.", error }), { status: 500 });
    }
}

// Supprime une heure bloquée
export async function DELETE(req: NextRequest) {
    try {
        await connect(); // Utilisation de la nouvelle fonction connect
        const selectedHours: Record<string, boolean> = await req.json();

        const errors: string[] = [];
        const deletedHours = [];

        for (const [dateTime, isBlocked] of Object.entries(selectedHours)) {
            if (isBlocked) {
                const { isValid, errors: validationErrors } = validateBlockedHourData({ dateTime });

                if (!isValid) {
                    errors.push(...validationErrors);
                    continue;
                }

                const deletedBlockedHour = await BlockedHour.findOneAndDelete({ dateTime });

                if (!deletedBlockedHour) {
                    errors.push(`L'heure ${dateTime} n'a pas été trouvée.`);
                    continue;
                }

                deletedHours.push(deletedBlockedHour);
            }
        }

        if (errors.length > 0) {
            return new NextResponse(JSON.stringify({ message: 'Certaines heures n\'ont pas pu être débloquées', details: errors.join(", ") }), { status: 400 });
        }

        return new NextResponse(JSON.stringify({ message: 'Heures débloquées avec succès!', data: deletedHours }), { status: 200 });

    } catch (error: unknown) {
        console.error("Erreur lors du déblocage de l'heure:", error);
        return new NextResponse(JSON.stringify({ message: "Oups! Quelque chose s'est mal passé. Essayez de nouveau plus tard.", error }), { status: 500 });
    }
}