// Page de remerciement pour la confirmation de rendez-vous

"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { useSalesFunnel } from "../context/SalesFunnelContext";
import { useState } from "react";

export default function Congratulation() {
    const { prestationId, date, time, userInfo, prestationDetails } = useSalesFunnel();
    const [feedback, setFeedback] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    if (!prestationId || !date || !time || !userInfo || !prestationDetails) {
        return <p>Erreur: Informations manquantes pour le rendez-vous.</p>;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); // Réinitialiser l'erreur

        try {
            const response = await fetch('/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: feedback }),
            });

            if (!response.ok) {
                throw new Error("Erreur lors de l'envoi de l'avis");
            }

            setSubmitted(true);
        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <Card className="max-w-lg mx-auto">
            <CardHeader>
                <CardTitle className="text-secondary text-2xl">
                    Merci {userInfo.firstName} ! <br />
                    Votre rendez-vous est confirmé
                </CardTitle>
            </CardHeader>
            <CardContent className="py-0">
                <p className="text-md">
                    Votre rendez-vous pour une <strong>{prestationDetails.name}</strong> a bien été pris en compte pour le <strong>{new Date(date).toLocaleDateString()}</strong> à <strong>{time}</strong>
                </p>
                {!submitted ? (
                    <form onSubmit={handleSubmit} className="mt-4">
                        <label htmlFor="feedback" className="block text-md font-medium text-gray-700">
                            Votre avis nous intéresse : <br />
                            <p className="text-xs text-gray-500">
                                Vous pouvez nous laisser un avis sur notre service, nos prestations, ou tout simplement nous dire ce que vous en avez pensé.
                            </p>
                        </label>
                        <textarea
                            id="feedback"
                            name="feedback"
                            rows={4}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            aria-label="Votre avis"
                        />
                        <Button type="submit" className="mt-2">
                            Envoyer
                        </Button>
                        {error && <p className="mt-2 text-red-600">{error}</p>}
                    </form>
                ) : (
                    <p className="mt-4 text-md text-green-600">Merci pour votre avis !</p>
                )}
            </CardContent>
            <CardFooter className="flex justify-between text-secondary font-semibold">
                <Button>
                    <Link href="/">
                        Retour à la page d&apos;accueil
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}