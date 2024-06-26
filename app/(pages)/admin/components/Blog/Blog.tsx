'use client'

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });


export default function Blog() {
  return (
    <Card role="region" aria-labelledby="blogs-heading" style={{ marginBottom: '20px' }}>
      <h2 id="blogs-heading">Gérer les articles de blog</h2>
      <Input
        placeholder="Titre de l'article"
        aria-label="Titre de l'article"
        style={{ marginBottom: '10px' }}
      />
      <ReactQuill
        placeholder="Contenu de l'email"
        aria-label="Contenu de l'email"
        className="w-full"
      />
      <Button>Ajouter un article</Button>
    </Card>
  )
}