import * as React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog'
import { Task } from '../data/schema'

interface RowDetailsDialogProps {
  isOpen: boolean
  onClose: () => void
  task: Task | null
}

export function RowDetailsDialog({ isOpen, onClose, task }: RowDetailsDialogProps) {
  if (!task) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Task Details</DialogTitle>
          <DialogClose onClick={onClose} />
        </DialogHeader>
        <DialogDescription>
          <p><strong>ID:</strong> {task.id}</p>
          <p><strong>Doc Notes:</strong> {task.docNotes}</p>
          <p><strong>Type:</strong> {task.type}</p>
          <p><strong>Start Date:</strong> {task.startDate}</p>
          <p><strong>Doctor:</strong> {task.doctor}</p>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
