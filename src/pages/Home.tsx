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
          <p className="reveal text-gold" style={{ letterSpacing: '0.4em', fontWeight: 700, marginBottom: '20px' }}>EST. 2026 • PREMIUM CARE</p>
          <h2 className="reveal text-gold-shimmer">VetVoyage: Искусство преданности</h2>
          <p className="reveal italic">Экосистема, где технологии будущего встречаются с искренним теплом человеческого сердца.</p>
          <div className="hero-btns reveal" style={{ marginTop: '40px' }}>
            <Link to="/booking" className="btn">Забронировать визит</Link>
            <Link to="/pricing" className="btn btn-outline" style={{ marginLeft: '20px' }}>Наши услуги</Link>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container">
          <div className="section-title reveal">
            <h2 style={{ fontSize: '3rem' }}>Сервисы Excellence</h2>
            <p className="italic" style={{ color: 'var(--primary)', marginTop: '10px' }}>Безупречность в каждой детали</p>
          </div>
          <div className="categories">
            {services.map(service => (
              <div key={service.id} className="category-card reveal">
                <div className="card-image-wrapper">
                  <img src={service.img} alt={service.name} />
                </div>
                <div className="card-content" style={{ textAlign: 'center' }}>
                  <h3>{service.name}</h3>
                  <p className="italic">{service.desc}</p>
                  <Link to="/pricing" className="btn btn-outline" style={{ padding: '12px 30px', fontSize: '0.7rem' }}>Подробнее</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream" style={{ borderTop: '1px solid var(--divider)' }}>
        <div className="container">
          <div className="section-title reveal">
            <h2>Почему выбирают нас</h2>
          </div>
          <div className="features-grid">
            <div className="feature-item reveal">
              <span style={{ fontSize: '3rem', color: 'var(--primary)' }}>◆</span>
              <h3 style={{ textTransform: 'uppercase', letterSpacing: '0.15em' }}>Высший стандарт</h3>
              <p>Мы используем только проверенные методики и оборудование мирового класса.</p>
            </div>
            <div className="feature-item reveal">
              <span style={{ fontSize: '3rem', color: 'var(--primary)' }}>◆</span>
              <h3 style={{ textTransform: 'uppercase', letterSpacing: '0.15em' }}>Забота с любовью</h3>
              <p>Каждый питомец для нас — член семьи, требующий индивидуального подхода и тепла.</p>
            </div>
            <div className="feature-item reveal">
              <span style={{ fontSize: '3rem', color: 'var(--primary)' }}>◆</span>
              <h3 style={{ textTransform: 'uppercase', letterSpacing: '0.15em' }}>Безопасность 24/7</h3>
              <p>Круглосуточное видеонаблюдение и дежурный специалист в каждой зоне сервиса.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
