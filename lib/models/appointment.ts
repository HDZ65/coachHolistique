// Schema pour les rendez-vous

import { Schema, model, models } from 'mongoose';

const appointmentSchema = new Schema({
  name: { type: String, required: true },
  firstName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  date: { type: Date, required: true },
  created_at: { type: Date, default: Date.now }
});

const Appointment = models.Appointment || model('Appointment', appointmentSchema);

export default Appointment;