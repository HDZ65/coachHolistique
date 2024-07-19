// Schéma des articles de blog

import { Schema, model, models } from 'mongoose';

// Définition du schéma pour les articles de blog
const articleSchema = new Schema({
    title: { type: String, unique: true, required: true, maxlength: [100, 'Le titre ne peut pas dépasser 100 caractères'] },
    subtitle: { type: String, required: true, maxlength: [200, 'Le sous-titre ne peut pas dépasser 200 caractères'] },
    content: { type: String, required: true },
    image: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Ajout d'un index sur le champ title pour améliorer les performances des requêtes
articleSchema.index({ title: 1 });

export default models.Article || model("Article", articleSchema);