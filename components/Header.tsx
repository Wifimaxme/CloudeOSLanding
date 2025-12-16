import React, { useState, useEffect } from 'react';
import { Cloud, Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Решение', href: '#solution' },
    { name: 'Экономия', href: '#tco' },
    { name: 'Скорость', href: '#ux' },
    { name: 'Безопасность', href: '#security' },
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#0b0f19]/80 backdrop-blur-md border-b border-white/5 py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo(0,0)}>
          <div className="bg-white/10 p-1.5 rounded-lg border border-white/10 group-hover:border-kvadra-cyan/50 transition-colors">
            <Cloud className="w-6 h-6 text-kvadra-cyan" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">Cloud<span className="text-kvadra-cyan">OS</span></span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-kvadra-cyan transition-all group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a 
            href="#contact"
            className="px-5 py-2.5 bg-kvadra-cyan hover:bg-cyan-400 text-black text-sm font-bold rounded-full transition-all shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:shadow-[0_0_25px_rgba(34,211,238,0.5)]"
          >
            Рассчитать TCO
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-slate-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#0b0f19] border-b border-white/10 p-4 flex flex-col gap-4 shadow-2xl">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-slate-300 font-medium py-2 hover:text-kvadra-cyan"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact"
            className="text-center w-full px-5 py-3 bg-kvadra-cyan text-black font-bold rounded-lg"
            onClick={() => setIsMenuOpen(false)}
          >
            Рассчитать TCO
          </a>
        </div>
      )}
    </header>
  );
};