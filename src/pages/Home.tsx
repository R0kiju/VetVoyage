import { Link } from 'react-router-dom';

const Home = () => {
  const services = [
    { id: 1, name: 'Гостиница', img: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&h=800&fit=crop', desc: 'Комфортабельная передержка с круглосуточным наблюдением и заботой.' },
    { id: 2, name: 'Ветеринария', img: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=600&h=800&fit=crop', desc: 'Профессиональная медицинская поддержка, осмотры и вакцинация.' },
    { id: 3, name: 'Груминг', img: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600&h=800&fit=crop', desc: 'Полный спектр ухода за внешним видом: от стрижки до SPA-процедур.' },
    { id: 4, name: 'Спецтакси', img: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&h=800&fit=crop', desc: 'Безопасная перевозка животных в специализированном транспорте.' }
  ];

  return (
    <div>
      <section className="hero">
        <div className="container hero-content">
          <p className="fade-in text-gold">Premium Pet Services</p>
          <h2>VetVoyage: Экосистема заботы о вашем питомце</h2>
          <p className="hero-subtext">Комплексный подход и безупречный сервис для тех, кто выбирает лучшее.</p>
          <div className="hero-btns">
            <Link to="/booking" className="btn">Записаться</Link>
            <Link to="/pricing" className="btn btn-outline" style={{ marginLeft: '20px' }}>Наши услуги</Link>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container">
          <div className="section-title reveal">
            <h2>Наши Услуги</h2>
          </div>
          <div className="categories">
            {services.map(service => (
              <div key={service.id} className="category-card reveal">
                <div className="card-image-wrapper">
                  <img src={service.img} alt={service.name} />
                </div>
                <div className="card-content">
                  <h3>{service.name}</h3>
                  <p>{service.desc}</p>
                  <Link to="/pricing" className="btn btn-outline" style={{ padding: '10px 25px' }}>Подробнее</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="container">
          <div className="section-title reveal">
            <h2>Почему выбирают нас</h2>
          </div>
          <div className="features-grid">
            <div className="feature-item reveal">
              <span style={{ fontSize: '2.5rem' }}>🏆</span>
              <h3>Высший стандарт</h3>
              <p>Мы используем только проверенные методики и лучшее оборудование.</p>
            </div>
            <div className="feature-item reveal">
              <span style={{ fontSize: '2.5rem' }}>❤️</span>
              <h3>Забота с любовью</h3>
              <p>Каждый питомец для нас — член семьи, требующий индивидуального подхода.</p>
            </div>
            <div className="feature-item reveal">
              <span style={{ fontSize: '2.5rem' }}>🛡️</span>
              <h3>Безопасность 24/7</h3>
              <p>Круглосуточное видеонаблюдение и дежурный ветеринар в гостинице.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
