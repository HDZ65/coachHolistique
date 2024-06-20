import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import "./globals.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { cn } from "@/lib/utils"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Elisabeth Coach Holistique",
  description: "Elisabeth Coach Holistique",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={cn(
        "flex flex-col items-center justify-between min-h-[100dvh] overflow-x-hidden max-w-[100dvw] bg-background font-sans antialiased",
        fontSans.variable
      )}
      >
          <div className="flex flex-col  w-full">
            <Header />
            <main className="max-w-[88rem] mx-auto flex flex-col justify-center px-6 md:px-8 gap-20">
              {children}
             </main>
          </div>
        
      </body>
    </html>
  );
}
