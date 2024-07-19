"use client"

// Importation des composants nécessaires
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react"

// Typage des props
interface Prestation {
  _id: string;
  name: string;
  description: string[];
  price: number;
}

interface PrestationsCardsProps {
  prestation: Prestation;
  onSelect: () => void;
}

// Composant Prestations
export default function PrestationsCards({ prestation, onSelect }: PrestationsCardsProps) {
  const { _id, name, description, price } = prestation; // Déstructuration des props
  const [selectedCard, setSelectedCard] = useState<string | null>(null); // État pour la carte sélectionnée

  // Fonction pour gérer la sélection de la carte
  const handleCardSelect = () => {
    setSelectedCard(selectedCard === _id ? null : _id);
    onSelect();
  };


  return (
    <Card
      key={_id}
      className="hover:scale-[1.02] transition-all duration-150 cursor-pointer bg-white hover:bg-gray-100 peer-data-[state=checked]:bg-accent-25 [&:has([data-state=checked])]:bg-accent-25"
      role="button"
      tabIndex={0}
      aria-label={`Carte de programme: ${name}`}
      onClick={handleCardSelect}
      onKeyDown={(e) => { if (e.key === 'Enter') handleCardSelect(); }}
    >
      <CardHeader>
        <CardTitle className="text-secondary font-semibold text-xl">{name}</CardTitle>
      </CardHeader>
      <CardContent>
          <ul className="text-start text-muted-foreground text-sm">
            {Array.isArray(description) && description.map((desc, i) => ( // Vérifie si description est un tableau
              <li className="list-inside list-disc text-card-foreground " key={i}>{desc}</li>
            ))}
          </ul>
      </CardContent>
      <CardFooter className="flex justify-between text-secondary font-semibold">
        <p>{price}€</p>
        <RadioGroupItem
          value={prestation._id.toString()}
          id={prestation._id.toString()}
          aria-label={prestation.name}
          className="peer "
        />
      </CardFooter>
    </Card>
  );
}