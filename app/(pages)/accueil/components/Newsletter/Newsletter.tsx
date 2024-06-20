"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { fontEphesis } from "@/app/fonts"

// Schéma de validation pour l'adresse email
const FormSchema = z.object({
    email: z.string().email({
        message: "Veuillez entrer une adresse email valide.",
    }),
})

export function Newsletter() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
        },
    })

    const [isFocused, setIsFocused] = useState(false);

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: "Vous avez soumis les valeurs suivantes :",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" w-2/5 max-md:w-full space-y-6 bg-white rounded-lg p-6 mx-auto shadow-md">
            <article className="flex flex-col  gap-4">
                <h2 className={`text-4xl text-secondary ${fontEphesis.className}`}>NewsLetter</h2>
                <p className="font-light">Restez informé de nos dernières actualités, offres spéciales et conseils exclusifs. Inscrivez-vous dès maintenant pour ne rien manquer !</p>
            </article>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-secondary">Adresse Email</FormLabel>
                            <FormControl>
                                <Input 
                                    type="email" 
                                    placeholder={isFocused ? "" : "votre.email@example.com"} 
                                    {...field} 
                                    onFocus={() => setIsFocused(true)} 
                                    onBlur={() => setIsFocused(false)} 
                                />
                            </FormControl>
                            <FormDescription>
                                Entrez votre adresse email pour vous inscrire à la newsletter.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">
                    <div className="flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_271_1924)">
                                <path d="M21.8002 0.20059C21.8954 0.295921 21.9605 0.417117 21.9874 0.549121C22.0143 0.681125 22.0018 0.818121 21.9515 0.94309L13.9503 20.9452C13.8798 21.1214 13.7621 21.2747 13.6101 21.3882C13.4581 21.5017 13.2777 21.5711 13.0888 21.5888C12.8998 21.6064 12.7097 21.5716 12.5393 21.4881C12.3689 21.4046 12.2249 21.2758 12.123 21.1157L7.75322 14.2476L0.885099 9.87784C0.724661 9.77607 0.595458 9.63195 0.511745 9.46139C0.428033 9.29083 0.393066 9.10046 0.410703 8.91129C0.428341 8.72211 0.497897 8.54149 0.611695 8.38934C0.725494 8.2372 0.879113 8.11945 1.0556 8.04909L21.0577 0.0507147C21.1827 0.000406576 21.3197 -0.012078 21.4517 0.0148117C21.5837 0.0417014 21.7049 0.106781 21.8002 0.201965V0.20059ZM9.12547 13.8461L12.9218 19.8108L19.4297 3.54184L9.12547 13.8461ZM18.4576 2.56971L2.1886 9.07759L8.15472 12.8726L18.4576 2.56971Z" fill="white" />
                            </g>
                            <defs>
                                <clipPath id="clip0_271_1924">
                                    <rect width="22" height="22" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        <span>S&apos;inscrire</span>
                    </div>
                </Button>
            </form>
        </Form>
    )
}