"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { fontEphesis } from './../../../fonts';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Le nom d'utilisateur doit comporter au moins 2 caractères.",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
  message: z.string().min(5, {
    message: "Le message doit comporter au moins 5 caractères.",
  }),
});

export function Formulaire() {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      message: "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // Préparation des données à envoyer
    const emailData = {
      to: "alexandre.hernandez@yahoo.com",
      from: data.email,
      subject: "Message de " + data.username,
      text: data.message,
    };
  
    // Envoi des données à l'API de votre serveur
    fetch('https://votre-domaine.com/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    })
    .then(response => response.json())
    .then(data => {
      toast({ title: "Succès", description: "Email envoyé avec succès!" });
    })
    .catch(error => {
      toast({ title: "Erreur", description: "Erreur lors de l'envoi de l'email: " + error.message });
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
        <h1 className={`text-5xl font-bold ${fontEphesis.className}`} >Contact</h1>
        <p>Des questions sur le coaching holistique ? Contactez moi pour obtenir des réponses claires.</p>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom Prénom</FormLabel>
              <FormControl>
                <Input className="bg-foreground-25 focus:placeholder-transparent " placeholder="ex : Dupont Elisabeth" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input className="bg-foreground-25 focus:placeholder-transparent" placeholder="exemple@domaine.com" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea className="bg-foreground-25 focus:placeholder-transparent" placeholder="Votre message ..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit">
            Envoyer
          </Button>
        </div>
      </form>
    </Form>
  )
}