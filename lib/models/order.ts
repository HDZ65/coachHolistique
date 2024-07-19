import { Schema, model, models } from 'mongoose'; // Ajout de 'models'



// Schéma pour le modèle Order
const OrderSchema = new Schema(
  {
    orderId: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

// Exportation du modèle Order
const Order = models.Order || model('Order', OrderSchema);

export default Order;