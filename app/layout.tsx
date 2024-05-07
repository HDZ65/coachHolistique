import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import "./globals.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { cn } from "@/lib/utils"
import { ThemeProvider } from "./components/theme-provider/theme-provider"


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
        "flex flex-col items-center justify-between min-h-[100dvh] w-[100dvw] bg-background font-sans antialiased",
        fontSans.variable
      )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col  w-full">
            <Header />
            <main className=" my-auto flex flex-col justify-center items-center">
              {children}
            </main>
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
