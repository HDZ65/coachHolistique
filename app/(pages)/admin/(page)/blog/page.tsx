"use client";

import { useSession } from "next-auth/react";
import Menu from "../../components/Menu/Menu";
import MesArticles from "../../components/MesArticles/MesArticles";
import Blog from "../../components/Blog/Blog";
import LoginForm from "../../components/LoginForm/LoginForm";


export default function Page() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <Menu />
        <MesArticles />
        <Blog />
      </>
    );
  }

  return (
    <div className="h-[80dvh] w-full flex justify-center items-center">
      <LoginForm />
    </div>
  );
}