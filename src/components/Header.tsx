import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div className="container">
        <nav>
          <div className="logo">
            <Link to="/"><h1>VetVoyage</h1></Link>
          </div>
          <ul>
            <li><Link to="/">Главная</Link></li>
            <li><Link to="/pricing">Цены</Link></li>
            <li><Link to="/booking">Запись</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
