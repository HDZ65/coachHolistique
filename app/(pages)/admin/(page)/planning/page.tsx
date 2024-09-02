"use client";

import { useSession } from "next-auth/react";
import LoginForm from "../../components/LoginForm/LoginForm";
import Menu from "../../components/Menu/Menu";
import Planning from "../../components/Planning/Planning";

export default function Page() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <Menu />
        <Planning />
      </>
    );
  }

  return (
    <div className="h-[80dvh]  w-full flex justify-center items-center">
      <LoginForm />
    </div>
  );
}