"use client"

import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardTitle, CardFooter, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSalesFunnel } from '../context/SalesFunnelContext';

// Schéma de validation du formulaire avec zod
const formSchema = z.object({
    firstName: z.string().min(2, { message: "Le prénom doit comporter au moins 2 caractères." }),
    lastName: z.string().min(2, { message: "Le nom doit comporter au moins 2 caractères." }),
    email: z.string().email({ message: "Adresse email invalide." }),
    phoneNumber: z.string().min(10, { message: "Le numéro de téléphone doit comporter au moins 10 chiffres." }),
});

export default function InputForm({ currentStep, nextStep, prevStep }: { currentStep: number, nextStep: () => void, prevStep: () => void }) {
    const { setUserInfo } = useSalesFunnel();
    // Initialisation du formulaire avec react-hook-form et zod
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
        },
    });

    // États pour gérer la visibilité des placeholders
    const [placeholders, setPlaceholders] = useState({
        firstName: "Prénom",
        lastName: "Nom",
        email: "exemple@email.com",
        phoneNumber: "06 00 00 00 00",
    });

    // Gestion de la soumission du formulaire
    const onSubmit = (values: { firstName: string; lastName: string; email: string; phoneNumber: string }) => {
        setUserInfo(values);
        nextStep();
    };

    return (
        <Card className="lg:w-fit m-auto md:px-6">
            <CardHeader>
                <CardTitle className="text-2xl">Entrez vos informations</CardTitle>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-secondary text-lg">Prénom</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={placeholders.firstName}
                                        {...field}
                                        aria-label="Prénom"
                                        onFocus={() => setPlaceholders({ ...placeholders, firstName: "" })}
                                        onBlur={() => setPlaceholders({ ...placeholders, firstName: "Prénom" })}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-secondary text-lg">Nom</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={placeholders.lastName}
                                        {...field}
                                        aria-label="Nom"
                                        onFocus={() => setPlaceholders({ ...placeholders, lastName: "" })}
                                        onBlur={() => setPlaceholders({ ...placeholders, lastName: "Nom" })}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-secondary text-lg">Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={placeholders.email}
                                        {...field}
                                        aria-label="Email"
                                        onFocus={() => setPlaceholders({ ...placeholders, email: "" })}
                                        onBlur={() => setPlaceholders({ ...placeholders, email: "exemple@email.com" })}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-secondary text-lg">Numéro de téléphone</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={placeholders.phoneNumber}
                                        {...field}
                                        aria-label="Numéro de téléphone"
                                        onFocus={() => setPlaceholders({ ...placeholders, phoneNumber: "" })}
                                        onBlur={() => setPlaceholders({ ...placeholders, phoneNumber: "06 00 00 00 00" })}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <CardFooter className="px-0">
                        <div className="flex justify-between gap-6 w-full">
                            {currentStep > 1 && (
                                <Button onClick={prevStep} variant="outline">
                                    Précédent
                                </Button>
                            )}
                            {currentStep < 4 && (
                                <Button className='' type="submit" disabled={!form.formState.isValid}>
                                    Suivant
                                </Button>
                            )}
                        </div>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    );
}