import React from 'react';
import { School, Building2, Briefcase } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const Strategy: React.FC = () => {
  return (
    <section id="strategy" className="py-20 relative">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Стратегия и Рынки</h2>
            <p className="text-slate-400 backdrop-blur-sm bg-white/5 p-2 rounded-lg inline-block border border-white/5">Мы фокусируемся там, где экономия и простота важнее всего.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-orange-500/5 backdrop-blur-md border border-orange-500/10 hover:shadow-[0_0_20px_rgba(249,115,22,0.1)] transition-all group">
              <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-500 mb-6 group-hover:bg-orange-500/20 transition-colors border border-orange-500/20">
                <School className="w-6 h-6 animate-float" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Образование</h3>
              <p className="text-slate-400 text-sm">
                Школы и вузы имеют огромный парк устаревающей техники. Высокая потребность в онлайн-сервисах и максимальной экономии бюджета.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-kvadra-purple/5 backdrop-blur-md border border-kvadra-purple/10 hover:shadow-[0_0_20px_rgba(192,132,252,0.1)] transition-all group">
              <div className="w-12 h-12 bg-kvadra-purple/10 rounded-xl flex items-center justify-center text-kvadra-purple mb-6 group-hover:bg-kvadra-purple/20 transition-colors border border-kvadra-purple/20">
                <Building2 className="w-6 h-6 animate-scale-subtle" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Госкомпании</h3>
              <p className="text-slate-400 text-sm">
                Импортозамещение и безопасность. Возможность использовать реестровое ПО без закупки дорогостоящего оборудования.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-green-500/5 backdrop-blur-md border border-green-500/10 hover:shadow-[0_0_20px_rgba(34,197,94,0.1)] transition-all group">
              <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500 mb-6 group-hover:bg-green-500/20 transition-colors border border-green-500/20">
                <Briefcase className="w-6 h-6 animate-wiggle" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">СМБ и Колл-центры</h3>
              <p className="text-slate-400 text-sm">
                Бизнес, готовый к облаку. Быстрое развертывание новых рабочих мест (Scale-up) без капитальных вложений.
              </p>
            </div>
          </div>

          {/* Strategy Visualization "Stages of Relationship" */}
          <div className="mt-20 border-t border-white/10 pt-12">
              <h3 className="text-center text-2xl font-bold text-white mb-12">Этапы развития отношений</h3>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
                  
                  {/* Stage 1 */}
                  <div className="w-48 h-48 rounded-full bg-kvadra-purple/10 backdrop-blur-sm flex items-center justify-center border-4 border-[#0b0f19] ring-2 ring-kvadra-purple/30 shadow-xl z-30 relative animate-scale-subtle p-4" style={{ animationDelay: '0s' }}>
                      <div>
                          <p className="font-bold text-kvadra-purple text-lg leading-tight mb-1">Легкая ОС</p>
                          <p className="text-xs text-slate-400">на старое железо</p>
                      </div>
                  </div>
                  
                  <div className="hidden md:block w-12 h-1 bg-white/10"></div>
                  
                  {/* Stage 2 */}
                  <div className="w-64 h-64 rounded-full bg-kvadra-indigo/10 backdrop-blur-sm flex items-center justify-center border-4 border-[#0b0f19] ring-2 ring-kvadra-indigo/30 shadow-xl z-20 -ml-8 md:ml-0 animate-scale-subtle p-6" style={{ animationDelay: '1s' }}>
                      <div>
                          <p className="font-bold text-white text-lg mb-2">Обновление</p>
                          <p className="text-xs text-slate-400 leading-snug">
                            По мере выхода из строя оборудования, замена на наши легкие, красивые, дешевые ноутбуки, тонкие клиенты.
                          </p>
                      </div>
                  </div>
                  
                  <div className="hidden md:block w-12 h-1 bg-white/10"></div>
                  
                  {/* Stage 3 */}
                   <div className="w-72 h-72 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center border-4 border-[#0b0f19] ring-2 ring-white/10 shadow-xl z-10 -ml-8 md:ml-0 animate-scale-subtle p-8" style={{ animationDelay: '2s' }}>
                      <div>
                          <p className="font-bold text-white text-xl mb-2">Экосистема</p>
                          <p className="text-sm text-slate-400 leading-snug">
                            Переход на все наши облачные сервисы — Workspace, UEM и т.д.
                          </p>
                      </div>
                  </div>
              </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};