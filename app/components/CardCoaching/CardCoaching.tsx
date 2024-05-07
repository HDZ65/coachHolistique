import * as React from "react";
import Image from "next/image";
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
  titre: string;
  description: string;
  img: string;
}

function CardCoaching({ titre, description, img }: CardCoachingProps) {
  return (
    <Card className="relative w-[350px] max-md:w-full">
      {/* Assurez-vous de connaître les dimensions exactes pour une meilleure performance */}
      <Image src={img} alt={`Image ${titre}`} width={350} height={200} className="min-w-full max-h-52 min-h-52 object-cover rounded-t-md" />
      <CardHeader className="flex flex-col ">
        <CardTitle className="text-xl">{titre}</CardTitle>
        <CardDescription className="text-md" >{description}</CardDescription>
        <Link href="/coaching">
        <BsInfo
            className='absolute text-primary bg-primary-foreground rounded-full right-2 bottom-2 text-xl'
          />
        </Link>

      </CardHeader>
    </Card>
  );
}

export default CardCoaching;