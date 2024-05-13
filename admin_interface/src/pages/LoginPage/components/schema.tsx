import { z } from 'zod';

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    });

type FormValues = z.infer<typeof loginSchema>;

export { loginSchema }
export type { FormValues }