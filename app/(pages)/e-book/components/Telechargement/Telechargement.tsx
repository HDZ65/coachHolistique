// Téléchargement de fichier PDF avec icône et Shards UI

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import client from '@/utils/paypal';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaFilePdf } from 'react-icons/fa'; // Importation de l'icône PDF

export default function Telechargement() {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 5000); // Le message disparaît après 5 secondes
  };
  return (
    <Card className="flex flex-col lg:w-fit m-auto lg:px-6" role="" aria-labelledby="payment-title">
      <CardHeader>
        <CardTitle id="payment-title" className="text-2xl">Téléchargement</CardTitle>
        <CardDescription>Vous pouvez télécharger le livre en cliquant sur le bouton ci-dessous.</CardDescription>
      </CardHeader>
      <CardContent className="flex gap-12 justify-center sm:flex-row ">
        <a className='flex items-center gap-2 text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded cursor-pointer' 
           href="/Creer_sa_vie.pdf" 
           download="Creer_sa_vie.pdf"
           onClick={handleDownload}>
          <FaFilePdf className="text-lg" /> Télécharger
        </a>
        {downloaded && <p className="text-green-500 mt-2">Merci de votre téléchargement !</p>}
      </CardContent>
    </Card>
  );
}