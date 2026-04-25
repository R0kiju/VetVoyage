import { Request, Response } from 'express';
import { query } from '../db';
import { bookingSchema } from '../types/schemas';

export const createBooking = async (req: Request, res: Response) => {
  try {
    const validatedData = bookingSchema.parse(req.body);
    const { name, phone, service, date, time } = validatedData;

    const result = await query(
      'INSERT INTO bookings (name, phone, service, date, time) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, phone, service, date, time]
    );
    res.status(201).json(result.rows[0]);
  } catch (err: any) {
    if (err.name === 'ZodError') {
      return res.status(400).json({ message: 'Ошибка валидации', errors: err.errors });
    }
    console.error('Error creating booking:', err);
    res.status(500).json({ message: 'Ошибка при сохранении' });
  }
};

export const getBookings = async (req: Request, res: Response) => {
  try {
    const result = await query('SELECT * FROM bookings ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при получении данных' });
  }
};

export const deleteBooking = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await query('DELETE FROM bookings WHERE id = $1', [parseInt(id as string)]);
    res.json({ message: 'Удалено' });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при удалении' });
  }
};
