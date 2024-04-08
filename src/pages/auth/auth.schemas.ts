import { z } from 'zod';

export type ILoginFields = {
   email: string;
   password: string;
};

const Cubex = z
   .string()
   .trim()
   .refine((value) => value === 'admin' || value === 'user', {
      message: 'Field must be "admin" or "user"',
   });

export const loginSchema = z.object({
   email: Cubex,
   password: Cubex,
});
