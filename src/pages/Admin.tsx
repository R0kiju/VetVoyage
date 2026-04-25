import React, { useState, useEffect } from 'react';
import { authApi } from '../api/auth.api';
import { bookingApi } from '../api/booking.api';
import type { Booking } from '../types';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
      fetchBookings();
    }
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await bookingApi.getAll();
      setBookings(data);
    } catch (error: any) {
      console.error('Ошибка при загрузке данных:', error);
      if (error.message.includes('401') || error.message.includes('Нет доступа')) {
        handleLogout();
      }
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { token } = await authApi.login(password);
      localStorage.setItem('adminToken', token);
      setIsAuthenticated(true);
      fetchBookings();
    } catch (error: any) {
      alert(error.message || 'Ошибка при входе');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setBookings([]);
  };

  const deleteBooking = async (id: number) => {
    if (!window.confirm('Вы уверены, что хотите удалить эту запись?')) return;

    try {
      await bookingApi.delete(id);
      setBookings(bookings.filter(b => b.id !== id));
    } catch (error: any) {
      alert(error.message || 'Ошибка при удалении');
    }
  };

  if (!isAuthenticated) {
    return (
      <section className="bg-cream" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <div className="container">
          <div className="register-form" style={{ maxWidth: '400px' }}>
            <div className="section-title" style={{ marginBottom: '30px' }}>
              <h2 style={{ fontSize: '1.8rem' }}>Admin Access</h2>
            </div>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Пароль администратора</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
              <button type="submit" className="btn" style={{ width: '100%', marginTop: '10px' }} disabled={loading}>
                {loading ? 'Вход...' : 'Войти в систему'}
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', borderBottom: '1px solid var(--divider)', paddingBottom: '20px' }}>
          <div>
            <h2 style={{ marginBottom: '10px' }}>Панель управления</h2>
            <p className="text-italic">Список всех активных заявок клиентов</p>
          </div>
          <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '10px 25px' }}>Выйти</button>
        </div>

        <div className="table-wrapper">
          <table className="pricing-table">
            <thead>
              <tr>
                <th>Дата / Время</th>
                <th>Клиент</th>
                <th>Телефон</th>
                <th>Услуга</th>
                <th>Действие</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr><td colSpan={5} style={{ textAlign: 'center', padding: '40px' }}>Записей пока нет</td></tr>
              ) : (
                [...bookings].sort((a,b) => b.id - a.id).map((b) => (
                  <tr key={b.id}>
                    <td style={{ fontWeight: 600 }}>{b.date} / {b.time}</td>
                    <td>{b.name}</td>
                    <td>{b.phone}</td>
                    <td><span className="text-gold">{b.service}</span></td>
                    <td>
                      <button 
                        onClick={() => deleteBooking(b.id)}
                        style={{ background: 'var(--accent)', color: 'white', border: 'none', padding: '8px 15px', cursor: 'pointer', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px' }}
                      >
                        Удалить
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Admin;
