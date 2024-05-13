import { z } from 'zod';

const accountSchema = z.object({
  ownerName: z.string()
    .min(1, { message: 'Name is required' })
    .max(50, { message: 'Name must not be longer than 50 characters' }),
  phone: z
    .string().min(1, { message: 'Phone number is required' })
    .refine(phone => (phone ? /^\+?[1-9]\d{1,14}$/.test(phone) : true), {
        message: 'Invalid phone number',
    }),
  email: z.string().email(),
  petName: z.string()
    .min(1, { message: 'Pet name is required' })
    .max(50, { message: 'Pet name must not be longer than 50 characters' }),
  petGenre: z
   .string().min(1, { message: 'Pet genre is required' }),
  petBirthdate: z
  .date({
    required_error: 'Pet birthdate is required',
  }),
  petSpecies: z
    .string().min(1, { message: 'Pet species is required' }),
});

type AccountChangeFormValues = z.infer<typeof accountSchema>;

export { accountSchema };
export type { AccountChangeFormValues };
