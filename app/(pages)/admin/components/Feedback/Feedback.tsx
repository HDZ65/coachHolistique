'use client'

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { FeedbackData } from "@/app/api/feedback/route";

// Composant Feedback pour afficher les avis clients
export default function Feedback() {
    const [feedback, setFeedback] = useState<FeedbackData[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchFeedback = async () => {
        try {
            const res = await fetch("/api/feedback");
            const data = await res.json();
            setFeedback(data.feedback || []);
        } catch (error) {
            setError("Erreur lors de la récupération des avis");
        }
    }

    useEffect(() => {
        fetchFeedback();
    }, []);

    return (
        <Card className="w-fit" role="region" aria-labelledby="feedback-title">
            <CardHeader>
                <CardTitle id="feedback-title">
                    Avis clients
                </CardTitle>
                <CardContent className="px-0 pb-0">
                    {error ? (
                        <p>{error}</p>
                    ) : (
                        <ul>
                            {feedback.map((feedback) => (
                                <li className="list-disc list-inside" key={feedback._id}>{feedback.message}</li>
                            ))}
                        </ul>
                    )}
                </CardContent>
            </CardHeader>
        </Card>
    )
}