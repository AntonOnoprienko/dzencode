import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Неверный формат email'),
  password: z.string().min(6, 'Пароль должен быть минимум 6 символов'),
});

export const registerSchema = z
  .object({
    name: z.string().min(1, 'Имя обязательно'),
    email: z.string().email('Неверный формат email'),
    password: z.string().min(6, 'Пароль должен быть минимум 6 символов'),
    confirmPassword: z.string().min(6, 'Пароль должен быть минимум 6 символов'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });
