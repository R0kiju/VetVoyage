import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'vetvoyage',
  password: process.env.DB_PASSWORD || 'postgres',
  port: parseInt(process.env.DB_PORT || '5432'),
});

export interface Booking {
  id: number;
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  created_at: string;
}

export interface User {
  id: number;
  username: string;
  password_hash: string;
}

export const initDb = async () => {
  const client = await pool.connect();
  try {
    // Создаем таблицу пользователей
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL
      );
    `);

    // Создаем таблицу бронирований
    await client.query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        service TEXT NOT NULL,
        date TEXT NOT NULL,
        time TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('PostgreSQL tables initialized');
  } catch (err) {
    console.error('Error initializing PostgreSQL tables:', err);
  } finally {
    client.release();
  }
};

export const query = (text: string, params?: any[]) => pool.query(text, params);
