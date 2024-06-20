import { PayPalButton } from "react-paypal-button-v2";

export default function PayPalPayment({ onSuccess }) {
    return (
        <PayPalButton
            amount="100.00" // Montant du programme
            onSuccess={(details, data) => {
                alert("Transaction completed by " + details.payer.name.given_name);
                onSuccess();
            }}
            options={{
                clientId: "YOUR_PAYPAL_CLIENT_ID"
            }}
        />
    );
}