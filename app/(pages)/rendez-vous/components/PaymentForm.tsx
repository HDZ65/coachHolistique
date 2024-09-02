import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PaypalButton from './PaypalButton';

export default function PaymentForm({ currentStep, prevStep, setPaymentSuccess }: { currentStep: number, prevStep: () => void, setPaymentSuccess: (success: boolean) => void }) {

  return (
    <Card className="flex flex-col lg:w-fit m-auto lg:px-6" role="form" aria-labelledby="payment-form-title">
      <CardHeader>
        <CardTitle id="payment-form-title" className="text-2xl">Paiement</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-12 justify-center sm:flex-row ">
      <PaypalButton setPaymentSuccess={setPaymentSuccess} />
      </CardContent>
      <CardFooter>
        <div className="flex justify-between gap-6 w-full">
          {currentStep > 1 && (
            <Button onClick={prevStep} variant="outline">
              Précédent
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}