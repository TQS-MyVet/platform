import {z} from 'zod';

const AddPetSchema = z.object({
    name: z.string().min(1, { message: 'Pet name is required' })
                    .max(50, { message: 'Pet name must not be longer than 50 characters' }),
    sex: z
    .string().min(1, { message: 'Sex is required' }),
    birthdate: z
    .date({
      required_error: 'Pet birthdate is required',
    }),
    species: z
    .string().min(1, { message: 'Pet species is required' }),
});

type AddPetFormValues = z.infer<typeof AddPetSchema>;

export { AddPetSchema };

export type { AddPetFormValues };