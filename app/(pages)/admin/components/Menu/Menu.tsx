// Menu Component
'use client'

import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { BookOpenText, Calendar, Home, LogOut, Mail, Store } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";

const menuItems = [
  { href: "/admin", icon: Home, label: "Accueil" },
  { href: "/admin/planning", icon: Calendar, label: "Planning" },
  { href: "/admin/newsletter", icon: Mail, label: "NewsLetter" },
  { href: "/admin/blog", icon: BookOpenText, label: "Blog" },
];

export default function Menu() {
  return (
    <TooltipProvider>
      <aside className="fixed left-0 top-0 w-14 flex-col border-r flex h-screen">
        <nav className="flex flex-col items-center gap-8 px-2 sm:py-5">
          {menuItems.map((item) => (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className="flex w-6 h-6 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <item.icon className="w-6 h-6" />
                  <span className="sr-only">{item.label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{item.label}</TooltipContent>
            </Tooltip>
          ))}
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => signOut()}
                className="flex w-6 h-6 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <LogOut className="w-6 h-6" />
                <span className="sr-only">Se déconnecter</span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">Se déconnecter</TooltipContent>
          </Tooltip>
        </nav>
      </aside>
    </TooltipProvider>
  );
}