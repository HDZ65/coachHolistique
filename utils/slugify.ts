// Fonction utilitaire pour générer des slugs
export const slugify = (text: string): string => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')  
      .replace(/[^\w\-]+/g, '') 
      .replace(/\-\-+/g, '-');  
  };