import { NextRequest, NextResponse } from 'next/server'; // Importation des types NextRequest et NextResponse de Next.js
import client from '@/utils/paypal'; // Importation du client PayPal personnalisé
import paypal from '@paypal/checkout-server-sdk'; // Importation du SDK PayPal
import Prestation from '@/lib/models/prestations'; // Importation du modèle Prestation
import connect from './../../../../lib/mongodb';

// Handler pour créer une commande PayPal
export async function POST(request: NextRequest) {
  try {
    await connect(); // Connexion à la base de données
    console.log('Connexion à la base de données réussie'); // Log de la connexion réussie

    const { prestationId, user_id } = await request.json(); // Extraction des paramètres prestationId et user_id de la requête
    console.log('Paramètres reçus:', { prestationId, user_id }); // Log des paramètres reçus

    // Vérification des paramètres requis
    if (!prestationId || !user_id) {
      console.log('Paramètres manquants:', { prestationId, user_id }); // Log des paramètres manquants
      return NextResponse.json({ success: false, message: 'Veuillez fournir prestationId et user_id' }, { status: 400 }); // Réponse d'erreur si les paramètres sont manquants
    }

    // Récupérer la prestation depuis la base de données
    const prestation = await Prestation.findById(prestationId); // Recherche de la prestation par ID
    if (!prestation) {
      console.log('Prestation non trouvée:', prestationId); // Log si la prestation n'est pas trouvée
      return NextResponse.json({ success: false, message: 'Prestation non trouvée' }, { status: 404 }); // Réponse d'erreur si la prestation n'est pas trouvée
    }
    console.log('Prestation trouvée:', prestation); // Log de la prestation trouvée

    const PaypalClient = client(); // Initialisation du client PayPal
    const paypalRequest = new paypal.orders.OrdersCreateRequest(); // Création d'une nouvelle requête de commande PayPal
    paypalRequest.headers['prefer'] = 'return=representation'; // Définition de l'en-tête pour retourner la représentation complète de la commande
    paypalRequest.requestBody({
      intent: 'CAPTURE', // Intention de la commande (capture immédiate)
      purchase_units: [
        {
          amount: {
            currency_code: 'EUR', // Devise de la commande
            value: prestation.price.toString(), // Utilisation du prix de la prestation
          },
        },
      ],
    });

    const response = await PaypalClient.execute(paypalRequest); // Exécution de la requête de commande PayPal
    console.log('PayPal API Response:', response); // Ajouter un log pour vérifier la réponse

    if (response.statusCode !== 201) {
      console.log('Erreur de statut PayPal:', response.statusCode); // Log si le statut de la réponse n'est pas 201
      return NextResponse.json({ success: false, message: 'Une erreur est survenue côté serveur' }, { status: 500 }); // Réponse d'erreur si le statut n'est pas 201
    }

    return NextResponse.json({ success: true, data: { order: response.result } }, { status: 200 }); // Réponse de succès avec les détails de la commande
  } catch (err: unknown) { // Typage explicite de l'erreur comme 'unknown'
    const error = err as Error; // Conversion de l'erreur en type Error
    console.error('Erreur lors de la création de la commande PayPal:', error); // Log de l'erreur en cas d'exception
    if (error instanceof SyntaxError) {
      return NextResponse.json({ success: false, message: 'Erreur de syntaxe dans la requête' }, { status: 400 }); // Réponse d'erreur de syntaxe
    } else if (error.name === 'MongoError') {
      return NextResponse.json({ success: false, message: 'Erreur de base de données' }, { status: 500 }); // Réponse d'erreur de base de données
    } else if (error instanceof paypal.core.PayPalHttpError) {
      return NextResponse.json({ success: false, message: 'Erreur PayPal' }, { status: 500 }); // Réponse d'erreur PayPal
    } else {
      return NextResponse.json({ success: false, message: 'Une erreur inconnue est survenue' }, { status: 500 }); // Réponse d'erreur inconnue
    }
  }
}