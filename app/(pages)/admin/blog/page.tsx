"use client";

import { useSession } from "next-auth/react";
import Blog from "../components/Blog/Blog";
import Menu from "../components/Menu/Menu";
import LoginForm from "../components/LoginForm/LoginForm";
import MesArticles from "../components/MesArticles/MesArticles";

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