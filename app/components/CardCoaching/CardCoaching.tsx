import * as React from "react";
import Image, { StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BsInfo } from "react-icons/bs";
import Link from "next/link";

interface CardCoachingProps {
  image?: StaticImageData | string | undefined;
  titre: string;
  description: string;
  children?: React.ReactNode; // Added this line
}

function CardCoaching({ image, titre, description, children }: CardCoachingProps) {
  return (
    <Card className="relative w-full max-w-[450px] flex flex-col   min-h-full">
      <CardHeader className="p-0">
        <CardTitle className="">
          {image && <Image src={image} alt={titre} width={500} height={500} className="aspect-video object-cover w-full h-full rounded-t-md" />}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        {children}
        <CardTitle className="text-2xl">{titre}</CardTitle>
        <CardDescription className="text-foreground">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}

export default CardCoaching;