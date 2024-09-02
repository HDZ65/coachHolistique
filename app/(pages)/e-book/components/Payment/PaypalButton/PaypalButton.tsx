'use client'

import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PaypalButton = ({ setPaymentSuccess }: { setPaymentSuccess: (success: boolean) => void }) => {

    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '';

    const [cancelled, setCancelled] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState<string | null>(null);

    if (!clientId) {
        console.error("PayPal Client ID is not defined");
        return <div>Erreur: PayPal Client ID non défini</div>;
    }
    const createOrder = (data: Record<string, unknown>, actions: any) => {
        // Création de l'ordre de paiement avec le montant fixe de 7.90 EUR
        const order = {
            purchase_units: [{
                amount: {
                    currency_code: 'EUR',
                    value: '7.90' 
                }
            }]
        };

        console.log("Order envoyé à PayPal:", order);

        return actions.order.create(order).then((orderID: string) => orderID);
    };

    const onApprove = (data: Record<string, unknown>, actions: any) => {
        setLoading('Finishing transaction ...');

        return actions.order.get().then((orderDetails: any) => {
            console.log("Order details:", orderDetails);

            return actions.order.capture().then(async (data: any) => {
                setOrderDetails(data);
                setLoading(null);
                setPaymentSuccess(true);

            });
        });
    };

    const onCancel = () => {
        setCancelled(true);
    };

    return (
        <PayPalScriptProvider
            options={{
                clientId: clientId,
                currency: 'EUR',
                intent: 'capture',
            }}>
            <PayPalButtons
                createOrder={createOrder}
                onApprove={onApprove}
                onCancel={onCancel}
                style={{ layout: 'vertical' }}
            />
        </PayPalScriptProvider>
    );
};

export default PaypalButton;