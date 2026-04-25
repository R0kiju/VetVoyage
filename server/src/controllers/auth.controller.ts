import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../db';
import { loginSchema } from '../types/schemas';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

export const login = async (req: Request, res: Response) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    const { password } = validatedData;

    const result = await query('SELECT * FROM users WHERE username = $1', ['admin']);
    const admin = result.rows[0];

    if (admin && await bcrypt.compare(password, admin.password_hash)) {
      const token = jwt.sign({ username: 'admin' }, JWT_SECRET, { expiresIn: '1d' });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Неверный пароль' });
    }
  } catch (err: any) {
    if (err.name === 'ZodError') {
      return res.status(400).json({ message: 'Ошибка валидации', errors: err.errors });
    }
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};
