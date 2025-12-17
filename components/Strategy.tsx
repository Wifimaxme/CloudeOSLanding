import React from 'react';
import { School, Building2, Briefcase, Cloud, ArrowRight, LayoutGrid, Cpu } from 'lucide-react';
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
              <h3 className="text-xl font-bold text-white mb-3">Малый и средний бизнес, Колл-центры</h3>
              <p className="text-slate-400 text-sm">
                Бизнес, готовый к облаку. Быстрое развертывание новых рабочих мест (Scale-up) без капитальных вложений.
              </p>
            </div>
          </div>

          {/* Strategy Visualization "Stages of Relationship" */}
          <div className="mt-20 border-t border-white/10 pt-12">
              <h3 className="text-center text-2xl font-bold text-white mb-16 relative z-10">Этапы развития отношений</h3>
              
              <div className="grid md:grid-cols-3 gap-8 items-start relative">
                  
                  {/* Connecting Line (Desktop) */}
                  {/* Positioned at top-32 (128px) which is padding-top (32px) + half of illustration height (96px) */}
                  <div className="hidden md:block absolute top-32 left-[16.66%] right-[16.66%] h-px border-t-2 border-dashed border-white/10 z-0"></div>

                  {/* Stage 1: Old PC */}
                  <div className="relative z-10 h-full">
                      <div className="bg-[#1e293b]/40 backdrop-blur-xl rounded-3xl p-8 border border-white/10 h-full flex flex-col items-center hover:border-kvadra-purple/30 transition-all duration-500 group">
                          <div className="h-48 flex items-center justify-center mb-6 w-full">
                             {/* Schematic Old PC */}
                             <div className="relative">
                                {/* Monitor */}
                                <div className="w-28 h-24 bg-[#1e293b] border-4 border-slate-600 rounded-lg flex items-center justify-center relative shadow-lg">
                                    <div className="w-24 h-20 bg-black flex items-center justify-center overflow-hidden">
                                       <div className="text-green-400 font-mono text-xs font-bold animate-pulse">VDI</div>
                                    </div>
                                </div>
                                {/* Stand */}
                                <div className="w-10 h-4 bg-slate-700 mx-auto border-x-2 border-slate-600"></div>
                                <div className="w-20 h-2 bg-slate-600 mx-auto rounded-full"></div>
                                
                                {/* Tower */}
                                <div className="absolute -right-8 bottom-0 w-10 h-28 bg-[#1e293b] border-4 border-slate-600 rounded flex flex-col items-center py-2 gap-2 shadow-lg">
                                    <div className="w-6 h-0.5 bg-slate-500"></div>
                                    <div className="w-6 h-0.5 bg-slate-500"></div>
                                    <div className="w-4 h-4 mt-2 border border-slate-500 rounded-full flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 bg-red-500/50 rounded-full animate-pulse"></div>
                                    </div>
                                </div>
                                
                                {/* Kvadra OS Badge */}
                                <div className="absolute -top-3 -right-12 bg-kvadra-purple text-black text-[10px] font-bold px-2 py-1 rounded-full shadow-[0_0_10px_rgba(192,132,252,0.5)] animate-bounce">
                                    ЛЕГКАЯ ОС
                                </div>
                             </div>
                          </div>
                          <div className="text-center">
                              <h4 className="font-bold text-kvadra-purple text-xl mb-2">Этап 1: Легкая ОС</h4>
                              <p className="text-sm text-slate-400">
                                  Инсталляция на существующее, устаревшее железо. Продление жизни парка на 3-5 лет без замены оборудования.
                              </p>
                          </div>
                      </div>
                  </div>
                  
                  {/* Stage 2: Modern Laptop */}
                  <div className="relative z-10 h-full">
                      <div className="bg-[#1e293b]/40 backdrop-blur-xl rounded-3xl p-8 border border-white/10 h-full flex flex-col items-center hover:border-kvadra-purple/30 transition-all duration-500 group">
                          <div className="h-48 flex items-center justify-center mb-6 w-full">
                             {/* Schematic Modern Laptop */}
                             <div className="relative transform transition-transform group-hover:scale-105 duration-500">
                                 {/* Lid/Screen */}
                                 <div className="w-40 h-24 bg-[#0f172a] border-2 border-slate-400 rounded-t-xl overflow-hidden relative shadow-[0_0_20px_rgba(255,255,255,0.05)] flex flex-col">
                                     {/* Screen Content */}
                                     <div className="flex-1 bg-gradient-to-br from-slate-800 to-black p-2 flex items-center justify-center relative overflow-hidden">
                                         <div className="absolute inset-0 bg-kvadra-purple/5"></div>
                                         <div className="w-8 h-8 rounded-full bg-kvadra-purple/20 flex items-center justify-center text-kvadra-purple shadow-[0_0_15px_rgba(192,132,252,0.3)]">
                                             <Cloud className="w-4 h-4" />
                                         </div>
                                     </div>
                                     {/* Bezel Bottom */}
                                     <div className="h-2 bg-slate-900 w-full flex justify-center items-center">
                                         <div className="w-1 h-1 rounded-full bg-slate-600"></div>
                                     </div>
                                 </div>
                                 {/* Base */}
                                 <div className="w-48 h-2 bg-gradient-to-b from-slate-300 to-slate-400 rounded-b-md mx-auto shadow-xl relative z-10 -mt-[1px]">
                                     {/* Touchpad Notch */}
                                     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-slate-500/30"></div>
                                 </div>
                                 {/* Reflection */}
                                 <div className="absolute -bottom-4 left-4 right-4 h-4 bg-kvadra-purple/20 blur-xl rounded-full"></div>
                             </div>
                          </div>
                          <div className="text-center">
                              <h4 className="font-bold text-white text-xl mb-2">Этап 2: Обновление</h4>
                              <p className="text-sm text-slate-400">
                                  Постепенная замена вышедшего из строя железа на наши современные, тонкие клиенты и ноутбуки, оптимизированные под Cloud OS.
                              </p>
                          </div>
                      </div>
                  </div>
                  
                  {/* Stage 3: Ecosystem */}
                  <div className="relative z-10 h-full">
                      <div className="bg-[#1e293b]/40 backdrop-blur-xl rounded-3xl p-8 border border-white/10 h-full flex flex-col items-center hover:border-kvadra-purple/30 transition-all duration-500 group">
                          <div className="h-48 flex items-center justify-center mb-6 w-full relative">
                             {/* Schematic Ecosystem */}
                             <div className="relative">
                                 {/* The Cloud */}
                                 <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
                                     <div className="w-16 h-10 bg-kvadra-indigo/20 backdrop-blur-md border border-kvadra-indigo/50 rounded-full flex items-center justify-center text-kvadra-indigo shadow-[0_0_20px_rgba(129,140,248,0.4)] animate-float">
                                         <Cloud className="w-6 h-6" />
                                     </div>
                                     {/* Connection Ray */}
                                     <div className="h-12 w-px bg-gradient-to-b from-kvadra-indigo/50 to-transparent"></div>
                                 </div>

                                 {/* Floating Apps */}
                                 <div className="absolute -right-8 top-0 p-1.5 bg-blue-500/10 border border-blue-500/30 rounded-lg backdrop-blur-sm animate-bounce" style={{ animationDelay: '0.2s' }}>
                                     <Briefcase className="w-3 h-3 text-blue-400" />
                                 </div>
                                 <div className="absolute -left-8 top-4 p-1.5 bg-purple-500/10 border border-purple-500/30 rounded-lg backdrop-blur-sm animate-bounce" style={{ animationDelay: '0.5s' }}>
                                     <LayoutGrid className="w-3 h-3 text-purple-400" />
                                 </div>

                                 {/* Laptop (Same as stage 2 but with ecosystem content) */}
                                 <div className="relative transform group-hover:scale-105 duration-500">
                                     <div className="w-40 h-24 bg-[#0f172a] border-2 border-kvadra-indigo/50 rounded-t-xl overflow-hidden relative shadow-[0_0_20px_rgba(129,140,248,0.1)] flex flex-col">
                                         <div className="flex-1 bg-gradient-to-br from-slate-900 to-black p-1 grid grid-cols-3 gap-1 content-center">
                                             {[1,2,3,4,5,6].map(i => (
                                                 <div key={i} className="aspect-square rounded bg-white/5 border border-white/5 mx-auto w-full"></div>
                                             ))}
                                         </div>
                                         <div className="h-2 bg-slate-900 w-full"></div>
                                     </div>
                                     <div className="w-48 h-2 bg-gradient-to-b from-slate-300 to-slate-400 rounded-b-md mx-auto shadow-xl relative z-10 -mt-[1px]"></div>
                                     <div className="absolute -bottom-4 left-4 right-4 h-4 bg-kvadra-indigo/20 blur-xl rounded-full"></div>
                                 </div>
                             </div>
                          </div>
                          <div className="text-center">
                              <h4 className="font-bold text-white text-xl mb-2">Этап 3: Экосистема</h4>
                              <p className="text-sm text-slate-400">
                                  Полный переход на облачные сервисы: Workspace, UEM, VDI. Работа на любом устройстве в единой безопасной среде.
                              </p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};