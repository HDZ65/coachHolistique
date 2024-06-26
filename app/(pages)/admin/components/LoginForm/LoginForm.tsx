// Titre principal du fichier : Formulaire de Connexion

"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

// Fonction LoginForm : Gère le formulaire de connexion
const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Fonction handleSubmit : Gère la soumission du formulaire
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await signIn("credentials", {
            redirect: false,
            username,
            password,
        });

        if (result?.error) {
            setError("Nom d'utilisateur ou mot de passe incorrect");
        } else {
            setError("");
        }
    };

    return (
        <Card className="w-[350px]">
            <CardHeader className="w-full">
                <CardTitle className="text-2xl">Connexion</CardTitle>
                <CardDescription>Connectez-vous pour accéder à l&apos;interface d&apos;administration.</CardDescription>
            </CardHeader>
            <CardContent className="w-full">
                <form className="w-full" onSubmit={handleSubmit}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5 w-full">
                            <Label htmlFor="username">Nom d&apos;utilisateur</Label>
                            <Input
                                className="w-full"
                                id="username"
                                placeholder="Nom d'utilisateur"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                aria-describedby="username-description"
                            />
                            <span id="username-description" className="sr-only">Entrez votre nom d&apos;utilisateur</span>
                        </div>
                        <div className="flex flex-col w-full space-y-1.5">
                            <Label className="" htmlFor="password">Mot de passe</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Mot de passe"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                aria-describedby="password-description"
                            />
                            <span id="password-description" className="sr-only">Entrez votre mot de passe</span>
                        </div>
                        {error && <p className="text-red-500" role="alert">{error}</p>}
                    <Button className="w-full" type="submit" aria-label="Se connecter">Se connecter</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default LoginForm;