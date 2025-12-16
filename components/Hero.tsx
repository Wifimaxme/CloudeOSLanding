import React from 'react';
import { ArrowRight, CheckCircle2, Cloud, Monitor, Tablet, Laptop as LaptopIcon, Wifi, User, Grid, ShieldCheck } from 'lucide-react';

const ScreenContent = ({ delay = 0 }) => (
  <div className="w-full h-full bg-slate-100 relative overflow-hidden flex flex-col">
    {/* Wallpaper / Bg */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 opacity-50"></div>
    
    {/* Taskbar */}
    <div className="h-6 bg-slate-900/5 backdrop-blur-md absolute bottom-0 w-full flex items-center justify-center gap-2 z-10 px-2 border-t border-white/20">
       {[1,2,3,4].map(i => (
         <div key={i} className="w-4 h-4 rounded bg-white/80 shadow-sm animate-pulse" style={{ animationDelay: `${delay + i * 0.2}s` }}></div>
       ))}
    </div>

    {/* Window */}
    <div className="flex-1 p-4 flex items-center justify-center">
       <div className="w-full max-w-[80%] bg-white rounded-lg shadow-lg border border-white/50 overflow-hidden animate-fade-in-up" style={{ animationDelay: `${delay + 0.5}s` }}>
          <div className="h-4 bg-slate-50 border-b border-slate-100 flex items-center px-2 gap-1">
             <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
             <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
          </div>
          <div className="p-3 space-y-2">
             <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-cloud-100 rounded-full flex items-center justify-center text-cloud-600">
                   <Cloud className="w-3 h-3" />
                </div>
                <div className="h-2 w-20 bg-slate-100 rounded"></div>
             </div>
             <div className="h-16 bg-slate-50 rounded border border-slate-100/50"></div>
             <div className="grid grid-cols-2 gap-2">
                <div className="h-8 bg-cloud-50/50 rounded"></div>
                <div className="h-8 bg-cloud-50/50 rounded"></div>
             </div>
          </div>
       </div>
    </div>
  </div>
);

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden min-h-[90vh] flex items-center">
      {/* Background Decor - Removed static blobs to let FloatingOrb take over or coexist softly */}
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text */}
          <div className="text-center lg:text-left animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cloud-50 border border-cloud-100 text-cloud-700 text-xs font-semibold uppercase tracking-wide mb-6">
              <span className="w-2 h-2 rounded-full bg-cloud-500 animate-pulse"></span>
              Доступна демо-версия
            </div>
            
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6 text-slate-900">
              Облачная ОС: рабочее место будущего, которое снижает затраты до <span className="text-transparent bg-clip-text bg-gradient-to-r from-cloud-600 to-purple-600">42%</span>
            </h1>
            
            <div className="flex flex-col lg:flex-row lg:items-end gap-4 mb-8 max-w-xl mx-auto lg:mx-0">
               <p className="text-lg text-slate-600">
                 Мгновенный запуск и работа "из коробки" на любом оборудовании, даже старше 5 лет. Забудьте о дорогих обновлениях парка ПК.
               </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <a 
                href="#tco"
                className="w-full sm:w-auto px-8 py-4 bg-cloud-600 hover:bg-cloud-700 text-white font-bold rounded-xl transition-all shadow-xl shadow-cloud-500/20 hover:shadow-cloud-500/40 flex items-center justify-center gap-2"
              >
                Рассчитать экономию TCO
                <ArrowRight className="w-5 h-5" />
              </a>
              <a 
                href="#contact"
                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-xl border border-slate-200 transition-all flex items-center justify-center gap-2"
              >
                Запросить пилот
              </a>
            </div>
            
             {/* Small Trust badges */}
            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-slate-400 text-sm font-medium">
               <div className="flex items-center gap-2">
                 <CheckCircle2 className="w-4 h-4 text-green-500" />
                 <span>Реестр ПО</span>
               </div>
               <div className="flex items-center gap-2">
                 <CheckCircle2 className="w-4 h-4 text-green-500" />
                 <span>Совместимо с РФ железом</span>
               </div>
               <div className="flex items-center gap-2">
                 <ShieldCheck className="w-4 h-4 text-green-500" />
                 <span>ФСТЭК</span>
               </div>
            </div>
          </div>

          {/* Right Column: Devices Visualization */}
          <div className="relative h-[400px] md:h-[500px] w-full flex items-center justify-center lg:justify-end animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
             
             {/* Composition Container */}
             <div className="relative w-full max-w-[600px] perspective-[1000px]">
                
                {/* 1. Monoblock (Desktop) - Back Right */}
                <div className="absolute right-4 md:right-0 top-0 w-[280px] md:w-[380px] aspect-[16/10] bg-slate-200 rounded-xl border-[6px] border-slate-200 shadow-2xl z-10 transform translate-y-4">
                   <div className="w-full h-full bg-slate-900 rounded overflow-hidden relative border border-slate-300">
                      <ScreenContent delay={0} />
                   </div>
                   {/* Stand */}
                   <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-24 h-16 bg-gradient-to-b from-slate-200 to-slate-300 flex flex-col items-center">
                      <div className="w-full h-full bg-slate-200" style={{ clipPath: 'polygon(20% 0, 80% 0, 100% 100%, 0% 100%)' }}></div>
                      <div className="w-32 h-2 bg-slate-300 rounded-full mt-[-2px] shadow-lg"></div>
                   </div>
                </div>

                {/* 2. Laptop - Front Left */}
                <div className="absolute left-0 md:-left-8 bottom-12 w-[240px] md:w-[300px] z-20 transform translate-y-8 lg:translate-y-0">
                   {/* Screen */}
                   <div className="relative bg-slate-200 rounded-t-xl border-[4px] border-slate-200 shadow-xl origin-bottom transition-transform hover:rotate-x-0" style={{ transform: 'rotateX(-5deg)' }}>
                      <div className="aspect-[16/10] bg-slate-900 rounded-t overflow-hidden border border-slate-300">
                        <ScreenContent delay={0.5} />
                      </div>
                      {/* Webcam dot */}
                      <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-slate-400 rounded-full"></div>
                   </div>
                   {/* Base */}
                   <div className="h-3 bg-slate-200 rounded-b-lg shadow-2xl flex justify-center items-center border-t border-slate-300">
                      <div className="w-16 h-1 bg-slate-300 rounded-full opacity-50"></div>
                   </div>
                   {/* Base shadow reflection */}
                   <div className="absolute -bottom-4 left-4 right-4 h-4 bg-black/10 blur-lg rounded-full"></div>
                </div>

                {/* 3. Tablet - Front Right */}
                <div className="absolute right-8 md:right-12 -bottom-4 w-[100px] md:w-[120px] aspect-[3/4] bg-slate-200 rounded-xl border-[4px] border-slate-200 shadow-xl z-30 transform rotate-6 translate-x-4">
                   <div className="w-full h-full bg-slate-900 rounded-lg overflow-hidden border border-slate-300">
                      <div className="w-full h-full bg-slate-100 relative flex flex-col">
                         <div className="h-6 bg-slate-900/5 flex items-center justify-end px-2 gap-1">
                            <div className="w-3 h-1.5 rounded-sm bg-slate-300"></div>
                         </div>
                         <div className="flex-1 p-2 flex items-center justify-center">
                            <div className="grid grid-cols-2 gap-2 w-full">
                               {[1,2,3,4,5,6].map(i => (
                                 <div key={i} className="aspect-square bg-cloud-100 rounded-lg animate-pulse" style={{ animationDelay: `${1 + i * 0.1}s` }}></div>
                               ))}
                            </div>
                         </div>
                      </div>
                   </div>
                   {/* Home button indicator */}
                   <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-slate-300 rounded-full"></div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-6 -left-4 md:-left-12 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-slate-100 flex items-center gap-3 animate-bounce z-20" style={{ animationDuration: '4s' }}>
                  <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                    <Monitor className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Любой экран</p>
                    <p className="text-xs font-bold text-slate-800">Единый опыт</p>
                  </div>
                </div>

                <div className="absolute bottom-20 -right-2 md:-right-8 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-slate-100 flex items-center gap-3 animate-bounce z-40" style={{ animationDuration: '3s' }}>
                  <div className="bg-green-100 p-2 rounded-full text-green-600">
                    <Wifi className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Облако</p>
                    <p className="text-xs font-bold text-slate-800">Всегда онлайн</p>
                  </div>
                </div>

             </div>

          </div>
        </div>
      </div>
    </section>
  );
};