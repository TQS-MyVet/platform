import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { useToast } from "@/components/ui/use-toast";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { appointmentSchema, AppointmentFormValues } from './schema';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import '@/pages/BookingPage/components/css/DatePicker.css';
import { CalendarAppointments, Pet, User, PostAppointment } from '@/utils/types';
import { UserService } from '@/services/Client/UserService';
import { BookingService } from '@/services/Client/BookingService';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { PetService } from '@/services/Client/PetService';
import {z} from 'zod';

interface EditEventDialogProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    appointment: CalendarAppointments | null;
}

const doctorSchema = z.object({
    docsNotes: z.string().min(1, { message: 'Doctor notes are required' }),
});


export default function DoctorNotesDialog({ isOpen, setIsOpen, appointment }: EditEventDialogProps) { 
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const form = useForm<z.infer<typeof doctorSchema>>({
        resolver: zodResolver(doctorSchema),
        defaultValues: {
            docsNotes: '',
        }
    });

    const handleClose = () => {
        form.reset();
        setIsOpen(false);
    };

    // Update appointment
    const updateAppointment = async (data: PostAppointment) => {
        if (!appointment) return;
        return (await BookingService.updateBooking(appointment.id.toString(), data)).data;
    }

    const appointmentMutation = useMutation({
        mutationFn: updateAppointment,
        onSuccess: (data:any) => {
            toast({
                variant: 'success',
                title: 'Appointment updated successfully',
                description: 'The appointment was updated successfully',
            });
            queryClient.invalidateQueries('appointments');
            setIsOpen(false);
            form.reset();
        },
        onError: () => {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'An error occurred while updating the appointment',
            });
        }
    });

    const onAppointmentSubmit = (data: any ) => {

        const updatedEvent: any = {
            id : appointment?.id,
            title: appointment?.title,
            type: appointment?.type,
            doctor: appointment?.doctor,
            pet: appointment?.pet,
            startDate: appointment?.start.toISOString(),
            endDate: appointment?.end.toISOString(),
            docNotes: data.docsNotes,
        };

        console.log('merdas', updatedEvent);
        
        appointmentMutation.mutate(updatedEvent);
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Appointment</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onAppointmentSubmit)} className='space-y-4'>
                            <div className="grid gap-4">
                                <FormField control={form.control} name='docsNotes' render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-black'>
                                            Doctor Notes
                                        </FormLabel>
                                        <FormDescription>
                                            As a doctor, you can add notes to the appointment to keep track of the patient's health.
                                        </FormDescription>
                                        <FormControl>
                                            <textarea {...field} className='w-full p-2 border border-gray-300 rounded-md' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </div>
                            <div className='flex pt-4 justify-end space-x-3'>
                                <Button type='submit'>Submit</Button>
                                <Button variant={'outline'} onClick={handleClose}>Cancel</Button>
                            </div>
                        </form>
                    </Form>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
}
