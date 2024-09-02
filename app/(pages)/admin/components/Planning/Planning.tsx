'use client'

// Composant principal pour la gestion des rendez-vous (Calendrier)
import { useState, useRef } from 'react';

import { startOfWeek, endOfWeek, addDays, format, isSameDay, parseISO, setHours, setMinutes, addWeeks, addMinutes } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Check, ChevronsUpDown } from "lucide-react";
import { AppointmentData } from '@/app/api/appointment/route';
import { useFetchBlockedHours } from '@/app/hooks/useFetchBlockedHours';
import { useAddBlockHour } from '@/app/hooks/useAddBlockHour';
import { useFetchAppointments } from '@/app/hooks/useFetchAppointments';
import { useAddAppointment } from '@/app/hooks/useAddAppointment';
import { useDeleteAppointment } from '@/app/hooks/useDeleteAppointment';
import { useFetchPrestations } from '@/app/hooks/useFetchPrestations';
import { useDeleteBlockedHours } from '@/app/hooks/useDeleteBlockedHours';
import { useFetchUsers } from '@/app/hooks/useFetchUsers';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { AppointmentDialog } from './AppointmentDialog';


export default function RendezVous() {

  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentData | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedHours, setSelectedHours] = useState<{ [key: string]: boolean }>({});
  const [isSelecting, setIsSelecting] = useState(false);

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

  // Hooks personnalisés
  const { blockedHours, error, fetchBlockedHours } = useFetchBlockedHours();
  const { addBlockHour: blockHour, loading: blockLoading, error: blockError } = useAddBlockHour();
  const { deleteBlockedHours, loading: deleteBlockedHoursLoading, error: deleteBlockedHoursError } = useDeleteBlockedHours();
  const { appointments, setAppointments, error: fetchError } = useFetchAppointments();
  const { prestations } = useFetchPrestations();
  const { addAppointment, error: addError, success } = useAddAppointment();
  const { deleteAppointment } = useDeleteAppointment(appointments, setAppointments);
  const { users, error: fetchUsersError } = useFetchUsers();

  // Fonctions utilitaires
  const filteredUsers = users.filter(user =>
    `${user.nom} ${user.prenom}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startOfCurrentWeek = startOfWeek(currentWeek, { weekStartsOn: 1 });
  const endOfCurrentWeek = endOfWeek(currentWeek, { weekStartsOn: 1 });

  const currentWeekAppointments = appointments.filter(appointment =>
    parseISO(appointment.date) >= startOfCurrentWeek && parseISO(appointment.date) <= endOfCurrentWeek
  );

  const daysOfWeek = Array.from({ length: 7 }, (_, i) => addDays(startOfCurrentWeek, i));
  const hours = Array.from({ length: 18 }, (_, i) => setMinutes(setHours(new Date(), 9 + Math.floor(i / 2)), (i % 2) * 30));

  const clickTimeout = useRef<NodeJS.Timeout | null>(null);

  // Gestionnaires d'événements
  const handleEditAppointment = (appointment: AppointmentData) => {
    setSelectedAppointment(appointment);
    setNewAppointment({
      ...appointment,
      prestationId: typeof appointment.prestation_id === 'string'
        ? appointment.prestation_id
        : appointment.prestation_id.name
    });
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleCellClick = (day: Date, hour: Date) => {
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current);
      clickTimeout.current = null;
      handleAddAppointmentDialog(day, hour);
    } else {
      clickTimeout.current = setTimeout(() => {
        clickTimeout.current = null;
        handleSelectCell(day, hour);
      }, 200);
    }
  };

  const handleAddAppointmentDialog = (day: Date, hour: Date) => {
    if (!blockedHours.some(blockedHour => blockedHour.date === format(day, 'yyyy-MM-dd') && blockedHour.time === format(hour, 'HH:mm'))) {
      setNewAppointment({
        ...newAppointment,
        date: format(day, 'yyyy-MM-dd'),
        time: format(hour, 'HH:mm')
      });
      setIsDialogOpen(true);
      setIsEditMode(false);
    }
  };

  const handleSelectCell = (day: Date, hour: Date) => {
    const key = `${format(day, 'yyyy-MM-dd')}-${format(hour, 'HH:mm')}`;
    setSelectedHours(prev => {
      const newSelectedHours = { ...prev };
      if (newSelectedHours[key]) {
        delete newSelectedHours[key];
      } else {
        newSelectedHours[key] = true;
      }
      return newSelectedHours;
    });
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
          nom: user.nom || '',
          prenom: user.prenom || '',
          email: user.email || '',
          mobile: user.mobile || ''
        }
      });
    }
    setIsPopoverOpen(false);
  };


  if (error) return <p>{error}</p>;

  return (
    <Card className="p-6 flex flex-col bg-gray-900 text-white gap-6 text-center" role="region" aria-labelledby="appointments-heading">
      <h2 className="text-3xl text-center" id="appointments-heading">Planning</h2>
      {/* Navigation du calendrier */}
      <div className="flex justify-between items-center">
        <Button onClick={() => setCurrentWeek(addWeeks(currentWeek, -1))}>Semaine précédente</Button>
        <span className='text-2xl'>{format(startOfCurrentWeek, 'dd MMM yyyy', { locale: fr })} - {format(endOfCurrentWeek, 'dd MMM yyyy', { locale: fr })}</span>
        <Button onClick={() => setCurrentWeek(addWeeks(currentWeek, 1))}>Semaine suivante</Button>
      </div>
      {/* Tableau du calendrier */}
      <Table className="table-fixed rounded-lg border-collapse">
        <TableHeader className='text-center text-white bg-muted text-base'>
          <TableRow className='text-center text-white'>
            <TableHead className="border border-gray-300 text-white text-center">Heure</TableHead>
            {daysOfWeek.map(day => (
              <TableHead key={day.toISOString()} className="border text-center border-gray-300 text-white">{format(day, 'EEEE dd MMM', { locale: fr })}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className='text-center text-white'>
          {hours.map((hour, hourIndex) => (
            <TableRow className='text-center text-white' key={hourIndex}>
              <TableCell className="h-10 border bg-muted text-base border-gray-300 text-center">{format(hour, 'HH:mm')}</TableCell>
              {daysOfWeek.map((day, dayIndex) => {
                const appointment = currentWeekAppointments.find(appointment =>
                  isSameDay(parseISO(appointment.date), day) &&
                  (appointment.time === format(hour, 'HH:mm') || appointment.time === format(addMinutes(hour, -30), 'HH:mm'))
                );
                const isBlocked = blockedHours.some(blockedHour =>
                  blockedHour.date === format(day, 'yyyy-MM-dd') && blockedHour.time === format(hour, 'HH:mm')
                );
                const isSelected = selectedHours[`${format(day, 'yyyy-MM-dd')}-${format(hour, 'HH:mm')}`];

                if (isBlocked) {
                  return (
                    <TableCell key={dayIndex} className="border text-center bg-red-500 text-white border-gray-300">
                      Bloqué
                    </TableCell>
                  );
                } else if (appointment && appointment.time === format(hour, 'HH:mm')) {
                  const appointmentDuration = 60;
                  const rowSpan = appointmentDuration / 30;
                  return (
                    <TableCell key={dayIndex} className="border text-center text-white border-gray-300" rowSpan={rowSpan}>
                      <AlertDialog key={appointment._id}>
                        <AlertDialogTrigger asChild>
                          <Button className='w-full h-16 text-black font-semibold' variant="outline" onClick={() => setSelectedAppointment(appointment)}>{appointment.user_id.nom} <br /> {appointment.user_id.prenom}</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>{appointment.user_id.nom} {appointment.user_id.prenom}</AlertDialogTitle>
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
                      className={`border text-center border-gray-300 cursor-pointer hover:bg-secondary `}
                      onClick={() => handleAddAppointmentDialog(day, hour)}
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

      {/* Dialogue pour ajouter/modifier un rendez-vous */}
      <AppointmentDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        isEditMode={isEditMode}
        newAppointment={newAppointment}
        setNewAppointment={setNewAppointment}
        handleAddAppointment={handleAddAppointment}
        addError={addError || ''}
        fetchError={fetchError || ''}
        fetchUsersError={fetchUsersError || ''}
        isPopoverOpen={isPopoverOpen}
        setIsPopoverOpen={setIsPopoverOpen}
        selectedUser={selectedUser}
        users={users}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filteredUsers={filteredUsers}
        handleUserSelect={handleUserSelect}
        prestations={prestations}
      />
    </Card>
  );
}

