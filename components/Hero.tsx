import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { DeviceComposition } from './hero/DeviceComposition';

export const Hero: React.FC = () => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="hero" className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden min-h-[90vh] flex items-center">
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text */}
          <div className="text-center lg:text-left animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-kvadra-purple text-xs font-semibold uppercase tracking-wide mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-kvadra-purple animate-pulse"></span>
              Доступна демо-версия
            </div>
            
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6 text-white">
              Облачная ОС: Снижение затрат на <span className="text-transparent bg-clip-text bg-gradient-to-r from-kvadra-purple to-kvadra-indigo">56%</span>
            </h1>
            
            <div className="flex flex-col lg:flex-row lg:items-end gap-4 mb-8 max-w-xl mx-auto lg:mx-0">
               <p className="text-lg text-slate-400">
                 Мгновенный запуск и работа "из коробки" на любом оборудовании, даже старше 5 лет. Забудьте о дорогих обновлениях парка ПК.
               </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <a 
                href="#tco"
                onClick={(e) => scrollToSection(e, '#tco')}
                className="w-full sm:w-auto px-8 py-4 bg-kvadra-purple hover:bg-purple-400 text-black font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(192,132,252,0.3)] hover:shadow-[0_0_30px_rgba(192,132,252,0.5)] flex items-center justify-center gap-2 cursor-pointer"
              >
                Рассчитать экономию TCO
                <ArrowRight className="w-5 h-5" />
              </a>
              <a 
                href="#contact"
                onClick={(e) => scrollToSection(e, '#contact')}
                className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/5 text-white font-bold rounded-xl border border-white/20 transition-all flex items-center justify-center gap-2 hover:border-kvadra-purple/50 cursor-pointer"
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

          {/* Right Column: Devices Visualization */}
          <div className="relative h-[400px] md:h-[500px] w-full flex items-center justify-center lg:justify-end animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
             <DeviceComposition />
          </div>
        </div>
      </div>
    </section>
  );
};