import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios'; // Importer axios pour les requêtes HTTP

// Interface pour les propriétés du contexte SalesFunnel
interface SalesFunnelContextProps {
  prestationId: string | null;
  dateTime: string | null; // Date et heure combinées en format ISO 8601
  userInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  };
  prestationDetails: {
    name: string;
    description: string;
    duration: number;
    price: number;
  } | null;
  setPrestationId: (id: string) => void;
  setDateTime: (dateTime: string) => void; // Fonction pour définir la date et l'heure combinées en format ISO 8601
  setUserInfo: (info: { firstName: string; lastName: string; email: string; phoneNumber: string }) => void;
}

// Création du contexte SalesFunnel
const SalesFunnelContext = createContext<SalesFunnelContextProps | undefined>(undefined);

// Fournisseur du contexte SalesFunnel
export const SalesFunnelProvider = ({ children }: { children: ReactNode }) => {
  const [prestationId, setPrestationIdState] = useState<string | null>(null);
  const [dateTime, setDateTimeState] = useState<string | null>(null); 
  const [userInfo, setUserInfoState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  });
  const [prestationDetails, setPrestationDetails] = useState<{
    name: string;
    description: string;
    duration: number;
    price: number;
  } | null>(null);

  // Fonction pour définir l'ID de la prestation
  const setPrestationId = (id: string) => {
    console.log("ID de la prestation mise à jour:", id);
    setPrestationIdState(id);
  };

  // Fonction pour définir la date et l'heure combinées en format ISO 8601
  const setDateTime = (dateTime: string) => {
    console.log("Date et heure mises à jour:", dateTime);
    setDateTimeState(dateTime);
  };

  // Fonction pour définir les informations de l'utilisateur
  const setUserInfo = (info: { firstName: string; lastName: string; email: string; phoneNumber: string }) => {
    console.log("Informations utilisateur mises à jour:", info);
    setUserInfoState(info);
  };

  // Effet pour récupérer les détails de la prestation lorsque l'ID change
  useEffect(() => {
    if (prestationId) {
      fetch('/api/prestations')
        .then(response => {
          if (!response.ok) {
            throw new Error("Erreur lors de la récupération des prestations");
          }
          return response.json();
        })
        .then(data => {
          const prestation = data.prestations.find((p: { _id: string }) => p._id === prestationId);
          if (prestation) {
            setPrestationDetails(prestation);
          } else {
            console.error("Prestation non trouvée");
          }
        })
        .catch(error => {
          console.error("Erreur lors de la récupération des prestations:", error);
        });
    }
  }, [prestationId]);

  return (
    <SalesFunnelContext.Provider value={{ prestationId, dateTime, userInfo, prestationDetails, setPrestationId, setDateTime, setUserInfo }}>
      {children}
    </SalesFunnelContext.Provider>
  );
};

// Hook pour utiliser le contexte SalesFunnel
export const useSalesFunnel = () => {
  const context = useContext(SalesFunnelContext);
  if (!context) {
    throw new Error('useSalesFunnel must be used within a SalesFunnelProvider');
  }
  return context;
};