// Menu Component
'use client'

import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { BookOpenText, Calendar, Home, LineChart, Mail, Package, Package2, Settings, ShoppingCart, Store, Users2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
// Correction: Component name should start with an uppercase letter
export default function Menu() {
  return (
    <TooltipProvider>
      <aside className="fixed left-0 top-0 w-14 flex-col border-r flex h-screen">
        <nav className="flex flex-col items-center gap-8 px-2 sm:py-5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/admin"
                className="flex w-6 h-6 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Home className="w-6 h-6" />
                <span className="sr-only">Accueil</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Accueil</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/admin/rendez-vous"
                className="flex w-6 h-6 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Calendar className="w-6 h-6" />
                <span className="sr-only">Rendez-vous</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Rendez-vous</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/admin/newsletter"
                className="flex w-6 h-6 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Mail className="w-6 h-6" />
                <span className="sr-only">NewsLetter</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">NewsLetter</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/admin/boutique"
                className="flex w-6 h-6 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Store className="w-6 h-6" />
                <span className="sr-only">Boutique</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Boutique</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/admin/blog"
                className="flex w-6 h-6 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <BookOpenText className="w-6 h-6" />
                <span className="sr-only">Blog</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Blog</TooltipContent>
          </Tooltip>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/admin/settings"
                className="flex w-6 h-6 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Settings className="w-6 h-6" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </nav>
      </aside>
    </TooltipProvider>
  )
}