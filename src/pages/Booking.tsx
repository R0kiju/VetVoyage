import React, { useState } from 'react';

const Booking = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'Гостиница',
    date: '',
    time: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Сохраняем на бэкенд
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Ошибка при сохранении бронирования');
      }

      // Генерируем текст для WhatsApp
      const message = `Здравствуйте! Я хочу записаться в VetVoyage.%0A%0AУслуга: ${formData.service}%0AДата: ${formData.date}%0AВремя: ${formData.time}%0AИмя: ${formData.name}%0AТелефон: ${formData.phone}`;
      
      // Номер админа (ваш номер)
      const adminPhone = "77718637508"; 
      
      // Перенаправляем на WhatsApp
      window.open(`https://wa.me/${adminPhone}?text=${message}`, '_blank');
      
      alert('Заявка создана! Сейчас вы будете перенаправлены в WhatsApp для подтверждения.');
    } catch (error) {
      console.error(error);
      alert('Произошла ошибка при создании заявки. Пожалуйста, попробуйте позже.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container reveal">
      <div className="register-form">
        <h2 style={{ textAlign: 'center' }}>Запись на сервис</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">ФИО владельца</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              placeholder="Иван Иванов"
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Телефон</label>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              placeholder="+7 (___) ___-__-__"
              value={formData.phone} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="service">Выберите услугу</label>
            <select 
              id="service" 
              name="service" 
              value={formData.service} 
              onChange={handleChange}
              style={{ width: '100%', padding: '10px', border: '1px solid var(--divider)', background: 'var(--background)' }}
            >
              <option value="Гостиница">Гостиница (передержка)</option>
              <option value="Ветеринария">Ветеринарный осмотр</option>
              <option value="Груминг">Груминг</option>
              <option value="Спецтакси">Спецтакси</option>
            </select>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">Дата</label>
              <input 
                type="date" 
                id="date" 
                name="date" 
                value={formData.date} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="time">Время</label>
              <input 
                type="time" 
                id="time" 
                name="time" 
                value={formData.time} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>
          <button type="submit" className="btn" style={{ width: '100%', marginTop: '20px' }}>Записаться и подтвердить в WhatsApp</button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
