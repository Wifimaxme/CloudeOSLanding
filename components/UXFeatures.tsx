import React, { useEffect, useRef, useState } from 'react';
import { Zap, GraduationCap, LayoutGrid } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { BootDemo } from './ux/BootDemo';
import { useBootSequence } from '../hooks/useBootSequence';

export const UXFeatures: React.FC = () => {
  const { bootState, progress, startBoot, resetBoot } = useBootSequence();
  const demoRef = useRef<HTMLDivElement>(null);
  const [hasAutoBooted, setHasAutoBooted] = useState(false);

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
  }, [hasAutoBooted, startBoot]);

  return (
    <section id="ux" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollReveal>
          <div className="mb-16 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Скорость и Простота</h2>
            <p className="text-slate-400 text-lg backdrop-blur-sm bg-white/5 p-2 rounded-lg inline-block border border-white/5">
              Пользователю не нужно изучать ОС. Его задача — "запустить браузер". Мы убрали всё лишнее, чтобы работа начиналась мгновенно.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Feature List */}
            <div className="space-y-8">
              <div className="flex gap-5 group">
                <div className="w-12 h-12 rounded-xl bg-yellow-500/10 backdrop-blur-sm flex items-center justify-center text-yellow-500 shrink-0 shadow-[0_0_15px_rgba(234,179,8,0.2)] border border-yellow-500/20 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Мгновенный старт</h3>
                  <p className="text-slate-400">Запуск до залогиненного состояния занимает менее 8 секунд. Больше никаких ожиданий загрузки обновлений.</p>
                </div>
              </div>

              <div className="flex gap-5 group">
                <div className="w-12 h-12 rounded-xl bg-kvadra-purple/10 backdrop-blur-sm flex items-center justify-center text-kvadra-purple shrink-0 shadow-[0_0_15px_rgba(192,132,252,0.2)] border border-kvadra-purple/20 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Без обучения</h3>
                  <p className="text-slate-400">Интерфейс знаком каждому. Если сотрудник умеет пользоваться браузером, он умеет пользоваться kvadra Cloud OS.</p>
                </div>
              </div>

              <div className="flex gap-5 group">
                <div className="w-12 h-12 rounded-xl bg-kvadra-indigo/10 backdrop-blur-sm flex items-center justify-center text-kvadra-indigo shrink-0 shadow-[0_0_15px_rgba(129,140,248,0.2)] border border-kvadra-indigo/20 group-hover:scale-110 transition-transform">
                  <LayoutGrid className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Гибкость экосистемы</h3>
                  <p className="text-slate-400">Нативная поддержка веб-версий (Яндекс, VK, Р7-Офис). Windows-приложения доступны через бесшовный App-Streaming.</p>
                </div>
              </div>
            </div>

            {/* Visual Demo */}
            <div ref={demoRef}>
                <BootDemo 
                    bootState={bootState} 
                    progress={progress} 
                    startBoot={startBoot} 
                    resetBoot={resetBoot} 
                />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};