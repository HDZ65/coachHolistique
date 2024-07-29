// Modèle pour les rendez-vous

import { Schema, model, models } from 'mongoose';

// Définition du schéma pour les rendez-vous
const appointmentSchema = new Schema({
    prestation_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'Prestation', // Référence à la prestation
        required: true // Référence à une prestation, requis
    },
    date: { 
        type: Date, 
        required: true // Date du rendez-vous, requis
    },
    time: { 
        type: String, 
        required: true // Heure du rendez-vous, requis
    },
    user_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true // Référence à un utilisateur, requis
    }
}, { 
    timestamps: { 
        createdAt: 'created_at', // Champ pour la date de création
        updatedAt: 'updated_at' // Champ pour la date de dernière modification
    } 
});

// Création du modèle Appointment ou utilisation du modèle existant
const Appointment = models.Appointment || model('Appointment', appointmentSchema);

export default Appointment;