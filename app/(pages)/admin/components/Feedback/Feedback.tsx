'use client'

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useFetchFeedback } from '@/app/hooks/useFetchFeedback';


export default function Feedback() {
    const { feedback, error } = useFetchFeedback();

    return (
        <Card className="h-full" role="region" aria-labelledby="feedback-title">
            <CardHeader>
                <CardTitle id="feedback-title">
                    Avis clients
                </CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-0 overflow-y-auto h-52">
                {error ? (
                    <p role="alert" aria-live="assertive">{error}</p>
                ) : feedback.length > 0 ? (
                    <ul>
                        {feedback.map((item) => (
                            <li className="list-disc list-inside mb-2" key={item._id}>
                                {item.message}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Aucun avis pour le moment</p>
                )}
            </CardContent>
        </Card>
    )
}