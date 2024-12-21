import { z } from 'zod';

const registerUserValidationSchema = z.object({
  body: z.object({
    name: z.string({ message: 'Name is required' }).trim(),
    email: z.string().email({ message: 'Invalid email' }),
    password: z.string({ invalid_type_error: 'Invalid Password' }),
    role: z
      .enum(['admin', 'user'], { message: 'Invalid role' })
      .optional()
      .default('user'),
  }),
});

const loginUserValidationSchema = z.object({
  body: z.object({
    email: z.string({
      invalid_type_error: 'invalid email',
    }),
    password: z.string({
      invalid_type_error: 'Password Invalid',
    }),
  }),
});

export const UserValidationSchema = {
  registerUserValidationSchema,
  loginUserValidationSchema,
};
