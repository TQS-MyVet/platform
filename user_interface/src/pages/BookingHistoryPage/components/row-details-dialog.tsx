// src/components/row-details-dialog.tsx

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose
} from '@/components/ui/dialog';
import { Appointment } from '../data/schema';

interface RowDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  task: Appointment | null;
}

export function RowDetailsDialog({ isOpen, onClose, task }: RowDetailsDialogProps) {
  if (!task) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Appointment Details</DialogTitle>
          <DialogClose onClick={onClose} />
        </DialogHeader>
        <DialogDescription>
          <p><strong>ID:</strong> {task.id}</p>
          <p><strong>Doc Notes:</strong> {task.docNotes}</p>
          <p><strong>Type:</strong> {task.type}</p>
          <p><strong>Start Date:</strong> {new Date(task.startDate).toLocaleString()}</p>
          <p><strong>End Date:</strong> {new Date(task.endDate).toLocaleString()}</p>
          <p><strong>Doctor's Name:</strong> {task.doctor}</p>
          <p><strong>Pet's Name:</strong> {task.pet}</p>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
