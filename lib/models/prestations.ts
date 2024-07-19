// Modèle pour les catégories de prestations

import { Schema, model, models } from 'mongoose'; // Ajout de 'models'

// Définition du schéma pour les prestations
const prestationSchema = new Schema({
  name: { type: String, unique: true, required: true }, // Nom de la prestation, requis
  description: { type: String }, // Description de la prestation
  duration: { type: Number, required: true }, // Durée de la prestation en minutes, requis
  price: { type: Number, required: true }, // Prix de la prestation, requis
}, { 
  timestamps: true // Ajout automatique des champs createdAt et updatedAt
});

// Ajout d'un index sur le champ name pour améliorer les performances des requêtes
prestationSchema.index({ name: 1 });

// Création du modèle Prestation ou utilisation du modèle existant
const Prestation = models.Prestation || model('Prestation', prestationSchema);

export default Prestation;