// Page d'administration accueil
"use client";

import { useSession } from "next-auth/react";
import dynamic from 'next/dynamic';
import { TooltipProvider } from "@/components/ui/tooltip";
import LoginForm from "./components/LoginForm/LoginForm";

// Importation des skeletons
import MenuSkeleton from './components/Menu/MenuSkeleton';
import UsersSkeleton from './components/Users/UsersSkeleton';
import PrestationsSkeleton from './components/Prestations/PrestationsSkeleton';
import FeedbackSkeleton from './components/Feedback/FeedbackSkeleton';
import LastArticleSkeleton from './components/LastArticle/LastArticleSkeleton';
import NextAppointmentCardSkeleton from './components/NextAppointmentCard/NextAppointmentCardSkeleton';

// Chargement dynamique des composants avec skeletons
const Menu = dynamic(() => import('./components/Menu/Menu'), { 
  loading: () => <MenuSkeleton />,
  ssr: false 
});
const Users = dynamic(() => import('./components/Users/Users'), { 
  loading: () => <UsersSkeleton />,
  ssr: false 
});
const Prestations = dynamic(() => import('./components/Prestations/Prestations'), { 
  loading: () => <PrestationsSkeleton />,
  ssr: false 
});
const Feedback = dynamic(() => import('./components/Feedback/Feedback'), { 
  loading: () => <FeedbackSkeleton />,
  ssr: false 
});
const LastArticle = dynamic(() => import('./components/LastArticle/LastArticle'), { 
  loading: () => <LastArticleSkeleton />,
  ssr: false 
});
const NextAppointmentCard = dynamic(() => import('./components/NextAppointmentCard/NextAppointmentCard'), { 
  loading: () => <NextAppointmentCardSkeleton />,
  ssr: false 
});

export default function AdminPage() {
  const { data: session } = useSession();

  if (session) {
    return (
      <TooltipProvider>
        <div className="flex flex-col gap-6 " role="main" aria-labelledby="admin-page-title">
            <Menu />
          <h1 id="admin-page-title" className="text-2xl text-secondary">Bienvenue {session.user?.name}.</h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <section className="grid gap-6 col-span-1" aria-labelledby="next-appointment-feedback">
              <NextAppointmentCard />
              <Feedback />
            </section>
            <section className="col-span-3" aria-labelledby="users-section">
              <Users />
            </section>
            <section className="col-span-3" aria-labelledby="prestations-section">
              <Prestations />
            </section>
            <section className="col-span-1" aria-labelledby="last-article-section">
              <LastArticle />
            </section>
          </div>
        </div>
      </TooltipProvider>
    );
  }

  return (
    <div className="h-[80dvh] w-full flex justify-center items-center" role="main" aria-labelledby="login-form-title">
      <h1 id="login-form-title" className="sr-only">Formulaire de connexion</h1>
      <LoginForm />
    </div>
  );
}