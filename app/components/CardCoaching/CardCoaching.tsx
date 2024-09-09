// Composant CardCoaching 

import Image, { StaticImageData } from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface CardCoachingProps {
  image?: StaticImageData | string;
  titre: string;
  description: string;
  children?: React.ReactNode;
}

function CardCoaching({
  image,
  titre,
  description,
  children,
}: CardCoachingProps): JSX.Element {
  return (
    <Card 
      className="relative w-full max-w-[450px] flex flex-col min-h-full"
      itemScope 
      itemType="http://schema.org/Service"
    >
      <CardHeader className="p-0">
        {image && (
          <Image
            src={image}
            alt={titre}
            width={500}
            height={500}
            className="aspect-video object-cover w-full h-full rounded-t-md"
            loading="lazy"
          />
        )}
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <CardTitle className="text-2xl font-bold mb-2" itemProp="name">
          {titre}
        </CardTitle>
        <CardDescription 
          className="text-foreground mb-4" 
          itemProp="description"
        >
          {description}
        </CardDescription>
        {children}
      </CardContent>
    </Card>
  );
}

export default CardCoaching;