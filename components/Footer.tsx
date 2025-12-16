import React from 'react';
import { Cloud } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-slate-800 p-1.5 rounded-lg">
              <Cloud className="w-5 h-5 text-cloud-500" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">Cloud<span className="text-cloud-500">OS</span></span>
          </div>
          
          <div className="flex gap-8 text-sm">
            <a href="#" className="hover:text-white transition-colors">О продукте</a>
            <a href="#" className="hover:text-white transition-colors">Партнеры</a>
            <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
          </div>

          <div className="text-sm">
            © {new Date().getFullYear()} Cloud OS. Все права защищены.
          </div>
        </div>
      </div>
    </footer>
  );
};