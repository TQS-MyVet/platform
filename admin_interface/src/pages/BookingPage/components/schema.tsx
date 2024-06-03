import { z } from 'zod';

const isValidTime = (value: string) => {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return timeRegex.test(value);
};

// Define schema for Pet
const petSchema = z.object({
    name: z.string().min(1, { message: 'Pet name is required' })
        .max(50, { message: 'Pet name must not be longer than 50 characters' }),
    sex: z.string().min(1, { message: 'Sex is required' }),
    birthdate: z.string().min(1, { message: 'Birthdate is required' }),
    species: z.string().min(1, { message: 'Species is required' }),
    UserId: z.number(),
  });

const userSchema = z.object({
    name: z.string().min(1, { message: 'Owner name is required' })
        .max(50, { message: 'Owner name must not be longer than 50 characters' }),
    email: z.string().email({ message: 'Invalid email address' }),
    phone: z.string().min(1, { message: 'Phone number is required' }),
    roles: z.array(z.string()),
    pets: z.array(petSchema),
  });

const appointmentSchema = z.object({
    pet : petSchema,
    type: z.string().min(1, { message: 'Type is required' })
        .max(50, { message: 'Type must not be longer than 50 characters' }),
    doctor : userSchema,
    start: z.date(),
    estimatedDuration: z.string().refine(isValidTime, { message: 'Time must be in HH:mm format' }),
    title: z.string().min(1, { message: 'Title is required' })
        .max(50, { message: 'Title must not be longer than 50 characters' }),
});

export type AppointmentFormValues = z.infer<typeof appointmentSchema>;

export { appointmentSchema };