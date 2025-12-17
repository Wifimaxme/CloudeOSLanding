import React from 'react';
import { Send, Download } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 relative bg-[#0f172a]/40 backdrop-blur-3xl border-t border-white/10 shadow-[0_-20px_60px_rgba(0,0,0,0.5)] overflow-hidden">
      {/* Subtle top sheen for the glass edge */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <ScrollReveal>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <div>
              <h2 className="text-4xl font-bold mb-6 drop-shadow-sm text-white">Начните экономить сейчас</h2>
              <p className="text-slate-300 text-lg mb-8 max-w-lg">
                Запросите пилотный проект или демо-версию kvadra Cloud OS. Убедитесь в скорости и эффективности на собственном оборудовании.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors shadow-lg shadow-black/20 hover:border-kvadra-purple/30 group">
                    <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold shrink-0 shadow-sm">VK</div>
                    <p className="text-xs font-medium leading-tight text-slate-300 group-hover:text-white transition-colors">Совместные решения с VK WorkSpace</p>
                 </div>
                 <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors shadow-lg shadow-black/20 hover:border-red-500/30 group">
                    <div className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center font-bold shrink-0 shadow-sm">Я</div>
                    <p className="text-xs font-medium leading-tight text-slate-300 group-hover:text-white transition-colors">Интеграция с Яндекс 360</p>
                 </div>
                 <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors shadow-lg shadow-black/20 hover:border-blue-500/30 group">
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shrink-0 shadow-sm">Р7</div>
                    <p className="text-xs font-medium leading-tight text-slate-300 group-hover:text-white transition-colors">Офисные пакеты Р7-Офис</p>
                 </div>
                 <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors shadow-lg shadow-black/20 hover:border-kvadra-teal/30 group">
                    <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shrink-0 shadow-sm p-1.5">
                       <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
                          <rect x="0" y="20" width="100" height="15" />
                          <text x="50" y="62" fontSize="24" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">kvadra</text>
                          <rect x="0" y="70" width="100" height="15" />
                       </svg>
                    </div>
                    <p className="text-xs font-medium leading-tight text-slate-300 group-hover:text-white transition-colors">Экосистема Kvadra WorkSpace</p>
                 </div>
              </div>

              <div className="mt-10">
                  <button className="flex items-center gap-2 text-kvadra-purple hover:text-white transition-colors border-b border-kvadra-purple hover:border-white pb-1 group">
                      <Download className="w-4 h-4 group-hover:animate-bounce" />
                      Скачать презентацию для IT-директора (PDF)
                  </button>
              </div>
            </div>

            {/* Form Card - Glass on Glass effect */}
            <div className="bg-[#1e293b]/40 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl text-white border border-white/10 relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-3xl pointer-events-none"></div>
               {/* Decorative glow */}
               <div className="absolute -top-20 -right-20 w-64 h-64 bg-kvadra-purple/20 blur-[80px] rounded-full mix-blend-screen"></div>

              <h3 className="text-2xl font-bold mb-6 relative z-10">Заявка на пилот</h3>
              <form className="space-y-4 relative z-10" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">ФИО</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/20 text-white focus:bg-black/40 focus:border-kvadra-purple focus:ring-1 focus:ring-kvadra-purple outline-none transition-all placeholder:text-slate-500" placeholder="Иван Иванов" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Компания</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/20 text-white focus:bg-black/40 focus:border-kvadra-purple focus:ring-1 focus:ring-kvadra-purple outline-none transition-all placeholder:text-slate-500" placeholder="ООО Вектор" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/20 text-white focus:bg-black/40 focus:border-kvadra-purple focus:ring-1 focus:ring-kvadra-purple outline-none transition-all placeholder:text-slate-500" placeholder="ivan@company.ru" />
                </div>
                <div className="pt-2">
                  <button type="submit" className="w-full py-4 bg-kvadra-purple hover:bg-purple-400 text-black font-bold rounded-xl shadow-[0_0_20px_rgba(192,132,252,0.3)] transition-all flex items-center justify-center gap-2 hover:scale-[1.02]">
                     Отправить заявку
                     <Send className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-center text-slate-500 mt-4">
                  Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных.
                </p>
              </form>
            </div>

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};