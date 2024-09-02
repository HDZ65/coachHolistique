'use client'

import { useState } from 'react';
import { useFetchUsers } from "@/app/hooks/useFetchUsers";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";

/**
 * @file Users.tsx
 * @description Composant pour afficher et gérer la liste des utilisateurs par ordre alphabétique
 */

export default function Users() {
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const { users, error } = useFetchUsers({ 
        sortOrder: sortOrder
    });

    const toggleSort = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    return (
        <TooltipProvider>
            <Tabs defaultValue="all" className="w-full h-full">
                <TabsContent value="all" className="mt-0 w-full h-full">
                    <Card className="w-full h-full" x-chunk="dashboard-06-chunk-0">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <CardTitle>Utilisateurs</CardTitle>
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
                            {error ? (
                                <p role="alert" aria-live="assertive">{error}</p>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead onClick={toggleSort} className="cursor-pointer">
                                                Nom et Prénom {sortOrder === 'asc' ? '▲' : '▼'}
                                            </TableHead>
                                            <TableHead>Mail</TableHead>
                                            <TableHead className="hidden md:table-cell">Téléphone</TableHead>
                                            <TableHead>
                                                <span className="sr-only">Actions</span>
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {users.map((user) => (
                                            <TableRow key={user._id}>
                                                <TableCell className="font-medium">{user.nom} {user.prenom}</TableCell>
                                                <TableCell>{user.email}</TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Link href={`https://wa.me/${user.mobile}`} target="_blank" rel="noopener noreferrer">
                                                                {user.mobile}
                                                            </Link>
                                                        </TooltipTrigger>
                                                        <TooltipContent side="right">Envoyer un message WhatsApp</TooltipContent>
                                                    </Tooltip>
                                                </TableCell>
                                                <TableCell>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button aria-haspopup="true" size="icon" variant="ghost">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                                <span className="sr-only">Menu d&apos;actions pour {user.prenom} {user.nom}</span>
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
                            )}
                        </CardContent>
                        <CardFooter></CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </TooltipProvider>
    )
}