"use client"
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InputForm from './InputForm';
import PrestationsForm from './PrestationsForm';
import { CalendarForm } from './CalendarForm';
import PaymentForm from './PaymentForm';
import { SalesFunnelProvider } from '../context/SalesFunnelContext';
import Congratulation from './Congratulation';

export default function SalesFunnel() {
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentSuccess, setPaymentSuccess] = useState(false); // Nouvel état pour le succès du paiement

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const steps = [
    { component: <PrestationsForm currentStep={currentStep} nextStep={nextStep} prevStep={prevStep} />, key: 1 },
    { component: <CalendarForm currentStep={currentStep} nextStep={nextStep} prevStep={prevStep} />, key: 2 },
    { component: <InputForm currentStep={currentStep} nextStep={nextStep} prevStep={prevStep} />, key: 3 },
    { component: <PaymentForm currentStep={currentStep} nextStep={nextStep} prevStep={prevStep} setPaymentSuccess={setPaymentSuccess} />, key: 4 }, // Passer setPaymentSuccess
    { component: <Congratulation/>, key: 5 },
  ];

  return (
    <SalesFunnelProvider>
      <AnimatePresence mode="wait">
        {paymentSuccess ? (
          <motion.div
            key="congratulation"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.2 }}
            className=""
          >
            <Congratulation />
          </motion.div>
        ) : (
          steps.map(
            (step) =>
              step.key === currentStep && (
                <motion.div
                  key={step.key}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.2 }}
                  className=""
                >
                  {step.component}
                </motion.div>
              )
          )
        )}
      </AnimatePresence>
    </SalesFunnelProvider>
  );
}