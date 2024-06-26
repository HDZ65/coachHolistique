import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { dataProgramme } from './../DataProgramme';
import { Checkbox } from "@/components/ui/checkbox";

export default function CardRDV({ setPrestation }: { setPrestation: (index: number) => void }) {
    const [selectedCard, setSelectedCard] = useState<number>(-1); // Initialiser avec -1 au lieu de null

    const handleCardClick = (index: number) => {
        console.log(`Carte sélectionnée: ${index}`); // Log de la carte sélectionnée
        setSelectedCard(index);
        setPrestation(index); // Met à jour la prestation sélectionnée
    };

    useEffect(() => {
        console.log(`Carte actuellement sélectionnée: ${selectedCard}`); // Log de l'état actuel
    }, [selectedCard]);

    return (
        <div className="flex justify-center gap-4">
            {dataProgramme.map((programme, index) => (
                <Card
                    key={index}
                    className="cursor-pointer bg-white"
                    onClick={() => handleCardClick(index)}
                    role="button" // Ajout du rôle pour l'accessibilité
                    aria-pressed={selectedCard === index} // Indique si la carte est sélectionnée
                    tabIndex={0} // Rendre la carte focusable pour la navigation au clavier
                    aria-label={`Carte de programme: ${programme.title}`} // Label pour les lecteurs d'écran
                >
                    <CardHeader>
                        <CardTitle className="text-card-foreground">{programme.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>
                            <ul>
                                {programme.description.map((desc, i) => (
                                    <li className="text-card-foreground" key={i}>{desc}</li>
                                ))}
                            </ul>
                        </CardDescription>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        {programme.price}€
                        <Checkbox
                            checked={selectedCard === index}
                            onChange={() => handleCardClick(index)}
                            aria-label={`Sélectionner ${programme.title}`} // Label pour l'accessibilité
                        />
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}