'use client'

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogTrigger, AlertDialogCancel } from '@/components/ui/alert-dialog';
import { startOfWeek, endOfWeek, addDays, format, isSameDay, parseISO, setHours, setMinutes, addWeeks, addMinutes } from 'date-fns';
import { fr } from 'date-fns/locale'; // Importer la locale française
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormControl } from '@/components/ui/form';
import { z } from "zod"

interface Appointment {
  id: number;
  name: string;
  date: string;
  time: string;
  prestation: string;
}

export default function RendezVous() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [newAppointment, setNewAppointment] = useState({ name: '', date: '', time: '09:00', prestation: '' });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isEditMode, setIsEditMode] = useState(false); // État pour le mode édition

  const FormSchema = z.object({
    email: z
      .string({
        required_error: "Please select an email to display.",
      })
      .email(),
  })

  useEffect(() => {
    // Charger les rendez-vous initiaux (peut être remplacé par une requête API)
    setAppointments([
      { id: 1, name: 'Michel', date: '2024-06-25', time: '10:00', prestation: 'Détails du rendez-vous 1' },
      { id: 2, name: 'Jean', date: '2024-06-25', time: '11:00', prestation: 'Détails du rendez-vous 2' },
      { id: 3, name: 'Marie', date: '2024-06-26', time: '14:00', prestation: 'Détails du rendez-vous 3' },
      { id: 4, name: 'Paul', date: '2024-06-27', time: '09:00', prestation: 'Détails du rendez-vous 4' },
      { id: 5, name: 'Sophie', date: '2024-06-28', time: '16:00', prestation: 'Détails du rendez-vous 5' },
      { id: 6, name: 'Luc', date: '2024-06-29', time: '13:00', prestation: 'Détails du rendez-vous 6' },
      { id: 7, name: 'Julie', date: '2024-07-07', time: '15:00', prestation: 'Détails du rendez-vous 7' },
      { id: 8, name: 'Pierre', date: '2024-07-08', time: '17:00', prestation: 'Détails du rendez-vous 8' },
      { id: 9, name: 'Sophie', date: '2024-07-09', time: '10:00', prestation: 'Détails du rendez-vous 9' },
      { id: 10, name: 'Luc', date: '2024-07-10', time: '11:00', prestation: 'Détails du rendez-vous 10' },
      { id: 11, name: 'Julie', date: '2024-07-11', time: '15:00', prestation: 'Détails du rendez-vous 11' },
      { id: 12, name: 'Pierre', date: '2024-07-12', time: '17:00', prestation: 'Détails du rendez-vous 12' },
      { id: 13, name: 'Sophie', date: '2024-07-13', time: '10:00', prestation: 'Détails du rendez-vous 13' },
      { id: 14, name: 'Luc', date: '2024-07-14', time: '11:00', prestation: 'Détails du rendez-vous 14' },
      { id: 15, name: 'Julie', date: '2024-07-15', time: '15:00', prestation: 'Détails du rendez-vous 15' },
      { id: 16, name: 'Pierre', date: '2024-07-16', time: '17:00', prestation: 'Détails du rendez-vous 16' },
      { id: 17, name: 'Sophie', date: '2024-07-17', time: '10:00', prestation: 'Détails du rendez-vous 17' },
      { id: 18, name: 'Luc', date: '2024-07-18', time: '11:00', prestation: 'Détails du rendez-vous 18' },
      { id: 19, name: 'Julie', date: '2024-07-19', time: '15:00', prestation: 'Détails du rendez-vous 19' },
      { id: 20, name: 'Pierre', date: '2024-07-20', time: '17:00', prestation: 'Détails du rendez-vous 20' },
      { id: 21, name: 'Sophie', date: '2024-07-21', time: '10:00', prestation: 'Détails du rendez-vous 21' },
      { id: 22, name: 'Luc', date: '2024-07-22', time: '11:00', prestation: 'Détails du rendez-vous 22' },
      { id: 23, name: 'Julie', date: '2024-07-23', time: '15:00', prestation: 'Détails du rendez-vous 23' },
      { id: 24, name: 'Pierre', date: '2024-07-24', time: '17:00', prestation: 'Détails du rendez-vous 24' },
    ]);
  }, []);

  const handleAddAppointment = () => {
    if (isEditMode && selectedAppointment) {
      setAppointments(appointments.map(appointment =>
        appointment.id === selectedAppointment.id ? { ...selectedAppointment, ...newAppointment } : appointment
      ));
      setIsEditMode(false);
    } else {
      setAppointments([...appointments, { id: Date.now(), name: newAppointment.name, date: newAppointment.date, time: newAppointment.time, prestation: newAppointment.prestation }]);
    }
    setNewAppointment({ name: '', date: '', time: '09:00', prestation: '' });
    setIsDialogOpen(false);
  };

  const handleEditAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setNewAppointment(appointment);
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleDeleteAppointment = (id: number) => {
    setAppointments(appointments.filter(appointment => appointment.id !== id));
  };

  const startOfCurrentWeek = startOfWeek(currentWeek, { weekStartsOn: 1 });
  const endOfCurrentWeek = endOfWeek(currentWeek, { weekStartsOn: 1 });

  const currentWeekAppointments = appointments.filter(appointment =>
    parseISO(appointment.date) >= startOfCurrentWeek && parseISO(appointment.date) <= endOfCurrentWeek
  );

  const daysOfWeek = Array.from({ length: 7 }, (_, i) => addDays(startOfCurrentWeek, i));

  // Création de créneaux horaires fixes de 9h à 18h toutes les 30 minutes
  const hours = Array.from({ length: 18 }, (_, i) => setMinutes(setHours(new Date(), 9 + Math.floor(i / 2)), (i % 2) * 30));

  return (
    <Card className="p-6 flex flex-col gap-6 text-center" role="region" aria-labelledby="appointments-heading">
      <div className='grid grid-cols-3 items-center'>
        <h2 className="text-3xl col-start-2 text-center" id="appointments-heading">Planning</h2>
        <Button className='col-start-3 justify-self-end' onClick={() => { setIsDialogOpen(true); setIsEditMode(false); }}>Ajouter un rendez-vous</Button>
      </div>
      <div className="flex justify-between items-center">
        <Button variant='outline' onClick={() => setCurrentWeek(addWeeks(currentWeek, -1))}>Semaine précédente</Button>
        <span>{format(startOfCurrentWeek, 'dd MMM yyyy', { locale: fr })} - {format(endOfCurrentWeek, 'dd MMM yyyy', { locale: fr })}</span>
        <Button variant='outline' onClick={() => setCurrentWeek(addWeeks(currentWeek, 1))}>Semaine suivante</Button>
      </div>
      <Table className="table-fixed border-collapse">
        <TableHeader className='text-center'>
          <TableRow className='text-center'>
            <TableHead className="border border-gray-300 text-center">Heure</TableHead>
            {daysOfWeek.map(day => (
              <TableHead key={day.toISOString()} className="border text-center border-gray-300">{format(day, 'EEEE dd MMM', { locale: fr })}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className='text-center'>
          {hours.map((hour, hourIndex) => (
            <TableRow className='text-center  ' key={hourIndex}>
              <TableCell className="h-10 border bg-red-50 border-gray-300 text-center">{format(hour, 'HH:mm')}</TableCell>
              {daysOfWeek.map((day, dayIndex) => {
                const appointment = currentWeekAppointments.find(appointment =>
                  isSameDay(parseISO(appointment.date), day) &&
                  (appointment.time === format(hour, 'HH:mm') || appointment.time === format(addMinutes(hour, -30), 'HH:mm'))
                );
                if (appointment && appointment.time === format(hour, 'HH:mm')) {
                  const appointmentDuration = 60; // Durée du rendez-vous en minutes
                  const rowSpan = appointmentDuration / 30; // Nombre de lignes à fusionner
                  return (
                    <TableCell key={dayIndex} className="border text-center border-gray-300" rowSpan={rowSpan}>
                      <AlertDialog key={appointment.id}>
                        <AlertDialogTrigger asChild>
                          <Button className='w-full h-16' variant="outline" onClick={() => setSelectedAppointment(appointment)}>{appointment.name}</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>{appointment.name}</AlertDialogTitle>
                            <AlertDialogDescription>
                              <p>Date: {appointment.date}</p>
                              <p>Heure: {appointment.time}</p>
                              <p>Détails: {appointment.prestation}</p>
                            </AlertDialogDescription>
                            <AlertDialogFooter>
                              <Button variant="destructive" onClick={() => handleDeleteAppointment(appointment.id)}>Supprimer</Button>
                              <Button variant="outline" onClick={() => handleEditAppointment(appointment)}>Modifier</Button>
                              <AlertDialogCancel onClick={() => setSelectedAppointment(null)}>Fermer</AlertDialogCancel>
                            </AlertDialogFooter>
                          </AlertDialogHeader>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  );
                } else if (!appointment) {
                  return <TableCell key={dayIndex} className="border text-center border-gray-300" />;
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
          <Input
            placeholder="Nom"
            value={newAppointment.name}
            onChange={(e) => setNewAppointment({ ...newAppointment, name: e.target.value })}
            aria-label="Nom du rendez-vous"
            className="mb-4"
          />
          <Input
            placeholder="Prénom"
            value={newAppointment.name}
            onChange={(e) => setNewAppointment({ ...newAppointment, name: e.target.value })}
            aria-label="Nom du rendez-vous"
            className="mb-4"
          />
          <Input
            placeholder="Email"
            value={newAppointment.name}
            onChange={(e) => setNewAppointment({ ...newAppointment, name: e.target.value })}
            aria-label="Nom du rendez-vous"
            className="mb-4"
          />
          <Input
            placeholder="Téléphone"
            value={newAppointment.name}
            onChange={(e) => setNewAppointment({ ...newAppointment, name: e.target.value })}
            aria-label="Nom du rendez-vous"
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
          <Select >
            <SelectTrigger className="bg-secondary-25">
              <SelectValue placeholder="Choisir une prestation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Holistique">Holistique</SelectItem>
              <SelectItem value="Tapping">Tapping</SelectItem>
              <SelectItem value="EFT">EFT</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleAddAppointment}>{isEditMode ? 'Modifier' : 'Ajouter'}</Button>
        </DialogContent>
      </Dialog>
    </Card>
  );
}