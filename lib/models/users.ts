// Modèle pour les utilisateurs

import { Schema, model, models } from 'mongoose';

// Définition du schéma pour les utilisateurs
const userSchema = new Schema({
    nom: { type: String },
    prenom: { type: String, required: true }, // Prénom est requis
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: /.+\@.+\..+/ // Doit correspondre à un format d'email valide
    },
    mobile: { 
        type: String, 
        unique: true, 
        match: /^\d{10,14}$/ // Doit correspondre à un numéro de téléphone valide (10 à 14 chiffres)
    }
}, { 
    timestamps: { 
        createdAt: 'create_date', // Champ pour la date de création
        updatedAt: 'date_modif' // Champ pour la date de dernière modification
    } 
});

// Ajout d'un index unique sur le champ email pour garantir l'unicité
userSchema.index({ email: 1 }, { unique: true });

// Création du modèle User ou utilisation du modèle existant
const User = models.User || model('User', userSchema);

export default User;