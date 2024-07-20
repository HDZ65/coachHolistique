// Modèle pour les rendez-vous

import { Schema, model, models } from 'mongoose';

// Définition du schéma pour les rendez-vous
const feedbackSchema = new Schema({
    message: { 
        type: String, 
        required: true // Référence à une prestation, requis
    },
}, { 
    timestamps: { 
        createdAt: 'created_at', // Champ pour la date de création
        updatedAt: 'updated_at' // Champ pour la date de dernière modification
    } 
});

// Création du modèle Appointment ou utilisation du modèle existant
const Feedback = models.Feedback || model('Feedback', feedbackSchema);

export default Feedback;