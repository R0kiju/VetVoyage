import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-info">
            <h2>VetVoyage</h2>
            <p>Премиальный сервис для ваших питомцев. Мы создаем комфорт и обеспечиваем профессиональный уход, чтобы вы были спокойны.</p>
          </div>
          
          <div className="footer-links">
            <h4>Навигация</h4>
            <ul>
              <li><Link to="/">Главная</Link></li>
              <li><Link to="/pricing">Услуги и цены</Link></li>
              <li><Link to="/booking">Запись</Link></li>
              <li><Link to="/admin">Панель управления</Link></li>
            </ul>
          </div>
          
          <div className="footer-contact">
            <h4>Контакты</h4>
            <p>Тел: +7 (771) 863-75-08</p>
            <p>Email: info@vetvoyage.kz</p>
            <p>Режим работы: 24/7</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} VetVoyage. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
