// Titre principal : Composant de dialogue pour l'ajout et la modification de rendez-vous

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown } from "lucide-react";
import { AppointmentData } from '@/app/api/appointment/route';

interface AppointmentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isEditMode: boolean;
  newAppointment: AppointmentData;
  setNewAppointment: React.Dispatch<React.SetStateAction<AppointmentData>>;
  handleAddAppointment: () => void;
  addError?: string;
  fetchError?: string;
  fetchUsersError?: string;
  isPopoverOpen: boolean;
  setIsPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedUser: string | null;
  users: any[];
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  filteredUsers: any[];
  handleUserSelect: (userId: string) => void;
  prestations: any[];
}

// Définition des champs du formulaire
const formFields = [
  { name: 'nom', label: 'Nom', type: 'text' },
  { name: 'prenom', label: 'Prénom', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'mobile', label: 'Téléphone', type: 'tel' },
  { name: 'date', label: 'Date du rendez-vous', type: 'date' },
  { name: 'time', label: 'Heure du rendez-vous', type: 'time' },
];

// Définir un type pour les champs de l'utilisateur
type UserFields = 'nom' | 'prenom' | 'email' | 'mobile';

export function AppointmentDialog({
  isOpen,
  onOpenChange,
  isEditMode,
  newAppointment,
  setNewAppointment,
  handleAddAppointment,
  addError,
  fetchError,
  fetchUsersError,
  isPopoverOpen,
  setIsPopoverOpen,
  selectedUser,
  users,
  searchTerm,
  setSearchTerm,
  filteredUsers,
  handleUserSelect,
  prestations
}: AppointmentDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Modifier le rendez-vous' : 'Ajouter un rendez-vous'}</DialogTitle>
        </DialogHeader>
        {addError && <p className="text-red-500">{addError}</p>}
        {fetchError && <p className="text-red-500">{fetchError}</p>}
        {fetchUsersError && <p className="text-red-500">{fetchUsersError}</p>}
        
        {/* Sélection de l'utilisateur */}
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={isPopoverOpen}
              className="w-full justify-between mb-4"
            >
              {selectedUser
                ? users.find(user => user._id === selectedUser)?.nom + ' ' + users.find(user => user._id === selectedUser)?.prenom
                : "Sélectionner un utilisateur..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput
                placeholder="Rechercher un utilisateur..."
                value={searchTerm}
                onValueChange={(value) => setSearchTerm(value)}
                aria-label="Rechercher un utilisateur"
              />
              <CommandEmpty>Aucun utilisateur trouvé.</CommandEmpty>
              <CommandList>
                <CommandGroup>
                  {filteredUsers.map((user) => (
                    <CommandItem
                      key={user._id}
                      value={user._id}
                      onSelect={() => handleUserSelect(user._id)}
                    >
                      <Check
                        className={`mr-2 h-4 w-4 ${selectedUser === user._id ? "opacity-100" : "opacity-0"}`}
                      />
                      {user.nom} {user.prenom}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        
        {/* Champs du formulaire mappés */}
        {formFields.map((field) => (
          <Input
            key={field.name}
            placeholder={field.label}
            type={field.type}
            value={field.name === 'date' || field.name === 'time' 
              ? newAppointment[field.name as 'date' | 'time']
              : newAppointment.user_id[field.name as UserFields]}
            onChange={(e) => {
              if (field.name === 'date' || field.name === 'time') {
                setNewAppointment({ ...newAppointment, [field.name]: e.target.value });
              } else {
                setNewAppointment({ 
                  ...newAppointment, 
                  user_id: { ...newAppointment.user_id, [field.name as UserFields]: e.target.value } 
                });
              }
            }}
            aria-label={field.label}
            className="mb-4"
          />
        ))}
        
        <Select
          value={newAppointment.prestationId}
          onValueChange={(value) => setNewAppointment({ ...newAppointment, prestationId: value })}
        >
          <SelectTrigger className="bg-secondary-25">
            <SelectValue placeholder="Choisir une prestation" />
          </SelectTrigger>
          <SelectContent>
            {prestations.map((prestation) => (
              <SelectItem key={prestation._id} value={prestation._id}>
                {prestation.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={handleAddAppointment}>{isEditMode ? 'Modifier' : 'Ajouter'}</Button>
      </DialogContent>
    </Dialog>
  );
}