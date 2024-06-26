'use client'

import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

// Chargement dynamique de ReactQuill pour éviter l'erreur côté serveur
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function Newsletter() {

  const emails = [
    'email1@example.com',
    'email2@example.com',
    'email3@example.com',
    'email4@example.com',
    'email5@example.com',
    'email6@example.com',
    'email7@example.com',
    'email8@example.com',
    'email9@example.com',
    'email10@example.com',
    // Ajoutez plus d'emails ici
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [emailContent, setEmailContent] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const emailsPerPage = 5;

  const filteredEmails = emails.filter(email =>
    email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEmailSelection = (email: string) => {
    setSelectedEmails(prev =>
      prev.includes(email) ? prev.filter(e => e !== email) : [...prev, email]
    );
  };

  const handleSelectAll = () => {
    setSelectedEmails(filteredEmails.length === selectedEmails.length ? [] : filteredEmails);
  };

  const handleSendEmail = () => {
    console.log('Envoyer email à:', selectedEmails, 'Contenu:', emailContent);
    setIsDialogOpen(false);
    // Logique pour envoyer l'email
  };

  const indexOfLastEmail = currentPage * emailsPerPage;
  const indexOfFirstEmail = indexOfLastEmail - emailsPerPage;
  const currentEmails = filteredEmails.slice(indexOfFirstEmail, indexOfLastEmail);

  const totalPages = Math.ceil(filteredEmails.length / emailsPerPage);

  return (
    <Card className="p-6 flex flex-col gap-6" role="region" aria-labelledby="newsletter-heading">
      <h2 className="text-3xl" id="newsletter-heading">NewsLetter</h2>
      <Input
        placeholder="Rechercher ..."
        aria-label="Rechercher"
        value={searchTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
      />
      <Button onClick={handleSelectAll}>
        {filteredEmails.length === selectedEmails.length ? 'Désélectionner tout' : 'Tout sélectionner'}
      </Button>
      <ul className="flex flex-col gap-2">
        {currentEmails.map(email => (
          <li key={email}>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedEmails.includes(email)}
                onChange={() => handleEmailSelection(email)}
              />
              {email}
            </label>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center">
        <Button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          Précédent
        </Button>
        <span>Page {currentPage} sur {totalPages}</span>
        <Button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
          Suivant
        </Button>
      </div>
      <ReactQuill
        value={emailContent}
        onChange={setEmailContent}
        placeholder="Contenu de l'email"
        aria-label="Contenu de l'email"
        className="w-full"
      />
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogTrigger asChild>
          <Button>Envoyer la newsletter</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Confirmer l&apos;envoi</AlertDialogTitle>
          <AlertDialogDescription>
            Êtes-vous sûr de vouloir envoyer cet email aux destinataires sélectionnés ?
          </AlertDialogDescription>
          <AlertDialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Annuler</Button>
            <Button onClick={handleSendEmail}>Confirmer</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}