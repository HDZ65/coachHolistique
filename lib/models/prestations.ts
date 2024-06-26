// Schema pour les catégories de prestations

import { Schema, model, models } from 'mongoose';

const prestationSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  duration: { type: Number, required: true },
  price: { type: Number, required: true },
});

const prestation = models.prestation || model('prestation', prestationSchema);

export default prestation;