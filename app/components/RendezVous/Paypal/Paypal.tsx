import PaypalButton from './PaypalButton/PaypalButton';

export default function Paypal() {
  return (
    <div className="p-4">
      <PaypalButton amount={0.01} currency="EUR" description="Paiement de la réservation" />
    </div>
  );
}