import React, { useState } from 'react';
import { bookingApi } from '../api/booking.api';
import type { BookingFormData } from '../types';

const Booking = () => {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    phone: '',
    service: 'Гостиница',
    date: '',
    time: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await bookingApi.create(formData);

      // Генерируем текст для WhatsApp
      const message = `Здравствуйте! Я хочу записаться в VetVoyage.%0A%0AУслуга: ${formData.service}%0AДата: ${formData.date}%0AВремя: ${formData.time}%0AИмя: ${formData.name}%0AТелефон: ${formData.phone}`;
      
      // Номер админа (ваш номер)
      const adminPhone = "77718637508"; 
      
      // Перенаправляем на WhatsApp
      window.open(`https://wa.me/${adminPhone}?text=${message}`, '_blank');
      
      alert('Заявка создана! Сейчас вы будете перенаправлены в WhatsApp для подтверждения.');
    } catch (error: any) {
      console.error(error);
      alert(error.message || 'Произошла ошибка при создании заявки. Пожалуйста, попробуйте позже.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="bg-cream">
      <div className="container reveal">
        <div className="section-title">
          <h2>Запись на сервис</h2>
          <p className="text-italic">Заполните форму, и мы свяжемся с вами для подтверждения</p>
        </div>
        
        <div className="register-form">
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
            <button type="submit" className="btn" style={{ width: '100%', marginTop: '30px' }}>
              Подтвердить в WhatsApp
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Booking;
