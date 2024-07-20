import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useSalesFunnel } from '../context/SalesFunnelContext'; // Importer le contexte

// Composant PaypalButton
const PaypalButton = ({ setPaymentSuccess }: { setPaymentSuccess: (success: boolean) => void }) => { // Ajouter setPaymentSuccess comme prop
    const { prestationDetails, dateTime, userInfo, prestationId } = useSalesFunnel(); // Utiliser le contexte pour obtenir les détails de la prestation

    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || ''; // Assigner une valeur par défaut

    // Déplacer les hooks en dehors de la condition
    const [cancelled, setCancelled] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState<string | null>(null); // Modifier le type de 'loading' pour inclure 'string'

    if (!clientId) {
        console.error("PayPal Client ID is not defined");
        return <div>Erreur: PayPal Client ID non défini</div>;
    }

    // Définir les types pour les paramètres 'data' et 'actions'
    const createOrder = (data: Record<string, unknown>, actions: any) => {
        if (!prestationDetails) {
            throw new Error("prestationDetails is null");
        }

        const order = {
            purchase_units: [
                {
                    amount: {
                        currency_code: 'EUR', // Assurez-vous que la devise est définie en EUR
                        value: prestationDetails.price.toString() // Utiliser le prix de la prestation
                    }
                }
            ]
        };

        console.log("Order envoyé à PayPal:", order); // Log de l'ordre avant l'envoi

        return actions.order
            .create(order)
            .then((orderID: string) => { // Spécifier le type de 'orderID'
                return orderID;
            });
    };

    const onApprove = (data: Record<string, unknown>, actions: any) => {
        setLoading('Finishing transaction ...'); // Cette ligne est maintenant valide

        return actions.order.get().then((orderDetails: any) => { // Spécifier le type de 'orderDetails'
            // ORDER IS APPROVED BUT NOT COMPLETED YET
            console.log("Order details:", orderDetails);

            return actions.order.capture().then(async (data: any) => { // Spécifier le type de 'data'
                // ORDER IS COMPLETED, MONEY SENT
                setOrderDetails(data); // Mettre à jour l'état avec les détails de la commande
                setLoading(null);
                setPaymentSuccess(true); // Déclencher le succès du paiement

                // Poster le rendez-vous après l'approbation du paiement
                const appointmentData = {
                    nom: userInfo.lastName,
                    prenom: userInfo.firstName,
                    email: userInfo.email,
                    mobile: userInfo.phoneNumber,
                    prestationId: prestationId,
                    date: dateTime
                };

                // Journalisation des données avant l'envoi
                console.log("Données envoyées pour le rendez-vous:", appointmentData);

                try {
                    const response = await fetch('/api/appointment', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(appointmentData),
                      });

                    if (!response.ok) {
                        throw new Error("Erreur lors de la création du rendez-vous");
                    }

                    const responseData = await response.json();
                    console.log("Rendez-vous créé avec succès:", responseData);
                } catch (error) {
                    console.error("Erreur lors de la création du rendez-vous:", error);
                }
            });
        });
    };

    const onCancel = () => {
        setCancelled(true);
    };

    return (
        <PayPalScriptProvider
            options={{
                clientId: clientId, // Utiliser la variable 'clientId'
                currency: 'EUR', // Spécifier la devise ici
                intent: 'capture', // Assurez-vous que l'intention est de capturer
            }}>
            <PayPalButtons
                createOrder={createOrder}
                onApprove={onApprove}
                onCancel={onCancel}
                style={{ layout: 'vertical' }} // Assurez-vous que le style est défini pour le popup
            />
        </PayPalScriptProvider>
    );
};

export default PaypalButton;