
import React from 'react';
import '../styles/Poster.css';

const Poster = () => {
  return (
    <div className="poster-preview-container">
      <button className="poster-print-btn" onClick={() => window.print()}>
        Распечатать плакат
      </button>
      
      <div className="poster-canvas">
        <div className="poster-border"></div>
        
        <header className="poster-header">
          <h1 className="poster-logo">VetVoyage</h1>
          <p className="poster-tagline">Premium Pet Services</p>
        </header>

        <div className="poster-main-image">
          <img 
            src="https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=1200&h=1600&fit=crop" 
            alt="Premium Pet Care" 
          />
        </div>

        <div className="poster-content">
          <div className="poster-divider"></div>
          <h2 className="poster-headline">
            Экосистема заботы<br />
            о вашем питомце
          </h2>
          
          <div className="poster-services">
            <span className="poster-service-item">Гостиница</span>
            <span className="poster-service-item">•</span>
            <span className="poster-service-item">Ветеринария</span>
            <span className="poster-service-item">•</span>
            <span className="poster-service-item">Груминг</span>
          </div>

          <p style={{ fontStyle: 'italic', color: '#555', marginBottom: '30px', fontSize: '1.1rem' }}>
            Комплексный подход и безупречный сервис для тех,<br />
            кто выбирает лучшее для своих четвероногих друзей.
          </p>
        </div>

        <footer className="poster-footer">
          <div className="poster-cta">Забронируйте визит онлайн</div>
          <div className="poster-url">WWW.VETVOYAGE.RU</div>
        </footer>
      </div>
    </div>
  );
};

export default Poster;
