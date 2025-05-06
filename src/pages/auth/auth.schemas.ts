import { z } from 'zod';

export type ILoginFields = {
   email: string;
   password: string;
};

const Cubex = z
   .string()
   .trim()
   .refine((value) => value.length >= 8, {
      message: 'Password cannot be less than 8 characters',
   });

export const loginSchema = z.object({
   email: z.string().email({ message: 'Invalid email address' }),
   password: Cubex,
});
