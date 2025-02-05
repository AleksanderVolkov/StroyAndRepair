import { useState, useEffect } from 'react';
import './Header.scss';
import { scrollToSection } from '../utils/scrollHelpers';
import logo from '../assets/images/logo.svg';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (section) => {
    scrollToSection(section);
    setIsMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header__inner">
          <div 
            className="header__logo" 
            onClick={scrollToTop}
            role="button" 
            tabIndex={0}
          >
            <img src={logo} alt="Логотип" className="logo-animate" />
            <span>РемонтПодсчет</span>
          </div>

          <button 
            className={`header__burger ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Меню"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav className={`header__nav ${isMenuOpen ? 'active' : ''}`}>
            <button 
              className="nav-link"
              onClick={() => handleNavClick('features')}
            >
              Преимущества
            </button>
            <button 
              className="nav-link"
              onClick={() => handleNavClick('calculator')}
            >
              Калькулятор
            </button>
            <button 
              className="nav-link"
              onClick={() => handleNavClick('materials')}
            >
              Материалы
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}