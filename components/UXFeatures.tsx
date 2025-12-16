import React, { useState, useEffect, useRef } from 'react';
import { Zap, GraduationCap, LayoutGrid, Clock, Power, RotateCcw, Cloud, Wifi, Battery, Search } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const UXFeatures: React.FC = () => {
  const [bootState, setBootState] = useState<'off' | 'booting' | 'on'>('off');
  const [progress, setProgress] = useState(0);
  
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  
  const demoRef = useRef<HTMLDivElement>(null);
  const [hasAutoBooted, setHasAutoBooted] = useState(false);

  const startBoot = () => {
    if (bootState === 'booting') return;
    
    setBootState('booting');
    setProgress(0);
    startTimeRef.current = Date.now();
    
    const duration = 8000; 
    
    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      
      setProgress(newProgress);

      if (elapsed < duration) {
        timerRef.current = requestAnimationFrame(animate);
      } else {
        setBootState('on');
      }
    };
    
    timerRef.current = requestAnimationFrame(animate);
  };

  const resetBoot = () => {
    if (timerRef.current) cancelAnimationFrame(timerRef.current);
    setBootState('off');
    setProgress(0);
  };
  
  useEffect(() => {
    return () => {
        if (timerRef.current) cancelAnimationFrame(timerRef.current);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAutoBooted) {
          setTimeout(() => {
              startBoot();
              setHasAutoBooted(true);
          }, 500);
        }
      },
      { threshold: 0.3 }
    );

    if (demoRef.current) {
      observer.observe(demoRef.current);
    }

    return () => observer.disconnect();
  }, [hasAutoBooted]);

  return (
    <section id="ux" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollReveal>
          <div className="mb-16 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Скорость и Простота</h2>
            <p className="text-slate-600 text-lg backdrop-blur-sm bg-white/30 p-2 rounded-lg inline-block">
              Пользователю не нужно изучать ОС. Его задача — "запустить браузер". Мы убрали всё лишнее, чтобы работа начиналась мгновенно.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Feature List */}
            <div className="space-y-8">
              <div className="flex gap-5 group">
                <div className="w-12 h-12 rounded-xl bg-yellow-100/80 backdrop-blur-sm flex items-center justify-center text-yellow-600 shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Мгновенный старт</h3>
                  <p className="text-slate-600">Запуск до залогиненного состояния занимает менее 8 секунд. Больше никаких ожиданий загрузки обновлений.</p>
                </div>
              </div>

              <div className="flex gap-5 group">
                <div className="w-12 h-12 rounded-xl bg-blue-100/80 backdrop-blur-sm flex items-center justify-center text-blue-600 shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Без обучения</h3>
                  <p className="text-slate-600">Интерфейс знаком каждому. Если сотрудник умеет пользоваться браузером, он умеет пользоваться Cloud OS.</p>
                </div>
              </div>

              <div className="flex gap-5 group">
                <div className="w-12 h-12 rounded-xl bg-purple-100/80 backdrop-blur-sm flex items-center justify-center text-purple-600 shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                  <LayoutGrid className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Гибкость экосистемы</h3>
                  <p className="text-slate-600">Нативная поддержка веб-версий (Яндекс, VK, Р7-Офис). Windows-приложения доступны через бесшовный App-Streaming.</p>
                </div>
              </div>
            </div>

            {/* Visual Demo */}
            <div ref={demoRef} className="bg-white/50 backdrop-blur-md p-8 rounded-3xl border border-white/50 relative shadow-lg">
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <Clock className="w-48 h-48" />
              </div>

              <h3 className="text-center font-bold text-slate-800 mb-8">Время до начала работы</h3>

              {/* Comparison Bars */}
              <div className="space-y-8 mb-12 relative z-10">
                <div>
                  <div className="flex justify-between text-sm font-medium mb-2">
                    <span className="text-slate-500">Windows 11 (HDD)</span>
                    <span className="text-red-500">~65 сек</span>
                  </div>
                  <div className="h-4 bg-slate-200/50 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-400 w-full animate-pulse opacity-50"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm font-medium mb-2">
                    <span className="text-slate-900">Cloud OS (Любой ПК)</span>
                    <span className="text-cloud-600 font-bold">8 сек</span>
                  </div>
                  <div className="h-4 bg-cloud-100/50 rounded-full overflow-hidden relative">
                      <div 
                        className="h-full bg-cloud-500 rounded-full transition-all duration-300 ease-out shadow-[0_0_10px_rgba(14,165,233,0.5)]"
                        style={{ width: bootState === 'off' ? '0%' : bootState === 'on' ? '100%' : `${progress}%` }}
                      ></div>
                  </div>
                </div>
              </div>

              {/* Simulated Device Screen */}
              <div className="bg-slate-800 rounded-xl overflow-hidden shadow-2xl aspect-video relative border-8 border-slate-800 ring-1 ring-slate-900/50">
                
                {/* STATE: OFF */}
                {bootState === 'off' && (
                  <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center">
                    <button 
                      onClick={startBoot}
                      className="group relative flex flex-col items-center gap-4 transition-all"
                    >
                      <div className="w-16 h-16 rounded-full border-2 border-slate-700 group-hover:border-cloud-500 group-hover:shadow-[0_0_20px_rgba(14,165,233,0.5)] flex items-center justify-center transition-all duration-300 bg-slate-900">
                        <Power className="w-8 h-8 text-slate-500 group-hover:text-cloud-500 transition-colors" />
                      </div>
                      <span className="text-slate-500 text-sm font-medium tracking-widest uppercase group-hover:text-cloud-400 transition-colors">Включить</span>
                    </button>
                  </div>
                )}

                {/* STATE: BOOTING */}
                {bootState === 'booting' && (
                  <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center animate-fade-in-up">
                    <div className="mb-8 relative">
                      <div className="w-20 h-20 bg-cloud-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cloud-900/50 animate-pulse">
                        <Cloud className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    <h4 className="text-white font-medium text-lg tracking-tight mb-2">Cloud OS</h4>
                    <div className="w-48 h-1 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-cloud-500 shadow-[0_0_10px_rgba(14,165,233,0.8)]"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <p className="mt-4 text-slate-500 text-xs font-mono">
                      System check... OK<br/>
                      Mounting root fs... OK<br/>
                      Starting user session...
                    </p>
                  </div>
                )}

                {/* STATE: ON (DESKTOP) */}
                {bootState === 'on' && (
                  <div className="absolute inset-0 bg-gradient-to-br from-sky-400 to-indigo-500 flex flex-col animate-fade-in-up">
                    {/* Status Bar */}
                    <div className="h-6 bg-black/10 backdrop-blur-md flex items-center justify-between px-4 text-white/90 text-[10px] font-medium">
                      <span>Cloud OS 2.0</span>
                      <div className="flex items-center gap-3">
                        <Wifi className="w-3 h-3" />
                        <Battery className="w-3 h-3" />
                        <span>12:42</span>
                      </div>
                    </div>

                    {/* Desktop Area */}
                    <div className="flex-1 relative p-8 flex items-center justify-center">
                       {/* Window */}
                       <div className="w-full max-w-sm bg-white rounded-lg shadow-2xl overflow-hidden animate-fade-in-up" style={{ animationDuration: '0.4s' }}>
                          <div className="h-8 bg-slate-100 border-b border-slate-200 flex items-center px-3 gap-1.5">
                             <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                             <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                             <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                             <div className="ml-2 flex-1 bg-white h-5 rounded border border-slate-200 flex items-center px-2">
                                <Search className="w-3 h-3 text-slate-400 mr-2" />
                                <span className="text-[10px] text-slate-400">Поиск в интернете...</span>
                             </div>
                          </div>
                          <div className="p-6 flex flex-col items-center text-center">
                             <div className="w-12 h-12 bg-cloud-50 rounded-full flex items-center justify-center mb-3">
                                <Zap className="w-6 h-6 text-cloud-600" />
                             </div>
                             <h3 className="text-slate-800 font-bold mb-1">Готов к работе</h3>
                             <p className="text-slate-500 text-xs mb-4">Система загружена за 8.00 сек</p>
                             <button className="px-4 py-2 bg-cloud-600 text-white text-xs font-bold rounded hover:bg-cloud-700 transition-colors">
                                Запустить Браузер
                             </button>
                          </div>
                       </div>
                    </div>

                    {/* Dock */}
                    <div className="h-12 bg-white/20 backdrop-blur-md border-t border-white/10 flex items-center justify-center gap-4 px-4">
                       {[1,2,3,4].map(i => (
                          <div key={i} className="w-8 h-8 rounded-lg bg-white/90 shadow-lg hover:-translate-y-1 transition-transform cursor-pointer"></div>
                       ))}
                    </div>
                    
                    {/* Restart Button Overlay */}
                    <button 
                      onClick={resetBoot}
                      className="absolute top-10 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-sm transition-all"
                      title="Перезагрузить"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};