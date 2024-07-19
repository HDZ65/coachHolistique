import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSalesFunnel } from '../context/SalesFunnelContext';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import PayPalButton from './PaypalButton';


export default function PaymentForm({ currentStep, nextStep, prevStep }: { currentStep: number, nextStep: () => void, prevStep: () => void }) {
  const { prestationId, dateTime, userInfo } = useSalesFunnel();


  return (
    <Card className="flex flex-col lg:w-fit m-auto lg:px-6" role="form" aria-labelledby="payment-form-title">
      <CardHeader>
        <CardTitle id="payment-form-title" className="text-2xl">Paiement</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-12 justify-center sm:flex-row sm:h-[23rem]">
      <PayPalButton />
      </CardContent>
      <CardFooter>
        <div className="flex justify-between gap-6 w-full">
          {currentStep > 1 && (
            <Button onClick={prevStep} variant="outline">
              Précédent
            </Button>
          )}
          {currentStep < 4 && (
            <Button >
              Confirmer
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}