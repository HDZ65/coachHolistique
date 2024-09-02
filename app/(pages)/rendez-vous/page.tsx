// Page de tunnel de vente avec plusieurs étapes utilisant shadcn-ui et framer-motion

import { Metadata } from "next";
import Head from "next/head";
import SalesFunnel from './components/SalesFunnel';

// Définition des métadonnées spécifiques pour la page de rendez-vous
export const metadata: Metadata = {
  title: "Prendre Rendez-vous - Elisabeth Coach Holistique",
  description: "Choisissez, payez et prenez rendez-vous avec Elisabeth Coach Holistique. Simplifiez votre parcours de bien-être avec notre système de réservation en ligne.",
  keywords: ["rendez-vous", "coaching holistique", "prise de rendez-vous", "Elisabeth Coach", "bien-être", "développement personnel"],
  authors: [{ name: "Elisabeth Coach Holistique" }],
  openGraph: {
    title: "Prendre Rendez-vous - Elisabeth Coach Holistique",
    description: "Choisissez, payez et prenez rendez-vous avec Elisabeth Coach Holistique. Simplifiez votre parcours de bien-être avec notre système de réservation en ligne.",
    url: "https://www.elisabethcoachholistique.com/rendez-vous",
    type: "website",
    images: [
      {
        url: "https://www.elisabethcoachholistique.com/public/logoElisabeth.png",
        width: 1200,
        height: 630,
        alt: "Elisabeth Coach Holistique"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    site: "@ElisabethCoach",
    title: "Prendre Rendez-vous - Elisabeth Coach Holistique",
    description: "Choisissez, payez et prenez rendez-vous avec Elisabeth Coach Holistique. Simplifiez votre parcours de bien-être avec notre système de réservation en ligne.",
    images: ["https://www.elisabethcoachholistique.com/public/logoElisabeth.png"]
  }
};

export default function Page() {
  return (
    <>
      <SalesFunnel />
    </>
  );
}