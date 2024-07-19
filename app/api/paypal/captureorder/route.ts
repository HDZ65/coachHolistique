import { NextRequest, NextResponse } from 'next/server'; // Importation des types NextRequest et NextResponse de Next.js
import client from '@/utils/paypal'; // Importation du client PayPal personnalisé
import paypal from '@paypal/checkout-server-sdk'; // Importation du SDK PayPal
import Order from '@/lib/models/order'; // Importation du modèle Order
import connect from './../../../../lib/mongodb';


// Handler pour récupérer les détails d'une commande PayPal
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url); // Extraction des paramètres de recherche de l'URL
  const orderId = searchParams.get('orderId'); // Récupération du paramètre orderId

  // Vérification des paramètres requis
  if (!orderId) {
    return NextResponse.json({ success: false, message: 'Veuillez fournir l\'ID de la commande' }, { status: 400 }); // Réponse d'erreur si orderId est manquant
  }

  try {
    await connect(); // Connexion à la base de données

    const order = await Order.findOne({ orderId }); // Recherche de la commande par orderId
    if (!order) {
      return NextResponse.json({ success: false, message: 'Commande non trouvée' }, { status: 404 }); // Réponse d'erreur si la commande n'est pas trouvée
    }

    return NextResponse.json({ success: true, data: order }, { status: 200 }); // Réponse de succès avec les détails de la commande
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Impossible de récupérer la commande' }, { status: 500 }); // Réponse d'erreur en cas d'exception
  }
}


// Handler pour capturer une commande PayPal
export async function POST(request: NextRequest) {
  const { orderID } = await request.json(); // Extraction du paramètre orderID de la requête

  // Vérification des paramètres requis
  if (!orderID) {
    return NextResponse.json({ success: false, message: 'Veuillez fournir l\'ID de la commande' }, { status: 400 }); // Réponse d'erreur si orderID est manquant
  }

  try {
    await connect(); // Connexion à la base de données

    const PaypalClient = client(); // Initialisation du client PayPal
    const paypalRequest = new paypal.orders.OrdersCaptureRequest(orderID); // Création d'une nouvelle requête de capture de commande PayPal
    paypalRequest.requestBody({}); // Corps de la requête vide pour la capture

    const response = await PaypalClient.execute(paypalRequest); // Exécution de la requête de capture PayPal
    if (!response) {
      return NextResponse.json({ success: false, message: 'Une erreur est survenue côté serveur' }, { status: 500 }); // Réponse d'erreur si la réponse est vide
    }

    // Enregistrement des détails de la commande dans la base de données
    const orderData = {
      orderId: response.result.id,
      userId: response.result.payer.payer_id,
      amount: parseFloat(response.result.purchase_units[0].amount.value),
      currency: response.result.purchase_units[0].amount.currency_code,
      status: response.result.status,
    };

    const newOrder = new Order(orderData);
    await newOrder.save(); // Sauvegarde de la commande dans la base de données

    return NextResponse.json({ success: true, data: { order: response.result } }, { status: 200 }); // Réponse de succès avec les détails de la commande capturée
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Impossible de capturer la commande' }, { status: 500 }); // Réponse d'erreur en cas d'exception
  }
}