'use client'

// Composant principal pour la gestion des rendez-vous ( Calendrier )
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogTrigger, AlertDialogCancel } from '@/components/ui/alert-dialog';
import { startOfWeek, endOfWeek, addDays, format, isSameDay, parseISO, setHours, setMinutes, addWeeks, addMinutes } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AppointmentData } from '@/app/api/appointment/route';
import { useFetchAppointments } from '@/app/hooks/useFetchAppointments';
import { useFetchPrestations } from '@/app/hooks/useFetchPrestations';
import { useAddAppointment } from '@/app/hooks/useAddAppointment';
import { useDeleteAppointment } from '@/app/hooks/useDeleteAppointment';
import { useFetchUsers } from '@/app/hooks/useFetchUsers';
import { Check, ChevronsUpDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';


export default function RendezVous() {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentData | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const { appointments, setAppointments, error: fetchError } = useFetchAppointments();
  const { prestations } = useFetchPrestations();
  const { addAppointment, error: addError, success } = useAddAppointment();
  const { deleteAppointment } = useDeleteAppointment(appointments, setAppointments);
  const { users, error: fetchUsersError } = useFetchUsers();

  const [newAppointment, setNewAppointment] = useState<AppointmentData>({
    _id: '',
    nom: '',
    prenom: '',
    email: '',
    mobile: '',
    prestationId: '',
    prestation_id: { name: '', price: '', duration: '' },
    date: '',
    time: '',
    user_id: { nom: '', prenom: '', email: '', mobile: '' }
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const filteredUsers = users.filter(user =>
    `${user.nom} ${user.prenom}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditAppointment = (appointment: AppointmentData) => {
    setSelectedAppointment(appointment);
    setNewAppointment({
      ...appointment,
      prestationId: (appointment.prestation_id as any)._id
    });
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const startOfCurrentWeek = startOfWeek(currentWeek, { weekStartsOn: 1 });
  const endOfCurrentWeek = endOfWeek(currentWeek, { weekStartsOn: 1 });

  const currentWeekAppointments = appointments.filter(appointment =>
    parseISO(appointment.date) >= startOfCurrentWeek && parseISO(appointment.date) <= endOfCurrentWeek
  );

  const daysOfWeek = Array.from({ length: 7 }, (_, i) => addDays(startOfCurrentWeek, i));

  const hours = Array.from({ length: 18 }, (_, i) => setMinutes(setHours(new Date(), 9 + Math.floor(i / 2)), (i % 2) * 30));

  const handleCellClick = (day: Date, hour: Date) => {
    setNewAppointment({
      ...newAppointment,
      date: format(day, 'yyyy-MM-dd'),
      time: format(hour, 'HH:mm')
    });
    setIsDialogOpen(true);
    setIsEditMode(false);
  };

  const handleAddAppointment = async () => {
    await addAppointment(newAppointment);
    if (success) {
      setIsDialogOpen(false);
      setAppointments([...appointments, newAppointment]);
    }
  };

  const handleUserSelect = (userId: string) => {
    setSelectedUser(userId);
    const user = users.find(user => user._id === userId);
    if (user) {
      setNewAppointment({
        ...newAppointment,
        user_id: {
          nom: user.nom,
          prenom: user.prenom,
          email: user.email,
          mobile: user.mobile
        }
      });
    }
    setIsPopoverOpen(false);
  };

  return (
    <Card className="p-6 flex flex-col bg-gray-900 text-white gap-6 text-center" role="region" aria-labelledby="appointments-heading">
      <h2 className="text-3xl text-center" id="appointments-heading">Planning</h2>
      <div className="flex justify-between items-center">
        <Button onClick={() => setCurrentWeek(addWeeks(currentWeek, -1))}>Semaine précédente</Button>
        <span className='text-2xl'>{format(startOfCurrentWeek, 'dd MMM yyyy', { locale: fr })} - {format(endOfCurrentWeek, 'dd MMM yyyy', { locale: fr })}</span>
        <Button onClick={() => setCurrentWeek(addWeeks(currentWeek, 1))}>Semaine suivante</Button>
      </div>
      <Table className="table-fixed rounded-lg border-collapse">
        <TableHeader className='text-center text-white bg-muted text-base '>
          <TableRow className='text-center text-white '>
            <TableHead className="border border-gray-300 text-white text-center ">Heure</TableHead>
            {daysOfWeek.map(day => (
              <TableHead key={day.toISOString()} className="border text-center border-gray-300 text-white">{format(day, 'EEEE dd MMM', { locale: fr })}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className='text-center text-white'>
          {hours.map((hour, hourIndex) => (
            <TableRow className='text-center  text-white' key={hourIndex}>
              <TableCell className="h-10 border bg-muted text-base border-gray-300 text-center">{format(hour, 'HH:mm')}</TableCell>
              {daysOfWeek.map((day, dayIndex) => {
                const appointment = currentWeekAppointments.find(appointment =>
                  isSameDay(parseISO(appointment.date), day) &&
                  (appointment.time === format(hour, 'HH:mm') || appointment.time === format(addMinutes(hour, -30), 'HH:mm'))
                );
                if (appointment && appointment.time === format(hour, 'HH:mm')) {
                  const appointmentDuration = 60;
                  const rowSpan = appointmentDuration / 30;
                  return (
                    <TableCell key={dayIndex} className="border text-center text-white border-gray-300" rowSpan={rowSpan}>
                      <AlertDialog key={appointment._id}>
                        <AlertDialogTrigger asChild>
                          <Button className='w-full h-16 text-black' variant="outline" onClick={() => setSelectedAppointment(appointment)}>{appointment.user_id.nom} <br /> {appointment.user_id.prenom}</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>{appointment.user_id.nom}</AlertDialogTitle>
                            <AlertDialogDescription>
                              <p>Prénom: {appointment.user_id.prenom}</p>
                              <p>Nom: {appointment.user_id.nom}</p>
                              <p>Email: <a href={`mailto:${appointment.user_id.email}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{appointment.user_id.email}</a></p>
                              <p>Téléphone: <a href={`https://wa.me/${appointment.user_id.mobile}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{appointment.user_id.mobile}</a></p>
                              <p>Date: {appointment.date}</p>
                              <p>Heure: {appointment.time}</p>
                              <p>Détails: {appointment.prestation_id.name}</p>
                            </AlertDialogDescription>
                            <AlertDialogFooter>
                              <Button variant="destructive" onClick={() => deleteAppointment(appointment._id)}>Supprimer</Button>
                              <Button variant="outline" onClick={() => handleEditAppointment(appointment)}>Modifier</Button>
                              <AlertDialogCancel onClick={() => setSelectedAppointment(null)}>Fermer</AlertDialogCancel>
                            </AlertDialogFooter>
                          </AlertDialogHeader>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  );
                } else if (!appointment) {
                  return (
                    <TableCell
                      key={dayIndex}
                      className="border text-center border-gray-300 cursor-pointer hover:bg-secondary"
                      onClick={() => handleCellClick(day, hour)}
                      aria-label={`Prendre rendez-vous le ${format(day, 'EEEE dd MMM', { locale: fr })} à ${format(hour, 'HH:mm')}`}
                    />
                  );
                }
                return null;
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditMode ? 'Modifier le rendez-vous' : 'Ajouter un rendez-vous'}</DialogTitle>
          </DialogHeader>
          {addError && <p className="text-red-500">{addError}</p>}
          {fetchError && <p className="text-red-500">{fetchError}</p>}
          {fetchUsersError && <p className="text-red-500">{fetchUsersError}</p>}
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
          <Input
            placeholder="Nom"
            value={newAppointment.user_id.nom}
            onChange={(e) => setNewAppointment({ ...newAppointment, user_id: { ...newAppointment.user_id, nom: e.target.value } })}
            aria-label="Nom du rendez-vous"
            className="mb-4"
          />
          <Input
            placeholder="Prénom"
            value={newAppointment.user_id.prenom}
            onChange={(e) => setNewAppointment({ ...newAppointment, user_id: { ...newAppointment.user_id, prenom: e.target.value } })}
            aria-label="Prénom du rendez-vous"
            className="mb-4"
          />
          <Input
            placeholder="Email"
            value={newAppointment.user_id.email}
            onChange={(e) => setNewAppointment({ ...newAppointment, user_id: { ...newAppointment.user_id, email: e.target.value } })}
            aria-label="Email du rendez-vous"
            className="mb-4"
          />
          <Input
            placeholder="Téléphone"
            value={newAppointment.user_id.mobile}
            onChange={(e) => setNewAppointment({ ...newAppointment, user_id: { ...newAppointment.user_id, mobile: e.target.value } })}
            aria-label="Téléphone du rendez-vous"
            className="mb-4"
          />
          <Input
            type="date"
            placeholder="Date du rendez-vous"
            value={newAppointment.date}
            onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
            aria-label="Date du rendez-vous"
            className="mb-4"
          />
          <Input
            type="time"
            placeholder="Heure du rendez-vous"
            value={newAppointment.time}
            onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
            aria-label="Heure du rendez-vous"
            className="mb-4"
          />
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
    </Card>
  );
}