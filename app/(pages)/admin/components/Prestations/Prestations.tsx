'use client'

import { useEffect, useState } from "react";
import { PrestationsData } from '@/app/api/prestations/route';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { PlusCircle, MoreHorizontal } from "lucide-react";

export default function Prestations() {
    const [prestations, setPrestations] = useState<PrestationsData[]>([]);


    useEffect(() => {
        const fetchPrestations = async () => {
            try {
                const res = await fetch("/api/prestations");
                const data = await res.json();
                if (Array.isArray(data.prestations)) {
                    setPrestations(data.prestations);
                } else {
                    console.error("La réponse de l'API ne contient pas un tableau de prestations. Réponse:", data);
                }
            } catch (error) {
                console.log("Erreur lors de la récupération des prestations:", error);
            }
        };

        fetchPrestations();
    }, []);

    return (
        <Tabs defaultValue="all" className="">
            <TabsContent value="all" className="mt-0">
                <Card className="" x-chunk="dashboard-06-chunk-0">
                    <CardHeader className="">
                        <div className="flex justify-between items-center">
                            <CardTitle className=""> Prestations</CardTitle>
                            <Button className="flex gap-2 items-center">
                                <PlusCircle className="h-5 w-5" />
                                Ajouter une prestation
                            </Button>
                        </div>
                        <CardDescription>
                            Gérer mes prestations
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nom</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead className="hidden md:table-cell">Prix</TableHead>
                                    <TableHead className="hidden md:table-cell">Durée</TableHead>
                                    <TableHead>
                                        <span className="sr-only">Actions</span>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {prestations.map((prestation) => (
                                    <TableRow key={prestation._id}>
                                        <TableCell className="font-medium">{prestation.name}</TableCell>
                                        <TableCell>{prestation.description}</TableCell>
                                        <TableCell className="hidden md:table-cell">{prestation.price} €</TableCell>
                                        <TableCell className="hidden md:table-cell">{prestation.duration} min</TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button aria-haspopup="true" size="icon" variant="ghost">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Toggle menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem>Modifier</DropdownMenuItem>
                                                    <DropdownMenuItem>Supprimer</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter></CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    )
}