import React from 'react';
import { Send, Download } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-cloud-600/90 to-cloud-800/90 backdrop-blur-md text-white">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollReveal>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <div>
              <h2 className="text-4xl font-bold mb-6">Начните экономить сейчас</h2>
              <p className="text-cloud-100 text-lg mb-8">
                Запросите пилотный проект или демо-версию Cloud OS. Убедитесь в скорости и эффективности на собственном оборудовании.
              </p>
              
              <div className="space-y-4">
                 <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-white text-cloud-700 flex items-center justify-center font-bold">VK</div>
                    <p className="text-sm">Совместные решения с VK WorkSpace</p>
                 </div>
                 <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center font-bold">Я</div>
                    <p className="text-sm">Интеграция с Яндекс 360</p>
                 </div>
              </div>

              <div className="mt-10">
                  <button className="flex items-center gap-2 text-cloud-200 hover:text-white transition-colors border-b border-cloud-400 pb-1">
                      <Download className="w-4 h-4" />
                      Скачать презентацию для IT-директора (PDF)
                  </button>
              </div>
            </div>

            {/* Form Card */}
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl text-slate-800 border border-white/50">
              <h3 className="text-2xl font-bold mb-6">Заявка на пилот</h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">ФИО</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 focus:bg-white focus:border-cloud-500 focus:ring-2 focus:ring-cloud-200 outline-none transition-all" placeholder="Иван Иванов" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Компания</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 focus:bg-white focus:border-cloud-500 focus:ring-2 focus:ring-cloud-200 outline-none transition-all" placeholder="ООО Вектор" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 focus:bg-white focus:border-cloud-500 focus:ring-2 focus:ring-cloud-200 outline-none transition-all" placeholder="ivan@company.ru" />
                </div>
                <div className="pt-2">
                  <button type="submit" className="w-full py-4 bg-cloud-600 hover:bg-cloud-700 text-white font-bold rounded-xl shadow-lg shadow-cloud-500/30 transition-all flex items-center justify-center gap-2">
                     Отправить заявку
                     <Send className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-center text-slate-400 mt-4">
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