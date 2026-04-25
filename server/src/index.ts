import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { initDb, query } from './db';
import authRoutes from './routes/auth.routes';
import bookingRoutes from './routes/booking.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

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

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);

// --- СТАТИЧЕСКИЕ ФАЙЛЫ ---
const frontendPath = path.join(__dirname, '../../dist');
app.use(express.static(frontendPath));

// Для SPA: если запрос не к API и файл не найден, отдаем index.html
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Запуск
const start = async () => {
  try {
    await initDb();
    await ensureAdmin();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
  }
};

start();
