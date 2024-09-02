"use client";

import { createContext, useContext, ReactNode } from 'react';
import { useSession, signIn as nextAuthSignIn, signOut as nextAuthSignOut, SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

// Interface pour les propriétés du contexte AdminSession
interface AdminSessionContextProps {
  session: Session | null;
  loading: boolean;
  signIn: (provider?: string | undefined, options?: Record<string, unknown> | undefined) => Promise<void>;
  signOut: () => Promise<void>;
}

// Création du contexte AdminSession avec une valeur par défaut
const AdminSessionContext = createContext<AdminSessionContextProps>({
  session: null,
  loading: true,
  signIn: async () => {},
  signOut: async () => {},
});

// Fournisseur du contexte AdminSession
export const AdminSessionProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  const signIn = async (provider?: string, options?: Record<string, unknown>) => {
    await nextAuthSignIn(provider, options);
  };
  const signOut = async () => {
    await nextAuthSignOut();
  };

  return (
    <AdminSessionContext.Provider value={{ session, loading, signIn, signOut }}>
      {children}
    </AdminSessionContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte AdminSession
export const useAdminSession = () => {
  const context = useContext(AdminSessionContext);
  if (context === undefined) {
    throw new Error('useAdminSession doit être utilisé dans un AdminSessionProvider');
  }
  return context;
};

// Wrapper pour combiner SessionProvider de NextAuth avec notre AdminSessionProvider
export const AdminAuthProvider = ({ children }: { children: ReactNode }) => (
  <SessionProvider>
    <AdminSessionProvider>{children}</AdminSessionProvider>
  </SessionProvider>
);