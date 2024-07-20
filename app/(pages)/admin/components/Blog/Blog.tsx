'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function Blog() {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !subtitle || !content || !image) {
      setError('Tous les champs sont obligatoires');
      return;
    }

    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'Elisabeth'); // Remplacez par votre upload preset Cloudinary

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/duba94zjf/image/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.secure_url) {
        const articleData = {
          title,
          subtitle,
          content,
          image: data.secure_url,
        };

        console.log("Données de l'article envoyées:", articleData); // Ajout de log

        const response = await fetch('/api/articles', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(articleData),
        });

        if (response.ok) {
          setSuccess('Article ajouté avec succès');
          setTitle('');
          setSubtitle('');
          setContent('');
          setImage(null);
          window.location.reload(); 
        } else {
          const errorData = await response.json();
          setError(errorData.details || 'Erreur lors de l\'ajout de l\'article');
        }
      } else {
        setError('Erreur lors du téléchargement de l\'image');
      }
    } catch (err) {
      setError('Erreur lors du téléchargement de l\'image');
    }
  };

  return (
    <Card role="region" aria-labelledby="blogs-heading">
      <CardHeader>
        <CardTitle id="blogs-heading" className="text-2xl">Écrire un article de blog</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="gap-8">
          <Input
            className="bg-transparent border py-6"
            placeholder="Titre de l'article"
            aria-label="Titre de l'article"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            className="bg-transparent border"
            placeholder="Sous-titre"
            aria-label="Sous-titre"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />
          <ReactQuill
            placeholder="Contenu de l'article"
            aria-label="Contenu de l'article"
            className="w-full"
            value={content}
            onChange={setContent}
          />
          <input
            type="file"
            accept="image/*"
            aria-label="Télécharger une image"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setImage(e.target.files[0]);
              }
            }}
          />
        </CardContent>
        <CardFooter className="flex gap-4">
          <Button type="submit">Ajouter un article</Button>
          {error ? <p className="text-red-500">{error}</p> : null}
          {success ? <p className="text-green-500">Article ajouté</p> : null}
        </CardFooter>
      </form>
    </Card>
  );
}