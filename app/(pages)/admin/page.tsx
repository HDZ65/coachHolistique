"use client";
import { useSession, signOut } from "next-auth/react";
import Menu from "./components/Menu/Menu";
import LoginForm from "./components/LoginForm/LoginForm";


export default function Page() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="h-[80dvh]">
        <Menu />
        <p>Bienvenue {session.user?.name}. Connecté en tant que {session.user?.email}</p>
        <button onClick={() => signOut()}>Déconnexion</button>
      </div>
    );
  }

  return (
    <div className="h-[80dvh] w-full flex justify-center items-center">
      <LoginForm />
    </div>
  );
}