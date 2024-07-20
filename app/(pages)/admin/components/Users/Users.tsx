'use client'

import { useEffect, useState } from "react";
import { UserData } from '@/app/api/users/route';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { PlusCircle, MoreHorizontal } from "lucide-react";

export default function Users() {
    const [users, setUsers] = useState<UserData[]>([]);


    useEffect(() => {
        const fetchPrestations = async () => {
            try {
                const res = await fetch("/api/users");
                const data = await res.json();
                if (Array.isArray(data.users)) {
                    setUsers(data.users);
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
                            <CardTitle className=""> Utilisateurs</CardTitle>
                            <Button className="flex gap-2 items-center">
                                <PlusCircle className="h-5 w-5" />
                                Ajouter un utilisateur
                            </Button>
                        </div>
                        <CardDescription>
                            Gérer mes utilisateurs
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nom et Prénom</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead className="hidden md:table-cell">Téléphone</TableHead>
                                    <TableHead>
                                        <span className="sr-only">Actions</span>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user._id}>
                                        <TableCell className="font-medium">{user.prenom} {user.nom}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell className="hidden md:table-cell">{user.mobile}</TableCell>
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