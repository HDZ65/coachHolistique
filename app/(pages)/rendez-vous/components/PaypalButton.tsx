'use client'

import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useSalesFunnel } from '../context/SalesFunnelContext'; 

const PaypalButton = ({ setPaymentSuccess }: { setPaymentSuccess: (success: boolean) => void }) => { 
    const { prestationDetails, date, time, userInfo, prestationId } = useSalesFunnel(); 

    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || ''; 

    const [cancelled, setCancelled] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState<string | null>(null); 

    if (!clientId) {
        console.error("PayPal Client ID is not defined");
        return <div>Erreur: PayPal Client ID non défini</div>;
    }
    const createOrder = (data: Record<string, unknown>, actions: any) => {
        if (!prestationDetails) {
            throw new Error("prestationDetails is null");
        }

        const order = {
            purchase_units: [
                {
                    amount: {
                        currency_code: 'EUR', 
                        value: prestationDetails.price.toString() 
                    }
                }
            ]
        };

        console.log("Order envoyé à PayPal:", order); 

        return actions.order
            .create(order)
            .then((orderID: string) => { 
                return orderID;
            });
    };

    const onApprove = (data: Record<string, unknown>, actions: any) => {
        setLoading('Finishing transaction ...'); 

        return actions.order.get().then((orderDetails: any) => { 
            console.log("Order details:", orderDetails);

            return actions.order.capture().then(async (data: any) => {
                setOrderDetails(data); 
                setLoading(null);
                setPaymentSuccess(true); 

                const appointmentData = {
                    nom: userInfo.lastName,
                    prenom: userInfo.firstName,
                    email: userInfo.email,
                    mobile: userInfo.phoneNumber,
                    prestationId: prestationId,
                    date: date,
                    time: time

                };

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