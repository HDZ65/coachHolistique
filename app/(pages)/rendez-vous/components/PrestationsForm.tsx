"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup } from "@/components/ui/radio-group"
import PrestationsCards from "./PrestationsCard"
import { useEffect, useState } from "react"
import { PrestationsData } from '@/app/api/prestations/route';
import { useSalesFunnel } from '../context/SalesFunnelContext';

export default function PrestationsForm({ currentStep, nextStep, prevStep }: { currentStep: number, nextStep: () => void, prevStep: () => void }) {
  const { setPrestationId } = useSalesFunnel();
  const [selectedPrestation, setSelectedPrestation] = useState<string | null>(null); // Changement de type pour correspondre à l'ID de la prestation
  const [prestations, setPrestations] = useState<PrestationsData[]>([]);

  useEffect(() => {
    const fetchPrestations = async () => {
      try {
        const response = await fetch('/api/prestations');
        const data = await response.json();
        if (Array.isArray(data.prestations)) { 
          setPrestations(data.prestations);
        } else {
          console.error('Aucune prestation trouvée');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des prestations:', error);
      }
    };
    fetchPrestations();
  }, []);

  const handleNextStep = () => {
    if (selectedPrestation !== null) {
      setPrestationId(selectedPrestation);
      nextStep();
    }
  };

  return (
    <Card className="min-h-full lg:w-fit m-auto ">
      <CardHeader>
        <CardTitle className="text-2xl max-sm:text-center">Choisir une prestation</CardTitle>
        <CardDescription className="max-sm:text-center">
          Veuillez choisir une prestation.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <RadioGroup className="grid sm:grid-cols-2 gap-6" role="radiogroup" aria-labelledby="prestation-selection">
          {Array.isArray(prestations) && prestations.map((item) => (
            <div key={item._id} className="flex items-center w-full">
              <Label className="w-full" htmlFor={item._id}>
                <PrestationsCards prestation={{ ...item, description: Array.isArray(item.description) ? item.description : [item.description] }} onSelect={() => setSelectedPrestation(item._id)} />
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <div className="flex justify-end gap-6 w-full">
          {currentStep > 1 && (
            <Button onClick={prevStep} variant="outline">
              Précédent
            </Button>
          )}
          {currentStep < 4 && (
            <Button className='' onClick={handleNextStep} disabled={selectedPrestation === null}>
              Suivant
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}