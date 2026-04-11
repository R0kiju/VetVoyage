import React, { useState, useEffect } from 'react';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
      fetchBookings(token);
    }
  }, []);

  const fetchBookings = async (token: string) => {
    try {
      const response = await fetch('/api/bookings', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      } else if (response.status === 401) {
        handleLogout();
      }
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('adminToken', token);
        setIsAuthenticated(true);
        fetchBookings(token);
      } else {
        alert('Неверный пароль!');
      }
    } catch (error) {
      alert('Ошибка при входе');
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

    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        setBookings(bookings.filter(b => b.id !== id));
      }
    } catch (error) {
      alert('Ошибка при удалении');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
        <div className="register-form" style={{ maxWidth: '300px', margin: '0 auto' }}>
          <h2>Вход для админа</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input 
                type="password" 
                placeholder="Введите пароль" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '10px' }}
                disabled={loading}
              />
            </div>
            <button type="submit" className="btn" style={{ width: '100%' }} disabled={loading}>
              {loading ? 'Вход...' : 'Войти'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '50px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Панель администратора: Список записей</h2>
        <button onClick={handleLogout} className="btn" style={{ background: 'var(--divider)', color: 'var(--text)' }}>Выйти</button>
      </div>
      <p>Здесь отображаются все клиенты, которые записались через сайт.</p>

      <div className="table-wrapper">
        <table className="pricing-table">
          <thead>
            <tr>
              <th>Дата/Время</th>
              <th>Клиент</th>
              <th>Телефон</th>
              <th>Услуга</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr><td colSpan={5} style={{ textAlign: 'center' }}>Записей пока нет</td></tr>
            ) : (
              [...bookings].sort((a,b) => b.id - a.id).map((b) => (
                <tr key={b.id}>
                  <td>{b.date} / {b.time}</td>
                  <td>{b.name}</td>
                  <td>{b.phone}</td>
                  <td>{b.service}</td>
                  <td>
                    <button 
                      onClick={() => deleteBooking(b.id)}
                      style={{ background: 'var(--accent)', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
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
  );
};

export default Admin;
