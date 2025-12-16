import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.skills'), href: '#skills' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
    setIsOpen(false);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled || isOpen ? 'bg-paper/95 backdrop-blur-md border-b border-white/5 py-2 shadow-lg' : 'bg-transparent py-6'}`}>
      
      {/* Backdrop for closing menu when clicking outside - Covers entire screen below navbar */}
      {isOpen && (
        <div 
          className="fixed inset-0 top-[60px] bg-black/80 backdrop-blur-sm z-30 md:hidden animate-in fade-in duration-300"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-50">
        <div className="flex items-center justify-between">
          
          {/* Logo Section */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setIsOpen(false);
          }}>
            <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center text-paper font-serif font-bold text-lg shadow-[0_0_10px_rgba(56,189,248,0.5)]">
              F
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-serif font-bold tracking-wide text-ink group-hover:text-gold transition-colors">FILEX</span>
            </div>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-subtle hover:text-gold transition-colors uppercase tracking-widest text-[11px]"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="w-px h-4 bg-white/10 mx-2"></div>
            <button 
              onClick={toggleLanguage}
              className="text-xs font-bold text-ink hover:text-gold transition-colors flex items-center gap-1 uppercase border border-white/10 px-3 py-1 rounded-full hover:border-gold hover:bg-gold/10"
            >
              {language === 'ar' ? 'English' : 'العربية'}
            </button>
          </div>
          
          {/* Mobile Menu Button - Removed Hamburger Icon */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={toggleLanguage}
              className="text-xs font-bold text-ink hover:text-gold uppercase border border-white/10 px-2 py-1 rounded hover:bg-white/5"
            >
              {language === 'ar' ? 'EN' : 'AR'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - Dropdown Panel */}
      <div className={`
        absolute top-full left-0 w-full bg-surface border-b border-white/10 shadow-2xl
        transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] origin-top z-40 md:hidden overflow-hidden
        ${isOpen ? 'max-h-[400px] opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2'}
      `}>
        <div className="flex flex-col items-center justify-center py-6 bg-gradient-to-b from-surface to-paper">
          {navLinks.map((link, idx) => (
            <a
              key={link.name}
              href={link.href}
              onClick={handleLinkClick}
              className={`
                w-full text-center py-4 text-lg font-serif font-medium text-ink/90 
                hover:text-gold hover:bg-white/5 tracking-widest uppercase transition-all duration-300
                border-b border-white/5 last:border-0 relative group
                ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}
              `}
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              <span className="relative z-10">{link.name}</span>
              <div className="absolute inset-y-0 left-0 w-1 bg-gold scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom"></div>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;