'use client';
import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

interface PaypalButtonProps {
    amount: number;
    currency: string;
    description: string;
}

const PaypalButton: React.FC<PaypalButtonProps> = ({ amount, currency, description }) => {
    // Fonction pour créer une commande PayPal
    const createOrder = (data: any) => {
        return fetch("/api/create-paypal-order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                cart: [
                    {
                        sku: "YOUR_PRODUCT_STOCK_KEEPING_UNIT", // Remplacer par le SKU réel du produit
                        quantity: "YOUR_PRODUCT_QUANTITY", // Remplacer par la quantité réelle du produit
                    },
                ],
                amount, // Utilisation de amount comme number
            }),
        })
            .then((response) => response.json())
            .then((order) => order.id); // Retourne l'ID de la commande créée
    };

    // Fonction appelée lorsque la commande est approuvée
    const onApprove = async (data: any) => {
        const response = await fetch("/api/capture-paypal-order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                orderID: data.orderID, // Utilise l'ID de la commande pour capturer le paiement
            }),
        });
        return response.json(); // Retourne la réponse JSON
    };

    return (
        // Fournit le contexte PayPal à l'application
        <PayPalScriptProvider options={{ "clientId": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "" }}>
            <div className="flex justify-center items-center p-20" aria-labelledby="paypal-button-container">
                <h2 id="paypal-button-container" className="sr-only">PayPal Button Container</h2>
                <PayPalButtons
                    createOrder={(data) => createOrder(data)} // Crée une commande lorsque le bouton est cliqué
                    onApprove={(data) => onApprove(data)} // Capture le paiement lorsque la commande est approuvée
                    onError={(err) => {
                        console.error("Erreur de transaction", err); // Affiche une erreur en cas de problème
                        alert("Une erreur est survenue lors de la transaction. Veuillez réessayer."); // Alerte l'utilisateur en cas d'erreur
                    }}
                />
            </div>
        </PayPalScriptProvider>
    );
};

export default PaypalButton;