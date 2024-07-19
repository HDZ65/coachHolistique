// Modèle pour les newsletters

import { Schema, model, models } from 'mongoose';

// Définition du schéma pour les newsletters
const newsletterSchema = new Schema({
    user_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }
}, { 
    timestamps: true
});

const Newsletter = models.Newsletter || model('Newsletter', newsletterSchema);

export default Newsletter;