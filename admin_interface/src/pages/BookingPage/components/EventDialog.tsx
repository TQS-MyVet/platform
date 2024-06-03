// EventDialog.tsx
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Appointment } from '@/utils/types';
import { Button } from '@/components/ui/button';
import { useUserStore } from '@/stores/useUserStore';

interface EventDialogProps {
    isOpen: boolean;
    event: Appointment | null;
    setIsOpen: (isOpen: boolean) => void;
}

const EventDialog: React.FC<EventDialogProps> = ({ isOpen, event, setIsOpen }) => {

  const user = useUserStore();

  if (!event) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md mx-auto p-6 rounded-lg shadow-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{event.title}</DialogTitle>
        </DialogHeader>
        <DialogDescription className="mt-4">
          <div className="space-y-2 text-lg">
            <p><strong>Type:</strong> {event.type}</p>
            <p><strong>Doctor:</strong> {event.doctor}</p>
            <p><strong>Owner:</strong> {event.owner}</p>
            <p><strong>Pet Name:</strong> {event.petName}</p>
            <p><strong>Start:</strong> {event.start.toLocaleString()}</p>
            <p><strong>End:</strong> {event.end.toLocaleString()}</p>
          </div>
          <div className='flex pt-6 flex-row justify-end space-x-2'>
            {user.roles.includes('DOCTOR') && <Button className='bg-green-100 text-black hover:bg-green-200 hover:border'>Add Notes</Button>}
            <Button variant={'outline'}>Edit</Button>
            <Button variant='destructive'>Delete</Button>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

export default EventDialog;
