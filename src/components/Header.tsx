import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header>
      <div className="container">
        <nav>
          <div className="logo">
            <Link to="/"><h1>VetVoyage</h1></Link>
          </div>
          <ul>
            <li>
              <Link to="/" className={isActive('/') ? 'active' : ''}>Главная</Link>
            </li>
            <li>
              <Link to="/pricing" className={isActive('/pricing') ? 'active' : ''}>Цены</Link>
            </li>
            <li>
              <Link to="/booking" className={isActive('/booking') ? 'active' : ''}>Запись</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
