import React from 'react';
import { ArrowRight, CheckCircle2, Cloud, Monitor, Wifi, ShieldCheck } from 'lucide-react';

const ScreenContent = ({ delay = 0 }) => (
  <div className="w-full h-full bg-slate-900 relative overflow-hidden flex flex-col">
    {/* Wallpaper / Bg */}
    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-[#111827]"></div>
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
    
    {/* Taskbar */}
    <div className="h-6 bg-black/40 backdrop-blur-md absolute bottom-0 w-full flex items-center justify-center gap-2 z-10 px-2 border-t border-white/5">
       {[1,2,3,4].map(i => (
         <div key={i} className="w-4 h-4 rounded bg-white/10 hover:bg-white/30 transition-colors shadow-sm animate-pulse" style={{ animationDelay: `${delay + i * 0.2}s` }}></div>
       ))}
    </div>

    {/* Window */}
    <div className="flex-1 p-4 flex items-center justify-center">
       <div className="w-full max-w-[80%] bg-[#1e293b] rounded-lg shadow-2xl border border-white/10 overflow-hidden animate-fade-in-up" style={{ animationDelay: `${delay + 0.5}s` }}>
          <div className="h-4 bg-black/20 border-b border-white/5 flex items-center px-2 gap-1">
             <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
             <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
          </div>
          <div className="p-3 space-y-2">
             <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-kvadra-cyan/20 rounded-full flex items-center justify-center text-kvadra-cyan">
                   <Cloud className="w-3 h-3" />
                </div>
                <div className="h-2 w-20 bg-white/10 rounded"></div>
             </div>
             <div className="h-16 bg-black/20 rounded border border-white/5"></div>
             <div className="grid grid-cols-2 gap-2">
                <div className="h-8 bg-kvadra-cyan/10 rounded"></div>
                <div className="h-8 bg-kvadra-purple/10 rounded"></div>
             </div>
          </div>
       </div>
    </div>
  </div>
);

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden min-h-[90vh] flex items-center">
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text */}
          <div className="text-center lg:text-left animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-kvadra-cyan text-xs font-semibold uppercase tracking-wide mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-kvadra-cyan animate-pulse"></span>
              Доступна демо-версия
            </div>
            
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6 text-white">
              Cloud OS: рабочее место будущего, которое снижает затраты до <span className="text-transparent bg-clip-text bg-gradient-to-r from-kvadra-cyan to-kvadra-purple">42%</span>
            </h1>
            
            <div className="flex flex-col lg:flex-row lg:items-end gap-4 mb-8 max-w-xl mx-auto lg:mx-0">
               <p className="text-lg text-slate-400">
                 Мгновенный запуск и работа "из коробки" на любом оборудовании, даже старше 5 лет. Забудьте о дорогих обновлениях парка ПК.
               </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <a 
                href="#tco"
                className="w-full sm:w-auto px-8 py-4 bg-kvadra-cyan hover:bg-cyan-400 text-black font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] flex items-center justify-center gap-2"
              >
                Рассчитать экономию TCO
                <ArrowRight className="w-5 h-5" />
              </a>
              <a 
                href="#contact"
                className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/5 text-white font-bold rounded-xl border border-white/20 transition-all flex items-center justify-center gap-2 hover:border-kvadra-cyan/50"
              >
                Запросить пилот
              </a>
            </div>
            
             {/* Small Trust badges */}
            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-slate-400 text-sm font-medium">
               <div className="flex items-center gap-2">
                 <CheckCircle2 className="w-4 h-4 text-kvadra-teal" />
                 <span>Реестр ПО</span>
               </div>
               <div className="flex items-center gap-2">
                 <CheckCircle2 className="w-4 h-4 text-kvadra-teal" />
                 <span>Совместимо с РФ железом</span>
               </div>
               <div className="flex items-center gap-2">
                 <ShieldCheck className="w-4 h-4 text-kvadra-teal" />
                 <span>ФСТЭК</span>
               </div>
            </div>
          </div>

          {/* Right Column: Devices Visualization - Darkened */}
          <div className="relative h-[400px] md:h-[500px] w-full flex items-center justify-center lg:justify-end animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
             
             {/* Composition Container */}
             <div className="relative w-full max-w-[600px] perspective-[1000px]">
                
                {/* 1. Monoblock (Desktop) - Back Right */}
                <div className="absolute right-4 md:right-0 top-0 w-[280px] md:w-[380px] aspect-[16/10] bg-[#1e293b] rounded-xl border-[6px] border-[#334155] shadow-2xl z-10 transform translate-y-4">
                   <div className="w-full h-full bg-black rounded overflow-hidden relative border border-white/10">
                      <ScreenContent delay={0} />
                   </div>
                   {/* Stand */}
                   <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-24 h-16 bg-gradient-to-b from-[#334155] to-[#1e293b] flex flex-col items-center">
                      <div className="w-full h-full bg-[#1e293b]" style={{ clipPath: 'polygon(20% 0, 80% 0, 100% 100%, 0% 100%)' }}></div>
                      <div className="w-32 h-2 bg-[#334155] rounded-full mt-[-2px] shadow-lg"></div>
                   </div>
                </div>

                {/* 2. Laptop - Front Left */}
                <div className="absolute left-0 md:-left-8 bottom-12 w-[240px] md:w-[300px] z-20 transform translate-y-8 lg:translate-y-0">
                   {/* Screen */}
                   <div className="relative bg-[#0f172a] rounded-t-xl border-[4px] border-[#334155] shadow-xl origin-bottom transition-transform hover:rotate-x-0" style={{ transform: 'rotateX(-5deg)' }}>
                      <div className="aspect-[16/10] bg-black rounded-t overflow-hidden border border-white/10">
                        <ScreenContent delay={0.5} />
                      </div>
                      {/* Webcam dot */}
                      <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-slate-600 rounded-full"></div>
                   </div>
                   {/* Base */}
                   <div className="h-3 bg-[#1e293b] rounded-b-lg shadow-2xl flex justify-center items-center border-t border-[#334155]">
                      <div className="w-16 h-1 bg-slate-600 rounded-full opacity-50"></div>
                   </div>
                   {/* Base shadow reflection */}
                   <div className="absolute -bottom-4 left-4 right-4 h-4 bg-kvadra-cyan/10 blur-lg rounded-full"></div>
                </div>

                {/* 3. Tablet - Front Right */}
                <div className="absolute right-8 md:right-12 -bottom-4 w-[100px] md:w-[120px] aspect-[3/4] bg-[#1e293b] rounded-xl border-[4px] border-[#334155] shadow-xl z-30 transform rotate-6 translate-x-4">
                   <div className="w-full h-full bg-black rounded-lg overflow-hidden border border-white/10">
                      <div className="w-full h-full bg-[#0f172a] relative flex flex-col">
                         <div className="h-6 bg-white/5 flex items-center justify-end px-2 gap-1">
                            <div className="w-3 h-1.5 rounded-sm bg-slate-500"></div>
                         </div>
                         <div className="flex-1 p-2 flex items-center justify-center">
                            <div className="grid grid-cols-2 gap-2 w-full">
                               {[1,2,3,4,5,6].map(i => (
                                 <div key={i} className="aspect-square bg-white/5 rounded-lg animate-pulse" style={{ animationDelay: `${1 + i * 0.1}s` }}></div>
                               ))}
                            </div>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-6 -left-4 md:-left-12 bg-[#1e293b]/80 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-white/10 flex items-center gap-3 animate-bounce z-20" style={{ animationDuration: '4s' }}>
                  <div className="bg-kvadra-cyan/20 p-2 rounded-full text-kvadra-cyan">
                    <Monitor className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Любой экран</p>
                    <p className="text-xs font-bold text-white">Единый опыт</p>
                  </div>
                </div>

                <div className="absolute bottom-20 -right-2 md:-right-8 bg-[#1e293b]/80 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-white/10 flex items-center gap-3 animate-bounce z-40" style={{ animationDuration: '3s' }}>
                  <div className="bg-kvadra-teal/20 p-2 rounded-full text-kvadra-teal">
                    <Wifi className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Облако</p>
                    <p className="text-xs font-bold text-white">Всегда онлайн</p>
                  </div>
                </div>

             </div>

          </div>
        </div>
      </div>
    </section>
  );
};