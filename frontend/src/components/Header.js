import React from 'react';
import './Header.css';

const Header = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // If section not found, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-section" onClick={() => scrollToSection('dashboard')} style={{ cursor: 'pointer' }}>
          <svg className="logo-icon" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#667eea" />
                <stop offset="100%" stopColor="#764ba2" />
              </linearGradient>
            </defs>
            {/* Chart bars */}
            <rect x="8" y="25" width="6" height="17" fill="url(#logoGradient)" rx="2">
              <animate attributeName="height" values="17;25;17" dur="2s" repeatCount="indefinite" />
              <animate attributeName="y" values="25;17;25" dur="2s" repeatCount="indefinite" />
            </rect>
            <rect x="18" y="15" width="6" height="27" fill="url(#logoGradient)" rx="2">
              <animate attributeName="height" values="27;35;27" dur="2s" begin="0.3s" repeatCount="indefinite" />
              <animate attributeName="y" values="15;7;15" dur="2s" begin="0.3s" repeatCount="indefinite" />
            </rect>
            <rect x="28" y="20" width="6" height="22" fill="url(#logoGradient)" rx="2">
              <animate attributeName="height" values="22;30;22" dur="2s" begin="0.6s" repeatCount="indefinite" />
              <animate attributeName="y" values="20;12;20" dur="2s" begin="0.6s" repeatCount="indefinite" />
            </rect>
            <rect x="38" y="10" width="6" height="32" fill="url(#logoGradient)" rx="2">
              <animate attributeName="height" values="32;38;32" dur="2s" begin="0.9s" repeatCount="indefinite" />
              <animate attributeName="y" values="10;4;10" dur="2s" begin="0.9s" repeatCount="indefinite" />
            </rect>
          </svg>
          <div className="logo-text">
            <h1 className="logo-title">EDA Dashboard</h1>
            <p className="logo-subtitle">Exploratory Data Analysis Platform</p>
          </div>
        </div>
        <nav className="nav-menu">
          <button onClick={() => scrollToSection('dashboard')} className="nav-link active">Dashboard</button>
          <button onClick={() => scrollToSection('filters')} className="nav-link">Filters</button>
          <button onClick={() => scrollToSection('summary')} className="nav-link">Summary</button>
          <button onClick={() => scrollToSection('charts')} className="nav-link">Charts</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
