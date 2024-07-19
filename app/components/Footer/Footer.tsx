// Composent Footer

import { CiInstagram } from "react-icons/ci";
import Link from "next/link";



export default function Footer() {
   return (
    <>
    <footer className="text-secondary w-full container mx-auto ">
      <div className="w-full grid items-start border-t border-secondary grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 justify-items-stretch p-4">
        <div className="grid gap-1">
          <h3 className="font-semibold">Coaching</h3>
          <Link className="md:hover:underline md:hover:text-primary " href="/coaching">Coaching individuel</Link>
        </div>
        <div className="grid gap-1">
          <h3 className="font-semibold">E-book</h3>
          <Link  className="md:hover:underline md:hover:text-primary" href="/e-book">Développement personnel</Link>
        </div>
        <div className="grid gap-1">
          <h3 className="font-semibold">Contact</h3>
          <Link className="md:hover:underline md:hover:text-primary"href="/contact">Formulaire de contact</Link>
        </div>
        <div className="grid gap-1">
          <h3 className="font-semibold">Blog</h3>
          <Link className="md:hover:underline md:hover:text-primary" href="/blog">Articles</Link>
        </div>
        <div className="grid gap-1">
          <h3 className="font-semibold">Réseaux sociaux</h3>
          <Link  className="flex items-center gap-2 md:hover:underline md:hover:text-primary" href="#">
            <CiInstagram className="w-5 h-5 md:hover:underline md:hover:text-primary " />
            Instagram
          </Link>
        </div>
      </div>
      <p className="text-center p-2 mt-2">&copy; 2024 Elisabeth Coach Holistique. Tous droits réservés.</p>
    </footer>
    </>
  );
}

