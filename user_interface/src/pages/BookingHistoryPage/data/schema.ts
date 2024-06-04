import { z } from 'zod'

export const taskSchema = z.object({
  id: z.string(),
  docNotes: z.string(),
  type: z.string(),
  startDate: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  doctor: z.string(),
})

export type Task = z.infer<typeof taskSchema>

// src/data/schema.ts

// src/data/schema.ts

export interface Doctor {
  id: number;
  name: string;
  email: string;
  phone: string;
  roles: string[];
}

export interface Pet {
  id: number;
  name: string;
  sex: string;
  birthdate: string;
  species: string;
}

export interface Appointment {
  id: number;
  startDate: string;
  endDate: string;
  type: string;
  docNotes: string;
  title: string;
  doctor: Doctor;
  pet: Pet;
}


