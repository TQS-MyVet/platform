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
