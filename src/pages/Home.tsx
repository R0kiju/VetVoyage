import { Link } from 'react-router-dom';

const Home = () => {
  const services = [
    { id: 1, name: 'Гостиница', img: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=300&fit=crop', desc: 'Комфортабельная передержка с круглосуточным наблюдением.' },
    { id: 2, name: 'Ветеринария', img: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=400&h=300&fit=crop', desc: 'Профессиональная медицинская поддержка и осмотры.' },
    { id: 3, name: 'Груминг', img: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400&h=300&fit=crop', desc: 'Полный спектр ухода за внешним видом вашего питомца.' },
    { id: 4, name: 'Спецтакси', img: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop', desc: 'Безопасная перевозка животных в специализированном транспорте.' }
  ];

  return (
    <div>
      <section className="hero">
        <div className="container">
          <h2>VetVoyage: Единая экосистема сервисов для домашних животных</h2>
          <p>Комплексный подход, обеспечивающий владельцам обслуживание «под ключ».</p>
          <Link to="/booking" className="btn">Оставить заявку</Link>
        </div>
      </section>

      <section className="container reveal">
        <h2 style={{ textAlign: 'center', margin: '40px 0' }}>Наши услуги</h2>
        <div className="categories">
          {services.map(service => (
            <div key={service.id} className="category-card reveal">
              <img src={service.img} alt={service.name} />
              <h3>{service.name}</h3>
              <p>{service.desc}</p>
              <Link to="/pricing" className="btn">Узнать цены</Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
