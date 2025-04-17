// src/components/Header.tsx
import { useState } from 'react';
import '../styles/Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <header className="header">
      {/* Title */}
      <div className="logo-container">
        <h1>Evapora</h1>
      </div>

      {/* Hamburger Menu */}
      <div className="hamburger" onClick={toggleMenu}>
        <div className={`line ${isMenuOpen ? 'open' : ''}`} />
        <div className={`line ${isMenuOpen ? 'open' : ''}`} />
        <div className={`line ${isMenuOpen ? 'open' : ''}`} />
      </div>

      {/* Nav Links & CTA in responsive container */}
      <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          <li><a href="#features">Features</a></li>
          <li><a href="#how-it-works">How It Works</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="#contact">Contact</a></li>

          {/* Move CTA inside nav in mobile view */}
          <li className="cta-mobile">
            <a href="#get-started" className="cta-button">Get Started</a>
          </li>
        </ul>
      </nav>

      {/* CTA outside nav for desktop only */}
      <div className="cta-desktop">
        <a href="#get-started" className="cta-button">Get Started</a>
      </div>
    </header>
  );
};

export default Header;
