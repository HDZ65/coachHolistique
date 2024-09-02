import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import PaypalButton from './PaypalButton/PaypalButton';

export default function Payment({ setPaymentSuccess }: { setPaymentSuccess: (success: boolean) => void }) {

  return (
    <Card className="flex flex-col lg:w-fit m-auto lg:px-6" role="" aria-labelledby="payment-title">
      <CardHeader>
        <CardTitle id="payment-title" className="text-2xl">Paiement 7.90€</CardTitle>
        <CardDescription>Une fois le paiement effectué, vous pouvez télécharger le livre.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex gap-12 justify-center sm:flex-row ">
      <PaypalButton setPaymentSuccess={setPaymentSuccess} />
      </CardContent>
    </Card>
  );
}