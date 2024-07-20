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
import { PrestationsData } from '@/app/api/prestations/route';

interface Appointment {
  id: number;
  name: string;
  date: string;
  time: string;
  prestation: string;
  prenom: string;
  email: string;
  phone: string;
}

export default function RendezVous() {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [newAppointment, setNewAppointment] = useState({ name: '', date: '', time: '09:00', prestation: '', prenom: '', email: '', phone: '' });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [prestations, setPrestations] = useState<PrestationsData[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  interface Prestation {
    id: string;
    name: string;
  }

  interface Appointment {
    id: number;
    name: string;
    date: string;
    time: string;
    prestation: string;
    prenom: string;
    email: string;
    phone: string;
  }
  useEffect(() => {
    const fetchPrestations = async () => {
        try {
            const res = await fetch("/api/prestations");
            const data = await res.json();
            if (Array.isArray(data.prestations)) {
                setPrestations(data.prestations);
            } else {
                console.error("La réponse de l'API ne contient pas un tableau de prestations. Réponse:", data);
            }
        } catch (error) {
            console.log("Erreur lors de la récupération des prestations:", error);
        }
    };

    fetchPrestations();
}, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('/api/appointment');
        const data = await response.json();
        if (Array.isArray(data)) {
          setAppointments(data);
        } else {
          console.error("Les données récupérées ne sont pas un tableau:", data);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des rendez-vous:", error);
      }
    };

    fetchAppointments();
  }, []);

  console.log(appointments);

  const handleEditAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setNewAppointment(appointment);
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleAddAppointment = () => {
    // Validation des champs du formulaire
    const { name, date, time, prestation, prenom, email, phone } = newAppointment;
    if (!name || !date || !time || !prestation || !prenom || !email || !phone) {
      alert("Tous les champs doivent être remplis.");
      return;
    }

    if (isEditMode && selectedAppointment) {
      setAppointments(appointments.map(appointment =>
        appointment.id === selectedAppointment.id ? { ...selectedAppointment, ...newAppointment } : appointment
      ));
      setIsEditMode(false);
    } else {
      setAppointments([...appointments, { id: Date.now(), name, date, time, prestation, prenom, email, phone }]);
    }
    setNewAppointment({ name: '', date: '', time: '09:00', prestation: '', prenom: '', email: '', phone: '' });
    setIsDialogOpen(false);
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

  const handleCellClick = (day: Date, hour: Date) => {
    setNewAppointment({
      ...newAppointment,
      date: format(day, 'yyyy-MM-dd'),
      time: format(hour, 'HH:mm')
    });
    setIsDialogOpen(true);
    setIsEditMode(false);
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
          <Input
            placeholder="Nom"
            value={newAppointment.name}
            onChange={(e) => setNewAppointment({ ...newAppointment, name: e.target.value })}
            aria-label="Nom du rendez-vous"
            className="mb-4"
          />
          <Input
            placeholder="Prénom"
            value={newAppointment.prenom}
            onChange={(e) => setNewAppointment({ ...newAppointment, prenom: e.target.value })}
            aria-label="Prénom du rendez-vous"
            className="mb-4"
          />
          <Input
            placeholder="Email"
            value={newAppointment.email}
            onChange={(e) => setNewAppointment({ ...newAppointment, email: e.target.value })}
            aria-label="Email du rendez-vous"
            className="mb-4"
          />
          <Input
            placeholder="Téléphone"
            value={newAppointment.phone}
            onChange={(e) => setNewAppointment({ ...newAppointment, phone: e.target.value })}
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
            value={newAppointment.prestation}
            onValueChange={(value) => setNewAppointment({ ...newAppointment, prestation: value })}
          >
            <SelectTrigger className="bg-secondary-25">
              <SelectValue placeholder="Choisir une prestation" />
            </SelectTrigger>
            <SelectContent>
              {prestations.map((prestation) => (
                <SelectItem key={prestation._id} value={prestation.name}>
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