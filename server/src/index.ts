import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { initDb, query, Booking, User } from './db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

app.use(cors());
app.use(express.json());

// Инициализация БД (начальный админ)
const ensureAdmin = async () => {
  try {
    const result = await query('SELECT * FROM users WHERE username = $1', ['admin']);
    
    if (result.rows.length === 0) {
      const adminPassword = process.env.ADMIN_PASSWORD || 'admin1234';
      const passwordHash = await bcrypt.hash(adminPassword, 10);
      await query(
        'INSERT INTO users (username, password_hash) VALUES ($1, $2)',
        ['admin', passwordHash]
      );
      console.log('Admin user created in PostgreSQL');
    }
  } catch (err) {
    console.error('Error ensuring admin user:', err);
  }
};

// Middleware для авторизации
const authMiddleware = (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Нет доступа' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Неверный токен' });
  }
};

// Эндпоинты
app.post('/api/auth/login', async (req: any, res: any) => {
  const { password } = req.body;
  try {
    const result = await query('SELECT * FROM users WHERE username = $1', ['admin']);
    const admin = result.rows[0];

    if (admin && await bcrypt.compare(password, admin.password_hash)) {
      const token = jwt.sign({ username: 'admin' }, JWT_SECRET, { expiresIn: '1d' });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Неверный пароль' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

app.post('/api/bookings', async (req: any, res: any) => {
  const { name, phone, service, date, time } = req.body;
  try {
    const result = await query(
      'INSERT INTO bookings (name, phone, service, date, time) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, phone, service, date, time]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating booking:', err);
    res.status(500).json({ message: 'Ошибка при сохранении' });
  }
});

app.get('/api/bookings', authMiddleware, async (req: any, res: any) => {
  try {
    const result = await query('SELECT * FROM bookings ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при получении данных' });
  }
});

app.delete('/api/bookings/:id', authMiddleware, async (req: any, res: any) => {
  const id = parseInt(req.params.id);
  try {
    await query('DELETE FROM bookings WHERE id = $1', [id]);
    res.json({ message: 'Удалено' });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при удалении' });
  }
});

// --- СТАТИЧЕСКИЕ ФАЙЛЫ (Для Production на Render.com) ---
const frontendPath = path.join(__dirname, '../../dist');
app.use(express.static(frontendPath));

// Все остальные запросы (кроме /api) перенаправляем на index.html фронтенда (для SPA)
app.get('/*', (req: any, res: any) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(frontendPath, 'index.html'));
  }
});

// Запуск
const start = async () => {
  await initDb();
  await ensureAdmin();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
