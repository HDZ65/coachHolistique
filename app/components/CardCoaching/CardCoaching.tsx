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
  children: React.ReactNode;
}

function CardCoaching({ titre, description, children }: CardCoachingProps) {
  return (
    <Card className="relative w-full max-w-[350px] flex flex-col">
      <CardContent className="flex-grow">
        {children}
        <CardTitle className="text-2xl">{titre}</CardTitle>
        <CardDescription className="text-foreground">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}

export default CardCoaching;