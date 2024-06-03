// EventDialog.tsx
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { CalendarAppointments } from '@/utils/types';
import { Button } from '@/components/ui/button';
import { useUserStore } from '@/stores/useUserStore';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BookingService } from '@/services/Client/BookingService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';

interface EventDialogProps {
    isOpen: boolean;
    event: CalendarAppointments | null;
    setIsOpen: (isOpen: boolean) => void;
    isEditEventOpen: boolean;
    setEditEventOpen: (isOpen: boolean) => void;
    setIsAddDocNotesOpen: (isOpen: boolean) => void;
}

const EventDialog: React.FC<EventDialogProps> = ({ isOpen, event, setIsOpen, setEditEventOpen, setIsAddDocNotesOpen }) => {

  const user = useUserStore();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleOpenEditEvent = () => {
    setEditEventOpen(true);
    setIsOpen(false);
  }

  const handleOpenAddDocNotes = () => {
    setIsAddDocNotesOpen(true);
    setIsOpen(false);
  }

  const deleteAppointment = async (id: number) => {
    return await (await BookingService.deleteBooking(id)).data;
  }

  const { mutate: deleteMutation } = useMutation({
    mutationFn: deleteAppointment,
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Appointment Deleted',
        description: 'The appointment has been successfully deleted',
      });
      setIsOpen(false);
      queryClient.invalidateQueries('appointments');
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'An error occurred while deleting the appointment',
      });
    }
  })

  if (!event) return null;

  console.log(event);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md mx-auto p-6 rounded-lg shadow-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{event.title}</DialogTitle>
        </DialogHeader>
        <DialogDescription className="mt-4">
          <div className="space-y-2 text-lg">
            <p><strong className="text-gray-700">Type:</strong> {event.type}</p>
            <p><strong className="text-gray-700">Start:</strong> {event.start.toLocaleString()}</p>
            <p><strong className="text-gray-700">End:</strong> {event.end.toLocaleString()}</p>
            {event.docNotes && <p className="overflow-x-auto w-[390px] break-words"><strong className="text-gray-700">Doc Notes:</strong> {event.docNotes}</p>}            <Accordion type='single' collapsible className='w-full'>
              <AccordionItem value='pet-info'>
                <AccordionTrigger>
                  <div>
                      <strong className="text-gray-700">Pet Information</strong>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <p><strong className="text-gray-700 font-semibold text-md">Name:</strong> {event.pet.name}</p>
                    <p><strong className="text-gray-700 font-semibold text-md">Species:</strong> {event.pet.species}</p>
                    <p><strong className="text-gray-700 font-semibold text-md">Sex:</strong> {event.pet.sex}</p>
                    <p><strong className="text-gray-700 font-semibold text-md">Birthdate:</strong> {event.pet.birthdate}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='doctor-info'>
                <AccordionTrigger>
                  <div>
                      <strong className="text-gray-700">Doctor Information</strong>
                  </div>                
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <p><strong className="text-gray-700 font-semibold text-md">Name:</strong> {event.doctor.name}</p>
                    <p><strong className="text-gray-700 font-semibold text-md">Email:</strong> {event.doctor.email}</p>
                    <p><strong className="text-gray-700 font-semibold text-md">Phone:</strong> {event.doctor.phone}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className='flex pt-6 flex-row justify-end space-x-2'>
            {user.roles.includes('DOCTOR') && <Button className='bg-green-100 text-black hover:bg-green-200 hover:border' onClick={() => handleOpenAddDocNotes()}>Add Doctor Notes</Button>}
            <Button variant={'outline'} onClick={handleOpenEditEvent}>Edit</Button>
            <Button variant='destructive' onClick={() => deleteMutation(event.id)}>Delete</Button>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

export default EventDialog;
