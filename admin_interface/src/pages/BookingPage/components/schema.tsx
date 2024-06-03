import { z } from 'zod';

const isValidTime = (value: string) => {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return timeRegex.test(value);
};

const appointmentSchema = z.object({
    petId : z.string().min(1, { message: 'Pet is required' }),
    type: z.string().min(1, { message: 'Type is required' })
        .max(50, { message: 'Type must not be longer than 50 characters' }),
    doctor : z.any(),
    start: z.date(),
    estimatedDuration: z.string().refine(isValidTime, { message: 'Time must be in HH:mm format' }),
    title: z.string().min(1, { message: 'Title is required' })
        .max(50, { message: 'Title must not be longer than 50 characters' }),
});

export type AppointmentFormValues = z.infer<typeof appointmentSchema>;

export { appointmentSchema };