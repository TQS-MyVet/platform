import { z } from 'zod';

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, { message: 'Password is required' }),
    });

type FormValues = z.infer<typeof loginSchema>;

export { loginSchema }
export type { FormValues }