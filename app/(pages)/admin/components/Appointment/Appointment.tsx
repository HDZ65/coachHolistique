import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function appointment() {
  return (
    <Card role="region" aria-labelledby="appointments-heading" style={{ marginBottom: '20px' }}>
            <h2 id="appointments-heading">Gérer les rendez-vous</h2>
            <Input
              placeholder="Nom du rendez-vous"
              aria-label="Nom du rendez-vous"
              style={{ marginBottom: '10px' }}
            />
            <Button>Ajouter un rendez-vous</Button>
          </Card>
  )
}