import { z } from 'zod';

export const loginSchema = z.object({
  password: z.string().min(1, 'Пароль обязателен'),
});

export const bookingSchema = z.object({
  name: z.string().min(2, 'Имя слишком короткое'),
  phone: z.string().min(5, 'Некорректный номер телефона'),
  service: z.string().min(1, 'Услуга не выбрана'),
  date: z.string().min(1, 'Дата не выбрана'),
  time: z.string().min(1, 'Время не выбрано'),
});
